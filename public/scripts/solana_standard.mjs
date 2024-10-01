const {
    Connection,
    PublicKey,
    Transaction,
    SystemProgram,
    LAMPORTS_PER_SOL,
    TransactionMessage, VersionedTransaction
} = solanaWeb3;

async function singleSignRequest() {
    try {
        const connection = new Connection('https://api.devnet.solana.com', 'confirmed');
        await window.solana.connect();
        let address = window.solana.publicKey;
        console.log("address " + address);
        let block = await connection.getLatestBlockhash();
        console.log("block: " + block)
        let recipient = new PublicKey("GVes3m3fpzePkj6i3wweTJQveBgJbkcJVE1JixjinCEb");
        let tr1 = createTr(address, recipient, block.blockhash)
        const options = {
            skipPreflight: true,
            preflightCommitment: 'process',
            maxRetries: 5
        };
        console.log("create done!");
        const signedTransaction = await window.solana.signTransaction(tr1);
        const result = await connection.sendRawTransaction(signedTransaction.serialize());
        console.log("result: " + result)
    } catch (e) {
        console.log("error")
        console.log(e);
    }
}
async function singleSignLegacyRequest() {
    try {
        const connection = new Connection('https://api.devnet.solana.com', 'confirmed');
        await window.solana.connect();
        let address = window.solana.publicKey;
        console.log(address);
        let block = await connection.getLatestBlockhash();
        let recipient = new PublicKey("GVes3m3fpzePkj6i3wweTJQveBgJbkcJVE1JixjinCEb");
        let tr1 = createLegacyTr(address, recipient, block.blockhash)
        const options = {
            skipPreflight: true,
            preflightCommitment: 'process',
            maxRetries: 5
        };
        const signedTransaction = await window.solana.signTransaction(tr1);
        const result = await connection.sendRawTransaction(signedTransaction.serialize());
        console.log("result: " + result)
    } catch (e) {
        console.log("error")
        console.log(e);
    }
}
async function sendTransaction() {
    try {
        const connection = new Connection('https://api.devnet.solana.com', 'confirmed');
        await window.solana.connect();
        let address = window.solana.publicKey;
        // console.log(address);
        let block = await connection.getLatestBlockhash();
        let recipient = new PublicKey("52u8F6EhG45M5t2XVXwNPwmLuT68ojMQCNwgcuYiehpH");
        let tr1 = createTr(address, recipient, block.blockhash)
        const options = {
            skipPreflight: true,
            preflightCommitment: 'process',
            maxRetries: 5
        };
        const txHash = await window.solana.signAndSendTransaction(tr1, options);
        console.log("result: " + txHash)
    } catch (e) {
        console.log("error")
        console.log(e);
    }
}
async function sendLegacyTransaction() {
    try {
        const connection = new Connection('https://api.devnet.solana.com', 'confirmed');
        await window.solana.connect();
        let address = window.solana.publicKey;
        console.log(address);
        let block = await connection.getLatestBlockhash();
        let recipient = new PublicKey("52u8F6EhG45M5t2XVXwNPwmLuT68ojMQCNwgcuYiehpH");
        let tr1 = createLegacyTr(address, recipient, block.blockhash)
        const options = {
            skipPreflight: true,
            preflightCommitment: 'process',
            maxRetries: 5
        };
        const txHash = await window.solana.signAndSendTransaction(tr1, options);
        console.log("result: " + txHash)
    } catch (e) {
        console.log("error")
        console.log(e);
    }
}
async function multipleTransaction() {
    try {
        const connection = new Connection('https://api.devnet.solana.com', 'confirmed');
        await window.solana.connect();
        let address = window.solana.publicKey;
        console.log(address);
        let block = await connection.getLatestBlockhash();
        let recipient = new PublicKey("52u8F6EhG45M5t2XVXwNPwmLuT68ojMQCNwgcuYiehpH");
        let recipient2 = new PublicKey("J5tsPfYSXTj9YnDLVjZW6hVfnUgRxbWgsiMvEMZAYTSR");
        let tr1 = createTr(address, recipient, block.blockhash)
        let tr2 = createTr(address, recipient2, block.blockhash)
        const options = {
            skipPreflight: true,
            preflightCommitment: 'process',
            maxRetries: 5
        };
        const txsHash = await window.solana.signAndSendAllTransactions([tr1, tr2], options);
        console.log(txsHash)
    } catch (e) {
        console.log("error")
        console.log(e);
    }
}
async function multipleTransactionWithSignerOption() {
    try {
        const connection = new Connection('https://api.devnet.solana.com', 'confirmed');
        await window.solana.connect();
        let address = window.solana.publicKey;
        console.log(address);
        let block = await connection.getLatestBlockhash();
        let recipient = new PublicKey("52u8F6EhG45M5t2XVXwNPwmLuT68ojMQCNwgcuYiehpH");
        let recipient2 = new PublicKey("J5tsPfYSXTj9YnDLVjZW6hVfnUgRxbWgsiMvEMZAYTSR");
        let tr1 = createTr(address, recipient, block.blockhash)
        let tr2 = createTr(address, recipient2, block.blockhash)
        const options = {
            skipPreflight: true,
            preflightCommitment: 'process',
            maxRetries: 5,
            signers: [recipient]
        };
        const txsHash = await window.solana.signAndSendAllTransactions([tr1, tr2], options);
        console.log(txsHash)
    } catch (e) {
        console.log("error")
        console.log(e);
    }
}
async function multipleLegacyTransaction() {
    try {
        const connection = new Connection('https://api.devnet.solana.com', 'confirmed');
        await window.solana.connect();
        let address = window.solana.publicKey;
        console.log(address);
        let block = await connection.getLatestBlockhash();
        let recipient = new PublicKey("GVes3m3fpzePkj6i3wweTJQveBgJbkcJVE1JixjinCEb");
        let recipient2 = new PublicKey("J5tsPfYSXTj9YnDLVjZW6hVfnUgRxbWgsiMvEMZAYTSR");
        let tr1 = createLegacyTr(address, recipient, block.blockhash)
        let tr2 = createLegacyTr(address, recipient2, block.blockhash)
        const options = {
            skipPreflight: true,
            preflightCommitment: 'process',
            maxRetries: 5
        };
        const txsHash = await window.solana.signAndSendAllTransactions([tr1, tr2], options);
        console.log("result: " + txsHash)
    } catch (e) {
        console.log("error")
        console.log(e);
    }
}
async function multipleSignRequest() {
    try {
        const connection = new Connection('https://api.devnet.solana.com', 'confirmed');
        await window.solana.connect();
        let address = window.solana.publicKey;
        console.log(address);
        let block = await connection.getLatestBlockhash();
        let recipient = new PublicKey("GVes3m3fpzePkj6i3wweTJQveBgJbkcJVE1JixjinCEb");
        let recipient2 = new PublicKey("J5tsPfYSXTj9YnDLVjZW6hVfnUgRxbWgsiMvEMZAYTSR");
        let tr1 = createTr(address, recipient, block.blockhash)
        let tr2 = createTr(address, recipient2, block.blockhash)
        const options = {
            skipPreflight: true,
            preflightCommitment: 'process',
            maxRetries: 5
        };
        const signedTransaction = await window.solana.signAllTransactions([tr1, tr2]);
        for (let i = 0; i < signedTransaction.length; i++) {
            const txid = await connection.sendRawTransaction(signedTransaction[i].serialize());
            console.log("txid: " + txid);
        }
    } catch (e) {
        console.log("error")
        console.log(e);
    }

}
async function multipleSignLegacyRequest() {
    try {
        const connection = new Connection('https://api.devnet.solana.com', 'confirmed');
        await window.solana.connect();
        let address = window.solana.publicKey;
        console.log(address);
        let block = await connection.getLatestBlockhash();
        let recipient = new PublicKey("GVes3m3fpzePkj6i3wweTJQveBgJbkcJVE1JixjinCEb");
        let recipient2 = new PublicKey("J5tsPfYSXTj9YnDLVjZW6hVfnUgRxbWgsiMvEMZAYTSR");
        let tr1 = createLegacyTr(address, recipient, block.blockhash)
        let tr2 = createLegacyTr(address, recipient2, block.blockhash)
        const options = {
            skipPreflight: true,
            preflightCommitment: 'process',
            maxRetries: 5
        };
        const signedTransaction = await window.solana.signAllTransactions([tr1, tr2]);
        for (let i = 0; i < signedTransaction.length; i++) {
            const txid = await connection.sendRawTransaction(signedTransaction[i].serialize());
            console.log("txid: " + txid);
        }
    } catch (e) {
        console.log("error")
        console.log(e);
    }

}
async function signMessage() {
    try {
        const data = Uint8Array.from([1, 2, 3, 4])
        const signedTransaction = await window.solana.signMessage(data);
        console.log("result: address: " + signedTransaction.publicKey.toBase58() + " signature: " + signedTransaction.signature)
    } catch (e) {
        console.log(e);
    }

}
async function signMessageWithTransactionBytes() {
    try {
        const connection = new Connection('https://api.devnet.solana.com', 'confirmed');
        await window.solana.connect();
        let address = window.solana.publicKey;
        console.log(address);
        let block = await connection.getLatestBlockhash();
        let recipient = new PublicKey("GVes3m3fpzePkj6i3wweTJQveBgJbkcJVE1JixjinCEb");
        let tr1 = createTr(address, recipient, block.blockhash)
        const signature = await window.solana.signMessage(tr1.serialize({ verifySignatures: false }));
        console.log("result: " + signature)
    } catch (e) {
        console.log("error")
        console.log(e);
    }
}
function createTr(address, recipient, blockhash) {
    const transferInstruction = SystemProgram.transfer({
        fromPubkey: address,
        toPubkey: recipient,
        lamports: 0.1 * LAMPORTS_PER_SOL, // Amount in lamports
    });

    // Create a message for the transaction
    const messageV0 = new TransactionMessage({
        payerKey: address,
        recentBlockhash: blockhash,
        instructions: [transferInstruction],
    }).compileToV0Message();
    return new VersionedTransaction(messageV0);
}
function createLegacyTr(address, recipient, blockhash) {
    const transferInstruction = SystemProgram.transfer({
        fromPubkey: address,
        toPubkey: recipient,
        lamports: 0.1 * LAMPORTS_PER_SOL,
    });

    const transaction = new Transaction({
        feePayer: address,
        recentBlockhash: blockhash,
    });

    transaction.add(transferInstruction);

    return transaction;
}
function listenOnEvents() {
    solana.on("accountsChanged", function (s) {
        console.log("Account changed event in page: " + JSON.stringify(s) + " " + window.solana.publicKey);
    });
    solana.on("chainChanged", function (s) {
        console.log("change changed event in page: " + s.genesisBlock);
    });
    solana.on("message", function (s) {
        console.log("message event in page: " + JSON.stringify(s));
    });
    solana.on("connect", function (s) {
        console.log("connect event in page: " + s.genesisBlock);
    });
}
window.singleSignRequest = singleSignRequest
window.multipleSignRequest = multipleSignRequest
window.sendTransaction = sendTransaction,
    window.multipleTransaction = multipleTransaction
window.singleSignLegacyRequest = singleSignLegacyRequest
window.multipleSignLegacyRequest = multipleSignLegacyRequest
window.sendLegacyTransaction = sendLegacyTransaction
window.multipleLegacyTransaction = multipleLegacyTransaction
window.multipleTransactionWithSignerOption = multipleTransactionWithSignerOption
window.signMessage = signMessage
window.signMessageWithTransactionBytes = signMessageWithTransactionBytes
window.listenOnEvents = listenOnEvents