#!/usr/bin/env node
const minimist = require('minimist')
      tasks = require('../lib/tasks')
      init = require('../lib/init')
      create = require('../lib/create')
      exists = require('../lib/utils/exists')

var argv = require('minimist')(process.argv.slice(2))

argv.port = argv.port || argv.p
argv.watch = argv.watch || argv.w

switch (argv._[0]) {
    case 'i':
    case 'init':
        init()
        break
    case 'n':
    case 'new':
        exists.taming(() => {
            create.new()
        })
        break
    case 's':
    case 'start':
        exists.taming(() => {
            tasks.build(() => {
                tasks.watch()
                tasks.server({
                    port: argv.port,
                    watch: argv.watch
                })
            })
        })
        break
    case 'b':
    case 'build':
        exists.taming(() => {
            tasks.build(() => {
                process.exit(1)
            })
        })
        break
    default:
        console.log('Usage: taming <command> [options]\n')
        console.log('   $ taming init              Work directory initialization')
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
