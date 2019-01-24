import gulp from 'gulp';
import plumber from 'gulp-plumber';
import through from 'through2';
import { MainGulptask } from '../MainGulptask';
import xlsx from 'xlsx';
import gulpXlsx from 'gulp-js-xlsx';

export class Xlsx2json extends MainGulptask {
  constructor(options) {
    super(options);
    this._name = "XSLX TO JSON";
  }
  
  run(done) {
    return gulp.src(this.src)
      .pipe(plumber((error) => {
        console.log(error);
        this.emit('end');
      }))
      .pipe(gulpXlsx.run({
        parseWorksheet: function(worksheet){
          var array = xlsx.utils.sheet_to_row_object_array(worksheet);
          return 	array;
        }
      }))
      .pipe(through.obj(function(file, enc, callback) {
        if (file.isStream()) {
          this.emit('error', new GulpError('XSLX TO JSON', 'Streams are not supported!'))
          return callback()
        }
        if (file.isBuffer()) {
          var output = file.clone();
          var render = file.contents.toString();
          var textObj = JSON.parse(render);
          var dictionary = {};
          dictionary.translation = {};
          for( var key in textObj ) {
            const array = textObj[key];
            array.forEach((element) => {
              dictionary.translation[element.key] = element.translation;
            });
          }
          render = JSON.stringify(dictionary);
          output.contents = new Buffer(render, enc);
          this.push(output);
        }
        return callback()
      }))
      .pipe(gulp.dest(this.dest))
      .on('end', () => {
        done();
      });
  }
};