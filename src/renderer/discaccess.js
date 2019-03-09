const path = require('path')
const klawSync = require('klaw-sync')

const { dialog } = require('electron').remote
console.log(dialog)

export function fileDialog (options) {
  const res = dialog.showOpenDialog(options)

  if (!res || !res.length) {
    return null
  }
  const p = res[0]
  return p || null
}

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
