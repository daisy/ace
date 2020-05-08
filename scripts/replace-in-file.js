const path = require('path');
const fs = require('fs');

const args = process.argv.slice(2);
const arg0 = args[0]; // .replace(/^'/, "").replace(/'$/, "");
const arg1 = args[1];
const arg2 = args[2];
console.log("REPLACE IN FILE: ", arg0);
const filePath = path.join(process.cwd(), arg0);
let fileStr = fs.readFileSync(filePath, { encoding: "utf8" });
// console.log(fileStr.substr(0, 100));
console.log("REGEXP: ", arg1);
const regex = new RegExp(arg1, "g");
console.log("...WITH: ", arg2);
if (!regex.test(fileStr)) {
    console.log("### NOT FOUND 1??");
    process.exit(1);
}
fileStr = fileStr.replace(regex, arg2);
if (fileStr.indexOf(arg2) < 0) {
    console.log("### NOT FOUND 2??");
    process.exit(1);
}
// console.log(fileStr.substr(0, 100));
fs.writeFileSync(filePath, fileStr, { encoding: "utf8" });
