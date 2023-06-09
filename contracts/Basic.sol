
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

// NOTE: Deploy this contract first
contract Basic {
    // NOTE: storage layout must be the same as contract A
    uint public num;
    address public sender;
    uint public value;

    address public abc;
    uint256 public a;

    function setVars(uint _num) public payable {
        num = _num;
        sender = msg.sender;
        value = msg.value;
    }
}