module.exports.listen = function(io) {
    const request = require('request');

    let auctionBid = io.of('/auction-bid');
    let urlApi = '';

    auctionBid.on('connection', (socket) => {
        socket.on('setUrlApi', (data) => {
            urlApi = data;
        });

        socket.on('updateDataFaktual', (data) => {
            socket.broadcast.emit('responseUpdateDataFaktual', data);
        });

    });


    return io;
}
