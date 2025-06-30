import { getWallet } from '../utils/ws.mjs'
import { aptos } from '../constants/constants.mjs'
import * as utils from '../utils/utils.mjs';
const network = aptos.aptosWsTestnetNetwork;
async function connect() {
    const provider = await getWallet();
    let { args, status } = await provider.features["aptos:connect"].connect(network);
    console.log("done?");
    console.log("data: " + JSON.stringify(args))
    let accounts = [args];
    accounts = accounts.filter(account => account.chains.includes(network));
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
    await utils.runMethod({
        method: "aptos_signMessage",
        asyncFunc: async function name() {
            const { status, args } = await provider.features["aptos:signMessage"].signMessage(params);
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
            const { name, chainId } = await provider.features["aptos:network"].network();
            return `${name}:${chainId ?? -1}`;
        }
    })
}

async function requestAccounts() {
    const { provider } = await connect();
    await utils.runMethod({
        method: "aptos_requestAccounts",
        asyncFunc: async function name() {
            const { status, args } = await provider.features["aptos:connect"].connect();
            if (status == "Approved") {
                return args.address;
            }
            throw Error("User rejected request.");
        }
    })
}
async function signTransfer() {
    const { accounts, provider } = await connect();
    const config = new window.aptosSDK.AptosConfig({ network: window.aptosSDK.Network.TESTNET });
    const aptos = new window.aptosSDK.Aptos(config);
    const recipient = prompt("Please enter a valid aptos destionation address: ", "0x334f1cdf8818838ce6e59da66a05233ae558bdb42e279af5eaee77a5b9060630");
    const destination = window.aptosSDK.AccountAddress.fromString(recipient || "0x334f1cdf8818838ce6e59da66a05233ae558bdb42e279af5eaee77a5b9060630");
    const transaction = await aptos.transaction.build.simple({
        sender: window.aptosSDK.AccountAddress.fromString(accounts[0].address),
        data: {
            function: "0x1::aptos_account::transfer",
            functionArguments: [destination, 1000], // Transfer 1000 octas
        },
    });
    await utils.runMethod({
        method: "aptos_signTransaction",
        asyncFunc: async function name() {
            const { args, status } = await provider.features["aptos:signTransaction"].signTransaction(
                transaction
            );
            if (status == "Approved") {
                return args.dataHex;
            }
            throw Error("User rejected request.");
        }
    })

}
async function switchNetwork() {
    const { provider } = await connect();
    const params = { "chainId": 1 }
    await utils.runMethod({
        method: "wallet_switchAptosChain",
        asyncFunc: async function name() {
            const { success } = await provider.features["aptos:changeNetwork"].changeNetwork(params);
            return success;
        }
    })
}
async function listenOnAccountChange() {
    const { provider } = await connect();
    await provider.features["aptos:onAccountChange"].onAccountChange(function name({ address }) {
        console.log("account changed: " + address)
    });
}
async function listenOnChangeNetwork() {
    const { provider } = await connect();
    await provider.features["aptos:onNetworkChange"].onNetworkChange(function name({ name }) {
        console.log("change changed: " + name)
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
    aptos: {
        connect: connect,
        signInMessage: signInMessage,
        getNetwork: getNetwork,
        signTransfer: signTransfer,
        requestAccounts: requestAccounts,
        switchNetwork: switchNetwork,
        listenOnAccountChange: listenOnAccountChange,
        listenOnChangeNetwork: listenOnChangeNetwork,
        listenOnWalletChanges: listenOnWalletChanges
    }
};

window.onChainDapp = {
    ...(window.onChainDapp || {}),
    ...onChain
};
