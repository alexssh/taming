const path = require('path')
      fs = require('fs')
      chalk = require('chalk')
      tasks = require('./tasks')
      vers = require('./utils/vers')

module.exports = () => {
    tasks.install((cb) => {
        vers((files) => {
            console.log(chalk.green('Taming directory has initialized!'))
            console.log(`Project version is ${files.project.version}`)
            console.log('Start with `$ taming start` command')
            process.exit(1)
        })
    })
}
