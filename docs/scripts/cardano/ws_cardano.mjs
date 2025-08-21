import { getWallet } from '../utils/ws.mjs'
import { cardano } from '../constants/constants.mjs'
import * as utils from '../utils/utils.mjs';
import { buildTxWs, buildBatchTx } from '../cardano/cardano_utils.mjs';
const network = cardano.cardanoWsPreprodNetwork;
async function connect() {
    const provider = await getWallet();
    let { accounts } = await provider.features["cardano:connect"].connect(network);
    accounts = accounts.filter(account => account.chains.includes(network));
    if (accounts.length === 0) {
        throw new Error(`No approved accounts found for network "${network} (Cardano Preprod)". Please connect an account in your wallet.`);
    }
    return { provider, accounts };
}

async function requestAccounts() {
    const { provider } = await connect();
    await utils.runMethod({
        method: "cardano_requestAccounts",
        asyncFunc: async function name() {
            const { accounts } = await provider.features["cardano:connect"].connect();
            return accounts.map(e => e.address);
        }
    })
}


async function getAddressUtxos(address) {
    const { accounts, provider } = await connect();
    return await utils.runMethod({
        method: "cardano_getAddressUtxos",
        showAlert: address === undefined || address == null,
        asyncFunc: async function name() {
            const result = await provider.features["cardano:getAddressUtxos"].getAddressUtxos({ account: address || accounts[0] });
            if (address != null) return result
            const json = result.map(e => CardanoWasm.TransactionUnspentOutput.from_hex(e).to_json())
            return json;
        }
    })
}

async function getScript(address) {
    const { provider } = await connect();
    return await utils.runMethod({
        method: "cardano_getScript",
        showAlert: address === undefined || address == null,
        asyncFunc: async function name() {
            const result = await provider.features["cardano:getScript"].getScript(address == null ? null : { address });
            return result;
        }
    })
}

async function getScriptRequirements(address) {
    const { provider } = await connect();
    return await utils.runMethod({
        method: "cardano_getScript",
        showAlert: address === undefined || address == null,
        asyncFunc: async function name() {
            const result = await provider.features["cardano:getScriptRequirements"].getScriptRequirements(address == null ? null : { address });
            return result;
        }
    })
}

async function signAndSendTx() {
    const { accounts, provider } = await connect();
    const paymentAddresses = accounts.filter(e => CardanoWasm.Address.from_bech32(e.address).kind() != CardanoWasm.AddressKind.Reward);
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
        method: "cardano_signAndSendTransaction",
        asyncFunc: async function name() {
            const result = await provider.features["cardano:signAndSendTransaction"].signAndSendTransaction(params);
            return result;
        }
    })
}


async function signTransaction() {
    const { accounts, provider } = await connect();
    const paymentAddresses = accounts.filter(e => CardanoWasm.Address.from_bech32(e.address).kind() != CardanoWasm.AddressKind.Reward);
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
            const result = await provider.features["cardano:signTransaction"].signTransaction(params);
            return result;
        }
    })
}





async function isEnabled() {
    const { provider } = await connect();
    await utils.runMethod({
        method: "cardano_isEnabled",
        asyncFunc: async function name() {
            const result = await provider.features["cardano:isEnabled"].isEnabled();
            console.log("result: ")
            return result;
        }
    })
}

async function getUsedAddresses() {
    const { provider } = await connect();
    await utils.runMethod({
        method: "cardano_getUsedAddresses",
        asyncFunc: async function name() {
            const result = await provider.features["cardano:getUsedAddresses"].getUsedAddresses();
            return result;
        }
    })
}
async function getUnusedAddresses() {
    const { provider } = await connect();
    await utils.runMethod({
        method: "cardano_getUnusedAddresses",
        asyncFunc: async function name() {
            const result = await provider.features["cardano:getUnusedAddresses"].getUnusedAddresses();
            return result;
        }
    })
}
async function getChangeAddress() {
    const { provider } = await connect();
    await utils.runMethod({
        method: "cardano_getChangeAddress",
        asyncFunc: async function name() {
            const result = await provider.features["cardano:getChangeAddress"].getChangeAddress();
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
            const result = await provider.features["cardano:getUtxos"].getUtxos(undefined, undefined);
            return result;
        }
    })
}

