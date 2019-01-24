import gulp from 'gulp';
import pug from 'gulp-pug';
import plumber from 'gulp-plumber';
import rename from 'gulp-rename';
import through from 'through2';
import gutil from 'gulp-util';
import data from 'gulp-data';
import mjmlEngine from 'mjml';
// var mjmlEngine = require ('mjml')
import { MainGulptask } from '../MainGulptask';

export class PugMJML extends MainGulptask{
  constructor(options) {
    super(options);
    this._name = "PUGMJML";
  }
  task(done) {
    return gulp.src(this.src)
        .pipe(plumber((error) => {
          console.log(error);
          this.emit('end');
        }))
        .pipe(data((file) => {
          return this.data;
        }))
        .pipe(pug({
          pretty: true
        }))
        .pipe(rename({
          extname: '.mjml'
        }))
        .pipe(through.obj(function(file, enc, callback) { 
          var GulpError = gutil.PluginError
          if (file.isStream()) {
            this.emit('error', new GulpError("mjml", 'Streams are not supported!'))
            return callback()
          }
          if (file.isBuffer()) {
            var output = file.clone()
            var render

            try {
              render = mjmlEngine(file.contents.toString());
            } catch (e) {
              this.emit('error', new GulpError("mjml", e))
              return callback()
            }

            output.contents = new Buffer(render.html)
            output.path = gutil.replaceExtension(file.path.toString(), '.html')
            this.push(output)
          }
          return callback()
        }))
        .pipe(rename((path) => {
          path.dirname = path.basename;
          path.basename = 'index';
        }))
        .pipe(gulp.dest(this.dest))
        .on('end', () => {
          done();
        });
  }
};