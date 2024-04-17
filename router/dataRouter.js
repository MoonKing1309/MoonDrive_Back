const express = require("express")
const router = express.Router();
const {
    welcomeMessage,
    upload,
    uploadData,
    downloadData,
    displayData,

} = require('../controller/multerController')

router.route('/home')
    .get(welcomeMessage)
router.route('/upload')
    .get(uploadData)
    .post(upload.array('file'),uploadData)
router.route('/download')
    .get(downloadData)

router.route('/myfiles')
    .get(displayData)
    
module.exports = router;    