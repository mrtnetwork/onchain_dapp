import { getWallet } from '../utils/ws.mjs'
import { polkadot } from '../constants/constants.mjs'
import { createTransaction } from '../substrate/substrate_utils.mjs';
import * as utils from '../utils/utils.mjs';
const network = polkadot.substrateWsWestendNetwork;
async function connect() {
    const provider = await getWallet();
    console.log("provider");
    let { accounts } = await provider.features["polkadot:connect"].connect(network);
    accounts = accounts.filter(account => account.chains.includes(network));
    if (accounts.length === 0) {
        throw new Error(`No approved accounts found for network "${network} (Westend testnet)". Please connect an account in your wallet.`);
    }
    return { provider, accounts };
}

async function signMessage() {
    const { accounts, provider } = await connect();
    const message = prompt("Please enter a message you want to sign: ", "is a test message.");
    const params = {
        'message': message || 'is a test message.',
        'address': accounts[0]
    };
    await utils.runMethod({
        method: "polkadot_signMessage",
        asyncFunc: async function name() {
            const { signature } = await provider.features["polkadot:signMessage"].signMessage(params);
            return Buffer.from(signature).toString("hex");
        }
    })
}

async function requestAccounts() {
    const { provider } = await connect();
    await utils.runMethod({
        method: "polkadot_requestAccounts",
        asyncFunc: async function name() {
            const { accounts } = await provider.features["polkadot:connect"].connect();
            return accounts.map(e => e.address);
        }
    })
}


async function singAndSendTransaction() {
    const { accounts, provider } = await connect();
    const recipient = prompt("Please enter a valid westend destionation address: ", "5H19GUCBcMwNhKj7PuxSbn5iMch7yBEpXMXDu1ih7xmmgi7b");
    await utils.runMethod({
        method: "polkadot_signTransaction",
        asyncFunc: async function name() {
            const txId = await createTransaction({
                address: accounts[0].address, recipient, signTx: async function name(params) {
                    const signature = await provider.features["polkadot:signTransaction"].signTransaction(params);
                    return signature;
                }
            });
            return txId;
        }
    })
}
async function addNewChain() {
    const { provider } = await connect();
    const params = {
        chain: "Chainflip-Perseverance",
        genesisHash: "0x7a5d4db858ada1d20ed6ded4933c33313fc9673e5fffab560d0ca714782f2080",
        ss58Format: "2112",
        chainType: "substrate",
        specVersion: 10906,
        tokenDecimals: 18,
        tokenSymbol: "FLIP",
        rpcUrl: "wss://archive.perseverance.chainflip.io"
    };
    await utils.runMethod({
        method: "wallet_addPolkadotChain",
        asyncFunc: async function name() {
            const accounts = await provider.features["polkadot:addNewChain"].addNewChain(params);
            return accounts;
        }
    })
}
async function disconnect() {
    const { provider } = await connect();
    await utils.runMethod({
        method: "disconnect",
        asyncFunc: async function name() {
            const disconnect = await provider.features["polkadot:disconnect"].disconnect();
            return disconnect;
        }
    })
}

async function listenOnNetworkChanges() {
    const { provider } = await connect();
    await provider.features["polkadot:events"].on("change", function name({ accounts, chains }) {
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




const onChain = {
    substrate: {
        connect: connect,
        signMessage: signMessage,
        requestAccounts: requestAccounts,
        singAndSendTransaction: singAndSendTransaction,
        addNewChain: addNewChain,
        disconnect: disconnect,
        listenOnNetworkChanges: listenOnNetworkChanges,
        listenOnWalletChanges: listenOnWalletChanges
    }
};

window.onChainDapp = {
    ...(window.onChainDapp || {}),
    ...onChain
};
