import { createCompleter } from '../utils/utils.mjs';
let provider;
let appkit;

async function startAppKit(provider, caip2, chain) {
    appkit = createAppKit({
        projectId: "eca409135e9616e51b4e4de241abe322",
        manualWCControl: true,
        universalProvider: provider,
        networks: [mainnet],
        metadata: {
            name: "OnChain DApp",
            description: "App to test WalletConnect network",
            url: location.origin,
            icons: [],
        },
        showWallets: false,
        enableEIP6963: false, // Disable 6963 by default
        enableInjected: false, // Disable injected by default
        enableCoinbase: false, // Default to true
        enableWalletConnect: true,
        features: {
            email: false,
            socials: false,
        },
    });
    appkit.open();
    let params = {};
    params[caip2] = {
        methods: [
        ],
        chains: [chain],
        events: []
    }
    console.log("params: " + JSON.stringify(params))
    const client = await provider.connect({
        namespaces: params,
    });
}
async function initWalletConnectInternal(completer) {
    if (!provider) {
        provider = await UniversalProvider.init({
            projectId: 'eca409135e9616e51b4e4de241abe322'
        });
        console.log("init done!");
        provider.on("display_uri", (uri) => {
            console.log("URI for WalletConnect modal:", uri);
        });
        provider.on("connect", ({ session }) => {
            console.log("New session connected!", session);
            if (session.peer.metadata.name.toLowerCase() !== "onchain") {
                return;
            }
            completer?.resolve({ session, provider });
            appkit?.close();
        });
        provider.on("session_update", (session) => {
            console.log("Session updated:", session);
        });
        provider.on("session_event", (event) => {
            console.log("Session event:", event);
        });
        provider.on("disconnect", () => {
            console.log("Wallet disconnected");
        });
    }
    const activeSessions = provider.client.session.getAll();
    const onchainSession = activeSessions.find(
        (session) => session.peer.metadata.name.toLowerCase() === "onchain"
    );
    provider.session = onchainSession;
    return provider;
}
async function initWalletConnect(caip2, chain) {
    const completer = createCompleter();
    const provider = await initWalletConnectInternal(completer);
    if (provider.session == null) {
        startAppKit(provider, caip2, chain);
    } else {
        completer.resolve({ session: provider.session, provider })
    }
    const result = await completer.promise
    const approved = isApproved({ session: result.session, caip2 });
    if (!approved) {
        const repair = repairSession(caip2);
        if (repair) {
            await disconnect();
            return initWalletConnect(caip2, chain);
        }
    }
    console.log("active session: " + JSON.stringify(result.session));
    console.log("caip: " + caip2)
    // console.log("caip: " + provider.setDefaultChain)
    // provider.setDefaultChain("tron",undefined)
    return { session: result.session, provider: result.provider, approved };


}



async function disconnect() {
    const provider = await initWalletConnectInternal();
    await provider?.disconnect();
}

async function ping() {
    const provider = await initWalletConnectInternal();
    if (!provider.session) {
        throw Error("WalletConnect is not connected to the OnChain wallet.")
    }
    const ping = await provider.client.ping({ topic: provider.session.topic });
    console.log("ping: " + JSON.stringify(ping))
}


function isApproved({ session, caip2 }) {
    return !!(caip2 && session?.namespaces?.[caip2]);
}

function getApprovedAccounts({ session, caip10 }) {
    const [namespace] = caip10.split(":");

    if (!isApproved({ session, caip2: namespace })) {
        return [];
    }

    const accounts = session.namespaces[namespace].accounts || [];
    const filter = accounts.filter(item => item.startsWith(caip10));
    const cleaned = filter.map(str => str.replace(`${caip10}:`, ""));
    return cleaned;
}

function repairSession(caip2) {
    const message = `Your session is not approved for the "${caip2}" network.
  Would you like to repair the session now?
  You can also update app permissions in your wallet's dApp settings.`;
    return confirm(message);
}
export { initWalletConnect, disconnect, getApprovedAccounts, ping };