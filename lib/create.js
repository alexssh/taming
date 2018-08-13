const path = require('path')
      fs = require('fs')
      chalk = require('chalk')
      tasks = require('./tasks')
      exists = require('./utils/exists')
      cli = require('./utils/cli')

module.exports = {
    new: () => {
        cli.select('What do you want to create?', ['component', 'page'], (value) => {
            switch (value) {
                case 'component':
                    module.exports.component()
                    break
                case 'page':
                    module.exports.page()
                    break
            }
        })
    },
    component: () => {
        cli.input('Input component`s name', (component) => {
            exists.component(component, (exists) => {
                component = component.charAt(0).toUpperCase() + component.slice(1)
                if (exists){
                    console.log(chalk.red(`<${component}/> already exists`))
                    process.exit(1)
                } else {
                    tasks.create.component(component, () => {
                        console.log(chalk.green(`<${component}/> has been created.`))
                        process.exit(1)
                    })
                }
            })
        })
    },
    page: () => {
        cli.input('Input page`s name', (page) => {
            exists.page(page, (exists) => {
                if (exists){
                    console.log(chalk.red(`${page}.html already exists`))
                    process.exit(1)
                } else {
                    tasks.create.page(page, () => {
                        console.log(chalk.green(`${page}.html has been created.`))
                        process.exit(1)
                    })
                }
            })
        })
    }
}
