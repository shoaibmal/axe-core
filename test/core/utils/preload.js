describe('axe.utils.preload', function() {
	'use strict';

	it('should be a function', function() {
		assert.isFunction(axe.utils.preload);
	});

	it('should return a queue', function() {
		var options = {
			preload: true
		};
		var actual = axe.utils.preload(options);
		assert.isObject(actual);
	});

	it('should ensure queue is defer(able)', function(done) {
		var options = {
			preload: false
		};
		var actual = axe.utils.preload(options);
		actual
			.defer(function(res, rej) {
				assert.isFunction(rej);
				res(true);
				done();
			})
			.catch(function(error) {
				done(error);
			});
	});

	it('should ensure queue is then(able)', function(done) {
		var options = {
			preload: false
		};
		var actual = axe.utils.preload(options);
		actual
			.then(function(results) {
				assert.isDefined(results);
				done();
			})
			.catch(function(error) {
				done(error);
			});
	});

	it('should return an object with property cssom', function(done) {
		var options = {
			preload: {
				assets: ['cssom']
			}
		};
		var actual = axe.utils.preload(options);
		actual
			.then(function(results) {
				assert.isDefined(results);
				assert.isArray(results);
				assert.property(results[0], 'cssom');
				done();
			})
			.catch(function(error) {
				done(error);
			});
	});

	it('should return true if preload configuration is valid', function() {
		var options = {
			preload: true
		};
		var actual = axe.utils.shouldPreload(options);
		assert.isTrue(actual);
	});

	it('should return false if preload configuration is invalid', function() {
		var options = {
			preload: {
				errorProperty: ['cssom']
			}
		};
		var actual = axe.utils.shouldPreload(options);
		assert.isFalse(actual);
	});

	it('should throw error if preload configuration is invalid', function() {
		var actual = function() {
			axe.utils.getPreloadConfig({});
		};
		var expected = Error;
		assert.throws(actual, expected);
	});

	it('should return default assets if preload options is set to true', function() {
		var options = {
			preload: true
		};
		var actual = axe.utils.getPreloadConfig(options).assets;
		var expected = ['cssom'];
		assert.deepEqual(actual, expected);
	});

	it('should return default timeout value if not configured', function() {
		var options = {
			preload: true
		};
		var actual = axe.utils.getPreloadConfig(options).timeout;
		var expected = 10000;
		assert.equal(actual, expected);
	});

	it('should throw error if requested asset type is not supported', function() {
		var options = {
			preload: {
				assets: ['aom']
			}
		};
		var actual = function() {
			axe.utils.getPreloadConfig(options);
		};
		var expected = Error;
		assert.throws(actual, expected);
	});

	it('should throw error if assets array is empty in options for preload', function() {
		var options = {
			preload: {
				assets: []
			}
		};
		var actual = function() {
			axe.utils.getPreloadConfig(options);
		};
		var expected = Error;
		assert.throws(actual, expected);
	});

	it('should unique assets requested if repeated assets are passed via options', function() {
		var options = {
			preload: {
				assets: ['cssom', 'cssom']
			}
		};
		var actual = axe.utils.getPreloadConfig(options);
		assert.property(actual, 'assets');
		assert.containsAllKeys(actual, ['assets', 'timeout']);
		assert.lengthOf(actual.assets, 1);
	});
});