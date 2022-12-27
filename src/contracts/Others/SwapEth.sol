//  // SPDX-License-Identifier: MIT
// pragma solidity ^0.8;

// import "@openzeppelin/contracts/security/ReentrancyGuard.sol"; 

// contract SwapEth is ReentrancyGuard{
//     // Reward로 지급 받는 토큰 type
//     IERC20 public immutable reETH;
    
//     struct addressData {
//         address account;
//         bool isValue; 
//     }

//     address public owner; 
//     // address list
//     address[] addressList;
//     // total address;
//     uint public totalAddressNumber;

//     uint public commission = 3;
//     uint public lpRewardRate = 3;

//     uint public ethTotalSupply = 1;
//     uint public reEthTotalSupply = 1;
//     uint public k = ethTotalSupply * reEthTotalSupply;
//    // uint public swapRate = reEthTotalSupply/ethTotalSupply;

    
//     mapping(address => uint) public ethBalanceOf;
//     mapping(address => uint) public reEthBalanceOf;

//     event Received(address sender);

//     constructor(address _reETH) {
//         owner = msg.sender;
//         reETH = IERC20(_reETH);
//         totalAddressNumber = 0;
//     }

//     fallback() external payable {
//         emit Received(msg.sender);
//         // provide할 reEth amount
//         uint reEthAmount = msg.value * reEthTotalSupply / ethTotalSupply;
//         require(reETH.transferFrom(msg.sender, address(this), reEthAmount), "Cannot transfer");
//         ethBalanceOf[msg.sender] += msg.value;
//         reEthBalanceOf[msg.sender] += reEthAmount;
//         ethTotalSupply += msg.value;
//         reEthTotalSupply += reEthAmount;
//     }

//     function exists(address _account) public view returns(bool) {
//         for (uint i = 0; i< addressList.length; i++) {
//             if (addressList[i] == _account) {
//                 return true;
//             }
//         }
//         return false;
//     }

//     modifier onlyOwner() {
//         require(msg.sender == owner, "not authorized");
//         _;
//     }
   

//     modifier addAddressList(address _account) {
//         if (!exists(_account)) {
//             addressList[addressList.length] = _account;
//             totalAddressNumber++;
//         }
//         _;
//     }

//     //set reward rate
//     // function setLpRewardRate(uint _rewardRate) external onlyOwner {
//     //     rewardRate = _rewardRate;
//     // }

//     // function setCommission(uint _commission) external onlyOwner {
//     //     commission = _commission; 
//     // }

//     // withdraw 함수 -> reward update 이후에 withdraw
//     function removeLiquidity(uint _amount) external payable updateReward(msg.sender) nonReentrant()  {
//         require(_amount > 0, "amount = 0");
//         address recipient = msg.sender;
//         uint reEthAmount = _amount * reEthTotalSupply / (reEthTotalSupply + ethTotalSupply);
//         uint ethAmount =  _amount * ethTotalSupply / (reEthTotalSupply + ethTotalSupply);
//         require(_amount <= (reEthbalanceOf[msg.sender] + ethBalanceOf[msg.sender] ) , "too much amount");
//         reEthbalanceOf[msg.sender] -= reEthAmount;
//         ethBalanceOf[msg.sender] -= ethAmount;
//         reEthTotalSupply -= ethAmount;
//         ethTotalSupply -= reEthAmount;
//         //transfers
//         (bool sent, bytes memory data) = recipient.call{value: ethAmount}("");
//         require(sent, "Failed to send Ether");
//         reETH.transfer(msg.sender, reEthAmount);
//     }
// }

// interface IERC20 {
//     function totalSupply() external view returns (uint);
//     function balanceOf(address account) external view returns (uint);
//     function transfer(address recipient, uint amount) external returns (bool);
//     function allowance(address owner, address spender) external view returns (uint);
//     function approve(address spender, uint amount) external returns (bool);
//     function transferFrom(
//         address sender,
//         address recipient,
//         uint amount
//     ) external returns (bool);
//     function mintToken(address account, uint amount) external;
//     event Transfer(address indexed from, address indexed to, uint value);
//     event Approval(address indexed owner, address indexed spender, uint value);
// }

 