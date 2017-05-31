import gulp from 'gulp';
import plumber from 'gulp-plumber';
import rename from 'gulp-rename';
import through from 'through2';
import gutil from 'gulp-util';
import changed from 'gulp-changed';
import { MainGulptask } from '../MainGulptask';
import path from 'path';
import mail from 'gulp-mail';

export class SendMail extends MainGulptask {
  constructor(options) {
    super(options);
    this._name = "SEND EMAIL";
    this._template = "";
    this._to = "";
    this._smtpInfo = "";
    this._sender = "";
  }
  get template() {
    return this._template;
  }
  set template(newTemplate) {
    this._template = newTemplate;
  }
  get to() {
    return this._to;
  }
  set to(destination) {
    this._to = destination;
  }
  get sender() {
    return this._sender;
  }
  set sender(senderName) {
    this._sender = senderName;
  }
  get smtpInfo() {
    return this._smtpInfo;
  }
  set smtpInfo(info) {
    this._smtpInfo = info;
  }
  task(done) {
    const smtpInfo = this.smtpInfo;
    const source = `./build/${this.template}/index.html`;
    // TODO: get URL of images from image hosting
    const imageHost = "http://www.exemple.com";

    return gulp.src(source)
      .pipe(plumber((error) => {
        console.log(error);
        this.emit('end');
      }))
      .pipe(through.obj(function(file, enc, callback) {
        if (file.isStream()) {
          this.emit('error', new GulpError('Send email', 'Streams are not supported!'))
          return callback()
        }
        if (file.isBuffer()) {
          var output = file.clone();
          var render = file.contents.toString().replace(/(\.\/images\/)/g, imageHost);
          output.contents = new Buffer(render, enc);
          this.push(output);
        }
        return callback()
      }))
      .pipe(mail({
        subject: `Emailing starter kit. Email: ${this.template}`,
        to: [
          this.to
        ],
        from: this.sender,
        smtp: this.smtpInfo
      }))
      .on('end', () => {
        done();
      });
  }
};