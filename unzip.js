const fs = require('fs');
const zlib = require('zlib');

const readDirectory = fs.readdirSync('./forunzip');

Promise.all(
    readDirectory.map((filename) => {
        return new Promise((resolve, reject) => {
            const fileContent = fs.createReadStream(`./forunzip/${filename}`);
            const writeStream = fs.createWriteStream(`./forunzip/${filename.slice(0, -3)}`);

            const unzip = zlib.createGunzip();

            fileContent
                .pipe(unzip)
                .pipe(writeStream)
                .on('finish', (error) => {
                    if (error) {
                        return reject(error);
                    } else {
                        return resolve();
                    }
                });
        });
    })
).then(console.log('unzipped done!'));
