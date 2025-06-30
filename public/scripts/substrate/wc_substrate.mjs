import * as wc from '../utils/wc.mjs';
import { polkadot } from '../constants/constants.mjs'
import * as utils from '../utils/utils.mjs';
import { createTransaction } from '../substrate/substrate_utils.mjs';
const network = polkadot.substrateWestendNetwork;
async function connect() {
    const { session, provider } = await wc.initWalletConnect(polkadot.substrateCaip2, network);
    const accounts = wc.getApprovedAccounts({ session, caip10: network });
    console.log("accounts: " + JSON.stringify(accounts));
    if (accounts.length === 0) {
        throw new Error(`No approved accounts found for network "${network} (Westend asset hub)". Please connect an account in your wallet.`);
    }
    return { provider, accounts };
}
async function signMessage() {
    const { accounts, provider } = await connect();
    const params = {
        'message': 'Sign test message.',
        'address': accounts[0]
    };
    await utils.runMethod({
        method: "polkadot_signMessage",
        asyncFunc: async function name() {
            const { signature } = await provider.request({ method: "polkadot_signMessage", params }, network);
            return signature;
        }
    })
}

async function requestAccounts() {
    const { provider } = await connect();
    await utils.runMethod({
        method: "polkadot_requestAccounts",
        asyncFunc: async function name() {
            const accounts = await provider.request({ method: "polkadot_requestAccounts" }, network);
            return accounts;
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
            const accounts = await provider.request({ method: "wallet_addPolkadotChain", params }, network);
            return accounts;
        }
    })
}



async function singAndSendTransaction() {
    const { accounts, provider } = await connect();
    const recipient = prompt("Please enter a valid westend destionation address: ", "5H19GUCBcMwNhKj7PuxSbn5iMch7yBEpXMXDu1ih7xmmgi7b");
    const tx = await utils.runMethod({
        method: "polkadot_signTransaction",
        asyncFunc: async function name() {
            const txId = await createTransaction({
                address: accounts[0], recipient, signTx: async function name(payload) {
                    const signature = await provider.request({ method: "polkadot_signTransaction", params: payload }, network);
                    return signature;
                }
            });
            return txId;
        }
    })
}


const onChain = {
    ping: wc.ping,
    disconnect: wc.disconnect,
    substrate: {
        connect: connect,
        signMessage: signMessage,
        requestAccounts: requestAccounts,
        singAndSendTransaction: singAndSendTransaction,
        addNewChain: addNewChain
    }
};

window.onChainDapp = {
    ...(window.onChainDapp || {}),
    ...onChain
};
