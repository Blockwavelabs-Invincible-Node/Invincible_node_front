 // SPDX-License-Identifier: MIT
pragma solidity ^0.8;

import "@openzeppelin/contracts/security/ReentrancyGuard.sol"; 

contract StableTokenPool is ReentrancyGuard{
    address public owner;
    IERC20 public immutable stableToken;

    constructor (address _stableTokenAddress) {
        stableToken = IERC20(_stableTokenAddress);
        owner = msg.sender;
    }

    mapping(address => uint) public balanceOf;
    mapping(address => string) public validatorAddress;
    mapping(address => uint) public borrowed;
    address[] public addressList;
    uint public totalAddressNumber = 0;
    uint public totalReceived;
    uint public totalSent;
    uint private totalSupply;

    fallback() external payable {
        // when 
    }

    receive() external payable {

    }

    function exists(address _account) public view returns(bool) {
        for (uint i = 0; i< addressList.length; i++) {
            if (addressList[i] == _account) {
                return true;
            }
        }
        return false;
    }

    function addAddressList(address _account) public {
        if (!exists(_account)) {
            addressList.push(_account);
            totalAddressNumber++;
        }
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "not authorized");
        _;
    }

    function sendStableToken(address _recipient, uint _amount) public onlyOwner {
        require(_amount + totalSent < totalReceived, "not enough supply");
        totalSent += _amount;
        borrowed[_recipient] += _amount;
        stableToken.transfer(_recipient, _amount);
    }

    function receiveStableToken(uint _amount, string memory _validatorAddress) public{
        totalReceived += _amount;
        stableToken.transferFrom(msg.sender, address(this), _amount);
        balanceOf[msg.sender] += _amount;
        validatorAddress[msg.sender] = _validatorAddress; 
        addAddressList(msg.sender);
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

 