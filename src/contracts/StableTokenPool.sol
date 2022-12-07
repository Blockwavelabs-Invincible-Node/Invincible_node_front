 // SPDX-License-Identifier: MIT
pragma solidity ^0.8;

import "@openzeppelin/contracts/security/ReentrancyGuard.sol"; 

contract StableTokenPool is ReentrancyGuard{
    address owner;
    IERC20 public immutable stableToken;

    constructor (address _stableTokenAddress) {
        stableToken = IERC20(_stableTokenAddress);
    }

    mapping(address => uint) balanceOf;
    uint public totalReceived;
    uint public totalSent;
    uint private totalSupply;

    fallback() external payable {
        // when 
    }

    receive() external payable {

    }

    modifier onlyOwner() {
        require(msg.sender == owner, "not authorized");
        _;
    }

    function sendStableToken(address _recipient, uint _amount) public onlyOwner {
        require(_amount + totalSent < totalReceived, "not enough supply");
        totalSent += _amount;
        stableToken.transfer(_recipient, _amount);
    }

    function receiveStableToken(uint _amount) public onlyOwner{
        totalReceived += _amount;
        stableToken.transferFrom(msg.sender, address(this), _amount);
        balanceOf[msg.sender] += _amount;
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
    event Transfer(address indexed from, address indexed to, uint value);
    event Approval(address indexed owner, address indexed spender, uint value);
}

 