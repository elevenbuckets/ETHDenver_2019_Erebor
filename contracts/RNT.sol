pragma solidity ^0.5.2;
import "./StandardToken.sol";

contract RNT is StandardToken {
    string private _symbol = "RNT";
    uint8 private _decimals = 12;
    uint256 public _maxSupply = 100000000000000000000000;
    address public owner;
    address public mining;
    uint256 public reward = 15000000000000;

    modifier ownerOnly() {
       require(msg.sender == owner);
       _;
    }

    modifier miningOnly() {
       require(msg.sender == mining);
       _;
    }

    constructor() public {
       owner = msg.sender;
       totalSupply = 300000000000000000;
       _balances[0xB440ea2780614b3c6a00e512f432785E7dfAFA3E] = 100000000000000000;
       _balances[0x4AD56641C569C91C64C28a904cda50AE5326Da41] = 100000000000000000;
       _balances[0xaF7400787c54422Be8B44154B1273661f1259CcD] = 100000000000000000;
    }

    function symbol() public view returns (string memory){
        return _symbol;
    }

    function decimals() public view returns (uint8){
        return _decimals;
    }

    // TODO: Making mining contract upgradable while limit owner from changing this arbitrarily
    function setMining(address miningAddress) ownerOnly external returns (bool) {
	//require(mining == address(0)); // For debug, allow this to be changed many times
	mining = miningAddress;

	return true;
    }

    function mint(address toAddress) miningOnly external returns (bool) {
	require(totalSupply < _maxSupply);
	_balances[toAddress] += reward;
	totalSupply += reward;

	return true;
    }

    function burn(uint256 amount) external returns (bool) {
	require(_balances[msg.sender] >= amount);
	_balances[msg.sender] -= amount;
	totalSupply -= amount;

	return true;
    }
}
