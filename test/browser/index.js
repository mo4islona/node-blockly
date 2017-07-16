import  Blockly from '../../browser';
import  xmlText from '../xml/if';

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


let editor;
function render(element, toolbox) {
  if( editor ) {
    editor.dispose()
  }
  editor = Blockly.inject(element, {
    toolbox: document.getElementById(toolbox)
  });
}

render('editor', 'toolbox');

document.getElementById('locale').onchange = (e) => {
  import('../../lib/i18n/' + e.target.value).then((locale) => {
    Blockly.setLocale(locale);
    render('editor', 'toolbox');
  })
}