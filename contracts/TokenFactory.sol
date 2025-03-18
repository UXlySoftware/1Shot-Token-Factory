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

    constructor(address defaultAdmin) {
        Token tokenImpl = new Token();
        tokenImpl.initialize(address(this), address(this));

        // Deploy the Upgradeable Beacon that points to the implementation Vault contract address
        // https://docs.openzeppelin.com/contracts/3.x/api/proxy#UpgradeableProxy
        // All deployed proxies can be upgraded by changing the implementation address in the beacon
        UpgradeableBeacon _upgradeableBeacon = new UpgradeableBeacon(address(tokenImpl), defaultAdmin);
        beaconAddress = address(_upgradeableBeacon);

        _grantRole(DEFAULT_ADMIN_ROLE, defaultAdmin);
    }

    /// @notice deploys a Beacon Proxy with New keyword and salt to create an upgradeable Vault
    /// @dev https://docs.openzeppelin.com/contracts/5.x/api/proxy#UpgradeableBeacon
    /// @param name a string used to name the Vault deployed to make it easy to look up (hashed to create salt)
    /// @param owner an address that will own the Vault contract
    function deployToken(string memory name, address payable owner) public {
        /// NOTE: The address of the beacon contract will never change after deployment. Additionally, in this example we call 
        /// the initializer after deployment so that the proxy address does not depend on the initializer arguments. The means you only
        /// need to use the salt value to calculate the proxy address.
        BeaconProxy proxy = new BeaconProxy(beaconAddress,  '');
        Token(address(proxy)).initialize(owner, owner);
        
        emit TokenCreated(address(proxy));
    }
}