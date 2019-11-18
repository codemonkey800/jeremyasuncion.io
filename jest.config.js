module.exports = {
  preset: 'ts-jest',
  moduleNameMapper: {
    '\\.css$': 'identity-obj-proxy',
    '^germy/(.*)$': '<rootDir>/src/$1',
  },
  moduleFileExtensions: ["js", "ts", "tsx"],
  testPathIgnorePatterns: ["<rootDir>/node_modules/"],
  testRegex: "\\.test\\.tsx?$",
  transform: {
    "^.+\\.tsx?$": "ts-jest"
  },
};
