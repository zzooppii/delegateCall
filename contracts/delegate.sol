// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract delegate {
    uint public num;
    address public sender;
    uint public value;

    address public abc;
    address public a;

    function setVars(address _contract, uint _num) public payable {
        // A's storage is set, B is not modified.
        (bool success, bytes memory data) = _contract.delegatecall(
            abi.encodeWithSignature("setVars(uint256)", _num)
        );
    }
}