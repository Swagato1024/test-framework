const areArraysEqual = function(a, b) {
  if(a === b) return true;

  if(a.length !== b.length) return false;

  for(const index in a) {
    if(!isEqual(a[index], b[index])) {
      return false;
    }
  }

  return true;
}

const areObjectsEqual = function(a, b) {
  if(a === b) return true;

  const keysA = Object.keys(a);
  const keysB = Object.keys(b);

  if(keysA.length !== keysB.length) return false;

  for(const key in a) {
    if(!isEqual(a[key], b[key])) {
      return false;
    }
  }

  return true;
}

const isObject = function(a) {
  return !Array.isArray(a) && typeof a === "object";
}

const isEqual = function(a,b) {
  if ([a,b].every(Array.isArray)) {
    return areArraysEqual(a,b);
  }

  if ([a,b].every(isObject)) {
    return areObjectsEqual(a,b);
  }

  return a === b;
}

console.log(isEqual([1, 2, 3], [1, [2], 3]) === false);
console.log(isEqual([1, 2, 3], [1, {2:2}, 3]) === false);
console.log(isEqual([{1:10}, {2:20}, 3], [{1:10}, {2:20}, 3]) === true);
