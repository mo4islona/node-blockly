'use strict';

var assert = require('chai').assert;

var Blockly = require('../index.js');

function xmlToPython(xml) {
  try {
    var xml = Blockly.Xml.textToDom(xml);
  }
  catch (e) {
    return ''
  }

  var workspace = new Blockly.Workspace();
  Blockly.Xml.domToWorkspace(workspace, xml);
  return Blockly.Python.workspaceToCode(workspace);
}

describe('PHP Generator', function() {
  it('should convert valid xml to js code', function() {
    var code = xmlToPython('<xml id="startBlocks" style="display: none"><block type="controls_if" inline="false" x="20" y="20"><mutation else="1"></mutation> <value name="IF0"><block type="logic_compare" inline="true"> <field name="OP">EQ</field> <value name="A"><block type="math_arithmetic" inline="true"> <field name="OP">MULTIPLY</field> <value name="A"> <block type="math_number"> <field name="NUM">6</field> </block> </value> <value name="B"> <block type="math_number"><field name="NUM">7</field> </block> </value> </block> </value> <value name="B"> <block type="math_number"> <field name="NUM">42</field> </block> </value> </block> </value> <statement name="DO0"> <block type="text_print" inline="false"> <value name="TEXT"> <block type="text"> <field name="TEXT">Dont panic</field> </block> </value> </block> </statement> <statement name="ELSE"> <block type="text_print" inline="false"> <value name="TEXT"> <block type="text"> <field name="TEXT">Panic</field> </block> </value> </block> </statement> </block></xml>');

    assert.equal(code, 'if 6 * 7 == 42:\n  print(\'Dont panic\')\nelse:\n  print(\'Panic\')\n')
  });

  it('should convert invalid xml to empty string', function() {
    var code = xmlToPython('<block type="math_number"><field name="NUM">42</field></block>');

    assert.equal(code, '')
  });
});


