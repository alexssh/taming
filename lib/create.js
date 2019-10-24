const path = require('path')
      fs = require('fs')
      chalk = require('chalk')
      tasks = require('./tasks')
      exists = require('./utils/exists')
      cli = require('./utils/cli')

module.exports = {
    new: (command) => {
        let initNew = (type, name) => {
            switch (type) {
                case 'c':
                case 'component':
                case 'components':
                    module.exports.component(name)
                    break
                case 'p':
                case 'page':
                case 'pages':
                    module.exports.page(name)
                    break
                default:
                    console.log(chalk.yellow('Usage: $ taming new [component|page]/<name>    Create new component or page'))
                    process.exit(1)
            }
        }

        if (command){
            let c = command.split("/")
            initNew(c[0], c[1])
        } else {
            cli.select('What do you want to create?', ['component', 'page'], (value) => {
                initNew(value)
            })
        }
    },
    component: (component) => {
        let initComponent = (component) => {
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
        }

        if (component){
            initComponent(component)
        } else {
            cli.input('Input component`s name', (component) => {
                initComponent(component)
            })
        }

    },
    page: (page) => {
        let initPage = (page) => {
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
        }

        if (page){
            initPage(page)
        } else {
            cli.input('Input page`s name', (page) => {
                initPage(page)
            })
        }

    }
}
