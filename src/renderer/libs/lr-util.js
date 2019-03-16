require('dotenv').config()
const axios = require('axios')

// Translate base path
const translateBasePath = process.env.TRANSLATE_URL
const apiTranslate = 'api/translate'

/**
 * Translation API call
 *
 * @param {q} str - Translation strings
 * @param {source} str - Original language, en, ja, etc.
 * @param {target} str - Target language, en, ja, etc.
 */
export async function translate (q, source, target) {
  const targetPath = translateBasePath + apiTranslate

  // return axios.post(targetPath, {
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

  const data = {
    q: q,
    source: source,
    target: target
  }

  return axios({
    method: 'post',
    url: targetPath,
    data: data
  }).then(function (response) {
    console.log(response)
  }).catch(function (error) {
    console.log(error)
  })
}
