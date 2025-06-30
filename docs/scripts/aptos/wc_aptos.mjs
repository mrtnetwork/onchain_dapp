import * as wc from '../utils/wc.mjs';
import { aptos } from '../constants/constants.mjs'
import * as utils from '../utils/utils.mjs';
const network = aptos.aptosTestnetNetwork;
async function connect() {
    const { session, provider } = await wc.initWalletConnect(aptos.aptosCaip2, network);
    const accounts = wc.getApprovedAccounts({ session, caip10: network });
    if (accounts.length === 0) {
        throw new Error(`No approved accounts found for network "${network} (Aptos testnet)". Please connect an account in your wallet.`);
    }
    return { provider, accounts };
}

async function signInMessage() {
    const { provider } = await connect();
    const params = {
        'message': 'Sign in test message.',
        'nonce': '1234567'
    };
    console.log("connect: " + network)
    await utils.runMethod({
        method: "aptos_signMessage",
        asyncFunc: async function name() {
            const { status, args } = await provider.request({ method: "aptos_signMessage", params }, network);
            if (status == "Approved") {
                return args.signature;
            }
            throw Error("User rejected request.");
        }
    })
}
async function getNetwork() {
    const { provider } = await connect();
    await utils.runMethod({
        method: "aptos_network",
        asyncFunc: async function name() {
            const { name, chainId } = await provider.request({ method: "aptos_network", }, network);
            return `${name}:${chainId ?? -1}`;
        }
    })
}
async function requestAccounts() {
    const { provider } = await connect();
    await utils.runMethod({
        method: "aptos_requestAccounts",
        asyncFunc: async function name() {
            const { status, args } = await provider.request({ method: "aptos_requestAccounts", }, network);
            if (status == "Approved") {
                return args.address;
            }
            throw Error("User rejected request.");
        }
    })
}
async function signTransfer() {
    const { accounts, provider } = await connect();
    // const { account, wallet } = await connect()
    const config = new window.aptosSDK.AptosConfig({ network: window.aptosSDK.Network.TESTNET });
    const aptos = new window.aptosSDK.Aptos(config);
    const recipient = prompt("Please enter a valid aptos destionation address: ", "0x334f1cdf8818838ce6e59da66a05233ae558bdb42e279af5eaee77a5b9060630");
    const destination = window.aptosSDK.AccountAddress.fromString(recipient || "0x334f1cdf8818838ce6e59da66a05233ae558bdb42e279af5eaee77a5b9060630");

    // const alice = window.aptosSDK.Account.generate();
    const transaction = await aptos.transaction.build.simple({
        sender: window.aptosSDK.AccountAddress.fromString(accounts[0]),
        data: {
            function: "0x1::aptos_account::transfer",
            functionArguments: [destination, 1000], // Transfer 1000 octas
        },
    });
    const params = {
        rawTransaction: Buffer.from(transaction.bcsToBytes()).toString("hex")
    }
    await utils.runMethod({
        method: "aptos_signTransaction",
        asyncFunc: async function name() {
            const { status, args } = await provider.request({ method: "aptos_signTransaction", params }, network);
            if (status == "Approved") {
                return args;
            }
            throw Error("User rejected request.");
        }
    })

}

const onChain = {
    ping: wc.ping,
    disconnect: wc.disconnect,
    aptos: {
        connect: connect,
        signInMessage: signInMessage,
        getNetwork: getNetwork,
        signTransfer: signTransfer,
        requestAccounts: requestAccounts
    }
};


window.onChainDapp = {
    ...(window.onChainDapp || {}),
    ...onChain
};
