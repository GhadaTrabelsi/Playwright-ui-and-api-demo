// Author: Ghada Trabelsi
// cucumber.js - Configuration file for Cucumber test runner
module.exports = {
  default: {
    // Path to hooks and step definitions
    require: [
      'features/support/**/*.js',
      'features/step_definitions/**/*.js'
    ],
    // Output format - generates HTML report
    format: ['html:cucumber-report.html'],
    // Number of parallel workers for test execution
    parallel: 2,
    // Number of retries for failed scenarios
    retry: 1,
    // Exit with non-zero code if tests fail
    exit: true,
    // Disable publishing results to Cucumber Cloud
    publish: false,
    // Fail if steps are not defined
    strict: true,
    // Run tests without actually executing them
    dryRun: false
  }
};

