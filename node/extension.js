(function () {
    "use strict";
    var copyPaste = require("copy-paste");
    var request = require("request");
    var json2ts = require("json2ts");
    var domain = null;
    function convertJsonToTs() {
        copyPaste.paste(function (error, content) {
            convert(content);
        });
    }
    function convertUrlJsonToTs() {
        copyPaste.paste(function (error, content) {
            if (content.indexOf("http") > -1) {
                request(content, function (error, response, body) {
                    convert(body);
                });
            }
        });
    }
    function convert(content) {
        if (json2ts.isJson(content)) {
            var result = json2ts.convert(content);
            domain.emitEvent("json2ts", "typescriptResult", result);
        }
    }
    function init(domainManager) {
        if (!domainManager.hasDomain("json2ts")) {
            domainManager.registerDomain("json2ts", { major: 0, minor: 0 });
        }
        domain = domainManager;
        domainManager.registerCommand("json2ts", // domain name
        "convertFromJson", // command name
        convertJsonToTs, // command handler function
        false, // this command is synchronous in Node
        "Returns TypeScript interfaces.");
        domainManager.registerCommand("json2ts", // domain name
        "convertFromUrl", // command name
        convertUrlJsonToTs, // command handler function
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
