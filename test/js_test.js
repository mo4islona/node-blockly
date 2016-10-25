'use strict';

var assert = require('chai').assert;

var Blockly = require('../index.js'),
    ifBlockXml = require('./xml/if');


var res = `if (6 * 7 == 42) {
  window.alert('Dont panic');
} else {
  window.alert('Panic');
}
`

function xmlToJs(xml) {
  try {
    var xml = Blockly.Xml.textToDom(xml);
  }
  catch (e) {
    console.log(e);
    return ''
  }

  var workspace = new Blockly.Workspace();
  Blockly.Xml.domToWorkspace(xml, workspace);
  return Blockly.JavaScript.workspaceToCode(workspace);
}

describe('JS Generator', function() {
  it('should convert valid xml to js code', function() {
    var code = xmlToJs(ifBlockXml);

    assert.equal(code, res)
  });

  it('should convert invalid xml to empty string', function() {
    var code = xmlToJs('<block type="math_number"><field name="NUM">42</field></block>');

    assert.equal(code, '')
  });
});


