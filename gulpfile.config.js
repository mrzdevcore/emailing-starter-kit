import yargs from 'yargs';

let argv = yargs.usage('Usage: $0 <command> [options]')
          .options({
            lang: {
              type: 'string',
              default: 'uk',
              describe: 'Specify the language (en, ru, jp)'
            }
          }).argv;

export default {
  GENERAL: {
    LANG: argv.lang || argv.l
  },
  pugMJML: {
    ALL: './app/pages/**',
    MAIN: [
      './app/pages/**/*.pug',
      '!./app/pages/**/_*.pug',
      '!./app/pages/_*/**/*.pug',
      '!./app/pages/**/**/_*/*.pug'
    ],
    DEST: `./build/${argv.lang || argv.l}/`,
    DATA: './db/json/' + (argv.lang || argv.l) + '/translation-' + (argv.lang || argv.l) + '.json'
  },
  image: {
    imgSRC: './app/images',
    HTML: './build/**/*.html',
    DEST: './build/'
  },
  sendEmail: {
    to: argv.to,
    template: argv.template,
    sender: argv.sender
  },
  xlsx: {
    SRC: [
      './db/xlsx/**/*-' + (argv.lang || arg.l) + '.{xlsx,xls,ods}',
      '!./db/xlsx/**/~*.{xlsx,xls,ods}'
    ],
    DEST: './db/json/' + (argv.lang || arg.l) + '/'
  }
};