/**
 * fileList
 * @param {fileList} array - fileList by klawSync
 * @param {distDirPath} str - Destination file path
 */
export function fileList (orgList, distDirPath) {
  var retAray = []

  for (var i in orgList) {
    var obj = {}

    obj.processStatus = 0
    obj.srcName = orgList[i].path
    obj.distName = distDirPath
    retAray.push(obj)
  }

  return retAray
}
