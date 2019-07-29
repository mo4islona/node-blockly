const Blockly = require('./lib/blockly_compressed_browser');

Blockly.setLocale = function (locale) {
  if (typeof locale.default === 'function') {
    Blockly.Msg = Object.assign(Blockly.Msg, locale.default());
  } else {
    Blockly.Msg = Object.assign(locale, Blockly.Msg)();
  }
};

Blockly.setLocale(require('./lib/i18n/en'))

Blockly.Blocks = Object.assign(Blockly.Blocks, require('./lib/blocks_compressed_browser')(Blockly));

module.exports = Blockly;
