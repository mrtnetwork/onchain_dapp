import { getCardanoWallet } from '../utils/ws.mjs'
import { cardano } from '../constants/constants.mjs'
import * as utils from '../utils/utils.mjs';
import { buildTxWs, buildBatchTx } from './cardano_utils.mjs';
const network = cardano.cardanoWsPreprodNetwork;
async function connect() {
    const api = getCardanoWallet();
    const provider = await api.enable();
    return { provider };
}

async function isEnabled() {
    const api = getCardanoWallet();
    await utils.runMethod({
        method: "cardano_isEnabled",
        asyncFunc: async function name() {
            const result = await api.isEnabled();
            return result;
        }
    })
}

async function getUsedAddresses() {
    const { provider } = await connect();
    await utils.runMethod({
        method: "cardano_getUsedAddresses",
        asyncFunc: async function name() {
            const result = await provider.getUsedAddresses();
            return result;
        }
    })
}
async function getUnusedAddresses() {
    const { provider } = await connect();
    await utils.runMethod({
        method: "cardano_getUnusedAddresses",
        asyncFunc: async function name() {
            const result = await provider.getUnusedAddresses();
            return result;
        }
    })
}
async function getChangeAddress(showAlert = true) {
    const { provider } = await connect();
    return await utils.runMethod({
        method: "cardano_getChangeAddress",
        showAlert: showAlert,
        asyncFunc: async function name() {
            const result = await provider.getChangeAddress();
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
            const result = await provider.getUtxos();
            return result;
        }
    })
}

async function getUtxos() {
    const { provider } = await connect();
    await utils.runMethod({
        method: "cardano_getUtxos",
        asyncFunc: async function name() {
            const result = await provider.getUtxos();
            const json = result.map(e => CardanoWasm.TransactionUnspentOutput.from_hex(e).to_json())
            return json;
        }
    })
}


async function signData() {
    const { provider } = await connect();
    const address = await getChangeAddress(false);
    const payload = 'Sign in test message.';
    // const params = [address, payload];
    await utils.runMethod({
        method: "cardano_signData",
        asyncFunc: async function name() {
            const coseSig1 = await provider.signData(address, payload);
            return coseSig1;
        }
    })
}
async function getCollateral() {
    const { provider } = await connect();
    await utils.runMethod({
        method: "cardano_getCollateral",
        asyncFunc: async function name() {
            const coseSig1 = await provider.getCollateral();
            return coseSig1;
        }
    })
}



async function getBalance() {
    const { provider } = await connect();
    await utils.runMethod({
        method: "cardano_getBalance",
        asyncFunc: async function name() {
            const result = await provider.getBalance();
            const value = CardanoWasm.Value.from_hex(result);
            return value.to_json();
        }
    })
}



async function signTx(showAlert = true) {
    const { provider } = await connect();
    const utxos = await _getUtxos();
    const recipient = prompt("Please enter a valid cardano destionation address: ", "addr_test1qr0f6lze25yqyeet699xte0gm93r5kkwu0pslhmhn06ufq0z7809cpqgr2cnuy4wwjljkn62jne26mqkacdplt3049yszqj5ky");
    const tx = await buildTxWs(utxos, recipient, getScript)
    let witnessSet = await utils.runMethod({
        method: "cardano_signTx",
        showAlert: showAlert,
        asyncFunc: async function name() {
            const result = await provider.signTx(tx.to_hex());
            return result;
        }
    })
    return CardanoWasm.Transaction.new(tx.body(), CardanoWasm.TransactionWitnessSet.from_hex(witnessSet), null);
}

