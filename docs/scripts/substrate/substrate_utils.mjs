const { ApiPromise, WsProvider } = Polkadot;


async function createTransaction({ address, recipient, signTx }) {
    const provider = new WsProvider('wss://westmint-rpc.dwellir.com:443'); // Or any Substrate node
    const api = await ApiPromise.create({ provider });
    const transfer = api.tx.balances.transferAllowDeath(
        recipient || '5H19GUCBcMwNhKj7PuxSbn5iMch7yBEpXMXDu1ih7xmmgi7b',
        1000000000000
    );
    return await transfer.signAndSend(address, {
        signer: {
            signPayload: async (payload) => {
                const signature = await signTx(payload);
                return signature;
            },
        }
    });
}

export { createTransaction }