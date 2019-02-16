var addressUtils = artifacts.require("AddressUtils");
var supportsInterface = artifacts.require("SupportsInterface");
var safeMath = artifacts.require("SafeMath");

var nfToken = artifacts.require("NFToken");
var nfTokenEnumerable = artifacts.require("NFTokenEnumerable");
var nfTokenMetadata = artifacts.require("NFTokenMetadata");
var ELEM = artifacts.require("Elemmire");
// var EreborTrade = artifacts.require("EreborTrade");

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
    deployer.deploy(ELEM);

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
