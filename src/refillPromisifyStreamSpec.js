'use strict';

var proxyquire = require('proxyquire');

describe('refillPromisifyStream', function() {

  beforeEach(function() {

    this.stream = {};
    this.endOfStream = jasmine.createSpy('endOfStream');
    this.streamConsume = jasmine.createSpy('streamConsume');
    this.refillPromisifyStream = proxyquire('./refillPromisifyStream', {
      'end-of-stream': this.endOfStream,
      'stream-consume': this.streamConsume
    });

  });

  it('should consume stream', function() {
    this.refillPromisifyStream(this.stream);
    expect(this.streamConsume).toHaveBeenCalledWith(this.stream);
  });

  it('when stream ends should resolve promise with stream', function(next) {

    var that = this;

    this.refillPromisifyStream(this.stream)
      .then(function(resolver) {
        expect(resolver).toBe(that.stream);
        next();
      });

    this.endOfStream.calls.argsFor(0)[1]();

  });

  it('when stream have error should reject promise with this error', function(next) {

    var error = 'error message';

    this.refillPromisifyStream(this.stream)
      .catch(function(rejecter) {
        expect(rejecter).toBe(error);
        next();
      });

    this.endOfStream.calls.argsFor(0)[1](error);

  });

});
