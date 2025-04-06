Source code for app - Nákladový kontroling

## Recommended IDE Setup

- [VSCode](https://code.visualstudio.com/) + [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) + [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

## Project Setup

### Install

```bash
$ npm install
```

### Development

```bash
$ npm dev
```

### Build

```bash
# For windows
$ npm build:win

# For macOS
$ npm build:mac

# For Linux
$ npm build:linux
```

### Check .exe file signature

```bash
osslsigncode verify -in path/to/yourfile.exe
```

## Release New App Version

- upper version in `package.json`
- add new tag `git tag vx.x.x`
- publish tag `git push origin vx.x.x`
- new release will be created for Windows and Linux

Note: Application can't be builded for macOS because there is no mac runner in github. Also applications can't be auto-updated on macOS, if it's not signed.
