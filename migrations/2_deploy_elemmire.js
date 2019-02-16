var addressUtils = artifacts.require("AddressUtils");
var supportsInterface = artifacts.require("SupportsInterface");
var safeMath = artifacts.require("SafeMath");

var nfToken = artifacts.require("NFToken");
var nfTokenEnumerable = artifacts.require("NFTokenEnumerable");
var nfTokenMetadata = artifacts.require("NFTokenMetadata");
var ELEM = artifacts.require("Elemmire");

var Erebor = artifacts.require("Erebor");
var ERC20 = artifacts.require("ERC20");
var StandardToken = artifacts.require("StandardToken");
var RNT = artifacts.require("RNT");
var SafeMath = artifacts.require("SafeMath");
var MemberShip = artifacts.require("MemberShip");

module.exports = function(deployer) {
    deployer.deploy(addressUtils);
    deployer.deploy(supportsInterface);
    deployer.deploy(safeMath);

    deployer.link(addressUtils, nfToken);
    deployer.link(supportsInterface, nfToken);
    deployer.link(safeMath, nfToken);
    deployer.deploy(nfToken);

    deployer.link(nfToken, [nfTokenEnumerable, nfTokenMetadata]);
    deployer.deploy(nfTokenEnumerable);
    deployer.deploy(nfTokenMetadata);

    deployer.link(addressUtils, ELEM);
    deployer.link(nfTokenEnumerable, ELEM);
    deployer.link(nfTokenMetadata, ELEM);

    deployer.deploy(SafeMath);
    deployer.link(SafeMath, [StandardToken, RNT, Erebor]);
    deployer.deploy(StandardToken);
    deployer.link(StandardToken, RNT);

    deployer.deploy(ELEM).then( (dELEM) => {
        let ELEMAddr = ELEM.address;
        deployer.deploy(MemberShip, ELEM.address).then( () => {
            return dELEM.setMemberCtrAddr(MemberShip.address).then( () => {
                return deployer.deploy(RNT).then((iRNT) => {
                    let RNTAddr = RNT.address;
                    return deployer.deploy(
                        Erebor,
                        '0xa82e7cfb30f103af78a1ad41f28bdb986073ff45b80db71f6f632271add7a32e',
                        RNTAddr,
                        ELEMAddr,
                        MemberShip.address,
                        {value: '10000000000000000'}).then(() => {
                            let EreborAddr = Erebor.address;
                            dELEM.setMining(EreborAddr, 0, (err,r) => {
                                if (err) { console.trace(err); throw "bad2" };
                                console.log(`setMining for EreborAddr`)
                            })
                            return iRNT.setMining(EreborAddr).then(() => {
                                return {RNTAddr, EreborAddr}
                            })
                        })
                }).then((result) => {
                    console.dir(result);
                }).catch((err) => { console.trace(err); });
            })
        })
    });

    // Todo: the EreborTrade
    // deployer.link(ELEM, EreborTrade);
    // deployer.deploy(EreborTrade).then( ()=> {
    //     let tradeAddr = EreborTrade.address;
    //     let ELEMAddr = ELEM.address
    //     EreborTrade.at(tradeAddr).setELEMAddr(ELEMAddr).then(() => {
    //         return {tradeAddr, ELEMAddr};
    //     });
    // });
};
