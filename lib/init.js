const path = require('path')
      fs = require('fs')
      chalk = require('chalk')
      tasks = require('./tasks')

module.exports = () => {
    getPackageVersions((files) => {
        if (files.initFile.version === files.packageFile.version) {
            console.log(chalk.green('Taming directory is up-to-date'))
            console.log(`Current version is ${files.packageFile.version}`)
            process.exit(1)
        } else {
            tasks.init(() => {
                console.log(chalk.green('Taming has initialized!'))
                console.log(`Current version is ${files.packageFile.version}`)
                console.log('Start with `$ taming start` command')
                process.exit(1)
            })
        }
    })
}

var getPackageVersions = (cb) => {
    let files = {}

    let promiseInit = new Promise(function(resolve, reject) {
        fs.readFile('./taming.json', 'utf-8', (err, data) => {
            if (err) {
                files.initFile = 'none'
                resolve()
            } else {
                files.initFile = JSON.parse(data)
                resolve()
            }
        })
    })

    let promisePackage = new Promise(function(resolve, reject) {
        fs.readFile(path.join(__dirname, '../package.json'), 'utf-8', (err, data) => {
            if (err) {
                files.packageFile = 'none'
                resolve()
            } else {
                files.packageFile = JSON.parse(data)
                resolve()
            }
        })
    })

    Promise.all([promiseInit, promisePackage]).then(() => {
        cb(files)
    })
}
