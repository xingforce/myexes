var https = require('https');
var fs = require('fs');
var ProgressBar = require('progress');

/* const { resolve } = require('path');
const { rejects } = require('assert');
const { runInNewContext } = require('vm'); */
var url = "https://codecombat.com/file/music/";

function getFileList(url) {
    return new Promise((resolve,rejects) => {
        https.get(url,res => {
            const {statusCode} = res;
            
            const {contentType} = res.headers;
            let error;
        
            if (statusCode != 200) {
                error = new Error('Request Failed.\n' +
                `Status Code: ${statusCode}`);
            } else if ((contentType != undefined) && (!/^application\/json/.test(contentType))) {
                error = new Error('Invalid content-type.\n' + `Give me a json,not ${contentType}`);
            }
            if (error) {
                console.log(error.message);
                res.resume();
                rejects(error);
                return;
            }
            res.setEncoding('utf-8');
            let rawDate = '';
            res.on('data',chunk => {
                rawDate += chunk;
            })
            res.on('end', () => {
                try {
                    const fileList = JSON.parse(rawDate);
                    res.resume;
                    resolve(fileList);
                } catch (e){
                    console.log(e);
                    rejects(e);
                    rerurn;
                }
                
            })
        
        });
    })
}


function downloadOne(fileObj) {
    const fileUrl = url + fileObj.filename;
    return new Promise((resolve,rejects) => {
        https.get(fileUrl, res => {
            var filename=fileObj.filename;
            res.setEncoding('binary');
            let data = '';
            var len = parseInt(fileObj.length, 10);
            var bar = new ProgressBar(`downloading ${filename} [:bar] :rate/bps :percent :etas`, {
                complete: '=',
                incomplete: ' ',
                width: 20,
                total: len
              });
            res.on('data',chunk => {
                data += chunk;
                bar.tick(chunk.length);
            })
            res.on('end',()=>{
                fs.writeFile('./downloads/' + filename, data, 'binary',err =>{
                    if(err){
                        rejects(err);
                        res.resume;
                        return;
                    } else {
                        res.resume;
                        resolve(1);
                        
                    }
                })
            })

            res.setTimeout(6000,()=>{
                rejects('timeout');
                return;
            })

            res.on('error', err => {
                console.log(`the file ${filename} downloaded failed, ${err}`);
                rejects(0);
            })
        })
    })
}

(async() => {
    try{
        const fileList = await getFileList(url);
        console.log(`There is ${fileList.length} files`);
        for (let i=0; i<fileList.length; i++){
            //let fileUrl = url + fileList[i].filename;
            try{
                 let result = await downloadOne(fileList[i]);
            } catch(e) {
                throw e;
            }
        }
        console.log(`mission compelet! ${fileList.length} files donwloaded.`);
        //let result = await downloadOne(fileList[0]);
    } catch (e){
        console.log('something wrong\n'+e.message);
    }
    
})();

