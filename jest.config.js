/** @type {import('jest').Config} */
module.exports = {
  testEnvironment: 'node',
  testMatch: ['**/app/lib/**/*.test.js'],
  modulePathIgnorePatterns: ['<rootDir>/node_modules/'],
  rootDir: __dirname,
}
