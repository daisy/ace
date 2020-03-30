const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

const getDirectories = dirPath =>
    fs.readdirSync(dirPath, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name)
    .filter(dirname => dirname !== "ace-core-legacy");

const p = (...args) => process.stdout.write(...args);
const newline = () => p("\n");

const dirs = getDirectories("packages");

p(JSON.stringify(dirs, null, 4)); newline();

const depTypes = ["dependencies", "devDependencies", "optionalDependencies", "bundledDependencies"];

const packageJsons = {};
const packageJsonsChecked = {};
for (const dir of dirs) {
    packageJsons[dir] = JSON.parse(fs.readFileSync(path.join(process.cwd(), "packages", dir, "package.json"), 'utf8'));
}
dirs.push(".");
packageJsons["."] = JSON.parse(fs.readFileSync(path.join(process.cwd(), "package.json"), 'utf8'));

for (const dir of dirs) {
    p(chalk.yellow("=".repeat(50))); newline();
    p(chalk.inverse(`${dir}`)); newline();
    p(chalk.yellow("=".repeat(50))); newline();
    const packageJson = packageJsons[dir];

    for (const depType of depTypes) {
        p(chalk.blue(`✓ ${depType}:`)); newline();
        if (packageJson[depType]) {
            for (const dep in packageJson[depType]) {
                const ver = packageJson[depType][dep];
                const verFixed = ver.replace(/[^]/, "");

                p(chalk.reset.bold.cyan(`\u2022 ${dep}`));
                p(chalk.dim(" ⇒ "));
                p(chalk.reset.bold.gray(`${ver}`));
                // newline();
                if (dep.startsWith("@daisy/")) {
                    const packDir = dep.substr("@daisy/".length);
                    const packVersion = packageJsons[packDir].version;
                    if (packVersion !== verFixed) {
                        p(chalk.reset.bold.red(` X ${packVersion}`));
                    }
                    newline();
                } else {
                    const packDir = dep;

                    const packJsonPath = path.join(process.cwd(), "node_modules", packDir, "package.json");
                    if (!packageJsons[packDir]) {
                        packageJsonsChecked[packDir] = true;
                        if (fs.existsSync(packJsonPath)) {
                            packageJsons[packDir] = JSON.parse(fs.readFileSync(packJsonPath, 'utf8'));
                        }
                    }
                    const packVersion = packageJsons[packDir] ? packageJsons[packDir].version : undefined;
                    if (packVersion) {
                        if (packVersion !== verFixed) {
                            p(chalk.reset.bold.red(` TOP DIFF (${packVersion})`));
                        } else {
                            p(chalk.reset.bold.greenBright(` TOP OK`));
                        }
                    } else {
                        p(chalk.reset.bold.yellow(` TOP NOPE`));
                    }

                    p(chalk.dim(" ..."));

                    if (dir !== ".") {
                        const packJsonPath_ = path.join(process.cwd(), "packages", dir, "node_modules", packDir, "package.json");
                        const packDir_ = `__${packDir}`;
                        if (!packageJsons[packDir_]) {
                            packageJsonsChecked[packDir_] = true;
                            if (fs.existsSync(packJsonPath_)) {
                                packageJsons[packDir_] = JSON.parse(fs.readFileSync(packJsonPath_, 'utf8'));
                            }
                        }
                        const packVersion_ = packageJsons[packDir_] ? packageJsons[packDir_].version : undefined;
                        if (packVersion_) {
                            if (packVersion_ !== verFixed) {
                                p(chalk.reset.bold.red(` SUB DIFF (${packVersion_})`));
                            } else {
                                p(chalk.reset.bold.greenBright(` SUB OK`));
                            }
                        } else {
                            p(chalk.reset.bold.yellow(` SUB NOPE`));
                        }
                    } else {
                        p(chalk.reset.bold.yellow(` SUB N/A`));
                    }

                    newline();
                }
            }
        }
    }
}