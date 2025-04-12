const {
    Connection,
    PublicKey,
    Transaction,
    SystemProgram,
    Keypair,
    LAMPORTS_PER_SOL,
    sendAndConfirmTransaction,
    TransactionInstruction, TransactionMessage, VersionedTransaction
} = solanaWeb3;
let _wallet;
function createCompleter() {
    let resolve, reject;
    const promise = new Promise((res, rej) => {
        resolve = res;
        reject = rej;
    });
    return { promise, resolve, reject };
}
function appIsReady(params) {
    const event = new CustomEvent('wallet-standard:app-ready', {
        detail: {
        }
    });
    window.dispatchEvent(event);

}

async function getWallet() {
    if (_wallet) return _wallet;
    const completer = createCompleter();
    window.addEventListener("wallet-standard:register-wallet", function s(e) {
        e.detail({
            register: function _(params) {
                if (params !== undefined && params.name != undefined && params.name == 'MRT') {
                    completer.resolve(params)
                }
            }
        })
    });
    appIsReady();
    _wallet = await completer.promise;
    return _wallet;

}


async function connect() {
    const wallet = await getWallet();
    let { accounts } = await wallet.features["solana:connect"].connect();
    accounts = accounts.filter(account => account.chains.includes("solana:devnet"));
    return { accounts, wallet };
}

