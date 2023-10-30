//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

error USER_NOTFOUND();

contract Crud {
	struct User {
		uint256 id;
		string name;
	}

	User[] public users;
	uint256 public nextId = 1;

	function create(string memory name) public {
		users.push(User(nextId, name));
		nextId++;
	}

	function read(uint256 _id) public view returns (uint256, string memory) {
		uint i = find(_id);
		return (users[i].id, users[i].name);
	}

	function update(uint256 _id, string memory _name) public {
		uint i = find(_id);
		users[i].name = _name;
	}

	function destroy(uint256 _id) public {
		uint i = find(_id);

		delete users[i];
		nextId--;
	}

	function find(uint256 _id) internal view returns (uint256) {
		if (_id >= nextId) {
			revert USER_NOTFOUND();
		}
		for (uint256 i = 0; i < users.length; i++) {
			if (users[i].id == _id) {
				return i;
			}
		}
	}
}
