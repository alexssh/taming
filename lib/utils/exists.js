const path = require('path')
      chalk = require('chalk')
      fs = require('fs')

module.exports = {
    taming: (cb) => {
        let dirTemplate = fs.readdirSync(__dirname + '/../../templates/init')
        let dirInit = fs.readdirSync('.')

        let diff = dirTemplate.filter((item) => dirInit.indexOf(item) === -1)
        if (diff.length) {
            console.log(chalk.red('Initialize work directory first.\n$ taming init'))
            process.exit(1)
        } else {
            cb()
        }
    },
    component: (component, cb) => {
        fs.exists(`components/${component}`, (exists) => {
            if (exists && fs.statSync(`components/${component}`).isDirectory()){
                cb(true)
            } else {
                cb(false)
            }
        })
    },
    page: (page, cb) => {
        fs.exists(`pages/${page}.html`, (exists) => {
            if (exists && fs.statSync(`pages/${page}.html`).isFile()){
                cb(true)
            } else {
                cb(false)
            }
        })
    }
}
