const path = require('path');
const fs = require('fs');
const { contextIsolated } = require('process');

const args = process.argv.slice(2);
const arg0 = args[0]; // .replace(/^'/, "").replace(/'$/, "");

function sortObject(ownerKey, obj) {
    if (obj === null) {
        return null;
    }
    if (obj instanceof Array) {
        for (let i = 0; i < obj.length; i++) {
            obj[i] = sortObject(i, obj[i]);
        }
        if (ownerKey === "images" || ownerKey === "audios") {
            return obj.sort((a, b) => {
                // return -1 => a < b
                // return 1 => a > b
                // return 0 => a == b
                if (typeof a.src == "string" &&
                    a.html && a.html.indexOf("file:///var/") >= 0) {

                    const re = new RegExp('src="file:///var/.+'+a.src.replace('.', '\\.')+'"', "g");
                    a.html = a.html.replace(re, 'src="'+a.src+'"');
                }
                if (typeof b.src == "string" &&
                    b.html && b.html.indexOf("file:///var/") >= 0) {

                    const re = new RegExp('src="file:///var/.+'+b.src.replace('.', '\\.')+'"', "g");
                    b.html = b.html.replace(re, 'src="'+b.src+'"');
                }
                if (a.src && b.src) {
                    if (typeof a.src == "string" && typeof b.src == "string") {
                        // lexicographical compare (alphabetical sort)
                        if (a.src == b.src) {
                            if (a.id && b.id) {
                                return a.id.localeCompare(b.id);
                            }
                            if (a.id && !b.id) {
                                return -1;
                            }
                            if (!a.id && b.id) {
                                return 1;
                            }
                            return 0;
                        }
                        // return a.src < b.src;
                        return a.src.localeCompare(b.src);
                    }
                    if (typeof a.src == "string" && typeof b.src != "string") {
                        return -1; // a.src < b.src
                    }
                    if (typeof a.src != "string" && typeof b.src == "string") {
                        return 1; // a.src > b.src
                    }
                    return 0; // equal
                }

                if (a.src && !b.src) {
                    return -1; // a < b
                }

                if (!a.src && b.src) {
                    return 1; // a > b
                }

                return 0; // equal
            });
        }
        return obj;
    }
    else if (typeof obj !== "object") {
        return obj;
    }
    const newObj = {};
    Object.keys(obj).sort().forEach((key) => {
        newObj[key] = sortObject(key, obj[key]);
    });
    return newObj;
}

console.log("NORMLIZE REPORT JSON: ", arg0);
const filePath = path.join(process.cwd(), arg0);
let fileStr = fs.readFileSync(filePath, { encoding: "utf8" });
// console.log(fileStr.substr(0, 100));
fileStr = fileStr.replace(/^(\s+"path": "\/var\/)[^"]+"/gm, "$1\"");
fileStr = fileStr.replace(/^(\s+"location": ")[^"]+"/gm, "$1\"");
// fileStr = fileStr.replace(/^(\s+"html": ").+(",|"$)/gm, "$1$2");
fileStr = fileStr.replace(/^(\s+"src": ")([^"]+)(")/gm, (match, $1, $2, $3) => {
    const toFind = "file:/var/";
    const i = $2.indexOf(toFind);
    if (i < 0) {
        return match;
    }
    let before = $2.substring(0, i);
    if (before.endsWith("/")) {
        before = before.substring(0, before.length - 1);
    }
    before = before.substring(0, before.lastIndexOf("/"));
    // const after = $2.substring(i, i + toFind.length);
    let suffix = $2.substring(i + toFind.length);
    suffix = suffix.substring(suffix.indexOf(before));
    return `${$1}${suffix}${$3}`;
});
// src: "OEBPS/assets/1/file:/var/folders/gm/ws1_n9s97y1b3z4vfgw79h240000gn/T/tmp-12919-C4XbkiF8MueB/OEBPS/assets/audio/children-FIXED.wav"
let fileJson = JSON.parse(fileStr);
fileJson = sortObject(undefined, fileJson);
fileStr = JSON.stringify(fileJson, null, "\t") + "\n";
// console.log(fileStr.substr(0, 100));
fs.writeFileSync(`${filePath.replace(".json", "_normalised.json")}`, fileStr, { encoding: "utf8" });
