// If life was easy, we could just do things the easy way:
// var getElementsByClassName = function (className) {
//   return document.getElementsByClassName(className);
// };

// But instead we're going to implement it from scratch:
var getElementsByClassName = function(className) {
  finalArr = [];
  element = document.body;
  function getNodes(node){
    if(node.classList && node.classList.contains(className)){
      finalArr.push(node)
    }
    for(var i = 0; i < node.childNodes.length; i++){
      getNodes(node.childNodes[i]);
    }
  }
  getNodes(element)
  return finalArr;
};
