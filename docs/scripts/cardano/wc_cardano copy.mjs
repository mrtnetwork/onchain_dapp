import * as wc from '../utils/wc.mjs';
import { cardano } from '../constants/constants.mjs'
import * as utils from '../utils/utils.mjs';
import { buildTxWs } from '../cardano/cardano_utils.mjs';
const network = cardano.cardanoWsPreprodNetwork
async function connect() {
    const { session, provider } = await wc.initWalletConnect(cardano.cardanoCaip2, network);
    const accounts = wc.getApprovedAccounts({ session, caip10: network });
    if (accounts.length === 0) {
        throw new Error(`No approved accounts found for network "${network} (Cardano preprod provider testnet)". Please connect an account in your wallet.`);
    }
    return { provider, accounts };
}

async function requestAccounts() {
    const { provider } = await connect();
    await utils.runMethod({
        method: "cardano_requestAccounts",
        asyncFunc: async function name() {
            const accounts = await provider.request({ method: "cardano_requestAccounts" }, network);
            return accounts;
        }
    })
}

async function isEnabled() {
    const { provider } = await connect();
    await utils.runMethod({
        method: "cardano_isEnabled",
        asyncFunc: async function name() {
            const result = await provider.request({ method: "cardano_isEnabled" }, network);
            return result;
        }
    })
}

async function getUsedAddresses() {
    const { provider } = await connect();
    await utils.runMethod({
        method: "cardano_getUsedAddresses",
        asyncFunc: async function name() {
            const result = await provider.request({ method: "cardano_getUsedAddresses" }, network);
            return result;
        }
    })
}
async function getUnusedAddresses() {
    const { provider } = await connect();
    await utils.runMethod({
        method: "cardano_getUnusedAddresses",
        asyncFunc: async function name() {
            const result = await provider.request({ method: "cardano_getUnusedAddresses" }, network);
            return result;
        }
    })
}
async function getChangeAddress() {
    const { provider } = await connect();
    await utils.runMethod({
        method: "cardano_getChangeAddress",
        asyncFunc: async function name() {
            const result = await provider.request({ method: "cardano_getChangeAddress" }, network);
            return result;
        }
    })
}

async function _getUtxos() {
    const { provider } = await connect();
    return await utils.runMethod({
        method: "cardano_getUtxos",
        showAlert: false,
        asyncFunc: async function name() {
            const result = await provider.request({ method: "cardano_getUtxos" }, network);
            // const result = await provider.features["cardano:getUtxos"].getUtxos(undefined, undefined);
            return result;
        }
    })
}

async function getUtxos() {
    const { provider } = await connect();
    await utils.runMethod({
        method: "cardano_getUtxos",
        asyncFunc: async function name() {
            const result = await provider.request({ method: "cardano_getUtxos" }, network);
            const json = result.map(e => CardanoWasm.TransactionUnspentOutput.from_hex(e).to_json())
            return json;
        }
    })
}

async function signMessage() {
    const { accounts, provider } = await connect();
    const params = {
        'message': 'Sign in test message.',
        'address': accounts[0]
    };
    await utils.runMethod({
        method: "cardano_signMessage",
        asyncFunc: async function name() {
            const { signature } = await provider.request({ method: "cardano_signMessage", params }, network);
            return Buffer.from(signature).toString('hex');
        }
    })
}
async function signData() {
    const { accounts, provider } = await connect();
    const payload = 'Sign in test message.';
    const params = [accounts[0], payload];
    await utils.runMethod({
        method: "cardano_signData",
        asyncFunc: async function name() {
            const coseSig1 = await provider.request({ method: "cardano_signData", params }, network);
            return coseSig1;
        }
    })
}
async function getCollateral() {
    const { provider } = await connect();
    await utils.runMethod({
        method: "cardano_getCollateral",
        asyncFunc: async function name() {
            const coseSig1 = await provider.request({ method: "cardano_getCollateral" }, network);
            return coseSig1;
        }
    })
}



async function getBalance() {
    const { provider } = await connect();
    await utils.runMethod({
        method: "cardano_getBalance",
        asyncFunc: async function name() {
            const result = await provider.request({ method: "cardano_getBalance" }, network);
            const value = CardanoWasm.Value.from_hex(result);
            return value.to_json();
        }
    })
}



async function signTx(showAlert = true) {
    const { accounts, provider } = await connect();
    const utxos = await _getUtxos();
    const recipient = prompt("Please enter a valid cardano destionation address: ", "addr_test1qrl3z4wuw8smpcr88mxdtm6jsj4jw0ue97xg4e8lxdp32gmqspsrrh2rfz0l2uc6a7h4aa83mce454kf3ey8zeexjvyqzfqh33");
    const tx = await buildTxWs(utxos, recipient)
    let witnessSet = await utils.runMethod({
        method: "cardano_signTx",
        showAlert,
        asyncFunc: async function name() {
            const result = await provider.request({ method: "cardano_signTx", params: [tx.to_hex()] }, network);
            return result;
        }
    })
    return CardanoWasm.Transaction.new(tx.body(), CardanoWasm.TransactionWitnessSet.from_hex(witnessSet), null);
}

async function signAndSendTx() {
    const { accounts, provider } = await connect();
    const utxos = await _getUtxos();
    const recipient = prompt("Please enter a valid cardano destionation address: ", "addr_test1qr0f6lze25yqyeet699xte0gm93r5kkwu0pslhmhn06ufq0z7809cpqgr2cnuy4wwjljkn62jne26mqkacdplt3049yszqj5ky");
    const tx = await buildTxWs(utxos, recipient)
    await utils.runMethod({
        method: "cardano_signAndSendTransaction",
        asyncFunc: async function name() {
            const result = await provider.request({ method: "cardano_signAndSendTransaction", params: [tx.to_hex()] }, network);
            return result;
        }
    })
}


async function getRewardAddresses() {
    const { provider } = await connect();
    await utils.runMethod({
        method: "cardano_getRewardAddresses",
        asyncFunc: async function name() {
            const result = await provider.request({ method: "cardano_getRewardAddresses" }, network);
            return result;
        }
    })
}

async function signAndSubmitTransaction() {
    const { provider } = await connect();
    const tx = await signTx(false);
    await utils.runMethod({
        method: "cardano_submitTx",
        asyncFunc: async function name() {
            const result = await provider.request({ method: "cardano_submitTx", params: [tx.to_hex()] }, network);
            return result;
        }
    })
}



const onChain = {
    ping: wc.ping,
    disconnect: wc.disconnect,
    cardano: {
        connect: connect,
        connect: connect,
        isEnabled: isEnabled,
        requestAccount: requestAccounts,
        getUsedAddresses: getUsedAddresses,
        getUnusedAddresses: getUnusedAddresses,
        getChangeAddress: getChangeAddress,
        signMessage: signMessage,
        signData: signData,
        getBalance: getBalance,
        getUtxos: getUtxos,
        getCollateral: getCollateral,
        getRewardAddresses: getRewardAddresses,
        signTx: signTx,
        signAndSendTx: signAndSendTx,
        signAndSubmitTransaction: signAndSubmitTransaction
    }
};
window.onChainDapp = {
    ...(window.onChainDapp || {}),
    ...onChain
};
