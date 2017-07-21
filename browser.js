var _ = require('lodash');

var Blockly = require('./lib/blockly_compressed_browser');

var locales = {}

Blockly.setLocale = function(name, locale) {
  if(locales[name]) {
    console.log('EXISTS', name)
    Blockly.Msg = _.extend(locales[name], Blockly.Msg)();
    return
  }

  Blockly.Msg = _.extend(locale, Blockly.Msg)();
  locales[name] = locale
}

Blockly.setLocale('en', require('./lib/i18n/en'))

Blockly.Blocks = _.extend(Blockly.Blocks, require('./lib/blocks_compressed_browser')(Blockly));

Blockly.JavaScript = require('./lib/javascript_compressed')(Blockly);
Blockly.Lua = require('./lib/lua_compressed')(Blockly);
Blockly.Dart = require('./lib/dart_compressed')(Blockly);
Blockly.PHP = require('./lib/php_compressed')(Blockly);
Blockly.Python = require('./lib/python_compressed')(Blockly);

module.exports = Blockly;