async function singleSignRequest() {
    const connection = new Connection('https://api.devnet.solana.com', 'confirmed');
    const { accounts, wallet } = await connect();
    let block = await connection.getLatestBlockhash();
    let recipient = new PublicKey("GVes3m3fpzePkj6i3wweTJQveBgJbkcJVE1JixjinCEb");
    let tr1 = createTr(accounts[0].address, recipient, block.blockhash)
    const options = {
        preflightCommitment: 'processed',
    };
    const signedTransaction = await wallet.features["solana:signTransaction"].signTransaction(
        { transaction: tr1.serialize(), options, account: accounts[0] }
    );
    for (let i = 0; i < signedTransaction.length; i++) {
        const txid = await connection.sendRawTransaction(signedTransaction[i].signedTransaction);
        console.log("txid: " + txid);
    }
}
async function multiplleSignRequest() {
    const connection = new Connection('https://api.devnet.solana.com', 'confirmed');
    const { accounts, wallet } = await connect();
    if (accounts.length != 2) {
        console.error("at least two autorized account required.");
        return
    }
    let block = await connection.getLatestBlockhash();
    let recipient = new PublicKey("GVes3m3fpzePkj6i3wweTJQveBgJbkcJVE1JixjinCEb");
    let tr1 = createTr(accounts[0].address, recipient, block.blockhash)
    let tr2 = createLegacyTr(accounts[1].address, recipient, block.blockhash)
    const options = {
        preflightCommitment: 'processed',
    };
    const signedTransaction = await wallet.features["solana:signTransaction"].signTransaction(
        [{ transaction: tr1.serialize(), options, account: accounts[0] },
        { transaction: tr2.serialize({ verifySignatures: false }), options, account: accounts[1] }]
    );
    for (let i = 0; i < signedTransaction.length; i++) {
        const txid = await connection.sendRawTransaction(signedTransaction[i].signedTransaction);
        console.log("txid: " + txid);
    }
}
async function multiplleSendRequest() {
    const connection = new Connection('https://api.devnet.solana.com', 'confirmed');
    const { accounts, wallet } = await connect();
    if (accounts.length != 2) {
        console.error("at least two autorized account required.");
        return
    }
    let block = await connection.getLatestBlockhash();
    let recipient = new PublicKey("GVes3m3fpzePkj6i3wweTJQveBgJbkcJVE1JixjinCEb");
    let tr1 = createTr(accounts[0].address, recipient, block.blockhash)
    let tr2 = createLegacyTr(accounts[1].address, recipient, block.blockhash)
    const options = {
        preflightCommitment: 'processed',
        commitment: 'processed'
    };
    const signedTransaction = await wallet.features["solana:signAndSendTransaction"].signAndSendTransaction(
        [{ transaction: tr1.serialize(), options, account: accounts[0] },
        { transaction: tr2.serialize({ verifySignatures: false }), options, account: accounts[1] }]
    );

}
async function signAndSendAllTransaction() {
    const connection = new Connection('https://api.devnet.solana.com', 'confirmed');
    const { accounts, wallet } = await connect();
    if (accounts.length != 2) {
        console.error("at least two autorized account required.");
        return
    }
    let block = await connection.getLatestBlockhash();
    let recipient = new PublicKey("GVes3m3fpzePkj6i3wweTJQveBgJbkcJVE1JixjinCEb");
    let tr1 = createTr(accounts[0].address, recipient, block.blockhash)
    let tr2 = createLegacyTr(accounts[1].address, recipient, block.blockhash)
    const options = {
        preflightCommitment: 'processed',
        commitment: 'processed'
    };
    const signedTransaction = await wallet.features["solana:signAndSendAllTransactions"].signAndSendAllTransactions(
        [{ transaction: tr1.serialize(), options, account: accounts[0] },
        { transaction: tr2.serialize({ verifySignatures: false }), options, account: accounts[1] }]
    );
    for (let i = 0; i < signedTransaction.length; i++) {
        console.log("signature: " + Buffer.from(signedTransaction[i].signature).toString('hex'));
    }

}
window.signAndSendAllTransaction = signAndSendAllTransaction
async function multipleSignMessage() {
    const { accounts, wallet } = await connect();
    if (accounts.length != 2) {
        console.error("at least two autorized account required.");
        return
    }
    const message = Buffer.from('this is test', 'utf-8');

    const signedTransaction = await wallet.features["solana:signMessage"].signMessage(
        [{ message, account: accounts[0] },
        { message, account: accounts[1] },]
    );
    for (let i = 0; i < signedTransaction.length; i++) {
        console.log("signature: " + Buffer.from(signedTransaction[i].signature).toString('hex'));
    }

}
async function multipleSignInMessage() {
    const { accounts, wallet } = await connect();
    const now = new Date();
    const exp = new Date();
    exp.setDate(exp.getDate() + 30);
    const currentDateTime = now.toISOString();
    const expirationTime = exp.toISOString();
    const signInData = {
        domain: "localhost:3000",
        statement: "Sign-in to connect!",
        uri: "wss://localhost:3000/",
        version: "1",
        nonce: "oBbLoEldZs123123",
        // chainId: "solana:mainnet",
        expirationTime: expirationTime,
        address: accounts[0].address,
        requestId: '12312312',
        notBefore: currentDateTime,
        issuedAt: currentDateTime,
        resources: []
    }

    const signedTransaction = await wallet.features["solana:signIn"].signIn(
        [signInData,
            signInData,]
    );
    for (let i = 0; i < signedTransaction.length; i++) {
        console.log("signature: " + Buffer.from(signedTransaction[i].signature).toString('hex'));
    }

}
window.multiplleSignRequest = multiplleSignRequest
window.multiplleSendRequest = multiplleSendRequest
window.multipleSignMessage = multipleSignMessage
function createTr(address, recipient, blockhash) {
    const transferInstruction = SystemProgram.transfer({
        fromPubkey: new PublicKey(address),
        toPubkey: recipient,
        lamports: 0.001 * LAMPORTS_PER_SOL, // Amount in lamports
    });

    // Create a message for the transaction
    const messageV0 = new TransactionMessage({
        payerKey: new PublicKey(address),
        recentBlockhash: blockhash,
        instructions: [transferInstruction],
    }).compileToV0Message();
    return new VersionedTransaction(messageV0);
}
function createLegacyTr(address, recipient, blockhash) {
    const transferInstruction = SystemProgram.transfer({
        fromPubkey: new PublicKey(address),
        toPubkey: recipient,
        lamports: 0.001 * LAMPORTS_PER_SOL,
    });

    const transaction = new Transaction({
        feePayer: new PublicKey(address),
        recentBlockhash: blockhash,
    });

    transaction.add(transferInstruction);

    return transaction;
}
async function listenOnEvents() {
    const wallet = await getWallet();
    await wallet.features["solana:events"].on('change',
        (p) => console.log("account changed: " + p.accounts.map((e) => e.address + " ") + " chains: " + p.chains)
    );
}
window.listenOnEvents = listenOnEvents
window.connect = connect
window.singleSignRequest = singleSignRequest
window.multipleSignInMessage = multipleSignInMessage