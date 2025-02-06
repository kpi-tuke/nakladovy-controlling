# Aplikácia

Zdrojový kód aplikácie pre nákladový kontroling

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

## Upload Mac files

- `export VERSION=<version>`
- `export APP_NAME=cost-controlling-v${VERSION}-mac.dmg`
- `export PACKAGE_REGISTRY_URL=https://git.kpi.fei.tuke.sk/api/v4/projects/61355/packages/generic/cost-controlling/${VERSION}`
- `curl --fail --show-error --header "PRIVATE-TOKEN: ${GITLAB_TOKEN}" --upload-file ./dist/${APP_NAME} ${PACKAGE_REGISTRY_URL}/${APP_NAME}`
- `curl --fail --show-error --header "PRIVATE-TOKEN: ${GITLAB_TOKEN}" --upload-file ./dist/latest-mac.yml ${PACKAGE_REGISTRY_URL}/latest-mac.yml`
