export default {
  sortArray: function(array, key, asc=true) {
    array = array.sort((a, b) => {
      if (a[key] < b[key]) return -1
      if (a[key] > b[key]) return 1
      return 0
    })
    if (!asc) return array.reverse()
    return array
  },
}