//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

contract AdvanceStorage {
	uint[] public ids;

	function add(uint id) public {
		ids.push(id);
	}

	function get(uint _position) public view returns (uint) {
		return ids[_position];
	}

	function getAll() public view returns (uint[] memory) {
		return ids;
	}

	function length() public view returns (uint) {
		return ids.length;
	}
}
