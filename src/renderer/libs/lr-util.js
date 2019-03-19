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
 * @param {fmt} str - Target format, either html or text
 */
export async function translate (q, source, target, fmt) {
  const targetPath = translateBasePath + apiTranslate

  const format = fmt || 'text'
  const data = {
    q: q,
    source: source,
    target: target,
    format: format
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
