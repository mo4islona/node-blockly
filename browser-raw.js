var _ = require('lodash');

var Blockly = require('./lib/blockly_compressed_browser');

Blockly.Msg = _.extend(require('./lib/i18n/en'), Blockly.Msg);
Blockly.Msg = Blockly.Msg();

Blockly.Blocks = _.extend(Blockly.Blocks, require('./lib/blocks_compressed_browser')(Blockly));

module.exports = Blockly;
