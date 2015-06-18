'use strict';

var assert = require('chai').assert;

var Blockly = require('../index.js');

describe('Blockly', function() {
  it('should convert xml to js code', function() {
    var code = Blockly.xmlToJs('<xml><block type="math_number"><field name="NUM">42</field></block></xml>');

    assert.equal(code, '42;\n')
  });
});


