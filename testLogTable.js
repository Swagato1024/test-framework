
const testLog = [];

const getTestLog = function () {
  return testLog;
}

const updateTestLog = function(status, actual, expected, message, functionName) {
  testLog.push(
    {
      expected, actual, message, status, message, functionName
    }
  );
}

const testAddDetail = {
  title : "testAdd()",

}


const generateSummary = function () {
  let totalCases = 0;
  let passedCases = 0;

  for (let entry of getTestLog()) {
    passedCases += (entry.status === true) ? 1 : 0; 
    totalCases += 1;
  }

  console.log();
  console.log("Summary : " + passedCases + "/" + totalCases + " passed");
}


const assertEquals = function (actual, expected, message, functionName) {
  result = expected === actual;

  updateTestLog(result, actual, expected, message, functionName);
}


const assertAlmostEquals = function (actual, expected, message) {
  result = Math.abs(expected - actual) < 0.1;

  updateTestLog(result);
}

const add = function (x,y) {
  return  x + y;
}

const testAdd = function () {
  assertEquals(add(4, 0), 4, "sum of a number with 0 should be the number itself", "testAdd()");
  assertEquals(add(-5, 5), 1, "sum of number with it's negetive value should be zero", "testAdd()");
}

testAdd();
console.table(testLog);
generateSummary();
