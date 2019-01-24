# Emailing Starterkit

[![standard-readme compliant](https://img.shields.io/badge/standard--readme-OK-green.svg?style=flat-square)](https://github.com/RichardLitt/standard-readme)

> mjml pug emailing starter kit (be ready for development)

**Technical Stack**

- MJML (framework for responsive emailing)
- PUG (html generation language)
- gulp (build tool)

## Table of Contents

- [Install](#install)
- [Usage](#usage)
- [Maintainers](#maintainers)
- [Contribute](#contribute)
- [License](#license)

## Install

### System Requirements

- MJML > v4.3.1
- gulp 4
- Node.js > v8.11.2

```sh
# this project uses gulp for the build
# install build dependencies
$ npm install
```


## Usage

```sh

# build the things for en-GB language!
$ gulp --lang en

# send an email template via email
# gulp sendMail --template <template_name> --to exemple@test.com
$ gulp sendMail --template welcome --to me@exemple.com
```

## Maintainers

[@Mirza Andriamanamisoa Marotsaha](https://github.com/mrzdevcore)

## Contribute

PRs accepted.  See the [Contribution Guidelines](CONTRIBUTING.md) for more information.

Small note: If editing the README, please conform to the [standard-readme](https://github.com/RichardLitt/standard-readme) specification.

## License

### GPL-3
You may copy, distribute and modify the software as long as you track changes/dates in source files. Any modifications to or software including (via compiler) GPL-licensed code must also be made available under the GPL along with build & install instructions.


