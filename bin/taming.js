#!/usr/bin/env node
const minimist = require('minimist')
      tasks = require('../lib/tasks')
      init = require('../lib/init')
      create = require('../lib/create')
      exists = require('../lib/utils/exists')
      vers = require('../lib/utils/vers')

var argv = require('minimist')(process.argv.slice(2))

argv.port = argv.port || argv.p
argv.watch = argv.watch || argv.w

let initFirst = () => {
    console.log(chalk.red('Initialize work directory first.\n$ taming init'))
    process.exit(1)
}

switch (argv._[0]) {
    case 'i':
    case 'init':
        exists.taming((exist) => {
            if (exist) {
                vers((files) => {
                    console.log(chalk.green('Taming directory is up-to-date'))
                    console.log(`Project version is ${files.project.version}`)
                    process.exit(1)
                })
            } else {
                init()
            }
        })
        break
    case 'n':
    case 'new':
        exists.taming((exist) => {
            exist ? create.new() : initFirst()
        })
        break
    case 's':
    case 'start':
        exists.taming((exist) => {
            if (exist) {
                tasks.build(() => {
                    tasks.watch()
                    tasks.server({
                        port: argv.port,
                        watch: argv.watch
                    })
                })
            } else {
                initFirst()
            }
        })
        break
    case 'b':
    case 'build':
        exists.taming((exist) => {
            if (exist) {
                tasks.build(() => {
                    process.exit(1)
                })
            } else {
                initFirst()
            }
        })
        break
    default:
        console.log('Usage: taming <command> [options]\n')
        console.log('   $ taming init              Work directory initialization or update')
        console.log('   $ taming new               Create new component or page')
        console.log('   $ taming start [options]   Start builder and server')
        console.log('   $ taming build [options]   Build project\n')
        console.log('Options\n')
        console.log('   --port=<XXXX>      Set server port')
        console.log('   --watch            Reload browser page after changes\n')
        console.log('Examples\n')
        console.log('   $ taming start --port=9000 --watch\n')
        console.log('You can use short commands e.g: taming s --w')
        process.exit(1)
}
