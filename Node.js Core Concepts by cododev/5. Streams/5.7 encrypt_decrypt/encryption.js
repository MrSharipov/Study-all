const {Transform} = require("node:stream");
const fs = require("node:fs/promises");

class Encrypt extends Transform {
    _transform(chunk, encoding, callback){
        //this.push(chunk);
        console.log(chunk.toString('utf-8'));
        for(let i = 0; i < chunk.length; i++){
            if(chunk[i] !== 255) {
                chunk[i] += 1;
            }
        }
        callback(null, chunk)
    }
}

(async ()=> {
    const readFileHandle = await fs.open("read.txt", "r");
    const writeFileHandle = await fs.open("encrypted.txt", "w");

    const readStream = readFileHandle.createReadStream();
    const writeStream = writeFileHandle.createWriteStream();

    const encrypt = new Encrypt();

    readStream.pipe(encrypt).pipe(writeStream);
})();

// npm i concat-stream
// File uploading ->
// multer, busboy,