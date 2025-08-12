// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.22;

import {AccessControlUpgradeable} from "@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol";
import {ERC20Upgradeable} from "@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol";
import {ERC20BurnableUpgradeable} from "@openzeppelin/contracts-upgradeable/token/ERC20/extensions/ERC20BurnableUpgradeable.sol";
import {Initializable} from "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

contract Token is Initializable, ERC20Upgradeable, ERC20BurnableUpgradeable, AccessControlUpgradeable {
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");

    uint public maxSupply;

    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() {
        _disableInitializers();
    }

    function initialize(address defaultAdmin, string calldata name, string calldata ticker, uint _maxSupply) public initializer {
        __ERC20_init(name, ticker);
        __ERC20Burnable_init();
        __AccessControl_init();

        maxSupply = _maxSupply;
        _grantRole(DEFAULT_ADMIN_ROLE, defaultAdmin);
        _grantRole(MINTER_ROLE, defaultAdmin);
    }

    /// @dev Called by the MINTER_ROLE to mint tokens to a recipient address
    /// @dev The amount of tokens minted cannot exceed maxSupply
    /// @param to the recipient address of the new tokens
    /// @param amount the amount of tokens to mint in wei
    function mint(address to, uint256 amount) public onlyRole(MINTER_ROLE) {
        require(totalSupply() + amount <= maxSupply, "Max supply exceeded");
        _mint(to, amount);
    }

    /// @dev Lets a token holder stake tokens to earn rewards
    /// @dev The amount of tokens staked cannot exceed the balance of the sender
    /// @param amount the amount of tokens to stake in wei
    function stake(uint256 amount) external {
        revert("Staking not implemented");
    }
}