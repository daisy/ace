var util = require("util");
var fs = require("fs");
var path = require("path");
var glob = require("glob");

const args = process.argv.slice(2);
const srcFolderPath = args[0];
const jsonFilePath = args[1];

function isNullOrUndefined(val) {
    return val === undefined && val === null;
}

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

function traverseJsonObjects_(parent, keyInParent, obj, func) {
    func(obj, parent, keyInParent);
    if (obj instanceof Array) {
        for (let index = 0; index < obj.length; index++) {
            const item = obj[index];
            if (!isNullOrUndefined(item)) {
                traverseJsonObjects_(obj, index, item, func);
            }
        }
    }
    else if (typeof obj === "object" && obj !== null) {
        Object.keys(obj).forEach((key) => {
            if (obj.hasOwnProperty(key)) {
                const item = obj[key];
                if (!isNullOrUndefined(item)) {
                    traverseJsonObjects_(obj, key, item, func);
                }
            }
        });
    }
}
function traverseJsonObjects(obj, func) {
    traverseJsonObjects_(undefined, undefined, obj, func);
}

glob(`${srcFolderPath}/**/*{.js,.handlebars}`, {}, function (err, files) {
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

    let totalMatch = 0;
    const keys = [];

    for (const file of files) {
        const fileTxt = fs.readFileSync(path.join(process.cwd(), file), { encoding: "utf8" });

        // ("__aceLocalize__|localize\s*\(\s*['"]|\{\{#localize\s*['"])([^'"]+)['"]
        const regex = new RegExp(`("__aceLocalize__|localize\\s*\\(\\s*['"]|\\{\\{#localize\\s*['"])([^'"]+)['"]`, "g");

        let regexMatch = regex.exec(fileTxt);
        while (regexMatch) {
            totalMatch++;
            const isSpecial = regexMatch[1] === '"__aceLocalize__';
            let key = regexMatch[2];
            if (isSpecial) {
                key = key.replace(/_/g, ".");
            }
            if (key !== "__language__") {
                if (!keys.includes(key)) {
                    keys.push(key);
                    console.log(key);
                } else {
                    console.log(`-- duplicate: ${key}`);
                }
            }
            regexMatch = regex.exec(fileTxt);
        }
    }

    console.log(`${keys.length} (${totalMatch})`);

    let jsonObj = {};
    for (const key of keys) {
        let jsonRoot = jsonObj;
        const props = key.split(".");
        if (!props || !props.length) {
            console.log(`props?! ${props}`);
            continue;
        }
        for (const prop of props) {
            if (!prop || !prop.length) {
                console.log(`prop?! ${prop}`);
                continue;
            }
            if (!jsonRoot[prop]) {
                jsonRoot[prop] = {};
            }
            jsonRoot = jsonRoot[prop];
        }
    }

    traverseJsonObjects(jsonObj, (obj) => {
        Object.keys(obj).forEach((prop) => {
            if (!Object.keys(obj[prop]).length) {
                obj[prop] = "";
            }
        });
    });

    jsonObj = sortObject(jsonObj);

    console.log(util.inspect(jsonObj, { colors: true, depth: null, compact: false }));

    const jsonStr = JSON.stringify(jsonObj, null, "    ");
    fs.writeFileSync(path.join(process.cwd(), jsonFilePath), jsonStr, { encoding: "utf8" });
});
