module.exports = () => {

    let config = {
        source: {
            js: `./components/**/*.bml`,
            css: `./components/**/*.styl`,
            libs: `./libs/**/*.js`,
            assets: `./assets/**/*`,
            html: `./pages/**/*.html`
        },
        output: `./build`,
        templates: {
            component: {
                bml: __dirname + `/templates/component/{{component}}.bml`,
                styl: __dirname + `/templates/component/{{component}}.styl`
            },
            init: __dirname + `/templates/init/**/*`,
            page: __dirname + `/templates/page/{{page}}.html`,
            taming: __dirname + `/templates/init/taming.json`
        }
    }

    return config
}
