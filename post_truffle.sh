#!/bin/sh

cp build/contracts/Erebor.json build/contracts/Elemmire.json build/contracts/MemberShip.json dapps/Erebor/ABI/ && \
    cd dapps/Erebor/ABI && \
    jq -r '.abi' Elemmire.json > Elemmire.abi && \
    jq -r '.abi' Erebor.json > Erebor.abi && \
    jq -r '.abi' MemberShip.json > MemberShip.abi 

echo "#"
echo "# done copy abi and artifacts, next is to put the dapp folder to correct place"
echo "#"
echo "# note: remember to check "setMinig" in Elemmire, sometimes it fails during deployment"

