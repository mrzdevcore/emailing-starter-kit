import gulp from 'gulp';
import config from './gulpfile.config.js';

import { PugMJML } from './gulptasks/PugMJML';
import { ImgExtractor } from './gulptasks/ImgExtractor';
import { SendMail } from './gulptasks/SendMail';

import { Xlsx2json } from './gulptasks/Xlsx2json';

const gs = gulp.series;
const gp = gulp.parallel;

export function pugmjmlTask(done) { 
  const run = new PugMJML();
  run.src = config.pugMJML.MAIN;
  run.dest = config.pugMJML.DEST;
  run.data = require(config.pugMJML.DATA);
  return run.task(done);
}

export function imageExtractorTask(done) {
  const run = new ImgExtractor({
    src: config.image.HTML,
    imageSRC: config.image.imgSRC
  });
  return run.task(done);
}

export function sendMail(done) {
  const run = new SendMail();
  run.template = config.sendEmail.template;
  run.to = config.sendEmail.to;
  run.sender = config.sendEmail.sender || 'Emailing starter kit <gulp.testmail@yahoo.com>';
  run.smtpInfo = {
    auth: {
      user: 'gulp.testmail@yahoo.com',
      pass: 'Qwerty@5'
    },
    host: 'smtp.mail.yahoo.com',
    secureConnection: false,
    port: 587
  };
  console.log(run.sender);
  return run.task(done);
}

export function xlsx2json(done) {
  const run = new Xlsx2json({
    src: config.xlsx.SRC,
    dest: config.xlsx.DEST
  })
  return run.task(done);
}

const build = gs(xlsx2json, pugmjmlTask, imageExtractorTask);
export default build;