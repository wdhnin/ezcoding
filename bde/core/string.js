/**
 * @license
 * Visual Blocks Editor
 * 
 *
 * Copyright 2012 Google Inc.
 * https://developers.google.com/blockly/
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Utility functions for handling variables.
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';

goog.provide('Blockly.String');

// TODO(scr): Fix circular dependencies
// goog.require('Blockly.Block');
goog.require('Blockly.Workspace');
goog.require('goog.string');


/**
 * Category to separate variable names from procedures and generated functions.
 */
Blockly.String.NAME_TYPE = 'STRING';

/**
 * Find all user-created variables.
 * @param {!Blockly.Block|!Blockly.Workspace} root Root block or workspace.
 * @return {!Array.<string>} Array of variable names.
 */
Blockly.String.allString = function(root) {
    var blocks;
    if (root.getDescendants) {
        // Root is Block.
        blocks = root.getDescendants();
    } else if (root.getAllBlocks) {
        // Root is Workspace.
        blocks = root.getAllBlocks();
    } else {
        throw 'Not Block or Workspace: ' + root;
    }
    var variableHash = Object.create(null);
    // Iterate through every block and add each variable to the hash.
    for (var x = 0; x < blocks.length; x++) {
        if (blocks[x].getString) {
            var blockString = blocks[x].getString();
            for (var y = 0; y < blockString.length; y++) {
                var varName = blockString[y];
                // Variable name may be null if the block is only half-built.
                if (varName) {
                    variableHash[varName.toLowerCase()] = varName;
                }
            }
        }
    }
    // Flatten the hash into a list.
    var stringList = [];
    for (var name in variableHash) {
        stringList.push(variableHash[name]);
    }
    return stringList;
};

/**
 * Find all instances of the specified variable and rename them.
 * @param {string} oldName Variable to rename.
 * @param {string} newName New variable name.
 * @param {!Blockly.Workspace} workspace Workspace rename variables in.
 */
Blockly.String.renameString = function(oldName, newName, workspace) {
    var blocks = workspace.getAllBlocks();
    // Iterate through every block.
    for (var i = 0; i < blocks.length; i++) {
        if (blocks[i].renameString) {
            blocks[i].renameString(oldName, newName);
        }
    }
};

/**
 * Construct the blocks required by the flyout for the variable category.
 * @param {!Blockly.Workspace} workspace The workspace contianing variables.
 * @return {!Array.<!Element>} Array of XML block elements.
 */
