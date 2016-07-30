'use strict';

const assert = require('power-assert');


const fs = require('fs');

function fileCopy(src, dist) {
    const r = fs.createReadStream(src);
    const w = fs.createWriteStream(dist);
    r.pipe(w);
}

function diff(src, dest) {
    return fs.readFileSync(src, 'utf-8') !== fs.readFileSync(dest, 'utf-8');
}

function directoryWork(path, fileCallback) {

    console.log("\npath:" + path + "\n");

    fs.readdir(path, (err, files) => {
        files.forEach((file) => {

            console.log("\npath2:" + path + "\n");

            const fullPath = path + '/' + file;
            if (fs.statSync(fullPath).isDirectory()) {
                directoryWork(fullPath, fileCallback); // ディレクトリなら再帰
            } else {
                fileCallback(fullPath); // ファイルならコールバックで通知
            }
        });
    });
}

describe('Condition', () => {

    it('ことなる2つのディレクトリのDiffをとってそれを貯める', () => {
        directoryWork('diffいけるか', (filePath) => {
            const mainPath = filePath.replace('diffいけるか', './src');
            if (diff(filePath, mainPath)) {
                // 今は便宜上逆にしておく
                fileCopy(mainPath, filePath);
            }
        });
    });

});