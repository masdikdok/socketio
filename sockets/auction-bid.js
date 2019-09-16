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

        setInterval(function(){
            var options = {
                method: 'POST',
                url: urlApi + "/checkAuctionExpired",
                headers: {
                    'cache-control': 'no-cache',
                    'Accept': 'application/json',
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            };

            request(options, function(error, response, body) {
                if (error) throw new Error(error);

                var hasilRequest = body;

                if(hasilRequest.result){
                    auctionBid.emit('checkAuctionExpired', hasilRequest.data);
                }

            });

        }, 900000);

    });


    return io;
}
