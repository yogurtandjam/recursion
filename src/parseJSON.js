var parseJSON = function(json){

// Disclaimer - this code was written after deciphering many many different RD Parsers without prior knowledge of RDPs
// As a result, there will be a LOT of documentation in comments to express to myself and the reader that I am aware of the flow of the code
// and the purpose of every line
// error THROWS (does not RETURN) undefined on unparseable strings - I found this much easier than throwing SyntaxError, I couldn't get that to work

// Setting up our iteration variables
  var index,  // index = index we are looking at
      char;  // char = the character at said index

  // Next pushes the RD Parser to the next item in the string by moving the index, grabbing the character at new index, and returning that new chracter.
  var next = function(input) {
    // increments at
    // updates ch
    char = json.charAt(index); // json is the JSON text passed into our parser
    index ++;
    return char;
  };

// error THROWS (does not RETURN) undefined on unparseable strings - I found this much easier than throwing SyntaxError, I couldn't get that to work
  var error = function(){
    throw undefined;
  }

//-Value-
//This function detects what type of item 'char' is and engages the proper piece of 'grammar' to give the correct result
  var value = function(){
    skip();
    if(char && (char >= 0 && char <= 9) || char === '-'){
      return number();
    }
    if(char === '"'){
      return string();
    }
    if(char === '['){
      return array();
    }
    if(char === '{'){
      return object();
    }
    else{
      return primitive();
    }
  }

// -Skip-
// This function skips any whitespaces
  var skip = function(){
    while(char && char <= ' '){
      next();
    }
  };

  // --------------------Grammar Section---------------------
  // Here, I define the 'grammar' of the RDP: how the program handles each different type of value

// What is our Vocabulary?
// numbers
// strings
// objects
// arrays
// primitive --- this includes non number + string primitives (True, False, Null)

// -Numbers-
// To grab numbers, you continue pushing char into a string as long as it is a number.
// Certain non-numeral items such as -(negative sign) and .(decimal point) will be treated as another number
// non-numeral items are checked separately for efficiency. better than checking for all points at every index
  var number = function(){
    var number = '';
    //Nest another function within so number doesnt constantly reset
    var defineNumber = function(){
      while(char && char >= 0 && char <= 9){
        number += char;
        next();
      }
    }
    if(char === '-'){
      number += char;
      next();
    }
    defineNumber();

    if(char === '.'){
      number += char;
      next();
    }
    defineNumber();

    if(!isNaN(Number(number))){
      return Number(number);
    } else {
      error();
    }
  }


// -Strings-
// When ch reaches a " it will begin pushing items in as a string until it hits the endquotes
// Should accept all inputs including numbers as part of the string - but must account for escapes
var escapes = {
  '\\' : '\\',
  'b' : '\b',
  'f' : '\f',
  'n' : '\n',
  'r' : '\r',
  't' : '\t',
  '\'' : '\'',
  '"' : '"'
};
  var string = function(){
    // make sure it adds chars, stops when it hits an endquote, and grabs all escapes
    var str = '';
    next();
    while(char){
      //checks for endquote to return string.
      if(char === '"'){
        next();
        return str;
      }
      //checks for escapes and grabs the corresponding one
      if(char === '\\'){
        //looks at the character after the \ in order to see which escape to grab
        next();
        if(escapes.hasOwnProperty(char)){
          str += escapes[char];
        }
      } else {
        //If it is not a special escape it just adds that character
        str += char;
      }
      next();
    }
    //char no longer exists aka end has been reached with no endquote
    error();
  }

// -Arrays-
//
  var array = function(){
    var arr = [];
    if(next() === ']'){next(); return arr;}//empty array
    while(char){
      arr.push(value());//push the value into the array
      skip();
      if(char === ']'){
        next();
        return arr;//if end of array is reached, returns the array
      }
    next();
    }
    //if array is not terminated it will throw an error
    error();
  }
// -Objects-
//
  var object = function(){
    var obj = {};
    if(next() === '}'){next(); return obj;}//empty object
    while(char){
      skip();
      var key = string();//grab the key as it is always in quotes
      skip();
      next();
      obj[key] = value();
      skip();
      if(char === '}'){
        next();
        return obj;
      }
      next();
    }
    //if obj is not terminated it will throw an error
    error();
  }
  var primitive = function(){
    switch(char){
      case 't':
        next('t');
        next('r');
        next('u');
        next('e');
        return true;
      case 'f':
        next('f');
        next('a');
        next('l');
        next('s');
        next('e');
        return false;
      case 'n':
        next('n')
        next('u')
        next('l')
        next('l')
        return null;
    }
  }
  index = 1;
  char = json.charAt(0);
  test = value();
  console.log(test)
  return test;
}
