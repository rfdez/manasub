/** @type {import('jest').Config} */
const config = {
	projects: [
		{
			displayName: "contexts",
			preset: "ts-jest",
			testEnvironment: "node",
			testMatch: ["<rootDir>/contexts/**/tests/**/*.test.ts"],
		},
	],
	cacheDirectory: ".tmp/jestCache",
};

module.exports = config;
