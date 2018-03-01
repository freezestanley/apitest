// 将defVal转换为对象
let transferAttr = (list) => {
  for (let i in list) {
    let val = list[i]
    for (let key in val.defVal) {
      list[i].name = key
      list[i].defaultValue = val.defVal[key]
      delete list[i].defVal
    }
    if (!val.name) {
      for (let key in val) {
        list[i] = { name: key, descript: val[key] }
      }
    }
  }
  return list
}

let transferList = (list) => {
  for (let i in list) {
    let val = list[i]
    if (val.params) {
      val.params = transferAttr(val.params)
    }
    if (val.attr) {
      val.attr = transferAttr(val.attr)
    }
  }
  return list
}

let sort = (data) => {
  if (Object.prototype.toString.call(data) === '[object Array]') {
    data.sort((a, b) => {
      return a === 'descript' || b === 'name'
    })
  } else if (Object.prototype.toString.call(data) === '[object Object]') {
    let descript = data.descript
    if (descript) {
      delete data.descript
      data.descript = descript
    }
  }
}
export default {
  transferAttr, transferList, sort
}
