let testPassed = false;

module.exports = {
  setTestPassed: () => {
    testPassed = true;
  },
  isTestPassed: () => testPassed,
};