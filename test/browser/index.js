import  Blockly from '../../browser';
import  xmlText from '../xml/if';

import De from '../../lib/i18n/de';
Blockly.setLocale(De)

let xml;
try {
  xml = Blockly.Xml.textToDom(xmlText);
}
catch (e) {
  console.error(e);
}

const workspace = new Blockly.Workspace();
Blockly.Xml.domToWorkspace(xml, workspace);

document.getElementById('js').innerText = Blockly.JavaScript.workspaceToCode(workspace)
document.getElementById('php').innerText = Blockly.PHP.workspaceToCode(workspace)
document.getElementById('lua').innerText = Blockly.Lua.workspaceToCode(workspace)
document.getElementById('dart').innerText = Blockly.Dart.workspaceToCode(workspace)
document.getElementById('python').innerText = Blockly.Python.workspaceToCode(workspace)

const editor = Blockly.inject('editor', {
  toolbox: document.getElementById('toolbox')
});