 // SPDX-License-Identifier: MIT
pragma solidity ^0.8;

import "@openzeppelin/contracts/security/ReentrancyGuard.sol"; 

contract LiquidStaking is ReentrancyGuard{
    // Reward로 지급 받는 토큰 type
    IERC20 public immutable reETH;

    // Mint public mint = new Mint();
    struct addressData {
        address account;
        bool isValue; 
    }

    address public owner; 
    // address list
    address[] addressList;
    // total address;
    uint public totalAddressNumber;
    // Reward Token Amount
    uint public rewardsTokenAmount;
    // Minimum of last updated time and reward finish time
    uint public updatedAt;
    // Reward to be paid out per second
    uint public rewardRate = 0;
    // Sum of (reward rate * dt * 1e18 / total supply)
    uint public rewardPerTokenStored;
    // User address => rewardPerTokenStored
    mapping(address => uint) public userRewardPerTokenPaid;
    // User address => rewards to be claimed
    mapping(address => uint) public rewards;
    // updated reward timestamps
    mapping(address => uint) public rewardLastUpdatedTime;
    // Total staked -> 총 스테이킹 된 양
    uint public totalSupply;
    // User address => staked amount -> 각 유저가 스테이킹한 양
    mapping(address => uint) public balanceOf;

    event Received(address sender);

    // 생성자로 staking token address / reward token address을 입력 
    constructor(address _reETH) {
        owner = msg.sender;
        reETH = IERC20(_reETH);
        totalAddressNumber = 0;
    }

    fallback() external payable {
        emit Received(msg.sender);
        balanceOf[msg.sender] += msg.value;
        totalSupply += msg.value;
        // reward token을 필요한 만큼 mint
        reETH.mintToken(address(this), msg.value);
        reETH.transfer(msg.sender, msg.value);
    }

    function exists(address _account) public view returns(bool) {
        for (uint i = 0; i< addressList.length; i++) {
            if (addressList[i] == _account) {
                return true;
            }
        }
        return false;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "not authorized");
        _;
    }

    // update 로직: 원래 있던 리워드 + 스테이킹 양 * 마지막 업데이트 이후 흐른 시간 * 보상 비율  / 1년 (3600*24*365)
    modifier updateReward(address _account)  {
        rewards[_account] = rewards[_account] + balanceOf[msg.sender] * (block.timestamp - rewardLastUpdatedTime[_account]) * rewardRate / (100 * 3600*24*365);
        // reward time update
        rewardLastUpdatedTime[_account] = block.timestamp;
        _;
    }

    modifier addAddressList(address _account) {
        if (!exists(_account)) {
            addressList[addressList.length] = _account;
            totalAddressNumber++;
        }
        _;
    }

    //set reward rate
    function setRewardRate(uint _rewardRate) external onlyOwner {
        rewardRate = _rewardRate;
    }

    // 스테이킹 함수 (amount 입력) -> reward도 같이 update 된다
    // updateReward(msg.sender) addAddressList(msg.sender)
    function stake(uint _amount) external payable updateReward(msg.sender) nonReentrant(){ 
        // staking 양이 0이상
        require(_amount > 0, "amount = 0");
         // msg.sender의 balance 증가
        balanceOf[msg.sender] += _amount;
        // totalsupply 증가
        totalSupply += _amount;
        // reward token을 필요한 만큼 mint
        reETH.mintToken(address(this), _amount);
        //amount 방금 stake
        (bool sent, bytes memory data) = address(this).call{value: msg.value}("");
        require(sent, "Failed to send Ether");
        // stake 한 만큼 reward token 지급
        reETH.transfer(msg.sender, _amount);
        //time stamp 기록
        rewardLastUpdatedTime[msg.sender] = block.timestamp;
    }

    // withdraw 함수 -> reward update 이후에 withdraw
    function withdraw(uint _amount) external payable updateReward(msg.sender) nonReentrant()  {
        address recipient = msg.sender;
        require(_amount > 0, "amount = 0");
        require(_amount <= balanceOf[msg.sender], "too much amount");
        reETH.transferFrom(msg.sender, address(this), _amount);
        balanceOf[msg.sender] -= _amount;
        totalSupply -= _amount;
        (bool sent, bytes memory data) = recipient.call{value: msg.value}("");
        require(sent, "Failed to send Ether");
    }

    // reward 수령
    function receiveReward() external updateReward(msg.sender) nonReentrant()  {
        uint reward = rewards[msg.sender];
        if (reward > 0) {
            rewards[msg.sender] = 0;
            reETH.mintToken(address(this), reward);
            // rewardsToken을 msg.sender 에 제공 
            reETH. transfer(msg.sender, reward);
        }
    }

    function _min(uint x, uint y) private pure returns (uint) {
        return x <= y ? x : y;
    }
}

interface IERC20 {
    function totalSupply() external view returns (uint);
    function balanceOf(address account) external view returns (uint);
    function transfer(address recipient, uint amount) external returns (bool);
    function allowance(address owner, address spender) external view returns (uint);
    function approve(address spender, uint amount) external returns (bool);
    function transferFrom(
        address sender,
        address recipient,
        uint amount
    ) external returns (bool);
    function mintToken(address account, uint amount) external;
    event Transfer(address indexed from, address indexed to, uint value);
    event Approval(address indexed owner, address indexed spender, uint value);
}

 