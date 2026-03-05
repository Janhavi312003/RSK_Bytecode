// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Test} from "forge-std/Test.sol";
import {SimpleStorage} from "../src/SimpleStorage.sol";

contract SimpleStorageTest is Test {
    SimpleStorage public storageContract;

    function setUp() public {
        storageContract = new SimpleStorage();
    }

    function testSetAndGet() public {
        storageContract.set(42);
        assertEq(storageContract.get(), 42);
    }
}