Blockly.String.flyoutCategory = function(workspace) {

    var stringList = Blockly.String.allString(workspace);
    stringList.sort(goog.string.caseInsensitiveCompare);
    // In addition to the user's variables, we also want to display the default
    // variable name at the top.  We also don't want this duplicated if the
    // user has created a variable of the same name.
    goog.array.remove(stringList, Blockly.Msg.VARIABLES_DEFAULT_NAME);
    stringList.unshift(Blockly.Msg.VARIABLES_DEFAULT_NAME);

    var xmlList = [];

    //
    if (Blockly.Blocks['string_declare']) {
        // <block type="variables_set" gap="8">
        //   <field name="VAR">item</field>
        // </block>
        var block = goog.dom.createDom('block');
        block.setAttribute('type', 'string_declare');
        xmlList.push(block);
    }
    //

    for (var i = 1; i < stringList.length; i++) {
        if (Blockly.Blocks['string_set']) {
            // <block type="variables_set" gap="8">
            //   <field name="VAR">item</field>
            // </block>
            var block = goog.dom.createDom('block');
            block.setAttribute('type', 'string_set');
            if (Blockly.Blocks['string_get']) {
                block.setAttribute('gap', 8);
            }
            var field = goog.dom.createDom('field', null, stringList[i]);
            field.setAttribute('name', 'VAR');
            block.appendChild(field);
            xmlList.push(block);
        }
        if (Blockly.Blocks['string_get']) {
            // <block type="variables_get" gap="24">
            //   <field name="VAR">item</field>
            // </block>
            var block = goog.dom.createDom('block');
            block.setAttribute('type', 'string_get');
            if (Blockly.Blocks['string_set']) {
                block.setAttribute('gap', 24);
            }
            var field = goog.dom.createDom('field', null, stringList[i]);
            field.setAttribute('name', 'VAR');
            block.appendChild(field);
            xmlList.push(block);
        }
        //
        if (Blockly.Blocks['string_charat']) {
            // <block type="variables_get" gap="24">
            //   <field name="VAR">item</field>
            // </block>
            var block = goog.dom.createDom('block');
            block.setAttribute('type', 'string_charat');
            if (Blockly.Blocks['string_charat']) {
                block.setAttribute('gap', 24);
            }
            var field = goog.dom.createDom('field', null, stringList[i]);
            field.setAttribute('name', 'VAR');
            block.appendChild(field);
            xmlList.push(block);
        }
        //
        //
        if (Blockly.Blocks['string_compareto']) {
            // <block type="variables_get" gap="24">
            //   <field name="VAR">item</field>
            // </block>
            var block = goog.dom.createDom('block');
            block.setAttribute('type', 'string_compareto');
            if (Blockly.Blocks['string_compareto']) {
                block.setAttribute('gap', 24);
            }
            var field = goog.dom.createDom('field', null, stringList[i]);
            field.setAttribute('name', 'VAR');
            block.appendChild(field);
            xmlList.push(block);
        }
        //
        //
        if (Blockly.Blocks['string_concat']) {
            // <block type="variables_get" gap="24">
            //   <field name="VAR">item</field>
            // </block>
            var block = goog.dom.createDom('block');
            block.setAttribute('type', 'string_concat');
            if (Blockly.Blocks['string_concat']) {
                block.setAttribute('gap', 24);
            }
            var field = goog.dom.createDom('field', null, stringList[i]);
            field.setAttribute('name', 'VAR');
            block.appendChild(field);
            xmlList.push(block);
        }
        //
        //
        if (Blockly.Blocks['string_lengthof']) {
            // <block type="variables_get" gap="24">
            //   <field name="VAR">item</field>
            // </block>
            var block = goog.dom.createDom('block');
            block.setAttribute('type', 'string_lengthof');
            if (Blockly.Blocks['string_lengthof']) {
                block.setAttribute('gap', 24);
            }
            var field = goog.dom.createDom('field', null, stringList[i]);
            field.setAttribute('name', 'VAR');
            block.appendChild(field);
            xmlList.push(block);
        }
        //    

        //
        if (Blockly.Blocks['string_endswith']) {
            // <block type="variables_get" gap="24">
            //   <field name="VAR">item</field>
            // </block>
            var block = goog.dom.createDom('block');
            block.setAttribute('type', 'string_endswith');
            if (Blockly.Blocks['string_endswith']) {
                block.setAttribute('gap', 24);
            }
            var field = goog.dom.createDom('field', null, stringList[i]);
            field.setAttribute('name', 'VAR');
            block.appendChild(field);
            xmlList.push(block);
        }
        //    

        //
        if (Blockly.Blocks['string_equalto']) {
            // <block type="variables_get" gap="24">
            //   <field name="VAR">item</field>
            // </block>
            var block = goog.dom.createDom('block');
            block.setAttribute('type', 'string_equalto');
            if (Blockly.Blocks['string_equalto']) {
                block.setAttribute('gap', 24);
            }
            var field = goog.dom.createDom('field', null, stringList[i]);
            field.setAttribute('name', 'VAR');
            block.appendChild(field);
            xmlList.push(block);
        }
        //    



    }
    return xmlList;
};

/**
 * Return a new variable name that is not yet being used. This will try to
 * generate single letter variable names in the range 'i' to 'z' to start with.
 * If no unique name is located it will try 'i' to 'z', 'a' to 'h',
 * then 'i2' to 'z2' etc.  Skip 'l'.
 * @param {!Blockly.Workspace} workspace The workspace to be unique in.
 * @return {string} New variable name.
 */
Blockly.String.generateUniqueName = function(workspace) {
    var stringList = Blockly.String.allString(workspace);
    var newName = '';
    if (stringList.length) {
        var nameSuffix = 1;
        var letters = 'ijkmnopqrstuvwxyzabcdefgh'; // No 'l'.
        var letterIndex = 0;
        var potName = letters.charAt(letterIndex);
        while (!newName) {
            var inUse = false;
            for (var i = 0; i < stringList.length; i++) {
                if (stringList[i].toLowerCase() == potName) {
                    // This potential name is already used.
                    inUse = true;
                    break;
                }
            }
            if (inUse) {
                // Try the next potential name.
                letterIndex++;
                if (letterIndex == letters.length) {
                    // Reached the end of the character sequence so back to 'i'.
                    // a new suffix.
                    letterIndex = 0;
                    nameSuffix++;
                }
                potName = letters.charAt(letterIndex);
                if (nameSuffix > 1) {
                    potName += nameSuffix;
                }
            } else {
                // We can use the current potential name.
                newName = potName;
            }
        }
    } else {
        newName = 'i';
    }
    return newName;
};