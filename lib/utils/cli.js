const prompt = require('cli-input')
      chalk = require('chalk')

var definitions = prompt.sets.definitions
    ps = prompt({delimiter: '>'})

module.exports = {
    input: (dialog, cb) => {
        let def = definitions.question.clone()
        def.message = ''

        console.log(chalk.cyan(dialog))
        ps.prompt(def, (err, value) => {
            const validationMask = '^[a-z](?:_?[A-z0-9-_]+){1,}$'
            let reg = new RegExp(validationMask, 'ig')
            let found = value.toString().match(reg)

            if (found) {
                cb(value)
            } else {
                console.log(chalk.red('Name should start from letter and contains only numbers, letters, underline and minus. Try again.'))
                module.exports.input('', cb)
            }
        })
    },
    select: (dialog, optionsList, cb) => {
        let def = definitions.option.clone()
        let options = {list: optionsList}

        def.delimiter = '(number of the option) >'
        def.message = ''
        options.prompt = def

        if (options.list.length > 1) {
            console.log(chalk.cyan(dialog))
            ps.select(options, (err, res, index, line) => {
                cb(res.value)
            })
        } else {
            cb(options.list[0])
        }
    },
    binary: (dialog, cb) => {
        let def = definitions.confirm.clone()
        def.delimiter = ['(y/n) >']
        def.message = ''

        console.log(chalk.cyan(dialog))
        ps.prompt(def, (err, value) => {
            cb(value.accept)
        })
    }
}
