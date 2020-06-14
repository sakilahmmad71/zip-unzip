const fs = require('fs');
const zlib = require('zlib');

const readDirectory = fs.readdirSync('./forzip');

Promise.all(
    readDirectory.map((filename) => {
        return new Promise((resolve, reject) => {
            const fileContent = fs.createReadStream(`./forzip/${filename}`);
            const writeStream = fs.createWriteStream(`./forzip/${filename}.gz`);

            const zip = zlib.createGzip();

            fileContent
                .pipe(zip)
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
).then(console.log('zipped done!'));
