// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.22;

import {AccessControl} from "@openzeppelin/contracts/access/AccessControl.sol";
import {BeaconProxy} from "@openzeppelin/contracts/proxy/beacon/BeaconProxy.sol";
import {UpgradeableBeacon} from "@openzeppelin/contracts/proxy/beacon/UpgradeableBeacon.sol";

import "./Token.sol";

contract TokenFactory is AccessControl {
    address public immutable beaconAddress;

    event TokenCreated(address token);

    constructor(address defaultAdmin, address tokenImpl) {
        // Deploy the Upgradeable Beacon that points to the implementation Vault contract address
        // https://docs.openzeppelin.com/contracts/3.x/api/proxy#UpgradeableProxy
        // All deployed proxies can be upgraded by changing the implementation address in the beacon
        UpgradeableBeacon _upgradeableBeacon = new UpgradeableBeacon(tokenImpl, defaultAdmin);
        beaconAddress = address(_upgradeableBeacon);

        _grantRole(DEFAULT_ADMIN_ROLE, defaultAdmin);
    }

    /// @notice deploys a Beacon Proxy with New keyword and salt to create an upgradeable Vault
    /// @dev https://docs.openzeppelin.com/contracts/5.x/api/proxy#UpgradeableBeacon
    /// @param admin the address which will control minting functionality on this token
    /// @param name a string which will be the name of the deployed token
    /// @param ticker a string which will serve as the token symbol
    /// @param premint a uint denoting the amount of token to premint (remember there are 18 decimal places)
    function deployToken(address admin, string calldata name, string calldata ticker, uint premint) public {
        BeaconProxy proxy = new BeaconProxy(beaconAddress,  '');
        Token(address(proxy)).initialize(admin, name, ticker, premint);
        
        emit TokenCreated(address(proxy));
    }
}