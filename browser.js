var _ = require('lodash');

var Blockly = require('./lib/blockly_compressed_browser');

Blockly.Msg = _.extend(require('./lib/i18n/en'), Blockly.Msg);
Blockly.Msg = Blockly.Msg();

Blockly.Blocks = _.extend(Blockly.Blocks, require('./lib/blocks_compressed_browser')(Blockly));

Blockly.JavaScript = require('./lib/javascript_compressed')(Blockly);
Blockly.Lua = require('./lib/lua_compressed')(Blockly);
Blockly.Dart = require('./lib/dart_compressed')(Blockly);
Blockly.PHP = require('./lib/php_compressed')(Blockly);
Blockly.Python = require('./lib/python_compressed')(Blockly);

module.exports = Blockly;