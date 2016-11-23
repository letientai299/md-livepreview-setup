var fs = require('fs')
var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var marked = require('marked');

marked.setOptions({
  highlight: function(code) {
    return require('highlight.js').highlightAuto(code).value;
  }
});

var WORKING_FILE = 'readme.md'
var OUTPUT_FILE = 'index.html'

function renderMarkdown() {
  var content = fs.readFileSync(WORKING_FILE, 'utf-8')
  var html = marked(content)
  var appended_html =
    `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width" />
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/github-markdown-css/2.4.1/github-markdown.css" type="text/css" charset="utf-8">
    <link rel="stylesheet" href="//cdn.jsdelivr.net/highlight.js/9.8.0/styles/default.min.css">
    <title>${WORKING_FILE}</title>
    <style>
      .markdown-body {
        box-sizing: border-box;
        min-width: 200px;
        max-width: 600px;
        margin: 0 auto;
        padding: 45px;
    }
    </style>
  </head>
  <body>
    <div class='markdown-body'>
      ${html}
    </div>
  </body>
</html>
`
  fs.writeFileSync(OUTPUT_FILE, appended_html, 'utf-8')
}

gulp.task('default', ['serve'], function() {
  renderMarkdown()
});

gulp.task('serve', function() {
  browserSync.init({
    server: "./"
  });

  console.log("fadf");
  gulp.watch(["*.md", "*.js", "*.html"]).on('change', function() {
    renderMarkdown()
    browserSync.reload()
  })
})
