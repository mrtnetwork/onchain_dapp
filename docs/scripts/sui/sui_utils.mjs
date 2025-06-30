async function createTransfer(address, recipient) {
    const transaction = new window.Sui.Transaction();
    const [coin] = transaction.splitCoins(transaction.gas, [1000]);
    transaction.transferObjects([coin], recipient || '0x4637f89fdf75bf020b2f00a5dedeb6a405728c6062d44ed9c816f5683dd0f72a');
    transaction.setSender(address)
    const txData = await transaction.toJSON();
    return Buffer.from(txData).toString("base64");
}
export { createTransfer }