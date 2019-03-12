require('dotenv').config()
// const axios = require('axios')
const path = require('path')

// Translate base path
const translateBasePath = process.env.TRANSLATE_URL
const apiTranslate = '/api/translate'

/**
 * Translation API call
 *
 * @param {q} str - Translation strings
 * @param {source} str - Original language, en, ja, etc.
 * @param {target} str - Target language, en, ja, etc.
 */
export function translate (q, source, target) {
  const targetPath = path.join(translateBasePath, apiTranslate)
  console.log(targetPath)
  // axios.post(targetPath, {
  //   q: q,
  //   source: source,
  //   target: target
  // })
  //   .then(function (response) {
  //     console.log(response)
  //   })
  //   .catch(function (error) {
  //     console.log(error)
  //   })
}
