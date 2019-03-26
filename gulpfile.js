'use strict';

var gulp = require('gulp'),
  replace = require('gulp-replace'),
  rename = require("gulp-rename"),
  insert = require('gulp-insert');

var _browserRename = function (path) {
  path.basename += "_browser";
};

var document = `var JSDOM = require('jsdom').JSDOM;
      var window = (new JSDOM()).window;
      var document = window.document;`;

function blockly() {
  return gulp.src('blockly/blockly_compressed.js')
    .pipe(replace(/goog\.global\s*=\s*this;/, 'goog.global=global;'))
    .pipe(replace(
      'Blockly.Block.prototype.jsonInitStyle_=function(a,b){var c=a.style;try{this.setStyle(c)}catch(d){console.warn(b+"Style does not exist: ",c)}}',
      'Blockly.Block.prototype.jsonInitStyle_=function(){}'))
    .pipe(insert.wrap(`
      ${document}
      var xmlshim = require('xmlshim');
      var XMLSerializer = xmlshim.XMLSerializer;
      var DOMParser = xmlshim.DOMParser; 
      module.exports = (function(){ // `,
      //....ORIGINAL CODE....
      `Blockly.goog=goog;return Blockly;
      })()`))
    .pipe(gulp.dest('lib'))
}

function blockly_browser() {
  return gulp.src('blockly/blockly_compressed.js')
    .pipe(replace(/goog\.global\s*=\s*this;/, 'goog.global=window;'))
    .pipe(insert.wrap(`
      /* eslint-disable */
      module.exports = (function(){ //`,
      //....ORIGINAL CODE....
      `Blockly.goog=goog;return Blockly;
      })()`))
    .pipe(rename(_browserRename))
    .pipe(gulp.dest('lib'))
}

function blocks() {
  return gulp.src('blockly/blocks_compressed.js')
    .pipe(insert.wrap(`
        module.exports = function(Blockly){
          var goog = Blockly.goog;
          ${document}
          Blockly.Blocks={};`,
      //....ORIGINAL CODE....
      `return Blockly.Blocks;
        }`))
    .pipe(gulp.dest('lib'))
}

function blocks_browser() {
  return gulp.src('blockly/blocks_compressed.js')
    .pipe(insert.wrap(`
        /* eslint-disable */
        module.exports = function(Blockly){
          var goog = Blockly.goog;
          Blockly.Blocks={};`,
      //....ORIGINAL CODE....
      `return Blockly.Blocks;
        }`))
    .pipe(rename(_browserRename))
    .pipe(gulp.dest('lib'))
}

function js() {
  return gulp.src('blockly/javascript_compressed.js')
    .pipe(insert.wrap('module.exports = function(Blockly){', 'return Blockly.JavaScript;}'))
    .pipe(gulp.dest('lib'))
}

function dart() {
  return gulp.src('blockly/dart_compressed.js')
    .pipe(insert.wrap('module.exports = function(Blockly){', 'return Blockly.Dart;}'))
    .pipe(replace(/window\./g, ''))
    .pipe(gulp.dest('lib'))
}

function python() {
  return gulp.src('blockly/python_compressed.js')
    .pipe(insert.wrap('module.exports = function(Blockly){', 'return Blockly.Python;}'))
    .pipe(gulp.dest('lib'))
}

function php() {
  return gulp.src('blockly/php_compressed.js')
    .pipe(insert.wrap('module.exports = function(Blockly){', 'return Blockly.PHP;}'))
    .pipe(gulp.dest('lib'))
}

function lua() {
  return gulp.src('blockly/lua_compressed.js')
    .pipe(insert.wrap('module.exports = function(Blockly){', 'return Blockly.Lua;}'))
    .pipe(gulp.dest('lib'))
}

function i18n() {
  return gulp.src('blockly/msg/js/*.js')
    .pipe(replace(/goog\.[^\n]+/g, ''))
    .pipe(insert.wrap('var Blockly = {}; Blockly.Msg={};  module.exports = function(){ ', 'return Blockly.Msg;}'))
    .pipe(gulp.dest('lib/i18n/'))
}

exports.build = gulp.series(
  blocks,
  blocks_browser,
  blockly,
  blockly_browser,
  i18n,
  js,
  php,
  dart,
  python,
  lua,
);





