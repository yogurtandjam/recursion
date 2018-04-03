// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to write it from scratch:

var stringifyJSON = function(obj) {

  var str = '';
  if(obj === undefined){
    return '';
  }
  if(typeof obj === 'function'){
    return '';
  }
  if(typeof obj === 'string'){
    str = '"' + obj + '"';
  } else if(typeof obj === 'number'){
    str += obj;
  } else if(Array.isArray(obj)){
    str += '[';
    for(var i = 0; i < obj.length-1; i++){
      str += stringifyJSON(obj[i]) + ',';
    }
    str += stringifyJSON(obj[obj.length-1]) + ']';
  } else if(obj !== null && typeof obj === 'object'){
    str += '{';
    var index = 0;
    for(var i in obj){
      if(stringifyJSON(obj[i])){
        str += stringifyJSON(Object.keys(obj)[index]) + ':';
        str += stringifyJSON(obj[i]) + ',';
      }
      index ++;
    }
    str = str.replace(/(^,)|(,$)/g, "")
    str += '}';
  } else {
  str += obj;
  }
  console.log(str)
  return str;
};
