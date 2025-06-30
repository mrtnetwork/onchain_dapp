import { Buffer } from 'buffer';
import * as AptosSDK from "@aptos-labs/ts-sdk";
import * as Sui from "@mysten/sui/transactions";
import * as SuiClient from "@mysten/sui/client";
import { createAppKit } from '@reown/appkit'
import { SigningStargateClient } from "@cosmjs/stargate";
import {
    Registry,
    encodePubkey,
    makeAuthInfoBytes,
    makeSignDoc,
    makeSignBytes,
} from "@cosmjs/proto-signing";
import { coins, encodeSecp256k1Pubkey } from "@cosmjs/amino";
import { TxBody, AuthInfo, TxRaw } from "cosmjs-types/cosmos/tx/v1beta1/tx.js";
import { Any } from "cosmjs-types/google/protobuf/any.js";
import { mainnet, arbitrum } from '@reown/appkit/networks'
import UniversalProvider from '@walletconnect/universal-provider';
import ecc from '@bitcoinerlab/secp256k1';
import bitcoin from 'bitcoinjs-lib';
import { ApiPromise, WsProvider } from '@polkadot/api'
window.Buffer = Buffer;
window.Polkadot = { WsProvider, ApiPromise };
window.mainnet = mainnet;
window.ecc = ecc;
bitcoin.initEccLib(ecc);
window.bitcoin = bitcoin;
window.Cosmos = {
    SigningStargateClient, Registry,
    encodePubkey,
    makeAuthInfoBytes,
    makeSignDoc,
    coins,
    TxBody, AuthInfo,
    Any, makeSignBytes,
    encodeSecp256k1Pubkey,
    TxRaw
}
window.Sui = Sui
window.aptosSDK = AptosSDK
window.SuiClient = SuiClient
window.UniversalProvider = UniversalProvider;
window.createAppKit = createAppKit;


