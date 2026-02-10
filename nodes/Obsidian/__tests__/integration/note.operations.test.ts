import {
	handleGetNote,
	handleCreateNote,
	handleUpdateNote,
	handleDeleteNote,
	handleCopyNote,
	handleAppendToNote,
} from '../../operations/note.operations';
import { createMockExecuteFunctions, cleanupTestVault, createTestNote, noteExists } from './helpers';
import { TEST_CREDENTIALS, skipIfObsidianUnavailable } from './setup';

describe('Note Operations Integration Tests', () => {
	skipIfObsidianUnavailable();

	beforeEach(async () => {
		await cleanupTestVault();
	});

	afterEach(async () => {
		await cleanupTestVault();
	});

	describe('handleGetNote', () => {
		it('should get existing note from test vault', async () => {
			// Arrange
			await createTestNote('test/get-test.md', '# Test Content');
			const mockExec = createMockExecuteFunctions({ path: 'test/get-test.md' });

			// Act
			const result = await handleGetNote.call(mockExec, 0, TEST_CREDENTIALS);

			// Assert - Obsidian API returns the raw content as a string
			expect(typeof result).toBe('string');
			expect(result).toContain('# Test Content');
		});

		it('should throw error for non-existent note', async () => {
			// Arrange
			const mockExec = createMockExecuteFunctions({ path: 'test/non-existent.md' });

			// Act & Assert
			await expect(handleGetNote.call(mockExec, 0, TEST_CREDENTIALS)).rejects.toThrow();
		});
	});

	describe('handleCreateNote', () => {
		it('should create new note', async () => {
			// Arrange
			const mockExec = createMockExecuteFunctions({
				path: 'test/new-note.md',
				content: '# New Note Content',
				overwrite: false,
			});

			// Act
			const result = await handleCreateNote.call(mockExec, 0, TEST_CREDENTIALS);

			// Assert
			expect(result).toBeDefined();
			const exists = await noteExists('test/new-note.md');
			expect(exists).toBe(true);
		});

		it('should create note with overwrite=true', async () => {
			// Arrange
			await createTestNote('test/overwrite-test.md', '# Original');
			const mockExec = createMockExecuteFunctions({
				path: 'test/overwrite-test.md',
				content: '# Updated Content',
				overwrite: true,
			});

			// Act
			const result = await handleCreateNote.call(mockExec, 0, TEST_CREDENTIALS);

			// Assert
			expect(result).toBeDefined();
		});

		// Note: Obsidian API behavior for overwrite=false may vary
		// This test is skipped pending further investigation
		it.skip('should fail when creating existing note without overwrite', async () => {
			// Arrange
			await createTestNote('test/existing.md', '# Existing');
			const mockExec = createMockExecuteFunctions({
				path: 'test/existing.md',
				content: '# New Content',
				overwrite: false,
			});

			// Act & Assert
			await expect(handleCreateNote.call(mockExec, 0, TEST_CREDENTIALS)).rejects.toThrow();
		});
	});

	describe('handleUpdateNote', () => {
		it('should replace note content', async () => {
			// Arrange
			await createTestNote('test/update-test.md', '# Original Content');
			const mockExec = createMockExecuteFunctions({
				path: 'test/update-test.md',
				content: '# Updated Content',
			});

			// Act
			const result = await handleUpdateNote.call(mockExec, 0, TEST_CREDENTIALS);

			// Assert
			expect(result).toBeDefined();
		});
	});

	describe('handleDeleteNote', () => {
		it('should delete note and return success', async () => {
			// Arrange
			await createTestNote('test/delete-test.md', '# To Delete');
			const mockExec = createMockExecuteFunctions({ path: 'test/delete-test.md' });

			// Act
			const result = await handleDeleteNote.call(mockExec, 0, TEST_CREDENTIALS);

			// Assert
			expect(result).toEqual({ success: true, path: 'test/delete-test.md' });
			const exists = await noteExists('test/delete-test.md');
			expect(exists).toBe(false);
		});
	});

	describe('handleCopyNote', () => {
		// Copy functionality may require specific Obsidian API support
		it.skip('should copy note to new location', async () => {
			// Arrange
			await createTestNote('test/source.md', '# Source Content');
			const mockExec = createMockExecuteFunctions({
				sourcePath: 'test/source.md',
				destinationPath: 'test/copied.md',
			});

			// Act
			const result = await handleCopyNote.call(mockExec, 0, TEST_CREDENTIALS);

			// Assert
			expect(result).toEqual({
				success: true,
				sourcePath: 'test/source.md',
				destinationPath: 'test/copied.md',
			});
			const exists = await noteExists('test/copied.md');
			expect(exists).toBe(true);
		});
	});

	describe('handleAppendToNote', () => {
		it('should append content to note', async () => {
			// Arrange
			await createTestNote('test/append-test.md', '# Original');
			const mockExec = createMockExecuteFunctions({
				path: 'test/append-test.md',
				content: '\nAppended line',
			});

			// Act
			const result = await handleAppendToNote.call(mockExec, 0, TEST_CREDENTIALS);

			// Assert
			expect(result).toEqual({ success: true, path: 'test/append-test.md' });
		});
	});
});
