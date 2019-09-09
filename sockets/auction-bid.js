module.exports.listen = function(io) {
    const request = require('request');
    let auctionBid = io.of('/auction-bid');

    auctionBid.on('connection', (socket) => {

        socket.on('initialBid', (data) => {

            var request = require("request");

            var options = {
                method: 'POST',
                url: data.url,
                headers: {
                    'cache-control': 'no-cache',
                    'Accept' : 'application/json',
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                form: {
                    idauction: data.auctionId
                }
            };

            request(options, function(error, response, body) {
                if (error) throw new Error(error);

                socket.emit('responsInitialBid', body);
            });

        });

    });

    return io;
}
