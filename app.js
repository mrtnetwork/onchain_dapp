// app.js
const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.get('/scripts/stellar_sdk_js', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'pages/eth_eip.html'));
});
app.get('/eth_standard', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'pages/eth_eip.html'));
});
app.get('/solana_standard', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'pages/solana_standard.html'));
});
app.get('/tron_standard', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'pages/tron_tip.html'));
});
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/eth_wallet', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'pages/eth_wallet.html'));
});
app.get('/tron_wallet', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'pages/tron_wallet.html'));
});
app.get('/solana_wallet', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'pages/solana_wallet.html'));
});

app.get('/ton_wallet', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'pages/ton_wallet.html'));
});
app.get('/stellar_wallet', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'pages/stellar_wallet.html'));
});
app.get('/eth', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'eth.html'));
});
app.get('/solana', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'solana.html'));
});
app.get('/ton', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'ton.html'));
});
app.get('/tonconnect-manifest.json', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'ton-connect-manifest.json'));
});
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
app.get('/webview', (req, res) => {
  res.download(path.join(__dirname, 'public', 'webview.js'), 'webview.js', (err) => {
    if (err) {
      console.error('Error downloading file:', err);
      res.status(500).send('Internal Server Error');
    }
  });
});
app.get('/tronweb', (req, res) => {
  res.download(path.join(__dirname, 'public', 'tronweb.js'), 'tronweb.js', (err) => {
    if (err) {
      console.error('Error downloading file:', err);
      res.status(500).send('Internal Server Error');
    }
  });
});