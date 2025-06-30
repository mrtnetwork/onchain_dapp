const ethereumExapleTypedDataV1 = [
    {
        type: 'string',
        name: 'Message',
        value: 'Hi, Alice!'
    },
    {
        type: 'uint32',
        name: 'A number',
        value: '1337'
    }
];
const ethereumExapleTypedDataV4 = {
    types: {
        EIP712Domain: [
            { name: 'name', type: 'string' },
            { name: 'version', type: 'string' },
            { name: 'chainId', type: 'uint256' },
            { name: 'verifyingContract', type: 'address' },
        ],
        Person: [
            { name: 'name', type: 'string' },
            { name: 'wallet', type: 'address' },
        ],
        Mail: [
            { name: 'from', type: 'Person' },
            { name: 'to', type: 'Person' },
            { name: 'contents', type: 'string' },
        ],
    },
    primaryType: 'Mail',
    domain: {
        name: 'Ether Mail',
        version: '1',
        chainId: 97,
        verifyingContract: '0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC',
    },
    message: {
        from: {
            name: 'Cow',
            wallet: '0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826',
        },
        to: {
            name: 'Bob',
            wallet: '0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB',
        },
        contents: 'Hello, Bob!',
    },
};
const ethereumNewChainExapleParams = { chainId: '0x138de', chainName: 'Berachain', nativeCurrency: { name: 'BERA Token', symbol: 'BERA', decimals: 18 }, rpcUrls: ['https://rpc.berachain.com', 'https://berachain.blockpi.network/v1/rpc/public', 'https://berachain-rpc.publicnode.com', 'https://berachain.drpc.org', 'wss://berachain.drpc.org', 'https://rpc.berachain-apis.com', 'wss://rpc.berachain-apis.com', 'wss://berachain-rpc.publicnode.com'], blockExplorerUrls: ['https://berascan.com'] };
const eip155Caip2 = "eip155";
const eip155TestnetNetwrk = "eip155:11155111"
const eip155WsTestnetNetwrk = "ethereum:11155111"
const eip155EthereumNetwrk = "eip155:1"
const ethereum = { eip155EthereumNetwrk, ethereumExapleTypedDataV1, ethereumExapleTypedDataV4, ethereumNewChainExapleParams, eip155Caip2, eip155TestnetNetwrk, eip155WsTestnetNetwrk }

///tron
const tronCaip2 = "tron";
const tronShastaNetwork = "tron:0x94a9059e"
const tronWsShastaNetwork = "tron:0x94a9059e"
const tron = { tronCaip2, tronShastaNetwork, tronWsShastaNetwork }


/// aptos
const aptosCaip2 = "aptos";
const aptosTestnetNetwork = "aptos:testnet"
const aptosWsTestnetNetwork = "aptos:testnet"
const aptos = { aptosCaip2, aptosTestnetNetwork, aptosWsTestnetNetwork }

/// solana

const solanaCaip2 = "solana";
const solanaDevnetNetwork = "solana:EtWTRABZaYq6iMfeYKouRu166VU2xqa1"
const solanaWsDevnetNetwork = "solana:devnet"
const solanaMainnetNetwork = "solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp"
const solana = { solanaCaip2, solanaDevnetNetwork, solanaMainnetNetwork, solanaWsDevnetNetwork }

const suiCaip2 = "sui";
const suiTestnetNetwork = "sui:testnet"
const suiWsTestnetNetwork = "sui:testnet"
const sui = { suiCaip2, suiTestnetNetwork, suiWsTestnetNetwork }



const stellarCaip2 = "stellar";
const stellarTestnetNetwork = "stellar:testnet"
const stellarWsTestnetNetwork = "stellar:testnet"
const stellar = { stellarCaip2, stellarTestnetNetwork, stellarWsTestnetNetwork }


const tonCaip2 = "tvm";
const tonTestnetNetwork = "tvm:-3"
const tonWsTestnetNetwork = "tvm:-3"
const ton = { tonCaip2, tonTestnetNetwork, tonWsTestnetNetwork }




const bitcoinCaip2 = "bip122";
const bchCaip2 = "bch";
const bitcoinTestnet4Network = "bip122:00000000da84f2bafbbc53dee25a72ae"
const bitcoinWsTestnet4Network = "bitcoin:testnet4"
const bchTestnet = "bitcoincash:testnet"
const bchCaip2Testnet = "bch:bchtest"
const btc = { bitcoinCaip2, bitcoinTestnet4Network, bitcoinWsTestnet4Network, bchTestnet, bchCaip2Testnet, bchCaip2 }



const cosmosCaip2 = "cosmos";
const cosmosTestnetProvider = "cosmos:provider"
const cosmosWsTestnetProvider = "cosmos:provider"
const cosmos = { cosmosCaip2, cosmosTestnetProvider, cosmosWsTestnetProvider }


const substrateCaip2 = "polkadot";
const substrateWestendNetwork = "polkadot:67f9723393ef76214df0118c34bbbd3d"
const substrateWsWestendNetwork = "polkadot:67f9723393ef76214df0118c34bbbd3d"
const polkadot = { substrateCaip2, substrateWestendNetwork, substrateWsWestendNetwork }



export { ethereum, tron, aptos, solana, sui, stellar, ton, btc, cosmos, polkadot };