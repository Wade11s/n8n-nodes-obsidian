module.exports = {
	preset: 'ts-jest',
	testEnvironment: 'node',
	roots: ['<rootDir>/nodes'],
	testMatch: ['**/*.test.ts'],
	moduleFileExtensions: ['ts', 'js'],
	collectCoverageFrom: ['nodes/**/*.ts', '!nodes/**/*.d.ts', '!nodes/**/__tests__/integration/**/*.ts'],
	coverageDirectory: 'coverage',
	// Integration tests may take longer due to real HTTP calls
	testTimeout: 30000,
};
