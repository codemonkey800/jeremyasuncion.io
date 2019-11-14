module.exports = {
  collectCoverage: false,
  moduleNameMapper: {
    '\\.css$': 'identity-obj-proxy',
    'germy/(.*)$': '<rootDir>/germy/$1',
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
  testPathIgnorePatterns: ["<rootDir>/.next/", "<rootDir>/node_modules/"],
  testRegex: "\\.test\\.tsx?$",
  transform: {
    "^.+\\.tsx?$": "ts-jest"
  },
};
