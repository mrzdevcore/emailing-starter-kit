import gulp from 'gulp';
import config from './gulpfile.config.js';

import { PugMJML } from './gulptasks/PugMJML';
import { ImgExtractor } from './gulptasks/ImgExtractor';
import { SendMail } from './gulptasks/SendMail';

import { Xlsx2json } from './gulptasks/Xlsx2json';

const gs = gulp.series;
const gp = gulp.parallel;

export function pugmjmlTask(done) { 
  const task = new PugMJML();
  task.src = config.pugMJML.MAIN;
  task.dest = config.pugMJML.DEST;
  task.data = require(config.pugMJML.DATA);
  return task.run(done);
}

export function imageExtractorTask(done) {
  const task = new ImgExtractor({
    src: config.image.HTML,
    imageSRC: config.image.imgSRC
  });
  return task.run(done);
}

export function sendMail(done) {
  const task = new SendMail();
  task.template = config.sendEmail.template;
  task.to = config.sendEmail.to;
  task.sender = config.sendEmail.sender || 'Emailing starter kit <gulp.testmail@yahoo.com>';
  task.smtpInfo = {
    auth: {
      user: 'gulp.testmail@yahoo.com',
      pass: 'Qwerty@5'
    },
    host: 'smtp.mail.yahoo.com',
    secureConnection: false,
    port: 587
  };
  console.log(task.sender);
  return task.run(done);
}

export function xlsx2json(done) {
  const task = new Xlsx2json({
    src: config.xlsx.SRC,
    dest: config.xlsx.DEST
  })
  return task.run(done);
}

const build = gs(xlsx2json, pugmjmlTask, imageExtractorTask);
export default build;