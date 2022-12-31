// SPDX-License-Identifier: MIT
pragma solidity ^0.8;

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract LiquidStaking is ReentrancyGuard {
    // Reward로 지급 받는 토큰 type
    IERC20 public immutable reToken;

    struct addressData {
        address account;
        bool isValue;
    }

    // account = 유저 주소
    struct UnbondData {
        // 유저 주소
        address account;
        // unbond 끝나는 시점
        uint unbondCompleteTime;
        // 출금 요청 수량
        uint amount;
    }

    // 컨트랙트 배포자
    address public owner;
    // 밸리데이터 관리자
    address public validatorOwner;
    // address list
    address[] public addressList;
    // total address;
    uint256 public totalAddressNumber;
    // Reward Token Amount
    uint256 public rewardsTokenAmount;
    // uint public updatedAt;
    uint256 public unbondingTime;
    // User address => rewards to be claimed
    mapping(address => uint256) public rewards;
    // total reward claimed
    mapping(address => uint256) public totalRewardsClaimed;

    string validatorAddress;

    // Total staked -> 총 스테이킹 된 양
    uint256 public totalSupply;
    uint256 public totalUnstaked;
    // User address => staked amount -> 각 유저가 스테이킹한 양
    mapping(address => uint256) public balanceOf;
    // mapping(address => uint) public staked;
    mapping(address => uint256) public unstaked;
    UnbondData[] public unbondRequests;
    mapping(string => uint256) public validatorAddresses;

    // mapping(address => string) public approvedValidators;
    mapping(address => string) public validatorRequests;

    event Received(address sender);
    event Transfer(
        address indexed src,
        address indexed dst,
        uint256 val,
        bytes stableAmount
    );
    event Unbond(address indexed src, uint256 val);
    event UpdateRequest(string indexed validatorAddress);

    // validatorOwner = 0x3abc249dd82Df7eD790509Fba0cC22498C92cCFc
    // rewardToken = 0x89a7D248d7520387963F5d164De9D8a3A77A4200
    // liquidStaking = 0xAd6c553BCe3079b4Dc52689fbfD4a2e72F1F3158
    // unbondingtime = 604800

    // 유저의 출금 요청
    function withdraw(uint _amount) public nonReentrant() {
        require(_amount > 0, "amount = 0");
        emit Unbond(msg.sender, _amount);

        unstaked[msg.sender] += _amount;
        totalUnstaked += _amount;

        reToken.transferFrom(msg.sender, address(this), _amount);

        reToken.burnToken(address(this), _amount);
        UnbondData memory data = UnbondData(msg.sender, block.timestamp+unbondingTime, _amount);
        unbondRequests.push(data);
    }

    // 생성자로 staking token address / reward token address을 입력
    constructor(
        address _reToken,
        address _validatorOwner,
        uint256 _unbondingTime
    ) {
        owner = msg.sender;
        validatorOwner = _validatorOwner;
        reToken = IERC20(_reToken);
        totalAddressNumber = 0;
        unbondingTime = _unbondingTime;
    }

    // contract에서 token을 받았을 때 어떻게 할 것인가
    fallback() external payable {
        emit Received(msg.sender);
        if (msg.sender == validatorOwner) {
            for (uint256 i = 0; i < unbondRequests.length; i++) {
                if (
                    unbondRequests[i].unbondCompleteTime < block.timestamp &&
                    msg.value == unbondRequests[i].amount
                ) {
                    address receiver = unbondRequests[i].account;
                    (bool sent, ) = receiver.call{value: msg.value}("");
                    require(sent, "Failed to send");
                }
                popFromUnbondRequest(i);
            }
        }
        // normal user send
        else {
            emit Transfer(msg.sender, address(this), msg.value, msg.data);
            addAddressList(msg.sender);
            balanceOf[msg.sender] += msg.value;
            totalSupply += msg.value;
            // reward token mint
            // liquidity token을 민팅해서 유저한테 전송
            reToken.mintToken(address(this), msg.value);
            reToken.transfer(msg.sender, msg.value);
        }
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "not authorized");
        _;
    }

    // 밸리데이터 주소를 추가
    function addValidatorAddress(string memory _validatorAddress) public {
        validatorAddresses[_validatorAddress] = 0;
        validatorRequests[msg.sender] = _validatorAddress;
        emit UpdateRequest(_validatorAddress);
    }

    // 밸리데이터 주소 검증 결과 입력
    function setValidatorAddress(
        string memory _validatorAddress,
        uint256 _result
    ) public {
        // if proper address = 1
        validatorAddresses[_validatorAddress] = _result;
    }

    // unstake 시간 설정
    function setUnbondingTime(uint256 _period) public onlyOwner {
        unbondingTime = _period;
    }

    // stake 한 사람의 reward를 업데이트
    function updateAccountReward(address _account, uint256 _amount) private {
        // uint dailyReward = _amount * balanceOf[_account] / totalSupply - _amount * balanceOf[_account] / totalUnstaked;
        uint256 supply = totalSupply - totalUnstaked;
        uint256 dailyReward = (_amount * balanceOf[_account]) / supply;
        rewards[_account] += dailyReward;
    }

    // 모든 stake 한 사람의 reward를 업데이트
    function updateReward(uint256 _amount) public {
        for (uint256 i = 0; i < addressList.length; i++) {
            updateAccountReward(addressList[i], _amount);
        }
    }

    // 존재하는 주소인지 확인해주는 함수
    function exists(address _account) public view returns (bool) {
        for (uint256 i = 0; i < addressList.length; i++) {
            if (addressList[i] == _account) {
                return true;
            }
        }
        return false;
    }

    // 주소 리스트에 추가
    function addAddressList(address _account) public {
        if (!exists(_account)) {
            addressList.push(_account);
            totalAddressNumber++;
        }
    }

    // 총 unbond request 개수
    function getTotalUnbondRequests() public {
        return unbondRequests.length;
    }

    // 유저가 reward를 수령할 수 있도록 하는 함수
    function receiveReward() external nonReentrant()  {
        uint reward = rewards[msg.sender];
        if (reward > 0) {
            rewards[msg.sender] = 0;
            totalRewardsClaimed[msg.sender] += reward;
            reToken.mintToken(address(this), reward);
            // rewardsToken을 msg.sender 에 제공
            reToken.transfer(msg.sender, reward);
        }
    }

    // unbond request 에서 제거
    function popFromUnbondRequest(uint256 index) private {
        // UnbondData memory element = unbondRequests[index];
        for (uint256 i = index; i < unbondRequests.length - 1; i++) {
            unbondRequests[i] = unbondRequests[i + 1];
        }
        delete unbondRequests[unbondRequests.length - 1];
    }
}

interface IERC20 {
    function totalSupply() external view returns (uint256);

    function balanceOf(address account) external view returns (uint256);

    function transfer(address recipient, uint256 amount)
        external
        returns (bool);

    function allowance(address owner, address spender)
        external
        view
        returns (uint256);

    function approve(address spender, uint256 amount) external returns (bool);

    function transferFrom(
        address sender,
        address recipient,
        uint256 amount
    ) external returns (bool);

    function mintToken(address account, uint amount) external;
    function burnToken(address account, uint amount) external;
    event Transfer(address indexed from, address indexed to, uint value);
    event Approval(address indexed owner, address indexed spender, uint value);

}
