/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global define, $, brackets, window */

/** Simple extension that adds a "File > Hello World" menu item */
define(function(require, exports, module) {
    "use strict";

    let CommandManager = brackets.getModule("command/CommandManager"),
        EditorManager = brackets.getModule("editor/EditorManager"),
        KeyBindingManager = brackets.getModule("command/KeyBindingManager"),
        keyConvertPasteWin = "Ctrl-Alt-V",
        keyConvertPasteMac = "Cmd-Alt-V",
        NodeDomain = brackets.getModule("utils/NodeDomain"),
        ExtensionUtils = brackets.getModule("utils/ExtensionUtils");

    let domain = new NodeDomain("json2ts", ExtensionUtils.getModulePath(module, "node/extension"));
    domain.on("typescriptResult", (info, result) => {
        let editor = EditorManager.getCurrentFullEditor();
        let cursorPos = editor.getCursorPos();
        editor.document.replaceRange(result, cursorPos, cursorPos);
    });

    function convertJsonToTs() {
        domain.exec("convert");
    }

    // First, register a command - a UI-less object associating an id to a handler
    let MY_COMMAND_ID = "clipboard.json2ts";
    CommandManager.register("json2ts", MY_COMMAND_ID, convertJsonToTs);

    KeyBindingManager.addBinding(MY_COMMAND_ID, keyConvertPasteWin);
    KeyBindingManager.addBinding(MY_COMMAND_ID, keyConvertPasteMac);
});
