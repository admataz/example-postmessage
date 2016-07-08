var static = require('node-static-alias');
var http = require('http');
var path = require('path');
//
// Create a node-static server instance to serve the './public' folder
//
var pci = new static.Server('./pci', { serverInfo: "pciserver" });
var payment = new static.Server('./payment', { serverInfo: "webserver" });





http.createServer(function (request, response) {
    request.addListener('end', function () {
        pci.serve(request, response);
    }).resume();
}).listen(8080);



console.log('Payment page running at http://127.0.0.1:8081');
