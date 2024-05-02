const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Mengirim file index.html saat ada permintaan GET pada root
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Menangani koneksi socket
io.on('connection', (socket) => {
  console.log('User terhubung');

  // Menangani pesan yang dikirim oleh pengguna
  socket.on('chat message', (data) => {
    console.log('Pesan baru:', data.message);
    // Mengirim pesan, nama pengirim, dan foto profil ke semua pengguna
    io.emit('chat message', { message: data.message, username: data.username, profilePicture: data.profilePicture });
  });

  // Menangani peristiwa saat pengguna terputus
  socket.on('disconnect', () => {
    console.log('User terputus');
  });
});

// Mendengarkan pada port 3000
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server berjalan pada port ${PORT}`);
});