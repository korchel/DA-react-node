/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testPathIgnorePatterns: [
    "__tests__/testDb/testDb.ts",
    "__tests__/testDb/queries.ts",
    "__tests__/common.test.ts",
  ],
};
