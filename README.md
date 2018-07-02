# generate-directory

A simple nodejs project in typescript to generate the skeleton of your application.

## Installation

```sh
# Locally in your project
npm install -D generate-directory

# Or globally (not recommended)
npm install -g generate-directory
```

**Tip:** Installing modules locally allows you to control and share the versions through `package.json`.

## How it works

The purpose of this project is a skeleton of your new project.
This is done by copying the **.setup-folder** and executing the installation command.

For the moment, the installation process is done only for npm based project but you could use it to install a composer project.

**Tip:** If you intent to do that you just have to extend the [generateDirectory](https://github.com/jadok/generate-directory/tree/master/src/core/generateDirectory.ts) class.

## Executing

### CLI

If you are using it command line, it is expected that you install it globally.

```sh

generate-project new MyApp /path/of/my/skeleton/

```

**Tip:** The third parameter is optional, by default it will look for `process.cwd()`

## Contribution

### Global Dependencies

```sh
npm install -g ts-node typedoc
```

## License

MIT
