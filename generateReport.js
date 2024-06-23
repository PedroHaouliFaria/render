const fs = require('fs');
const Table = require('cli-table');

fs.readFile('results.json', 'utf8', (err, data) => {
  if (err) throw err;
  const results = JSON.parse(data);

  const totalTests = results.stats.tests;
  const passedTests = results.stats.passes;
  const failedTests = results.stats.failures;

  const passPercentage = ((passedTests / totalTests) * 100).toFixed(2);
  const failPercentage = ((failedTests / totalTests) * 100).toFixed(2);

  // Create a table
  const table = new Table({
    head: ['Total Tests', 'Passed Tests', 'Failed Tests', 'Pass Percentage', 'Fail Percentage'],
    colWidths: [12, 13, 13, 15, 15]
  });

  // Add the test results to the table
  table.push(
    [totalTests, passedTests, failedTests, `${passPercentage}%`, `${failPercentage}%`]
  );

  // Print the table to the console
  console.log(table.toString());
});