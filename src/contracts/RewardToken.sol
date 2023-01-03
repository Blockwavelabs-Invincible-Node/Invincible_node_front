// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract RewardToken is ERC20 {
    address liquidStakingOwner;
    constructor(address _liquidStakingOwner, string memory _tokenFullName, string memory _tokenName) ERC20( _tokenFullName, _tokenName) {
        liquidStakingOwner = _liquidStakingOwner;
    }

    // evmosLiquidStaking 주인만 민팅이 가능하다
    modifier onlyLiquidStakingOwner(address _account) {
        require(msg.sender == _account, "not authorized");
        _;
    }
    
    function mintToken(address account, uint amount) external onlyLiquidStakingOwner(account) {
        _mint(account, amount);
    }

    function burnToken(address account, uint amount) external onlyLiquidStakingOwner(account) {
        _burn(account, amount);
    }
}
