'use strict';

var assert = require('chai').assert;

var Blockly = require('../index.js'),
  ifBlockXml = require('./xml/if');


var res = `if (6 * 7 == 42) {
  window.alert('Dont panic');
} else {
  window.alert('Panic');
}
`

function xmlToJs(xml) {
  try {
    xml = Blockly.Xml.textToDom(xml);
  } catch (e) {
    return ''
  }

  var workspace = new Blockly.Workspace();
  Blockly.Xml.domToWorkspace(xml, workspace);
  return Blockly.JavaScript.workspaceToCode(workspace);
}

describe('JS Generator', function () {
  it('should convert valid xml to js code', function () {
    var code = xmlToJs(ifBlockXml);

    assert.equal(code, res)
  });

  it('should convert invalid xml to empty string', function () {
    var code = xmlToJs('<block type="math_number"><field name="NUM">42</field></block>');

    assert.equal(code, '')
  });


  it('should convert for loop', function () {
    var code = xmlToJs(`<xml xmlns="http://www.w3.org/1999/xhtml">
  <variables></variables>
  <block type="controls_repeat_ext" id="(BFo|WQ,-6A?iUwjWMq*" x="238" y="63">
    <value name="TIMES">
      <shadow type="math_number" id="QU(s4?wLG]]%mQZ:pPQP">
        <field name="NUM">10</field>
      </shadow>
    </value>
  </block>
</xml>`);

    assert.equal(code, `for (var count = 0; count < 10; count++) {\n}\n`)
  });

  it('should convert example with variables', function () {
    var code = xmlToJs(`
    <xml xmlns="http://www.w3.org/1999/xhtml">
      <variables>
        <variable type="" id="j:|seQ!Cb:h%]r.Nv:%Y">left_sensor</variable>
        <variable type="" id="FJ]G9nydQGLnneo:ZbqE">right_sensor</variable>
        <variable type="" id="u?-rKl3vhHz+uDeW^7P|">speed</variable>
        <variable type="" id="G0Chi5P*a^O=e,BqIQOa">engineTorque</variable>
        <variable type="" id="_EjEfOO,oBya{dHE*8os">breakingTorque</variable>
        <variable type="" id="(J~4Dn0U.UWbd8EOTxb_">steeringAngle</variable>
      </variables>
  <block type="procedures_defreturn" id="Yl60#PO2|*uWo/.!BTri" x="22" y="17">
    <mutation>
      <arg name="left_sensor" varid="j:|seQ!Cb:h%]r.Nv:%Y"></arg>
      <arg name="right_sensor" varid="FJ]G9nydQGLnneo:ZbqE"></arg>
      <arg name="speed" varid="u?-rKl3vhHz+uDeW^7P|"></arg>
    </mutation>
    <field name="NAME">control</field>
   
    <statement name="STACK">
      <block type="variables_set" id="O]OFir;j96=k,9,RK.s#">
        <field name="VAR" id="G0Chi5P*a^O=e,BqIQOa" variabletype="">engineTorque</field>
        <value name="VALUE">
          <block type="math_number" id="g-NlG|U!heP1m+5As\`/4">
            <field name="NUM">0</field>
          </block>
        </value>
        <next>
          <block type="variables_set" id="=/@aA6R=aBsQf:piGb\`6">
            <field name="VAR" id="_EjEfOO,oBya{dHE*8os" variabletype="">breakingTorque</field>
            <value name="VALUE">
              <block type="math_number" id="B}7$u)csO]L0VC?+HueC">
                <field name="NUM">0</field>
              </block>
            </value>
            <next>
              <block type="variables_set" id="[?y0jg4n7\`)tOpm_yVa:">
                <field name="VAR" id="(J~4Dn0U.UWbd8EOTxb_" variabletype="">steeringAngle</field>
                <value name="VALUE">
                  <block type="math_number" id="^VH5^TrMjwGZ+y]@[/8Z">
                    <field name="NUM">0</field>
                  </block>
                </value>
              </block>
            </next>
          </block>
        </next>
      </block>
    </statement>
    <value name="RETURN">
      <block type="lists_create_with" id="027yG)#OYYGcKX0|@NI4">
        <mutation items="3"></mutation>
        <value name="ADD0">
          <block type="variables_get" id="iFM]Ho}p0py|QqEAi?/u">
            <field name="VAR" id="G0Chi5P*a^O=e,BqIQOa" variabletype="">engineTorque</field>
          </block>
        </value>
        <value name="ADD1">
          <block type="variables_get" id="=sJ.^7rxVo/acsD3KGu8">
            <field name="VAR" id="_EjEfOO,oBya{dHE*8os" variabletype="">breakingTorque</field>
          </block>
        </value>
        <value name="ADD2">
          <block type="variables_get" id=":![\`-}#*aHZA{$IW+utl">
            <field name="VAR" id="(J~4Dn0U.UWbd8EOTxb_" variabletype="">steeringAngle</field>
          </block>
        </value>
      </block>
    </value>
  </block>
</xml>
`);
    assert.equal(code.replace(/([\;\{\}\)\,])\s+/g, '$1'), `var left_sensor,right_sensor,speed,engineTorque,breakingTorque,steeringAngle;function control(left_sensor,right_sensor,speed){engineTorque = 0;breakingTorque = 0;steeringAngle = 0;return [engineTorque,breakingTorque,steeringAngle];}`)
  });

  it('should convert xml with shadows', function () {
    var code = xmlToJs(`<xml>
  <block type="controls_if" id="hK2]_dlpI+nf6ePQ4kvv" x="68" y="60">
    <value name="IF0">
      <block type="logic_compare" id=":g:5$YT#TQ@-,#\`R::k!">
        <field name="OP">EQ</field>
        <value name="A">
          <block type="math_arithmetic" id="CT/qv/xz7FmADrS7O{(j">
            <field name="OP">ADD</field>
            <value name="A">
              <shadow type="math_number" id="@8XPI]MO\`reN!WFIzl13">
                <field name="NUM">1</field>
              </shadow>
            </value>
            <value name="B">
              <shadow type="math_number" id="rsMjwK+M!rD,jb@Drv/H">
                <field name="NUM">1</field>
              </shadow>
            </value>
          </block>
        </value>
        <value name="B">
          <block type="math_number" id="/h!vy1;=}gShAka/A{/c">
            <field name="NUM">2</field>
          </block>
        </value>
      </block>
    </value>
  </block>
</xml>`);
    assert.equal(code, 'if (1 + 1 == 2) {\n}\n')
  });
});
