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
 * Create the destination file path
 *
 * @param {srcDir} str - Source directory
 * @param {srcFilePath} str - Source File path
 * @param {distDir} str - Destination directory
 * @returns distDir + relative file path of srcFilePath from srcDir
 */
export function createDistFilePath (srcDir, srcFilePath, distDir) {
  const relativePath = path.relative(srcDir, srcFilePath)
  return path.resolve(distDir, relativePath)
}

/**
 * Get Path List
 *
 * @param {sourceDir} str - Source directory
 * @param {distDir} str - Destination directory
 * @param {ext} str - target files' extention
 */
export function getPathList (sourceDir, distDir, ext) {
  const orgList = listAll(sourceDir, true, ext)

  const pathList = []
  for (let i in orgList) {
    const distPath = createDistFilePath(sourceDir, orgList[i].path, distDir)
    const data = {
      processStatus: 0,
      srcName: orgList[i].path,
      distName: distPath
    }
    pathList.push(data)
  }

  return pathList
}
