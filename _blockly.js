const _ = require('lodash');

const Blockly = require('./lib/blockly_compressed');

Blockly.setLocale = function(locale) {
  Blockly.Msg = _.extend(locale, Blockly.Msg);
  Blockly.Msg = Blockly.Msg();
}

Blockly.setLocale(require('./lib/i18n/en'))

Blockly.Blocks = _.extend(Blockly.Blocks, require('./lib/blocks_compressed')(Blockly));

module.exports = Blockly;