const mergeTaskInfo= function(obj, ref) {
  for (var key in ref) {
    if (typeof obj[key] == "object") {
      mergeTaskInfo(obj[key], ref[key]); 
    } else {
      obj[key] = ref[key];
    }
  }
}

module.exports = {
  mergeTaskInfo: mergeTaskInfo
}