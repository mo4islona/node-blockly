import Blockly from '../../browser';

let editor;

function render(element, toolbox) {
  if( editor ) {
    editor.dispose()
  }
  return Blockly.inject(element, {
    toolbox: document.getElementById(toolbox)
  });
}

function updateCode() {
  document.getElementById('js').innerText = Blockly.JavaScript.workspaceToCode(editor)
  document.getElementById('php').innerText = Blockly.PHP.workspaceToCode(editor)
  document.getElementById('lua').innerText = Blockly.Lua.workspaceToCode(editor)
  document.getElementById('dart').innerText = Blockly.Dart.workspaceToCode(editor)
  document.getElementById('python').innerText = Blockly.Python.workspaceToCode(editor)
}

editor = render('editor', 'toolbox');
Blockly.Xml.domToWorkspace(document.getElementById('startBlocks'), editor);

editor.addChangeListener(updateCode);
updateCode();

document.getElementById('locale').onchange = (e) => {
  import('../../lib/i18n/' + e.target.value).then((locale) => {
    Blockly.setLocale(locale);
    editor = render('editor', 'toolbox');
  })
}