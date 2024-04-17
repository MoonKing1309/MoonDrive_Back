const multer = require("multer")
const fs = require('fs')
const admzip = require('adm-zip')
const mimeTypes = {
    "text/plain": "text",
    "text/html": "text",
    "text/css": "text",
    "image/jpeg": "image",
    "image/png": "image",
    "image/gif": "image",
    "audio/mpeg": "audio",
    "audio/wav": "audio",
    "audio/ogg": "audio",
    "video/mp4": "video",
    "video/webm": "video",
    "video/ogg": "video",
    "application/pdf": "application",
    "application/json": "application",
    "application/xml": "application",
    "application/octet-stream": "other",
    "application/msword": "document",
    "application/vnd.ms-excel": "document",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document": "document",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": "document",
    "application/zip": "archive",
    "application/x-rar-compressed": "archive",
    "application/x-gzip": "archive",
    "application/x-bzip2": "archive",
    "application/javascript": "script",
    "application/vnd.android.package-archive": "executable",
    "application/x-shockwave-flash": "interactive",
    "image/svg+xml": "vector-image",
    "audio/flac": "audio",
    "video/quicktime": "video",
    "default":"others"
}
const storage = multer.diskStorage({
    destination:function(req,file,cb){
        var folder = file.mimetype;
        var user = 'moon'; //get from userID
        var fullPath = `./data/${user}/${mimeTypes[folder] || mimeTypes['default']}`
        if(!fs.existsSync(fullPath))
            fs.mkdirSync(fullPath,{recursive:true})
        cb(null,fullPath)
    },
    filename: function (req, file, cb) {
        let currentDate = new Date();
        let time = currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds();
        cb(null,time + '-' + file.originalname)
    }
})
const upload = multer({storage:storage})

const welcomeMessage = (req,res)=>{
    res.send('Welcome to MoonDataPortal')
}

const uploadData =  (req,res)=>{
    //have to write to log of user.
}

const downloadData = (req,res)=>{
    var zip = new admzip();
    var outputFilePath = Date.now() + "download.zip";
    const filePath = './data/moon/document/21:40:7-Data flow diagram and user stories.docx';
    zip.addLocalFile(`${filePath}`)
    fs.writeFileSync(outputFilePath, zip.toBuffer());

    // let fileName = req.params.filename
    res.download(outputFilePath,(err)=>{
        if(err)
            console.log(err)
    })
}

const displayData = (req,res)=>{
    
}

module.exports = {
    welcomeMessage,
    upload,
    uploadData,
    downloadData,
    displayData
}
