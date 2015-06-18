'use strict';

var assert = require('chai').assert;

var Blockly = require('../index.js');

var XML_TEXT = [
  '<xml xmlns="http://www.w3.org/1999/xhtml">',
  '  <block type="controls_repeat_ext" id="10" inline="true" x="21" y="23">',
  '    <value name="TIMES">',
  '      <block type="math_number" id="11">',
  '        <field name="NUM">10</field>',
  '      </block>',
  '    </value>',
  '    <statement name="DO">',
  '      <block type="variables_set" id="139" inline="true">',
  '        <field name="VAR">item</field>',
  '        <value name="VALUE">',
  '          <block type="lists_create_empty" id="171"></block>',
  '        </value>',
  '        <next>',
  '          <block type="text_print" id="78" inline="false">',
  '            <value name="TEXT">',
  '              <block type="text" id="189">',
  '                <field name="TEXT">Hello</field>',
  '              </block>',
  '            </value>',
  '          </block>',
  '        </next>',
  '      </block>',
  '    </statement>',
  '  </block>',
  '</xml>'
].join('/n');

describe('XML', function() {
  it('textToDom', function() {
    var dom = Blockly.Xml.textToDom(XML_TEXT);
    assert.equal('xml', dom.nodeName, 'XML tag');
    assert.equal(6, dom.getElementsByTagName('block').length, 'Block tags');
  });

  it('domToText', function() {
    var dom = Blockly.Xml.textToDom(XML_TEXT);
    var text = Blockly.Xml.domToText(dom);

    assert.equal(XML_TEXT.replace(/\s+/g, ''), text.replace(/\s+/g, ''), 'Round trip');
  });

  it('domToPrettyText', function() {
    var dom = Blockly.Xml.textToDom(XML_TEXT);
    var text = Blockly.Xml.domToPrettyText(dom);
    assert.equal(XML_TEXT.replace(/\s+/g, ''), text.replace(/\s+/g, ''), 'Round trip');
  });
});