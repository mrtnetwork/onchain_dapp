// app.js
const express = require('express');
const path = require('path');
const app = express();
const port = 3000;
app.use(express.static(path.join(__dirname, 'public')));
app.get('/scripts/stellar_sdk_js', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'pages/eth_eip.html'));
});
app.get('/eth_eip', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'pages/eth_eip.html'));
});
app.get('/tron_tip', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'pages/tron_tip.html'));
});
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
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
app.get('/webview_page', (req, res) => {
  res.download(path.join(__dirname, 'public', 'webview_page.js'), 'webview.js', (err) => {
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

app.get('/ws_bitcoin', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'pages/bitcoin.html'));
});


app.get('/ws_ton', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'pages/ws_ton.html'));
});

app.get('/ws_stellar', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'pages/ws_stellar.html'));
});
app.get('/ws_aptos', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'pages/ws_aptos.html'));
});
app.get('/ws_sui', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'pages/ws_sui.html'));
}); app.get('/ws_solana', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'pages/ws_solana.html'));
});

app.get('/ws_substrate', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'pages/ws_substrate.html'));
});

app.get('/ws_eth', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'pages/ws_eth.html'));
});
app.get('/ws_tron', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'pages/ws_tron.html'));
});

app.get('/ws_cosmos', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'pages/ws_cosmos.html'));
});