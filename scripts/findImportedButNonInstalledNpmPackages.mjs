import fs from "fs";
import path from "path";

const importedNpmPackages = new Set();

const ignoreds = [
  /^@daisy\/.+/,
  // BUILD TOOLS not used in source code:
  /^i18next-json-sync$/,
  /^@jest-runner\/.+/,
  /^jest.*/,
  /^@kayahr\/.+/,
  /^babel-.+/,
  /^rimraf$/,
  /^cpy-cli$/,
  /^json$/,
  /^json-diff$/,
  /^cross-spawn$/,
  /^cross-env$/,
  // NODEJS built-in packages:
  /^original-fs$/, // ELECTRON special
  /^process$/,
  /^events$/,
  /^stream$/,
  /^child_process$/,
  /^fs$/,
  /^url$/,
  /^path$/,
  /^util$/,
  /^os$/,
  /^https?$/,
  /^assert$/,
  /^crypto$/,
  /^node:.+$/
];

const regExp_fileExt = /\.[jt]sx?$/i;
const regExp_imports = /((\s+from\s+)|(require\s*\(\s*))["']([^\.][^"']+)["']/g;

async function processDir(folderPath) {
  if (path.basename(folderPath) === "node_modules") return [];
  if (path.basename(folderPath) === "lib") return [];
  if (path.basename(folderPath) === "report-template-assets") return [];

  let packageDeps = [];

  const fileNames = await fs.promises.readdir(folderPath);
  for (const fileName of fileNames) {
    const filePath = path.join(folderPath, fileName);
    const stat = await fs.promises.stat(filePath);
    const isFile = stat.isFile();
    if (isFile && fileName === "package.json") {
      const jsonStr = await fs.promises.readFile(filePath, {
        encoding: "utf8"
      });
      const json = JSON.parse(jsonStr);
      packageDeps = Array.from(
        new Set(
          packageDeps.concat(
            Object.keys(json.dependencies || {}).concat(
              Object.keys(json.devDependencies || {})
                .concat(Object.keys(json.peerDependencies || {}))
                .concat(Object.keys(json.optionalDependencies || {}))
            )
          )
        )
      );
    } else if (isFile && regExp_fileExt.test(path.extname(fileName))) {
      const src = await fs.promises.readFile(filePath, { encoding: "utf8" });
      const matches = src.matchAll(regExp_imports);
      for (const match of matches) {
        // console.log("--> ", JSON.stringify(match, null, 4));
        let captured = match[4];
        if (!ignoreds.find(ignored => ignored.test(captured))) {
          const slashIndex = captured.indexOf("/");
          if (slashIndex > 0) {
            if (!captured.startsWith("@")) {
              captured = captured.substring(0, slashIndex);
            } else {
              const slashIndex2 = captured.indexOf("/", slashIndex + 1);
              if (slashIndex2 > 0) {
                captured = captured.substring(0, slashIndex2);
              }
            }
          }
          // if (!importedNpmPackages.has(captured)) {
          //     const isRequire = !!match[3];
          //         // const isImport = !!match[2];
          //     console.log("============> ", isRequire ? "REQUIRE" : "IMPORT", captured);
          // }
          // console.log(JSON.stringify(match, null, 4));
          importedNpmPackages.add(captured);
        }
        // else {
        //   console.log("IGNORED:: ", JSON.stringify(match, null, 4));
        //   ignoreds.forEach((ignored) => {
        //     if (ignored.test(captured)) {
        //       console.log(">> ", ignored);
        //     }
        //   })
        // }
      }
    } else if (stat.isDirectory()) {
      packageDeps = Array.from(
        new Set(packageDeps.concat(await processDir(filePath)))
      );
    }
  }
  return packageDeps;
}

let errored = false;
try {
  let packageDeps = await processDir(path.join(process.cwd(), "packages"));
  packageDeps = Array.from(
    new Set(
      packageDeps.concat(await processDir(path.join(process.cwd(), "tests")))
    )
  );
  packageDeps = Array.from(
    new Set(
      packageDeps.concat(await processDir(path.join(process.cwd(), "scripts")))
    )
  );

  const jsonStr = await fs.promises.readFile(
    path.join(process.cwd(), "package.json"),
    { encoding: "utf8" }
  );
  const json = JSON.parse(jsonStr);
  // console.log(JSON.stringify(json.dependencies, null, 4));
  // console.log(JSON.stringify(json.devDpendencies, null, 4));
  // console.log(JSON.stringify(json.peerDpendencies, null, 4));
  const deps = packageDeps
    .concat(
      Array.from(
        new Set(
          Object.keys(json.dependencies || {}).concat(
            Object.keys(json.devDependencies || {})
              .concat(Object.keys(json.peerDependencies || {}))
              .concat(Object.keys(json.optionalDependencies || {}))
          )
        )
      )
    )
    .filter(dep => !ignoreds.find(ignored => ignored.test(dep)))
    .sort();
  console.log("PACKAGE DEPENDENCIES:", JSON.stringify(deps, null, 4));
  console.log(
    "PACKAGE IMPORTS:",
    JSON.stringify(Array.from(importedNpmPackages).sort(), null, 4)
  );
  for (const importedNpmPackage of importedNpmPackages) {
    if (!deps.find(dep => dep === importedNpmPackage)) {
      console.error(
        "!!!!!!!!! Package import'ed/require'd but not in package.json dependencies:",
        importedNpmPackage
      );
      errored = true;
    }
  }
  for (const dep of deps) {
    if (!importedNpmPackages.has(dep)) {
      console.error(
        "!!!!!!!!! package.json dependencies not import'ed/require'd:",
        dep
      );
      errored = true;
    }
  }
} catch (err) {
  console.error("ERROR!");
  console.error(err);
  errored = true;
}
if (errored) {
  console.error(">>>>>>>>>>>>>> NOK :(");
  process.exit(1);
} else {
  console.log(">>>>>>>>>>>>>> OK :)");
  process.exit(0);
}