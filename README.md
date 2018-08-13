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

- `$ taming init` - Work directory initialization
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

Projects concatenate to `/build` that comprises components, libs, assets and, pages. You can share or deploy `/build` files to any place (e.g. GitHub pages).

---

## Version history

- **0.1.0**
    - Initial release
