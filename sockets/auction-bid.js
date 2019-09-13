module.exports.listen = function(io) {
    const request = require('request');
    let auctionBid = io.of('/auction-bid');

    auctionBid.on('connection', (socket) => {

        socket.on('updateDataFaktual', (data) => {
            socket.broadcast.emit('responseUpdateDataFaktual', data);
        });

    });

    return io;
}
