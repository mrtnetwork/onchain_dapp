import { createCompleter } from '../utils/utils.mjs';
let _walletStandard;
let _eip6963Wallet;


async function getWallet() {
    if (_walletStandard) return _walletStandard;
    const completer = createCompleter();
    window.addEventListener("wallet-standard:register-wallet", function s(e) {
        e.detail({
            register: function _(params) {
                if (params !== undefined && params?.name !== undefined && params.name == 'OnChain') {
                    completer.resolve(params)
                }
            }
        })
    });
    const event = new CustomEvent('wallet-standard:app-ready', {
        detail: {}
    });
    window.dispatchEvent(event);
    _walletStandard = await completer.promise;
    return _walletStandard;

}


function getTipWallet() {
    if (window.tron !== undefined && window.tron?.isOnChain !== undefined && window.tron?.isOnChain) {
        return window.tron;
    }
    throw Error("OnChain injected wallet not found.")
}
function getEIPWallet() {
    if (window.ethereum !== undefined && window.ethereum?.isOnChain !== undefined && window.ethereum?.isOnChain) {
        return window.ethereum;
    }
    throw Error("OnChain injected wallet not found.")
}



async function getEIP6963Wallet() {
    if (_eip6963Wallet) return _eip6963Wallet;
    const completer = createCompleter();
    window.addEventListener("eip6963:announceProvider", function s(e) {
        if (e.detail !== undefined && e.detail?.provider !== undefined && e.detail.provider) {
            completer.resolve(e.detail.provider)
        }
    });
    const event = new CustomEvent('eip6963:requestProvider', {
        detail: {
        }
    });
    window.dispatchEvent(event);
    _eip6963Wallet = await completer.promise;
    
    return _eip6963Wallet;

}


export { getWallet, getTipWallet, getEIPWallet, getEIP6963Wallet };