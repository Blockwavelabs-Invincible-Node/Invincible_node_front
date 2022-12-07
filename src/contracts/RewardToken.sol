// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract RewardToken is ERC20 {
    constructor(uint256 initialSupply) ERC20("Reward Eth", "reETH") {
        _mint(msg.sender, initialSupply);
    }

    // liquidStaking 주인만 민팅이 가능하다
    modifier onlyLiquidStakingOwner(address _account) {
        require(msg.sender == _account, "not authorized");
        _;
    }
    
    function mintToken(address account, uint amount) external onlyLiquidStakingOwner(account) {
        _mint(account, amount);
    }
}
