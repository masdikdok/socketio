module.exports.listen = function(io) {
    const request = require('request');
    let auctionBid = io.of('/auction-bid');

    auctionBid.on('connection', (socket) => {

        socket.on('initialBid', (data) => {

            // request.post('https://flaviocopes.com/todos', {
            //     json: {
            //         todo: 'Buy the milk'
            //     }
            // }, (error, res, body) => {
            //     if (error) {
            //         console.error(error)
            //         return
            //     }
            //     console.log(`statusCode: ${res.statusCode}`)
            //     console.log(body)
            // });

            var result = "Berhasil kirim data " + data;

            auction.emit(responsInitialBid, result);

        });

    });

    return io;
}
