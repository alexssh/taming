# Taming

Taming is the environment for UI prototyping with Beast.js and Stylus.

## Install

1. Install module `npm install -g taming`
2. Сreate a working directory `mkdir mydir && cd mydir`
3. Init `taming init`
4. Start `taming start`

----

## Usage from command line

### Commands

- `$ taming init` - Work directory initialization or update
- `$ taming new` - Create new component or page
- `$ taming start [options]` - Start builder and server
- `$ taming build [options]` - Build project

### Options

- `--port=<XXXX>` - Set server port
- `--watch` - Reload browser page after changes

### Examples

- `$ taming start --port=9000 --watch` - Build project and start server with browser reload on 9000 port

----

## How it works

Project concatenates to `/build` that comprises components, libs, assets and pages. You can share `/build` files to any place (e.g. GitHub pages).

### Building order

If you need to organize a building order, for instance, to load a file with stylus variables at first, you can use `source` section in `taming.json` to specify a specific order.

This is example of structure:

```
"source": {
    "js": `./components/**/*.bml`,
    "css": [
        "./components/App/**/*.styl",
        "./components/**/*.styl" // Don't forget to include other files
    ]
    "libs": `./libs/**/*.js`,
    "assets": `./assets/**/*`,
    "html": `./pages/**/*.html`
}
```

### Building exceptions

You may define a list of directories or files to exclude from building. Use `!` symbol in the beginning of the line in `source` section.
```
"source": {
    "css": [
        "./components/App/**/*.styl",
        "!./components/Navigation/**/*",
        "./components/**/*.styl"
    ]
}
```

---

## Version history

- **0.1.0**
    - Initial release

- **0.1.1 – 0.1.5**
    - Bug fixes

- **0.2.0**
    - Project's README.md
    - Building order in taming.json
    - Building exceptions in taming.json
    - Initialization & updating refactoring
