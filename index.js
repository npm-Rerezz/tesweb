/*
  SCRIPT CREATE PANEL WEBSITE BY REREZZ OFFICIAL
  BUY SCRIPT https://rerezz_official
  PRICE Rp 30.000
*/

const express = require('express');
const fetch = require('node-fetch');
const path = require('path');
const fs = require('fs');
const app = express();
const port = 3000;

const validKeys = ['IM-REREZZ.2007', 'REREZZ-OFFICIAL.0208'];

const domain = '#'; // ISI DOMAIN PANEL 
const apikey = '#'; // ISI APIKEY PANEL

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.post('/create-server', async (req, res) => {
  const { username, ram, disk, cpu, key } = req.body;
  console.log(`Received key: ${key}`); 
  if (!validKeys.includes(key)) {
    return res.status(403).json({ message: '❌ Kunci key tidak valid!' });
  }
  if (!username || !ram || !disk || !cpu) {
    return res.status(400).json({ message: '❌ Semua input harus diisi!' });
  }
  try {
    const response = await fetch(`https://apis.xyrezz.online-server.biz.id/api/cpanel?domain=${domain}&apikey=${apikey}&username=${username}&ram=${ram}&disk=${disk}&cpu=${cpu}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    if (data.error) {
      return res.status(500).json({ message: `Error: ${data.error}` });
    }
    res.status(200).json({ message: '✅ Server berhasil dibuat!', serverInfo: data });
  } catch (error) {
    res.status(500).json({ message: '❌ Terjadi kesalahan saat membuat server. Harap coba lagi.' });
  }
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
app.get('/rerezz', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'style.css'));
});
app.get('/rerez', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'script.js'));
});

app.get('/domain', (req, res) => {
    res.redirect(`${domain}`); 
});


app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
