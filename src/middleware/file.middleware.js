const multer = require('@koa/multer')
const { UPLOAD_PATH } = require('../config/path')

const upload = multer({ dest: UPLOAD_PATH })

const processAvatar = upload.single('avatar')

module.exports = {
  processAvatar
}
