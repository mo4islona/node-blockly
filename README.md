# Blockly comes to Node.js

Supports `JavaScript`, `PHP`, `Dart`, `Lua` and `Python` generators.



**Install**
```
npm install node-blockly
```

**Usage**

To use all generators
```js
var Blockly = require('node-blockly');
```

or you may use only standalone generators to decrease memory usage
```js 
var Blockly = require('node-blockly/lua');
```

**Example**

```js
var Blockly = require('node-blockly');

var xmlText = `<xml xmlns="http://www.w3.org/1999/xhtml">
        <block type="variables_set">
            <field name="VAR">blockly</field>
            <value name="VALUE">
                <block type="text">
                    <field name="TEXT">Hello Node.js!</field>
                </block>
            </value>
        </block>
    </xml>`;

try {
    var xml = Blockly.Xml.textToDom(xmlText);
}
catch (e) {
    console.log(e);
    return
}

var workspace = new Blockly.Workspace();
Blockly.Xml.domToWorkspace(xml, workspace);
var code = Blockly.JavaScript.workspaceToCode(workspace);

console.log(code)  
```
Compiled result

```js
var blockly; 

blockly = 'Hello Node.js!';
```
