Markdown Live Preview Setup
===========================

A Do-it-yourself setup for editing markdown with any editor and preview right in
your browser.

![Demo](demo/small.jpg)

[Bigger and mode up-to-date demo](demo/full.jpg)

Why?
----

- Vim doesn't support live preview.
- I don't like vim-binding in others editors.


How to use
----------

1. Fork and Clone this repo.
2. Run `npm install` to download and install all dependencies.
3. Run `npm start` (or just `gulp` if you have it installed globally). This will
open your browser with the rendered HTML of this `README.md`.
4. Open the `README.md` in your favorite editor and start writing.

Example
--------

List of npm packages:

- [Gulp](https://gulpjs.com)
- [Browsersync](https://www.browsersync.io/)
- [highlightjs](https://highlightjs.org/)
- [marked](https://github.com/chjj/marked)
- [github-markdown-css](https://github.com/sindresorhus/github-markdown-css)


> Here is a example block quote

Here is `inclide code`.

```python
# Python code, highlighted using highlight.js
def foo(n: int) -> str:
  pass
```
