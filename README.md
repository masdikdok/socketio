# socketio

Ini adalah contoh aplikasi socket.io sederhana yang berisi fitur chat group secara real time.

Pada aplikasi ini, source server nya dapat digunakan untuk mengembangkan aplikasi real time menggunakan module socket.io yang tersedia di node.js. Cara penggunaannya seperti berikut :
1. Tambahkan link source server socket.io aplikasi ini pada aplikasi yang hendak anda kembangkan. Contoh :
<script src="https://masdikdok.herokuapp.com/socket.io/socket.io.js"></script>
2. Buatlah file sockets untuk sisi server aplikasi anda di folder sockets.
contoh struktur filenya :

module.exports.listen = function(io){
    let chat = io.of('/chat'); => '/chat' adalah namespace

    chat.on('connection', (socket) => {

        // Fungsi untuk menerima action dari client
        socket.on('userConnect', (data) => {
            ...

            // Fungsi untuk mengirim balasan action ke client
            chat.emit('cekChatPrivate', data);
        });        

    });

    return io;
}

3. Buatlah file sockets untuk sisi client aplikasi anda. Gunakanlah namespace untuk mempermudah pengembangan aplikasi anda.
Contoh penerapan socket.io di sisi client :

let socket = io.connect('/chat');

keterangan : '/chat' adalah namespace yang digunakan pada sockets di sisi server.
