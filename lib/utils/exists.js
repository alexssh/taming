const path = require('path')
      chalk = require('chalk')
      fs = require('fs')
      vers = require('./vers')

module.exports = {
    taming: (cb) => {
        let dirPackage = fs.readdirSync(__dirname + '/../../templates/init')
        let dirProjectRaw = fs.readdirSync('.')
        let dirProject = []

        dirProjectRaw.forEach((i) => {
            let m = i.match(/^\./i)
            !m ? dirProject.push(i) : null
        })

        let diff = dirPackage.filter((item) => dirProject.indexOf(item) === -1)
        if (diff.length) {
            cb(false)
        } else {
            vers((files) => {
                if (files.package.versionInt === files.project.versionInt) {
                    cb(true)
                } else {
                    if (files.package.versionInt > files.project.versionInt) {
                        cli.binary(`Do you want to update project (${files.project.version} => ${files.package.version})?`, (value) => {
                            if (value) {
                                tasks.update((cb) => {
                                    console.log(chalk.green('Taming directory has updated!'))
                                    console.log(`Project version is ${files.package.version}`)
                                    process.exit(1)
                                })
                            } else {
                                process.exit(1)
                            }
                        })
                    } else {
                        console.log(chalk.yellow(`Current version of the project (${files.project.version}) is larger that the Taming package (${files.package.version})`))
                        console.log('Update the package first.\n$ npm update -g taming')
                        process.exit(1)
                    }
                }
            })
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
