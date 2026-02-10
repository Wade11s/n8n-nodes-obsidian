import {
	handleGetPeriodicNote,
	handleCreatePeriodicNote,
} from '../../operations/periodic.operations';
import { createMockExecuteFunctions, cleanupTestVault } from './helpers';
import { TEST_CREDENTIALS, skipIfObsidianUnavailable } from './setup';

describe('Periodic Operations Integration Tests', () => {
	skipIfObsidianUnavailable();

	beforeEach(async () => {
		await cleanupTestVault();
	});

	afterEach(async () => {
		await cleanupTestVault();
	});

	describe('handleGetPeriodicNote', () => {
		// Periodic notes require Periodic Notes plugin to be configured
		it.skip('should get periodic note with specific date', async () => {
			// Arrange - skipped as it requires plugin configuration
			const mockExec = createMockExecuteFunctions({
				period: 'daily',
				date: '2024-01-15',
			});

			// Act
			const result = await handleGetPeriodicNote.call(mockExec, 0, TEST_CREDENTIALS);

			// Assert
			expect(result).toBeDefined();
		});

		it.skip('should get periodic note without date (current date)', async () => {
			// Arrange
			const mockExec = createMockExecuteFunctions({
				period: 'daily',
				date: '',
			});

			// Act
			const result = await handleGetPeriodicNote.call(mockExec, 0, TEST_CREDENTIALS);

			// Assert
			expect(result).toBeDefined();
		});
	});

	describe('handleCreatePeriodicNote', () => {
		it.skip('should create periodic note with date', async () => {
			// Arrange - skipped as it requires plugin configuration
			const mockExec = createMockExecuteFunctions({
				period: 'daily',
				date: '2024-03-20',
				content: '# Daily Note Content',
			});

			// Act
			const result = await handleCreatePeriodicNote.call(mockExec, 0, TEST_CREDENTIALS);

			// Assert
			expect(result).toBeDefined();
		});

		it.skip('should create periodic note without date (current date)', async () => {
			// Arrange
			const mockExec = createMockExecuteFunctions({
				period: 'daily',
				date: '',
				content: '# Today\'s Note',
			});

			// Act
			const result = await handleCreatePeriodicNote.call(mockExec, 0, TEST_CREDENTIALS);

			// Assert
			expect(result).toBeDefined();
		});
	});
});
