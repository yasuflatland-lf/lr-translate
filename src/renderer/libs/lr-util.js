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

  const data = {
    q: q,
    source: source,
    target: target
  }

  try {
    const res = await axios({
      method: 'post',
      url: targetPath,
      data: data
    })

    return res.data
  } catch (error) {
    console.error(error)
    return error
  }
}
