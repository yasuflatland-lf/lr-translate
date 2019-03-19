var marked = require('marked')
var showdown = require('showdown')
var lrutil = require('@/libs/lr-util')

marked.setOptions({
  'baseUrl': null,
  'breaks': false,
  'gfm': true,
  'headerIds': true,
  'headerPrefix': '',
  'highlight': null,
  'langPrefix': 'language-',
  'mangle': true,
  'pedantic': false,
  'sanitize': false,
  'sanitizer': null,
  'silent': false,
  'smartLists': false,
  'smartypants': false,
  'tables': true,
  'xhtml': false
})

var converter = new showdown.Converter()

/**
 * Parse Markdown and translate each block
 *
 * @param {q} str - Original Text
 * @param {source} str - Original text language
 * @param {target} str - Target text language
 * @param {fmt} str - Target format, either html or text
*/
export function parse (q, source, target, fmt) {
  let htmlText = marked(q)
  let translatedText = lrutil.translate(htmlText, source, target, fmt)

  translatedText.then((data) => {
    return converter.makeMarkdown(data)
  })
}
