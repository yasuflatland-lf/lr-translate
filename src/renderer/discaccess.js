const path = require('path')
const klawSync = require('klaw-sync')

const { dialog } = require('electron').remote

/**
 * fileDialog
 * Open file dialog.
 *
 * @param {options} str - The root directory to start traverse files.
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
 * @param {extname} str - extention name, e.g. '.md'
 */
export function listAll (dir, nodir, extname) {
  const filterFn = item => {
    const ext = path.extname(item.path)
    return ext === extname
  }

  console.log(klawSync(dir,
    {
      nodir: nodir,
      traverseAll: true,
      filter: filterFn
    }))
}
