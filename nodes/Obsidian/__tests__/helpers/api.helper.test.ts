import { encodePath } from '../../helpers/api.helper';

describe('encodePath', () => {
	it('should encode path segments separately', () => {
		expect(encodePath('folder/note.md')).toBe('folder/note.md');
	});

	it('should encode special characters in path segments', () => {
		expect(encodePath('folder/my note.md')).toBe('folder/my%20note.md');
	});

	it('should handle nested paths', () => {
		expect(encodePath('folder/subfolder/note.md')).toBe('folder/subfolder/note.md');
	});

	it('should encode special characters in nested paths', () => {
		expect(encodePath('folder/sub folder/my note.md')).toBe(
			'folder/sub%20folder/my%20note.md',
		);
	});

	it('should handle empty path', () => {
		expect(encodePath('')).toBe('');
	});

	it('should handle path with unicode characters', () => {
		expect(encodePath('folder/笔记.md')).toBe('folder/%E7%AC%94%E8%AE%B0.md');
	});

	it('should preserve forward slashes as path separators', () => {
		const input = 'path/with/slashes';
		const result = encodePath(input);
		expect(result).toBe('path/with/slashes');
		expect(result).not.toContain('%2F');
	});
});
