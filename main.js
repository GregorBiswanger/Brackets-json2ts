/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global define, $, brackets, window */
/** Simple extension that adds a "File > Hello World" menu item */
define(function (require, exports, module) {
    "use strict";
    var CommandManager = brackets.getModule("command/CommandManager"), EditorManager = brackets.getModule("editor/EditorManager"), KeyBindingManager = brackets.getModule("command/KeyBindingManager"), keyConvertJsonPasteWin = "Ctrl-Alt-V", keyConvertJsonPasteMac = "Cmd-Alt-V", keyConvertUrlPasteWin = "Ctrl-Alt-X", keyConvertUrlPasteMac = "Cmd-Alt-X", NodeDomain = brackets.getModule("utils/NodeDomain"), ExtensionUtils = brackets.getModule("utils/ExtensionUtils");
    var domain = new NodeDomain("json2ts", ExtensionUtils.getModulePath(module, "node/extension"));
    domain.on("typescriptResult", function (info, result) {
        var editor = EditorManager.getCurrentFullEditor();
        var cursorPos = editor.getCursorPos();
        editor.document.replaceRange(result, cursorPos, cursorPos);
    });
    function convertFromClipboardJsonToTs() {
        domain.exec("convertFromJson");
    }
    function convertFromClipboardUrlJsonToTs() {
        domain.exec("convertFromUrl");
    }
    // First, register a command - a UI-less object associating an id to a handler
    var CLIPBOARD_JSON_COMMAND_ID = "clipboard.string.json2ts";
    var CLIPBOARD_URL_COMMAND_ID = "clipboard.url.json2ts";
    CommandManager.register("json2ts", CLIPBOARD_JSON_COMMAND_ID, convertFromClipboardJsonToTs);
    CommandManager.register("json2ts", CLIPBOARD_URL_COMMAND_ID, convertFromClipboardUrlJsonToTs);
    KeyBindingManager.addBinding(CLIPBOARD_JSON_COMMAND_ID, keyConvertJsonPasteWin);
    KeyBindingManager.addBinding(CLIPBOARD_JSON_COMMAND_ID, keyConvertJsonPasteMac);
    KeyBindingManager.addBinding(CLIPBOARD_URL_COMMAND_ID, keyConvertUrlPasteWin);
    KeyBindingManager.addBinding(CLIPBOARD_URL_COMMAND_ID, keyConvertUrlPasteMac);
});
