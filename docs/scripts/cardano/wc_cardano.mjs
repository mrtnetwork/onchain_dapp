import * as wc from '../utils/wc.mjs';
import { cardano } from '../constants/constants.mjs'
import * as utils from '../utils/utils.mjs';
import { buildTxWs, buildBatchTx } from '../cardano/cardano_utils.mjs';
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


async function getAddressUtxos(address) {
    const { accounts, provider } = await connect();
    const params = { account: address || accounts[0] };
    return await utils.runMethod({
        method: "cardano_getAddressUtxos",
        showAlert: address === undefined || address == null,
        asyncFunc: async function name() {
            const result = await provider.request({ method: "cardano_getAddressUtxos", params }, network);
            if (address != null) return result
            const json = result.map(e => CardanoWasm.TransactionUnspentOutput.from_hex(e).to_json())
            return json;
        }
    })
}

async function getScript(address) {
    const { provider } = await connect();
    const params = address == null ? null : { address };
    return await utils.runMethod({
        method: "cardano_getScript",
        showAlert: address === undefined || address == null,
        asyncFunc: async function name() {
            const result = await provider.request({ method: "cardano_getScript", params }, network);
            return result;
        }
    })
}

async function getScriptRequirements(address) {
    const { provider } = await connect();
    const params = address == null ? null : { address };
    return await utils.runMethod({
        method: "cardano_getScriptRequirements",
        showAlert: address === undefined || address == null,
        asyncFunc: async function name() {
            const result = await provider.request({ method: "cardano_getScriptRequirements", params }, network);
            return result;
        }
    })
}

async function signAndSendTx() {
    const { accounts, provider } = await connect();
    console.log("accounts: " + accounts);
    const paymentAddresses = accounts.filter(e => CardanoWasm.Address.from_bech32(e).kind() != CardanoWasm.AddressKind.Reward);
    console.log("addresses" + paymentAddresses)
    let utxos = [];
    for (let i = 0; i < paymentAddresses.length; i++) {
        const addressUtxo = await getAddressUtxos(accounts[i]);
        utxos.push(...addressUtxo);
    }
    const recipient = prompt("Please enter a valid cardano destionation address: ", "addr_test1qr0f6lze25yqyeet699xte0gm93r5kkwu0pslhmhn06ufq0z7809cpqgr2cnuy4wwjljkn62jne26mqkacdplt3049yszqj5ky");
    const tx = await buildTxWs(utxos, recipient, getScript);
    const params = {
        transaction: tx.to_hex(),
        accounts
    };
    await utils.runMethod({
        method: "cardano_signAndSendTransaction",
        asyncFunc: async function name() {
            const result = await provider.request({ method: "cardano_signAndSendTransaction", params: [params] }, network);
            return result;
        }
    })
}


