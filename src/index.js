import { Buffer } from 'buffer';
import * as AptosSDK from "@aptos-labs/ts-sdk";
import * as Sui from "@mysten/sui/transactions";
import * as SuiClient from "@mysten/sui/client";
import { SigningStargateClient } from "@cosmjs/stargate";
import {
    Registry,
    encodePubkey,
    makeAuthInfoBytes,
    makeSignDoc,
    makeSignBytes,
} from "@cosmjs/proto-signing";
import { coins, encodeSecp256k1Pubkey } from "@cosmjs/amino";
import { TxBody, AuthInfo, TxRaw } from "cosmjs-types/cosmos/tx/v1beta1/tx";
import { Any } from "cosmjs-types/google/protobuf/any";

const bitcoin = require('bitcoinjs-lib');
const { ApiPromise, WsProvider } = require('@polkadot/api');

window.Buffer = Buffer;
window.Polkadot = { WsProvider, ApiPromise }
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
function parsePsbt(b64) {
    const psbt = bitcoin.Psbt.fromBase64(b64);
    return psbt.extractTransaction().toHex();
}


window.Sui = Sui
window.parsePsbt = parsePsbt
window.aptosSDK = AptosSDK
window.SuiClient = SuiClient
