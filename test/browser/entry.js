var Blockly = require('node-blockly/browser')


var xmlText = require('../xml/if');

try {
  var xml = Blockly.Xml.textToDom(xmlText);
}
catch (e) {
  console.error(e);
}

var workspace = new Blockly.Workspace();
Blockly.Xml.domToWorkspace(xml, workspace);

document.getElementById('js').innerText = Blockly.JavaScript.workspaceToCode(workspace)
document.getElementById('php').innerText = Blockly.PHP.workspaceToCode(workspace)
document.getElementById('lua').innerText = Blockly.Lua.workspaceToCode(workspace)
document.getElementById('dart').innerText = Blockly.Dart.workspaceToCode(workspace)
document.getElementById('python').innerText = Blockly.Python.workspaceToCode(workspace)