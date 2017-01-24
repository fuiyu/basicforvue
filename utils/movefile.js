const fs = require('fs');

class MoveFile {
    async move(source, targetDir) {
       return new Promise((resolve, reject) => {
           var sourceDir = source.tempPath
           var tempName = source.tempName
            fs.readFile(sourceDir, function (err, data) {
                if (err) {
                    reject(err);
                }
                console.log(tempName.replace('\\',''))
                fs.writeFileSync(targetDir+tempName, data);
                fs.unlinkSync(sourceDir);
                resolve(targetDir+tempName)
            })
        })
    }
}

module.exports = MoveFile