const path = require('path')
      fs = require('fs')

module.exports = (cb) => {
    let files = {}

    let promiseProject = new Promise((resolve, reject) => {
        fs.readFile('./taming.json', 'utf-8', (err, data) => {
            if (err) {
                files.project = 'none'
                resolve()
            } else {
                files.project = JSON.parse(data)
                files.project.versionInt = versionToInt(files.project.version)
                resolve()
            }
        })
    })

    let promisePackage = new Promise((resolve, reject) => {
        fs.readFile(path.join(__dirname, '../../templates/init/taming.json'), 'utf-8', (err, data) => {
            if (err) {
                files.package = 'none'
                resolve()
            } else {
                files.package = JSON.parse(data)
                files.package.versionInt = versionToInt(files.package.version)
                resolve()
            }
        })
    })

    Promise.all([promiseProject, promisePackage]).then(() => {
        cb(files)
    })

    let versionToInt = (version) => {
        let v = version.split('.')
        return parseInt(v[0] + v[1] + v[2])
    }
}
