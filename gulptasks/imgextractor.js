import gulp from 'gulp';
import plumber from 'gulp-plumber';
import rename from 'gulp-rename';
import through from 'through2';
import gutil from 'gulp-util';
import changed from 'gulp-changed';
import { MainGulptask } from '../MainGulptask';
import path from 'path';

export class ImgExtractor extends MainGulptask {
  constructor(options) {
    super(options);
    this._name = "IMAGE EXTRACTOR";
    this._regex = /(\.\/images\/(\w+\/)?[\w-]+\.[A-Za-z]+)/g;
    this._imageSRC = './app/images/';
  }
  set regex(newReg) {
    this._regex = newReg;
  }
  set imageSRC(newImgSRC) {
    this._imageSRC = newImgSRC;
  }
  task(done) {
    const regEx = this._regex;
    const imagesBasePath = this._imageSRC;
    const imgDest = this.dest;
    return gulp.src(this.src)
        .pipe(plumber((error) => {
          console.log(error);
          this.emit('end');
        }))
        .pipe(through.obj(function(file, enc, callback){
          if (file.isStream()) {
            this.emit('error', new GulpError('Copy images', 'Streams are not supported!'))
            return callback()
          }
          if (file.isBuffer()) {
            var output = file.clone();
            let imgList = file.contents.toString().match(regEx);
            try {
              imgList = imgList.map((e) => {
                return e.replace('./images/', '' );
              });
              let fileBaseName = file.basename.replace('.html', '');
              
              let basePathDest = path.dirname(file.history[0]);

              const idest = basePathDest + '/images/' ;
              gulp.src(imgList, {base: imagesBasePath, cwd: imagesBasePath })
                .pipe(changed(idest))
                .pipe(gulp.dest(idest));
              }
            catch(e) {
              console.log('Empty images');
              //this.emit('end');
            }
            finally {
              this.push(output);
            }
          }
          return callback()
        }))
        .on('end', () => {
          done();
        });
  }
};
