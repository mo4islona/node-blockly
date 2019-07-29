'use strict';

var assert = require('chai').assert;

var Blockly = require('../index.js');

describe('Blockly utils', function() {
  it('string.shortestStringLength should return correct length', function() {
    var len = Blockly.utils.string.shortestStringLength('one,two,three,four,five'.split(','));
    assert.equal(3, len, 'Length of "one"');
    len = Blockly.utils.string.shortestStringLength('one,two,three,four,five,'.split(','));
    assert.equal(0, len, 'Length of ""');
    len = Blockly.utils.string.shortestStringLength(['Hello World']);
    assert.equal(11, len, 'List of one');
    len = Blockly.utils.string.shortestStringLength([]);
    assert.equal(0, len, 'Empty list');
  });
});


