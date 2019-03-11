const fs = require('fs-extra')
const path = require('path')
const klawSync = require('klaw-sync')

const { dialog } = require('electron').remote

/**
 * fileDialog
 * Open file dialog.
 *
 * @param {options} str see https://electronjs.org/docs/api/dialog for the details.
 */
export function fileDialog (options) {
  const res = dialog.showOpenDialog(options)

  if (!res || !res.length) {
    return null
  }
  const p = res[0]
  return p || null
}

/**
 * listAll
 * Traverse all directory and list the file names.
 *
 * @param {dir} str - The root directory to start traverse files.
 * @param {nodir} str - To omit directories, true or false
 * @param {extname} str - file extention name, e.g. '.md'
 * @returns {Array} - file list of klawSync
 */
export function listAll (dir, nodir, extname) {
  const filterFn = item => {
    const ext = path.extname(item.path)
    return ext === extname
  }

  return klawSync(dir,
    {
      nodir: nodir,
      traverseAll: true,
      filter: filterFn
    })
}

/**
 * copyFiles
 *
 * @param {srcFilePath} str - Source file path
 * @param {distDir} str - Destination file directory
 */
export async function copyFiles (srcFilePath, distDir) {
  const fileName = path.basename(srcFilePath)
  const distFilePath = path.format({
    root: '/ignored',
    dir: distDir,
    base: fileName
  })

  await fs.copy(srcFilePath, distFilePath, err => {
    if (err) return console.error('failed to copy : ' + err)

    console.log('Copied : ' + distFilePath)
  })
}
