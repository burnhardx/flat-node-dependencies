const fs = require("fs");
const path = require("path");

const groupRequire = /(const|var)\s(.*)=\s?(require\(.)(.*)(.\))/;

const listDependenciesFromFile = (pathToFile, result) => {
    const file = fs.readFileSync(pathToFile).toString();
    const requiredLines = file
        .split('\n')
        .filter(line => line.indexOf('require(') !== -1)
        .forEach(line => {
            const matches = groupRequire.exec(line);
            const description = {
                module: matches[4],
                isPrivate: matches[4].indexOf('.') === 0
            };
            result[matches[2].trim()] = description;
            if (!description.isPrivate) {
                description.script = fs.readFileSync(require.resolve(description.module)).toString();
            } else {
                const pathToModule = path.resolve(path.dirname(pathToFile), description.module) + '.js';
                description.script = fs.readFileSync(pathToModule).toString();
                description.dependencies = description.script.split('\n')
                    .filter(scriptLine => scriptLine.indexOf('require') > -1)
                    .map(requiredLine => {
                        return groupRequire.exec(requiredLine)[2].trim();
                    });
                listDependenciesFromFile(pathToModule, result);
            }
        })
    return result;
}

const flatDependencies = pathToModule => {
    const sourceDeps = listDependenciesFromFile(pathToModule, {});
    return sourceDeps;
}

module.exports = flatDependencies;