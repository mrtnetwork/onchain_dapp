function createCompleter() {
    let resolve, reject;
    const promise = new Promise((res, rej) => {
        resolve = res;
        reject = rej;
    });
    return { promise, resolve, reject };
}

async function runMethod({ method, asyncFunc, showAlert = true }) {
    try {
        const data = await asyncFunc();
        const message = method + ": " + JSON.stringify(data);
        if (showAlert) alert(message)
        console.log(JSON.stringify(message))
        return data;
    } catch (error) {
        console.log("error here: " + error);
        console.error('Error occurred: ' + method + " " + JSON.stringify(error));
        throw error;
    }
}


export { runMethod, createCompleter }