const style = function (text, colorCode) {
  return "\033[" + colorCode + "m" + text + "\033[0m";
}

const yellow = function(text) {
  return style(text, "33"); 
}

const underline = function(text) {
  return text + "\n" +  "-".repeat(text.length);
}

const printHeadline = function(text) {
  console.log(yellow(underline(text)));
}

const expectationMismatchedMessage = function(expected, actual) {
  let message = "";

  message += "     Expected : " + expected;
  message += "\n"
  message += "       Actual : " + actual;

  return message;
}

const formatMessage = function(result, expected, actual, message) {
  const icon = result ? "✅ " : "❌ ";
  const line1 = icon + message;
  const line2 = result ? "" : ("\n" + expectationMismatchedMessage(expected, actual));

  return line1 + line2;
}

let totalTests = 0;
let noOfTestsPassed = 0;

const getTotalNoOfTests = function() {
  return totalTests;
}

const getNoOfTestsPassed = function() {
  return noOfTestsPassed;
}

const updateTestSummary = function(result) {
  totalTests = getTotalNoOfTests() + 1;
  noOfTestsPassed += result ? 1 : 0;
}

const generateReport = function(result, actual, expected, message) {
  updateTestSummary(result);
  console.log(formatMessage(result, expected, actual, message));
}

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

const assertEquals = function(actual, expected, message) {
  const result = isEqual(expected, actual);
  generateReport(result, actual, expected, message);
}

const assertAlmostEquals = function(actual, expected, message) {
  const result = Math.abs(expected - actual) < 0.1;
  generateReport(result, actual, expected, message);
}

const it = function(testName, testData, assert) {
  assert(testData.actual, testData.expected, testName);
}

const testSummary = function() {
  console.log ("\n Summary : " + getNoOfTestsPassed() + "/" + getTotalNoOfTests() + " passed")
}

exports.assertEquals = assertEquals;
exports.printHeadline = printHeadline;
exports.testSummary = testSummary;
exports.formatMessage = formatMessage;
exports.it = it;