async function getUtxos() {
    const { provider } = await connect();
    await utils.runMethod({
        method: "cardano_getUtxos",
        asyncFunc: async function name() {
            const result = await provider.features["cardano:getUtxos"].getUtxos(undefined, undefined);
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
        method: "wallet_addCosmosChain",
        asyncFunc: async function name() {
            const { signature } = await provider.features["cardano:signMessage"].signMessage(params);
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
            const coseSig1 = await provider.features["cardano:signData"].signData(accounts[0], payload);
            return coseSig1;
        }
    })
}
async function getCollateral() {
    const { provider } = await connect();
    await utils.runMethod({
        method: "cardano_getCollateral",
        asyncFunc: async function name() {
            const coseSig1 = await provider.features["cardano:getCollateral"].getCollateral();
            return coseSig1;
        }
    })
}



async function getBalance() {
    const { provider } = await connect();
    await utils.runMethod({
        method: "cardano_getBalance",
        asyncFunc: async function name() {
            const result = await provider.features["cardano:getBalance"].getBalance();
            const value = CardanoWasm.Value.from_hex(result);
            return value.to_json();
        }
    })
}



async function signTx() {
    const { accounts, provider } = await connect();
    const utxos = await _getUtxos();
    const recipient = prompt("Please enter a valid cardano destionation address: ", "addr_test1qr0f6lze25yqyeet699xte0gm93r5kkwu0pslhmhn06ufq0z7809cpqgr2cnuy4wwjljkn62jne26mqkacdplt3049yszqj5ky");
    const tx = await buildTxWs(utxos, recipient)
    await utils.runMethod({
        method: "cardano_signTx",
        asyncFunc: async function name() {
            const result = await provider.features["cardano:signTx"].signTx(tx.to_hex());
            console.log("result: " + result)
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
        method: "cardano_signTx",
        asyncFunc: async function name() {
            const result = await provider.features["cardano:submitUnsignedTx"].submitUnsignedTx(tx.to_hex());
            console.log("result: " + result)
            return result;
        }
    })
}

async function getRewardAddresses() {
    const { provider } = await connect();
    await utils.runMethod({
        method: "cardano_getRewardAddresses",
        asyncFunc: async function name() {
            const result = await provider.features["cardano:getRewardAddresses"].getRewardAddresses();
            return result;
        }
    })
}


async function disconnect() {
    const { provider } = await connect();
    await utils.runMethod({
        method: "disconnect",
        asyncFunc: async function name() {
            const disconnect = await provider.features["cardano:disconnect"].disconnect();
            return disconnect;
        }
    })
}

async function listenOnNetworkChanges() {
    const { provider } = await connect();
    await provider.features["cardano:events"].on("change", function name({ accounts, chains }) {
        if (accounts) {
            console.log("wallet accounts changed: " + JSON.stringify(accounts.map(e => e.address)))
        }
        if (chains) {
            console.log("wallet chains changed: " + JSON.stringify(chains))
        }

    });
}
async function listenOnWalletChanges() {
    const { provider } = await connect();
    await provider.features["standard:events"].on("change", function name({ change }) {
        if (change.accounts) {
            console.log("wallet accounts changed: " + JSON.stringify(change.accounts.map(e => e.address)))
        }
        if (change.chains) {
            console.log("wallet chains changed: " + JSON.stringify(change.chains))
        }

    });
}

async function getAccoutPubKey() {
    const { accounts, provider } = await connect();
    await utils.runMethod({
        method: "cardano_getAccoutPubKey",
        asyncFunc: async function name() {
            const result = await provider.features["cardano:getAccountPub"].getAccountPub(accounts.find(e => e.publicKey != null));
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
        method: "cardano_signTx",
        showAlert: showAlert,
        asyncFunc: async function name() {
            const result = await provider.features["cardano:signTxs"].signTxs([{ cbor: txes[0].to_hex() }, { cbor: txes[1].to_hex() }]);
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
            const result = await provider.features["cardano:submitTxs"].submitTxs(txes.map(e => e.to_hex()));
            return result;
        }
    })
}



const onChain = {
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
        disconnect: disconnect,
        listenOnNetworkChanges: listenOnNetworkChanges,
        listenOnWalletChanges: listenOnWalletChanges,

    }
};

window.onChainDapp = {
    ...(window.onChainDapp || {}),
    ...onChain
};
