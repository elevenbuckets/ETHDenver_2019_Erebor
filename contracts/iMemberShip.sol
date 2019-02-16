pragma solidity ^0.5.2;

interface iMemberShip {

    function allocateCoreManagers() external;
    function putNFTForSale(uint _tokenId) external;
    function tradeTokenToggle() external returns (bool);
    function buyToken() external payable returns (bool);
    function transferToken(uint _tokenToTransfer, uint _tokenId, address _receiver) external returns (bool);
    function bindMembership(uint _tokenId) external returns (bool);
    function unbindMembership(uint _tokenId) external returns (bool);
    function renewMembership(uint _tokenId) external payable returns (uint);
    function assginKYCid(uint _tokenId, bytes32 _kycid) external returns (bool);
    function addWhitelistApps(address _addr) external returns (bool);
    function rmWhitelistApps(address _addr) external returns (bool);
    function addPenalty(uint _tokenId, uint _penalty) external returns (uint);
    function readNotes(uint _tokenId) external view returns (string memory);
    function addNotes(uint _tokenId, string calldata _notes) external;
    function addrIsMember(address _addr) external view returns (bool);
    function addrIsActiveMember(address _addr) external view returns (bool);
    function tokenIsMember(uint _tokenId) external view returns (bool);
    function tokenIsActiveMember(uint _tokenId) external view returns (bool);
    function addrToTokenId(address _addr) external view returns (uint);
    function getMemberInfo(uint _tokenId) external view returns (address, uint, uint, bytes32);
   
    function pause() external;
    function unpause() external;
    function updateELEMAddr(address _addr) external;

}
