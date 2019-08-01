const util = require('util');
var fs = require("fs");
var path = require("path");
var glob = require("glob");

function sortObject(obj) {
    if (obj === null) {
        return null;
    }
    if (obj instanceof Array) {
        for (let i = 0; i < obj.length; i++) {
            obj[i] = sortObject(obj[i]);
        }
        return obj;
    }
    else if (typeof obj !== "object") {
        return obj;
    }
    const newObj = {};
    Object.keys(obj).sort().forEach((key) => {
        newObj[key] = sortObject(obj[key]);
    });
    return newObj;
}

glob("packages/**/src/l10n/locales/*.json", {}, function (err, files) {
    if (err) {
        console.log(err);
        process.exit(1);
        return;
    }
    if (!files || !files.length) {
        console.log("files?!");
        process.exit(1);
        return;
    }
    console.log(files.length);

    for (const file of files) {
        console.log("#######################");
        console.log(file);
        const p = path.join(process.cwd(), file);
        const fileTxt = fs.readFileSync(p, { encoding: "utf8" });
        let fileJson = JSON.parse(fileTxt);
        fileJson = sortObject(fileJson);
        console.log(util.inspect(fileJson, { colors: true, depth: null, compact: false }));
        console.log("#######################");
        const jsonStr = JSON.stringify(fileJson, null, "    ") + "\n";
        fs.writeFileSync(p, jsonStr, { encoding: "utf8" });
    }
});