async function signTxs(showAlert = true) {
    const { provider } = await connect();
    const utxos = await _getUtxos();
    const recipient = prompt("Please enter a valid cardano destionation address: ", "addr_test1qr0f6lze25yqyeet699xte0gm93r5kkwu0pslhmhn06ufq0z7809cpqgr2cnuy4wwjljkn62jne26mqkacdplt3049yszqj5ky");
    const recipient2 = prompt("Please enter a valid cardano destionation address for tx 2: ", "addr_test1qqcyg2ax0d7fusxv0mwy75zpc30y4vkvurf8ujlgg8ems7tqspsrrh2rfz0l2uc6a7h4aa83mce454kf3ey8zeexjvyqwp0srf");
    const txes = await buildBatchTx(utxos, recipient, getScript, recipient2 || "addr_test1qqcyg2ax0d7fusxv0mwy75zpc30y4vkvurf8ujlgg8ems7tqspsrrh2rfz0l2uc6a7h4aa83mce454kf3ey8zeexjvyqwp0srf")
    let witnesses = await utils.runMethod({
        method: "cardano_signTx",
        showAlert: showAlert,
        asyncFunc: async function name() {
            const result = await provider.cip103.signTxs([{ cbor: txes[0].to_hex() }, { cbor: txes[1].to_hex() }]);
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
        method: "cardano_submitTx",
        asyncFunc: async function name() {
            const result = await provider.cip103.submitTxs(txes.map(e => e.to_hex()));
            console.log("result: " + result)
            return result;
        }
    })
}

async function signAndSubmitTx() {
    const { provider } = await connect();
    const tx = await signTx(false);
    await utils.runMethod({
        method: "cardano_submitTx",
        asyncFunc: async function name() {
            const result = await provider.submitTx(tx.to_hex());
            console.log("result: " + result)
            return result;
        }
    })
}


async function submitUnsignedTx(showAlert = true) {
    const { provider } = await connect();
    const utxos = await _getUtxos();
    const recipient = prompt("Please enter a valid cardano destionation address: ", "addr_test1qr0f6lze25yqyeet699xte0gm93r5kkwu0pslhmhn06ufq0z7809cpqgr2cnuy4wwjljkn62jne26mqkacdplt3049yszqj5ky");
    const tx = await buildTxWs(utxos, recipient, getScript)
    await utils.runMethod({
        method: "cardano_submitUnsignedTx",
        showAlert: showAlert,
        asyncFunc: async function name() {
            const result = await provider.cip106.submitUnsignedTx(tx.to_hex());
            return result;
        }
    })
}


async function getRewardAddresses() {
    const { provider } = await connect();
    await utils.runMethod({
        method: "cardano_getRewardAddresses",
        asyncFunc: async function name() {
            const result = await provider.getRewardAddresses();
            return result;
        }
    })
}
async function getAccoutPubKey() {
    const { provider } = await connect();
    await utils.runMethod({
        method: "cardano_getAccoutPubKey",
        asyncFunc: async function name() {
            const result = await provider.cip104.getAccountPub();
            return result;
        }
    })
}



async function getScriptRequirements() {
    const { provider } = await connect();
    await utils.runMethod({
        method: "cardano_getScriptRequirements",
        asyncFunc: async function name() {
            const result = await provider.cip106.getScriptRequirements();
            return result;
        }
    })
}
async function getScript(address) {
    const { provider } = await connect();
    return await utils.runMethod({
        method: "cardano_getScript",
        showAlert: address === undefined || address == null,
        asyncFunc: async function name() {
            const result = await provider.cip106.getScript(address == null ? null : { address });
            return result;
        }
    })
}

async function getExtensions(showAlert = true) {
    const { provider } = await connect();
    await utils.runMethod({
        method: "cardano_getExtensions",
        asyncFunc: async function name() {
            const result = await provider.getExtensions();
            return result;
        }
    })
}


const onChain = {
    cardano: {
        connect: connect,
        isEnabled: isEnabled,
        getUsedAddresses: getUsedAddresses,
        getUnusedAddresses: getUnusedAddresses,
        getChangeAddress: getChangeAddress,
        signData: signData,
        getBalance: getBalance,
        getUtxos: getUtxos,
        getCollateral: getCollateral,
        getRewardAddresses: getRewardAddresses,
        signTx: signTx,
        getAccoutPubKey: getAccoutPubKey,
        getScriptRequirements: getScriptRequirements,
        getScript: getScript,
        signAndSubmitTx: signAndSubmitTx,
        submitUnsignedTx: submitUnsignedTx,
        signTxs: signTxs,
        signAndSubmitTxes: signAndSubmitTxes,
        getExtensions: getExtensions

    }
};

window.onChainDapp = {
    ...(window.onChainDapp || {}),
    ...onChain
};
