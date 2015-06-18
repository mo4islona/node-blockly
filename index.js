'use strict';

var _ = require('lodash');

var Blockly = require('./lib/blockly_compressed');

Blockly.Msg = _.extend(require('./lib/i18n/en'), Blockly.Msg);
Blockly.Blocks = _.extend(Blockly.Blocks, require('./lib/blocks_compressed')(Blockly));
Blockly.JavaScript = require('./lib/javascript_compressed')(Blockly);

var workspace = new Blockly.Workspace();

module.exports = {
  addBlocks: function(name, blocks, generators) {
    Blockly.Blocks[name] = blocks;
    Blockly.JavaScript[name] = generators;
  },
  clearBlocks: function(name) {
    delete Blockly.Blocks[name];
    delete Blockly.JavaScript[name];
  },
  xmlToJs: function(xml) {
    try {
      var xml = Blockly.Xml.textToDom(xml);

      Blockly.Xml.domToWorkspace(workspace, xml);

      return Blockly.JavaScript.workspaceToCode(workspace);
    }
    catch (e) {
      return null;
    }
  }
}