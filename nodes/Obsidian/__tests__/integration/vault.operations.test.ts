import {
	handleListNotes,
} from '../../operations/vault.operations';
import { createMockExecuteFunctions, cleanupTestVault, createTestNote } from './helpers';
import { TEST_CREDENTIALS, skipIfObsidianUnavailable } from './setup';

describe('Vault Operations Integration Tests', () => {
	skipIfObsidianUnavailable();

	beforeEach(async () => {
		await cleanupTestVault();
	});

	afterEach(async () => {
		await cleanupTestVault();
	});

	describe('handleListNotes', () => {
		it('should list all notes in test vault', async () => {
			// Arrange
			await createTestNote('test/note1.md', '# Note 1');
			await createTestNote('test/note2.md', '# Note 2');
			const mockExec = createMockExecuteFunctions({ folder: '' });

			// Act
			const result = await handleListNotes.call(mockExec, 0, TEST_CREDENTIALS);

			// Assert
			expect(result).toHaveProperty('results');
			expect(result.results).toBeDefined();
		});

		it('should list notes in specific folder', async () => {
			// Arrange
			await createTestNote('test/folder/note.md', '# Folder Note');
			const mockExec = createMockExecuteFunctions({ folder: 'test/folder' });

			// Act
			const result = await handleListNotes.call(mockExec, 0, TEST_CREDENTIALS);

			// Assert
			expect(result).toHaveProperty('results');
		});
	});
});
