const path = require('path')
      gulp = require('gulp')
      concat = require('gulp-concat')
      stylus = require('gulp-stylus')
      autoprefixer = require('gulp-autoprefixer')
      copy = require('gulp-copy')
      base64 = require('gulp-base64')
      clean = require('gulp-clean')
      debug = require('gulp-debug')
      rename = require('gulp-rename')
      replace = require('gulp-replace')
      watch = require('gulp-watch')
      jsValidate = require('gulp-jsvalidate')
      plumber = require('gulp-plumber')
      through = require('through2')
      browserSync = require('browser-sync')
      log = require('fancy-log')
      chalk = require('chalk')

      beast = require('../templates/init/libs/beast.js')

      gulpConfig = require('../gulp.config.js')
      serverConfig = require('../server.config.js')

let line = '\n/* END OF FILE */\n'

let autoprefixerSettings = {
    browsers: ['iOS >= 7'],
    cascade: false
}

let base64Settings = {
    extensions: ['svg', 'jpg', 'png'],
    maxImageSize: 10*1024,
    debug: false
}

let config = gulpConfig()

let quoteBase64 = (string, file) => string.replace(/url\(([^)]+)\)/g, "url('$1')")

let pipeToString = (callback, ext) => {
    return through.obj((file, encoding, cb) => {
        if (file.isNull()) return cb(null, file)
        if (file.isStream()) return cb(new PluginError('gulp-beast', 'Streaming not supported'))
        if (ext === undefined || file.path.split('.').pop() === ext) {
            file.contents = new Buffer(
                callback(file.contents.toString(), file)
            )
        }
        cb (null, file)
    })
}

module.exports = {
    build: (cb) => {
        gulp.src(config.output, {read: false})
            .pipe(plumber())
            .pipe(clean().on('finish', () => {
                log.info(`Start building project`)
                gulp.start(['js', 'css', 'libs', 'assets', 'html', 'finish'])
            }))

        gulp.task('finish', ['js', 'css', 'libs', 'assets', 'html'], () => {
            log.info(`Building is finished!`)
            setTimeout(() => {
                cb()
            }, 500)
        })
    },
    watch: () => {
        watch(config.source.js, () => {
            gulp.start('js')
        })
        watch(config.source.css, () => {
            gulp.start('css')
        })
        watch(config.source.libs, () => {
            gulp.start('libs')
        })
        watch(config.source.assets, () => {
            gulp.start('assets')
        })
        watch(config.source.html, () => {
            gulp.start('html')
        })
    },
    server: (params) => {
        params.port = params.port || 3000
        params.watch = params.watch || false

        let server = serverConfig(params)

        browserSync.init(server)
        server.watch ? gulp.watch(server.server.baseDir + '/**/*', ['reload']) : 0

        gulp.task('reload', browserSync.reload);
    },
    init: (cb) => {
        gulp.src(config.templates.init)
            .pipe(plumber())
            .pipe(gulp.dest('./').on('finish', () => {
                module.exports.create.page('index', () => {
                    cb()
                })
            }))
    },
    create: {
        component: (name, cb) => {
            name = name.charAt(0).toUpperCase() + name.slice(1)

            gulp.src(config.templates.component.bml)
                .pipe(plumber())
                .pipe(replace(/{{.*?}}/gi, name))
                .pipe(rename(`${name}.bml`))
                .pipe(gulp.dest(`./components/${name}`, {overwrite: false}).on('finish', () => {

                    gulp.src(config.templates.component.styl)
                        .pipe(plumber())
                        .pipe(replace(/{{.*?}}/gi, name))
                        .pipe(rename(`${name}.styl`))
                        .pipe(gulp.dest(`./components/${name}`, {overwrite: false}).on('finish', () => {
                            cb()
                        }))

                }))
        },
        page: (name, cb) => {
            gulp.src(config.templates.page)
                .pipe(plumber())
                .pipe(replace(/{{.*?}}/gi, name))
                .pipe(rename(`${name}.html`))
                .pipe(gulp.dest(`./pages/`, {overwrite: false}).on('finish', () => {
                    cb()
                }))
        }
    }
}

gulp.task('js', () => {
    return gulp.src(config.source.js)
               .pipe(plumber())
               .pipe(debug({
                   title: 'Compiling:',
                   showCount: false
               }))
               .pipe(pipeToString(
                   string => beast.parseBML(string),
                   'bml'
               ))
               .pipe(jsValidate().on('error', (error) => {
                   log.info(chalk.red(error))
               }))
               .pipe(concat('bundle.js'))
               .pipe(gulp.dest(config.output + '/bundle'))
})

gulp.task('css', () => {
    return gulp.src(config.source.css)
               .pipe(plumber())
               .pipe(debug({
                   title: 'Compiling:',
                   showCount: false
               }))
               .pipe(base64(base64Settings))
               .pipe(concat('bundle.styl', {newLine: line}))
               .pipe(pipeToString(quoteBase64, 'styl'))
               .pipe(stylus())
               .pipe(autoprefixer(autoprefixerSettings))
               .pipe(gulp.dest(config.output + '/bundle'))
})

gulp.task('libs', () => {
    return gulp.src(config.source.libs)
               .pipe(plumber())
               .pipe(debug({
                   title: 'Compiling:',
                   showCount: false
               }))
               .pipe(jsValidate())
               .pipe(concat('libs.js'))
               .pipe(gulp.dest(config.output + '/bundle'))
})

gulp.task('assets', () => {
    return gulp.src(config.source.assets)
               .pipe(plumber())
               .pipe(debug({
                   title: 'Compiling:',
                   showCount: false
               }))
               .pipe(copy(config.output))
})

gulp.task('html', () => {
    return gulp.src(config.source.html)
               .pipe(plumber())
               .pipe(debug({
                   title: 'Compiling:',
                   showCount: false
               }))
               .pipe(copy(config.output, {prefix: 1}))
})
