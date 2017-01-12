const WORKING_FILE = 'readme.md'

const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const marked = require('marked');
const through = require('through2');
const htmlmin = require('gulp-htmlmin');


marked.setOptions({
  highlight: function (code) {
    return require('highlight.js').highlightAuto(code).value;
  }
});

gulp.task('default', ['build', 'serve']);

gulp.task('build', build);

gulp.task('serve', function () {
  browserSync.init({
    server: {
      baseDir: './',
      index: WORKING_FILE + '.html'
    }
  });

  gulp.watch(WORKING_FILE, build);
  gulp.watch("*.html", browserSync.reload);
  gulp.watch('lib/*.css').on('change', (e) => {
    gulp.src(e.path)
      .pipe(browserSync.stream());
  });
});

const TEMPLATE = `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <link rel="stylesheet" href="/lib/highlight.default.min.css">
    <link rel="stylesheet" href="/lib/github-markdown.css">
    <link rel="stylesheet" href="/lib/custom.css">
    <title>${WORKING_FILE}</title>
    </style>
  </head>
  <body>
    <div class='markdown-body'>
      {{content}}
    </div>
  </body>
</html>`

function build() {
  gulp.src(WORKING_FILE)
    .pipe(renderMarkdown())
    .pipe(gulp.dest('./'));
}


function renderMarkdown() {
  var stream = through.obj(function (file, enc, cb) {
    let html = marked(Buffer.from(file.contents, enc).toString());
    file.path = file.path + ".html";
    file.contents = new Buffer(TEMPLATE.replace('{{content}}', html));
    this.push(file);
    cb();
  });

  // returning the file stream
  return stream;
}