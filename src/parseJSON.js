// this is what you would do if you were one to do things the easy way:
// var parseJSON = JSON.parse;

// but you're not, so you'll write it from scratch:
var parseJSON = function(json){
  var tempArr = [];
    // first split the string by commas into an array
  tempArr = json.split(',');
  // iterate through the array by index, stopping once you hit a [ or { and
  // calling the function again
  // what about objects with keys and values? when you hit a :
  // for that problem we can check each individual index if it contains a :
  // do i need stringParse? leave that untouched for now... see how it plays out.
  for(var i = 0; i < tempArr.length; i++){
    if(tempArr[i].contains('{')){
      objParse(tempArr[i]);
    }
    if(tempArr[i].contains('[')){
      arrayParse(tempArr[i]);
    }
    if(tempArr[i].contains(':')){
      keyParse(tempArr[i]);
    }
    if(tempArr[i].contains('""')){
      stringParse(tempArr[i]);
    }
  }
  function arrayParse(json){
    if (json.length < 3 && json[0] === '['){
      console.log(jsonArr);
      return jsonArr;
    // if it encounters another [ then it will run arrayParse again
    // if it encounters a { it will run objParse
    // if it encounters a : it will run keyParse
    // if it encounters a " it will run stringParse
  }
  function objParse(json){
    if (json.length < 3 && json[0] === '{'){
        console.log(jsonObj);
        return jsonObj;
      }
    // if it encounters another { then it will run objParse again
    // if it encounters a [ it will run arrayParse
    // if it encounters a : it will run keyParse
    // if it encounters a " it will run stringParse
  }
  function keyParse(json){
    // it will take all non-whitespace data before the : as the key and take all non-whitespace data after the : as the value
  }
  function stringParse(json){
    // it will take all data after the
  }
}
