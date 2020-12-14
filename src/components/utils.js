
 function range(start, end) {
   
    let len = end - start + 1;
    let a = new Array(len);
    for (let i = 0; i < len; i++) a[i] = start + i;
    return a;
  }

  const zip = (...arr) => {
    const zipped = [];
    arr.forEach((element, ind) => {
       element.forEach((el, index) => {
          if(!zipped[index]){
             zipped[index] = [];
          };
          if(!zipped[index][ind]){
             zipped[index][ind] = [];
          }
          zipped[index][ind] = el || '';
       })
    });
    return zipped;
 };

 const arraysMatch = function (arr1, arr2) {
    console.log('arr1', arr1)
    console.log('arr2', arr2)

    // Check if the arrays are the same length
    if (arr1.length !== arr2.length) return false;
  
    // Check if all items exist and are in the same order
    for (var i = 0; i < arr1.length; i++) {
      if (arr1[i] !== arr2[i]) return false;
    }
  
    // Otherwise, return true
    return true;
  
  };
  function nextItem(arr, i) {
   i = i + 1; // increase i by one
   if (i === arr.length) { // i would become 0
      return undefined // return undefined
  }
   return arr[i]; // give us back the item of where we are now
}

function prevItem(arr, i) {
   if (i === 0) { // i would become 0
       return undefined // return undefine
   }
   i = i - 1; // decrease by one
   return arr[i]; // give us back the item of where we are now
}

function getRandom(arr, n) {
   var result = new Array(n),
       len = arr.length,
       taken = new Array(len);
   if (n > len)
       throw new RangeError("getRandom: more elements taken than available");
   while (n--) {
       var x = Math.floor(Math.random() * len);
       result[n] = arr[x in taken ? taken[x] : x];
       taken[x] = --len in taken ? taken[len] : len;
   }
   return result;
}

console.log(
  getRandom(range(1,10), 2)
)

 export {
     range,
     zip,
     arraysMatch,
     nextItem,
     prevItem,
     getRandom
 }