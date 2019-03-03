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
