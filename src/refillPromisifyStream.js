'use strict';

var endOfStream = require('end-of-stream');
var streamConsume = require('stream-consume');

function refillPromisifyStream(stream) {

  return new Promise(function (resolve, reject) {

    endOfStream(stream, function(error) {

      if (error) {
        reject(error);
        return;
      }

      resolve(stream);

    });

    streamConsume(stream);

  });

}

module.exports = refillPromisifyStream;
