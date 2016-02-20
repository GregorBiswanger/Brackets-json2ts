(function () {
    "use strict";
    var copyPaste = require("copy-paste");
    var domain = null;
    function convertJsonToTs() {
        copyPaste.paste(function (error, content) {
            domain.emitEvent("json2ts", "typescriptResult", content + " wohoo!");
        });
    }
    function init(domainManager) {
        if (!domainManager.hasDomain("json2ts")) {
            domainManager.registerDomain("json2ts", { major: 0, minor: 0 });
        }
        domain = domainManager;
        domainManager.registerCommand("json2ts", // domain name
        "convert", // command name
        convertJsonToTs, // command handler function
        false, // this command is synchronous in Node
        "Returns TypeScript interfaces.");
        domainManager.registerEvent("json2ts", // domain name
        "typescriptResult", // event name
        [{
                name: "content",
                type: "string",
                description: "TypeScript interfaces."
            }]);
    }
    ;
    exports.init = init;
})();
