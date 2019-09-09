module.exports.listen = function(io){
    let jumlahUser = 0;
    let kumpulanUser = {};
    let userMengetik = [];

    function cekSedangMengetik(v) {
        if (userMengetik.indexOf(v) >= 0) {
            return userMengetik;
        } else {
            userMengetik.push(v);
        }
        return userMengetik;
    }

    function hapusArray(array, v) {
        return array.filter(item => item != v);
    }

    function cekUser(v) {
        let val = '';
        for (let key in kumpulanUser) {
            if (key === v) {
                val = key;
            }
        }
        return val;
    }

    let chat = io.of('/chat');

    chat.on('connection', (socket) => {

        socket.on('userConnect', (data) => {
            if (cekUser(data) === '') {
                socket.username = data;
                kumpulanUser[data] = socket.id;
                jumlahUser++;
                socket.emit('setUser', {
                    'userName': data,
                    'userID': socket.id
                });

                chat.emit('updateUser', {
                    'jumlahUser': jumlahUser,
                    'kumpulanUser': kumpulanUser
                });

            } else {
                socket.emit('userExist', 'userName "' + data + '" sudah ada sebelumnya !!');
            }
        });

        socket.on('reloadData', (data) => {
            if (cekUser(data.userNameSocket) === '') {
                kumpulanUser[data.userNameSocket] = data.userIDSocket;
                jumlahUser++;
            }
            chat.emit('updateUser', {
                'jumlahUser': jumlahUser,
                'kumpulanUser': kumpulanUser
            });

        });

        socket.on('userLogout', (data) => {
            delete kumpulanUser[data.userName];
            if (jumlahUser != 0) {
                jumlahUser--;
            }
            chat.emit('updateUser', {
                'jumlahUser': jumlahUser,
                'kumpulanUser': kumpulanUser
            });

            chat.emit('laporanLogout', true);
            chat.emit('cekChatPrivate', data.userName);

        });

        socket.on('grupKeypress', (data) => {
            socket.broadcast.emit('ongrupKeypress', cekSedangMengetik(data));
        });

        socket.on('kirimPesanGrup', (data) => {
            userMengetik = hapusArray(userMengetik, data.pengirim);
            socket.broadcast.emit('ongrupKeypress', userMengetik);
            chat.emit('pesanGrup', data);
        })

    });

    return io;
}
