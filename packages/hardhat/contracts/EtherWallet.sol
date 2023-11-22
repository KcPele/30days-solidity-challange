//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

error NOT_OWNER();

contract EtherWallet {
	address public owner;

	constructor(address _owner) {
		owner = _owner;
	}

	modifier onlyOwner() {
		if (msg.sender != owner) {
			revert NOT_OWNER();
		}
		_;
	}

	function deposit() public payable {}

	function send(address _to, uint256 _amt) external onlyOwner {
		(bool sent, ) = payable(_to).call{ value: _amt }("");
		require(sent, "Failed to send Ether");
	}

	function balanceOf() external view returns (uint256) {
		return address(this).balance;
	}

	receive() external payable {}
}
