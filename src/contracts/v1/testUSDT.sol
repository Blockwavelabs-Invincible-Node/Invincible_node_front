// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract TestUSDT is ERC20 {
    constructor() ERC20("test USDT", "USDT") {
       _mint(msg.sender, 100000000000000000000);
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
