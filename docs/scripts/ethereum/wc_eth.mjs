import * as wc from '../utils/wc.mjs';
import { ethereum } from '../constants/constants.mjs'
import * as utils from '../utils/utils.mjs';
async function connect() {
    const { session, provider } = await wc.initWalletConnect(ethereum.eip155Caip2, ethereum.eip155TestnetNetwrk);
    const accounts = wc.getApprovedAccounts({ session, caip10: ethereum.eip155TestnetNetwrk });
    console.log("accounts: " + JSON.stringify(accounts));
    if (accounts.length === 0) {
        throw new Error(`No approved accounts found for network "${ethereum.eip155TestnetNetwrk} (Ethereum Sepolia testnet)". Please connect an account in your wallet.`);
    }
    return { provider, accounts };
}
async function personalSign() {
    const { accounts, provider } = await connect();
    const params = ["0x0c0c0c", accounts[0]];
    await utils.runMethod({
        method: "personal_sign",
        asyncFunc: async function name() {
            const signature = await provider.request({ method: "personal_sign", params });
            return signature;
        }
    })
}
async function ethSign() {
    const { accounts, provider } = await connect();
    const params = [accounts[0], "test message"];
    await utils.runMethod({
        method: "eth_sign",
        asyncFunc: async function name() {
            const signature = await provider.request({ method: "eth_sign", params });
            return signature;
        }
    })
}
async function requestAccounts() {
    const { provider } = await connect();
    await utils.runMethod({
        method: "eth_requestAccounts",
        asyncFunc: async function name() {
            const accounts = await provider.request({ method: "eth_requestAccounts" });
            return accounts;
        }
    })
}
async function switchNetwork() {
    const { provider } = await connect();
    await utils.runMethod({
        method: "wallet_switchEthereumChain",
        asyncFunc: async function name() {
            const accounts = await provider.request({ method: "wallet_switchEthereumChain", params: [{ "chainId": "0x1" }] });
            return accounts;
        }
    })
}
async function signTypedDataV1() {
    const { accounts, provider } = await connect();
    const params = [JSON.stringify(ethereum.ethereumExapleTypedDataV1), accounts[0]];
    await utils.runMethod({
        method: "eth_signTypedData",
        asyncFunc: async function name() {
            const signature = await provider.request({ method: "eth_signTypedData", params });
            return Buffer.from(signature).toString('hex');
        }
    })
}
async function signTypedDataV4() {
    const { accounts, provider } = await connect();
    const params = [accounts[0], ethereum.ethereumExapleTypedDataV4];
    await utils.runMethod({
        method: "eth_signTypedData_v4",
        asyncFunc: async function name() {
            const signature = await provider.request({ method: "eth_signTypedData_v4", params });
            return Buffer.from(signature).toString('hex');
        }
    })
}
async function importNewEthereumChain() {
    const { provider } = await connect();
    const params = [ethereum.ethereumNewChainExapleParams];
    await utils.runMethod({
        method: "wallet_addEthereumChain",
        asyncFunc: async function name() {
            const signature = await provider.request({ method: "wallet_addEthereumChain", params });
            return signature;
        }
    })
}
async function sendTransaction() {
    const { provider } = await connect();
    const input = prompt("Please enter a valid destionation address: ", "0x372cC9e4Fa8E834237e106235e26A2fb7E9082D2");
    const txParams = { to: input, data: "0x", value: "0x01", type: "0x2" }
    const params = [txParams];
    await utils.runMethod({
        method: "eth_sendTransaction",
        asyncFunc: async function name() {
            const txId = await provider.request({ method: "eth_sendTransaction", params });
            return txId;
        }
    })
}

const onChain = {
    ping: wc.ping,
    disconnect: wc.disconnect,
    ethereum: {
        connect: connect,
        personalSign: personalSign,
        signTypedDataV1: signTypedDataV1,
        signTypedDataV4: signTypedDataV4,
        importNewEthereumChain: importNewEthereumChain,
        sendTransaction: sendTransaction,
        requestAccount: requestAccounts,
        ethSign: ethSign,
        switchNetwork: switchNetwork
    }
};
window.onChainDapp = {
    ...(window.onChainDapp || {}),
    ...onChain
};
