async function createTransfer(address, recipient) {
    const message = {
        "address": recipient || "Uf-BQxz-Z5Lqfr02hNbTHw45ZJaM_pKf0R_OsTF_H9mEvHZk",
        "amount": (0.001 * 1e9).toString(),
        "stateInit": null,
        "payload": null
    }
    return {
        "account": address,
        "messages": [message, message],
        "validUntil": parseInt((Date.now() / 1e3)) + 60
    }

}
export { createTransfer }



