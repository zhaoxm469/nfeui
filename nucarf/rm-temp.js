const fs = require('fs-extra')
const { join } = require('path')

fs.remove(join(__dirname,'../docs/.temp'))