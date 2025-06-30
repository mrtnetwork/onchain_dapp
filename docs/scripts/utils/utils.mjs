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
        console.log("request done!");
        const message = method + ": " + JSON.stringify(data);
        console.log(message)
        if (showAlert) alert(message)
        return data;
    } catch (error) {
        console.log("error: " + error);
        console.error('Error occurred: ' + method + " " + JSON.stringify(error));
        throw error;
    }
}


export { runMethod, createCompleter }