async function signTransaction() {
    const { accounts, provider } = await connect();
    const paymentAddresses = accounts.filter(e => CardanoWasm.Address.from_bech32(e).kind() != CardanoWasm.AddressKind.Reward);
    let utxos = [];
    for (let i = 0; i < paymentAddresses.length; i++) {
        const addressUtxo = await getAddressUtxos(accounts[i]);
        utxos.push(...addressUtxo);
    }
    const recipient = prompt("Please enter a valid cardano destionation address: ", "addr_test1qr0f6lze25yqyeet699xte0gm93r5kkwu0pslhmhn06ufq0z7809cpqgr2cnuy4wwjljkn62jne26mqkacdplt3049yszqj5ky");
    const tx = await buildTxWs(utxos, recipient, getScript)
    const params = {
        transaction: tx.to_hex(),
        accounts
    };
    await utils.runMethod({
        method: "cardano_signTransaction",
        asyncFunc: async function name() {
            const result = await provider.request({ method: "cardano_signTransaction", params }, network);
            return result;
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
            return signature
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
            const utxos = await provider.request({ method: "cardano_getCollateral" }, network);
            return utxos;
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



async function signTx() {
    const { accounts, provider } = await connect();
    const utxos = await _getUtxos();
    const recipient = prompt("Please enter a valid cardano destionation address: ", "addr_test1qr0f6lze25yqyeet699xte0gm93r5kkwu0pslhmhn06ufq0z7809cpqgr2cnuy4wwjljkn62jne26mqkacdplt3049yszqj5ky");
    const tx = await buildTxWs(utxos, recipient, getScript)
    await utils.runMethod({
        method: "cardano_signTx",
        asyncFunc: async function name() {
            const result = await provider.request({ method: "cardano_signTx", params: [tx.to_hex()] }, network);
            return result;
        }
    })
}

async function submitUnsignedTx() {
    const { accounts, provider } = await connect();
    const utxos = await _getUtxos();
    const recipient = prompt("Please enter a valid cardano destionation address: ", "addr_test1qr0f6lze25yqyeet699xte0gm93r5kkwu0pslhmhn06ufq0z7809cpqgr2cnuy4wwjljkn62jne26mqkacdplt3049yszqj5ky");
    const tx = await buildTxWs(utxos, recipient, getScript)
    await utils.runMethod({
        method: "cardano_submitUnsignedTx",
        asyncFunc: async function name() {
            const result = await provider.request({ method: "cardano_submitUnsignedTx", params: [tx.to_hex()] }, network);
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




async function getAccoutPubKey() {
    const { accounts, provider } = await connect();
    await utils.runMethod({
        method: "cardano_getAccountPub",
        asyncFunc: async function name() {
            const result = await provider.request({ method: "cardano_getAccountPub", params: [] }, network);
            return result;
        }
    })
}


async function signTxs(showAlert = true) {
    const { provider } = await connect();
    const utxos = await _getUtxos();
    console.log("utxos: " + utxos.length)
    const recipient = prompt("Please enter a valid cardano destionation address: ", "addr_test1qr0f6lze25yqyeet699xte0gm93r5kkwu0pslhmhn06ufq0z7809cpqgr2cnuy4wwjljkn62jne26mqkacdplt3049yszqj5ky");
    const recipient2 = prompt("Please enter a valid cardano destionation address for tx 2: ", "addr_test1qqcyg2ax0d7fusxv0mwy75zpc30y4vkvurf8ujlgg8ems7tqspsrrh2rfz0l2uc6a7h4aa83mce454kf3ey8zeexjvyqwp0srf");
    const txes = await buildBatchTx(utxos, recipient, getScript, recipient2 || "addr_test1qqcyg2ax0d7fusxv0mwy75zpc30y4vkvurf8ujlgg8ems7tqspsrrh2rfz0l2uc6a7h4aa83mce454kf3ey8zeexjvyqwp0srf")
    let witnesses = await utils.runMethod({
        method: "cardano_signTxs",
        showAlert: showAlert,
        asyncFunc: async function name() {
            const result = await provider.request({ method: "cardano_signTxs", params: [{ cbor: txes[0].to_hex() }, { cbor: txes[1].to_hex() }] }, network);
            return result;
        }
    })
    return witnesses.map((e, n) =>
        CardanoWasm.Transaction.new(
            txes[n].body(),
            CardanoWasm.TransactionWitnessSet.from_hex(e),
            null
        )
    );

}

async function signAndSubmitTxes(showAlert = true) {
    const { provider } = await connect();
    const txes = await signTxs(false);
    await utils.runMethod({
        method: "cardano_submitTxs",
        asyncFunc: async function name() {
            const result = await provider.request({ method: "cardano_submitTxs", params: txes.map(e => e.to_hex()) }, network);
            return result;
        }
    })
}



const onChain = {
    ping: wc.ping,
    disconnect: wc.disconnect,
    cardano: {
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
        signTransaction: signTransaction,
        getAddressUtxos: getAddressUtxos,
        getScript: getScript,
        submitUnsignedTx: submitUnsignedTx,
        getScriptRequirements: getScriptRequirements,
        getAccoutPubKey: getAccoutPubKey,
        signAndSubmitTxes: signAndSubmitTxes,
        signTxs: signTxs,
    }
};
window.onChainDapp = {
    ...(window.onChainDapp || {}),
    ...onChain
};
