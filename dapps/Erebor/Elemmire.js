'use strict';

// const fs   = require('fs');
// const path = require('path');
// const ethUtils = require('ethereumjs-utils');
// const mkdirp = require('mkdirp');
const biapi = require('bladeiron_api');

// 11BE BladeIron Client API
const BladeIronClient = require('bladeiron_api');

class Elemmire extends BladeIronClient {
    constructor(rpcport, rpchost, options)
    {
        super(rpcport, rpchost, options);
        this.ctrName = 'Elemmire';

        this.totalSupply = () => {
	    return this.call(this.ctrName)('totalSupply')();
        };

        this.tokenByIndex = (idx) => {
            return this.call(this.ctrName)('tokenByIndex')(idx);
        };

        this.tokenOfOwnerByIndex = (addr, idx) => {
            return this.call(this.ctrName)('tokenOfOwnerByIndex')(addr, idx);
        };

        this.balanceOf = (addr) => {
            return this.call(this.ctrName)('balanceOf')(addr);
        };

        this.ownerOf = (tokenId) => {
            return this.call(this.ctrName)('ownerOf')(tokenId);
        };

        this.tokenURI= (tokenId) => {
            return this.call(this.ctrName)('tokenURI')(tokenId);
        };

        this.myTokens = () => {
            return this.call(this.ctrName)('balanceOf')(this.userWallet).then( (balance) => {
                let p = [...Array(parseInt(balance))].map((item, index) => {
                    return this.call(this.ctrName)('tokenOfOwnerByIndex')(this.userWallet, index)
                });
                return Promise.all(p);
            })
        };
    }
}

module.exports = Elemmire;
