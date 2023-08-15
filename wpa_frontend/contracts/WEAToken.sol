// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract WEAToken is ERC20 {
    constructor(uint256 initialSupply) ERC20("Work Experience Authenticity", "WEA") {
        _mint(msg.sender, initialSupply);
        _mint(address(this), initialSupply);
    }

    function decimals() public view virtual override returns (uint8) {
        return 0;
    }
}