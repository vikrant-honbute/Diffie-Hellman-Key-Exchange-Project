function isPrime(num) {
    for (let i = 2; i < num; i++) {
        if (num % i === 0) return false;
    }
    return num > 1;
}

function performKeyExchange(party) {
    const prime = parseInt(document.getElementById(`prime${party}`).value);
    const generator = parseInt(document.getElementById(`generator${party}`).value);
    const privateKey = parseInt(document.getElementById(`privateKey${party}`).value);
    const message = document.getElementById(`message${party}`).value;

    if (!isPrime(prime) || isNaN(generator) || isNaN(privateKey) || !message || typeof message !== 'string') {
        document.getElementById('result').textContent = "Invalid input. Please enter a valid prime number for the 'Prime Number' field and a valid message.";
        return;
    }

    const publicKey = Math.pow(generator, privateKey) % prime;

    if (party === 'A') {
        document.getElementById('result').textContent = `Public Key of Party A: ${publicKey}`;
        sessionStorage.setItem('publicKeyA', publicKey);
        sessionStorage.setItem('messageA', message);
    } else {
        const publicKeyA = sessionStorage.getItem('publicKeyA');
        const messageA = sessionStorage.getItem('messageA');
        if (publicKeyA) {
            const secretKey = Math.pow(publicKeyA, privateKey) % prime;
            document.getElementById('result').textContent = `Key exchange successful! Secret Key: ${secretKey}\nOriginal Message: ${messageA}`;
        } else {
            document.getElementById('result').textContent = "Key exchange failed. Party A's public key or message missing.";
        }
    }
}