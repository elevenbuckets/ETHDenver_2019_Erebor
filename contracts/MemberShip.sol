pragma solidity ^0.5.2;

// import "./RNTInterface.sol";
import "./ELEMInterface.sol";


contract MemberShip {
    address public owner;
    address[3] public coreManager;
    address public ELEMAddr;
    uint public fee = 10000000000000000;
    uint public memberPeriod = 40000;  // 40000 blocks ~ a week in rinkeby, for test only
    bool public paused = false;
    bool public canTradeToken = true;  // before "trade" implementation

    struct MemberInfo {
        address addr;
        uint since;  // beginning blockNo of previous membership
        // addPenalty() make sure "penalty" is always less than block.number
        uint penalty;  // the membership is valid until: since + memberPeriod - penalty;
        bytes32 kycid;  // know your customer id, leave it for future
        string notes;
    }

    mapping (uint => MemberInfo) internal memberDB;  // NFT to MemberInfo
    mapping (address => uint) internal addressToId;  // address to membership

    mapping (address => bool) public appWhitelist;

    constructor(address _ELEMAddr) public {
        owner = msg.sender;
        coreManager = [0xB440ea2780614b3c6a00e512f432785E7dfAFA3E,
                        0x4AD56641C569C91C64C28a904cda50AE5326Da41,
                        0xaF7400787c54422Be8B44154B1273661f1259CcD];
        ELEMAddr = _ELEMAddr;
        // RNTAddr  = _RNTAddr;
        // allocate membership in migration file
        allocateCoreManagers();
    }

    modifier ownerOnly() {
        require(msg.sender == owner);
        _;
    }

    modifier coreManagerOnly() {
        require(msg.sender == coreManager[0] || msg.sender == coreManager[1] || msg.sender == coreManager[2]);
        _;
    }

    modifier managerOnly(uint _tokenId) {
        require(_tokenId != 0 && (msg.sender == coreManager[0] || msg.sender == coreManager[1] || msg.sender == coreManager[2]
                || _tokenId % 7719472615821079694904732333912527190217998977709370935963838933860875309329 == 0));
        // uint256(0x1111111111111111111111111111111111111111111111111111111111111111 = 7.71947....e72
        _;
    }

    modifier feePaid() {
        require(msg.value >= fee);  // or "=="?
        _;
    }

    modifier isMember(uint _tokenId) {
        require(memberDB[_tokenId].addr == msg.sender && msg.sender != address(0));
        require(memberDB[_tokenId].since > 0);
        // require(addressToId[msg.sender] == _tokenId);
        _;
    }

    modifier isActiveMember(uint _tokenId) {
        require(memberDB[_tokenId].addr == msg.sender && msg.sender != address(0));
        require(memberDB[_tokenId].since + memberPeriod - memberDB[_tokenId].penalty > block.number
                || msg.sender == coreManager[0] || msg.sender == coreManager[1] || msg.sender == coreManager[2]
                || _tokenId % 7719472615821079694904732333912527190217998977709370935963838933860875309329 == 0);
        // require(_tokenId != 0);  // already excluded by first condition
        // is it possible that penalty >= since or block.number?
        _;
    }

    modifier isNFTOwner(uint _tokenId) {
        require(iELEM(ELEMAddr).ownerOf(_tokenId) == msg.sender);
        _;
    }

    modifier validNFT(uint256 _tokenId) {
        require(iELEM(ELEMAddr).ownerOf(_tokenId) != address(0));
        _;
    }

    // modifier isSynced(uint _tokenId){ // where/when to use it? What if somethings' wrong?
    //     require(ERC721(ELEMAddr).idToOwner[_tokenId] == memberDB[_tokenId].addr);
    // }

    modifier isNotSpecialToken(uint _tokenId) {
        // require(_tokenId > uint256(0x0000ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff));
        // require(_tokenId > 1766847064778384329583297500742918515827483896875618958121606201292619775);
        // require(_tokenId % uint256(0x1111111111111111111111111111111111111111111111111111111111111111 != 0));
        require(_tokenId % 7719472615821079694904732333912527190217998977709370935963838933860875309329 != 0);
        _;
    }

    modifier isNotManagerToken(uint _tokenId) {
        // require(_tokenId % uint256(0x1111111111111111111111111111111111111111111111111111111111111111 != 0));
        require(_tokenId % 7719472615821079694904732333912527190217998977709370935963838933860875309329 != 0);
        _;
    }

    modifier whenNotPaused() {
        require(!paused);
        _;
    }

    modifier whenPaused {
        require(paused);
        _;
    }

    function allocateCoreManagers() public ownerOnly {
        // core members already allocate NFTs:
        //      uint(0x1111111111111111111111111111111111111111111111111111111111111111)
        //      uint(0x2222222222222222222222222222222222222222222222222222222222222222)
        //      uint(0x3333333333333333333333333333333333333333333333333333333333333333)

        uint[3] memory _tickets = [ uint(0x1111111111111111111111111111111111111111111111111111111111111111),
                                    uint(0x2222222222222222222222222222222222222222222222222222222222222222),
                                    uint(0x3333333333333333333333333333333333333333333333333333333333333333)];
        // This contract may be updated while the token contract is not;
        // assume coreManager never transfer their first token (the _tickets)
        for (uint i=0; i<3; i++){
            if (iELEM(ELEMAddr).ownerOf(_tickets[i]) == coreManager[i]) {  // should be safe to ignore it for new deploys
                memberDB[_tickets[i]] = MemberInfo(coreManager[i], block.number, 0, bytes32(0), "");
                addressToId[coreManager[i]] = _tickets[i];
            }
        }
    }

    // use "putNFTForSale()", "canTradeToken=true", "buyToken", and "transferToken" before the "trading"
    // contract and the corresponding state channel are implemented
    // note: for "putNFTForSale" and "transferToken", one need to iELEM(ELEMAddr).approve(tokenId) first
    function putNFTForSale(uint _tokenId) public coreManagerOnly isNFTOwner(_tokenId) isNotSpecialToken(_tokenId) {
        iELEM(ELEMAddr).transferFrom(msg.sender, address(this), _tokenId);
    }

    function tradeTokenToggle() public coreManagerOnly returns (bool) {
        canTradeToken = !canTradeToken;
        return canTradeToken;
    }

    function buyToken() public payable feePaid returns (bool) {
        require(canTradeToken == true);
        require(iELEM(ELEMAddr).tokenOfOwnerByIndex(address(this), 0) != 0);  // there are NFT for sale
        require(iELEM(ELEMAddr).balanceOf(msg.sender) == 0);  // buyer has no NFT
        require(addressToId[msg.sender] == 0);  // buyer is not a member
        uint _tokenId = iELEM(ELEMAddr).tokenOfOwnerByIndex(address(this), 0);
        iELEM(ELEMAddr).transferFrom(address(this), msg.sender, _tokenId);
        return true;
    }

    // note: for "putNFTForSale" and "transferToken", one need to iELEM(ELEMAddr).approve(tokenId) first
    function transferToken(
        uint _tokenToTransfer,
        uint _tokenId,
        address _receiver
    ) public isMember(_tokenId) isNFTOwner(_tokenId) whenNotPaused returns (bool) {
        require(canTradeToken == true);
        require(memberDB[_tokenToTransfer].since == 0 && memberDB[_tokenToTransfer].addr == address(0));
        // comment below 2 lines for debug purpose
        // require(iELEM(ELEMAddr).balanceOf(_receiver) == 0);  // receiver has no NFT
        // require(addressToId[_receiver] == 0);  // receiver is not a member
        iELEM(ELEMAddr).transferFrom(msg.sender, _receiver, _tokenToTransfer);
        return true;
    }

    // membership
    function bindMembership(uint _tokenId) public isNFTOwner(_tokenId) whenNotPaused returns (bool) {
        require(memberDB[_tokenId].since == 0 && memberDB[_tokenId].addr == address(0));
        require(addressToId[msg.sender] == 0);  // the address is not yet bind to any NFT id
        // note: for now, if one obtain and bind a special token, then he or she become a "manager",
        //       i.e., always a active member, can write kycid/notes of other member and so on
        // note: coreManager are always activeMember, whether bind or not
        memberDB[_tokenId] = MemberInfo(msg.sender, block.number, 0, bytes32(0), "");
        addressToId[msg.sender] = _tokenId;
        return true;
    }

    function unbindMembership(uint _tokenId) public isNFTOwner(_tokenId) isMember(_tokenId) whenNotPaused returns (bool) {
        // active member cannot unbind and thus cannot trasnfer membership/Token
        require(memberDB[_tokenId].since + memberPeriod - memberDB[_tokenId].penalty < block.number);
        memberDB[_tokenId] = MemberInfo(address(0), 0, 0, bytes32(0), "");
        addressToId[msg.sender] = 0;
        return true;
    }

    function renewMembership(uint _tokenId) public payable isMember(_tokenId) isNFTOwner(_tokenId) whenNotPaused returns (uint) {
        require(block.number > memberDB[_tokenId].since + memberPeriod - 10000); // 10000 rinkeby blocks ~1.7 days
        memberDB[_tokenId].since = block.number;
        return block.number;
    }

    function assginKYCid(uint _tokenId, bytes32 _kycid) external managerOnly(_tokenId) returns (bool) {
        // instead of "managerOnly", probably add another group to do that
        require(memberDB[_tokenId].since > 0 && memberDB[_tokenId].addr != address(0));
        memberDB[_tokenId].kycid = _kycid;
        return true;
    }

    function addWhitelistApps(address _addr) public coreManagerOnly returns (bool) {
        appWhitelist[_addr] = true;
        return true;
    }

    function rmWhitelistApps(address _addr) public coreManagerOnly returns (bool) {
        appWhitelist[_addr] = false;
        return true;
    }

    function addPenalty(uint _tokenId, uint _penalty) external returns (uint) {
        require(appWhitelist[msg.sender] == true);  // the msg.sender (usually a contract) is in appWhitelist
        require(memberDB[_tokenId].since > 0);  // is a member
        require(_penalty < memberPeriod);  // prevent too much penalty

        // extreme case which is unlike to happen
        if (memberDB[_tokenId].penalty + _penalty > block.number) {
            memberDB[_tokenId].penalty = block.number - 1;  // if 0 then not a member
        } else {
            memberDB[_tokenId].penalty += _penalty;
        }
        return memberDB[_tokenId].penalty;
    }

    function readNotes(uint _tokenId) external view returns (string memory) {
        require(memberDB[_tokenId].since > 0);
        return memberDB[_tokenId].notes;
    }

    function addNotes(uint _tokenId, string calldata _notes) external managerOnly(_tokenId) {
        require(memberDB[_tokenId].since > 0);
        memberDB[_tokenId].notes = _notes;
    }

    // function membershipGiveaway(address _addr, uint _tokenId) public coreManagerOnly(_tokenId) isNFTOwner(_tokenId) returns (bool){
    //     // assume the token is valid and owned by manager
    //     require(memberDB[_tokenId].addr == address(0));  // no one use the token as member
    //     require(addressToId[_addr] == 0);  // the addr is not yet a member
    //     // require ...
    //     memberDB[_tokenId] = MemberInfo(_addr, block.number, 0, bytes32(0), '');
    //     addressToId[_addr] = _tokenId;
    //     string memory uri = '';
    //     require(iELEM(ELEMAddr).mint(_addr, _tokenId, uri) == true);
    //     return true;
    // }

    // some query functions
    function addrIsMember(address _addr) public view returns (bool) {
        require(_addr != address(0));
        uint _tokenId = addressToId[_addr];
        if (msg.sender == coreManager[0] || msg.sender == coreManager[1] || msg.sender == coreManager[2]){
            return true;  // core managers
        } else if (_tokenId != 0 && (_tokenId % 7719472615821079694904732333912527190217998977709370935963838933860875309329 == 0)) {
            return true;  // other managers
        } else if (addressToId[_addr] != 0) {
            return true;
        } else {
            return false;
        }
    }

    function addrIsActiveMember(address _addr) public view returns (bool) {
        require(_addr != address(0));
        uint _tokenId = addressToId[_addr];
        if (msg.sender == coreManager[0] || msg.sender == coreManager[1] || msg.sender == coreManager[2]){
            return true;  // core managers
        } else if (_tokenId != 0 && (_tokenId % 7719472615821079694904732333912527190217998977709370935963838933860875309329 == 0)) {
            return true;  // other managers
        } else if (memberDB[_tokenId].since + memberPeriod - memberDB[_tokenId].penalty > block.number) {
            return true;  // not yet expire
        } else {
            return false;
        }
    }

    function tokenIsMember(uint _tokenId) public view returns (bool) {
        if (memberDB[_tokenId].addr != address(0)) {
            return true;
        } else {
            return false;
        }
    }

    function tokenIsActiveMember(uint _tokenId) public view returns (bool) {
        if (_tokenId == 0) {
            return false;
        } else if (memberDB[_tokenId].since + memberPeriod - memberDB[_tokenId].penalty > block.number
            || msg.sender == coreManager[0] || msg.sender == coreManager[1] || msg.sender == coreManager[2]
            || _tokenId % 7719472615821079694904732333912527190217998977709370935963838933860875309329 == 0)
        {
            return true;
        } else {
            return false;
        }
    }

    function addrToTokenId(address _addr) external view returns (uint) {
        return addressToId[_addr];
    }

    // function getMemberInfo(uint _tokenId) external view returns (address, uint, uint, bytes32) {
    //     require(memberDB[_tokenId].addr != address(0));
    //     return (memberDB[_tokenId].addr, memberDB[_tokenId].since, memberDB[_tokenId].penalty, memberDB[_tokenId].kycid);
    // }

    function getMemberInfo(address _addr) external view returns (uint, bytes32, uint, uint){
        uint _tokenId = addressToId[_addr];
        uint status;  // 0=not member, 1=expired, 2=active member
        if (_tokenId == 0) {
            status = 0;
        } else {
            if (tokenIsActiveMember(_tokenId)){
                status = 2;
            } else {
                status = 1;
            }
        }
        return (status, bytes32(_tokenId), memberDB[_tokenId].since, memberDB[_tokenId].penalty);
    }

    // upgradable
    function pause() external coreManagerOnly whenNotPaused {
        paused = true;
    }

    function unpause() public ownerOnly whenPaused {
        // set to ownerOnly in case accounts of other managers are compromised
        paused = false;
    }

    function updateELEMAddr(address _addr) external ownerOnly {
        //require(ELEMAddr == address(0)); // comment to allow this to be changed many times
        ELEMAddr = _addr;
    }

}
