/**
 * @example
 *  function sum(a, b, c){
 *    return a+b+c;
 *  };
 *  console.log( curry(sum)(1,2,3) ); // 6
 *  console.log( curry(sum)(1,2)(3) ); //6
 *  console.log( curry(sum)(1)(2)(3) ); //6
 */
var curry = (function() {
  function retFuncCreator(accumulatedArgs, fn) {
    return function() {
      var newArgsArr = Array.prototype.slice.call(arguments);
      var finalArgs = accumulatedArgs.concat(newArgsArr);
      if (finalArgs.length >= fn.length) {
        return fn.apply(fn, finalArgs);
      }else {
        return retFuncCreator(finalArgs, fn);
      }
    };
  }

  return function(fn) {
    if (typeof fn !== "function") {
      throw "argument should be a function";
    }
    return function() {
      var funcArgsArr = Array.prototype.slice.call(arguments);
      if (funcArgsArr.length >= fn.length) {
        return fn.apply(fn, funcArgsArr);
      }else {
        return retFuncCreator(funcArgsArr, fn);
      }
    };
  };
})();
