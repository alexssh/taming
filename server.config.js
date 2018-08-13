module.exports = (params) => {
    let config = {
        server: {
            baseDir: `./build`,
            directory: true
        },
        watch: false,
        open: true,
        reloadDelay: 150,
        host: 'localhost',
        port: params.port,
        watch: params.watch
    }

    return config
}
