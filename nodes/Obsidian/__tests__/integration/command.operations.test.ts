import {
	handleListCommands,
	handleExecuteCommand,
} from '../../operations/command.operations';
import { createMockExecuteFunctions, cleanupTestVault } from './helpers';
import { TEST_CREDENTIALS, skipIfObsidianUnavailable } from './setup';

describe('Command Operations Integration Tests', () => {
	skipIfObsidianUnavailable();

	beforeEach(async () => {
		await cleanupTestVault();
	});

	afterEach(async () => {
		await cleanupTestVault();
	});

	describe('handleListCommands', () => {
		it('should list all available commands', async () => {
			// Arrange
			const mockExec = createMockExecuteFunctions({});

			// Act
			const result = await handleListCommands.call(mockExec, 0, TEST_CREDENTIALS);

			// Assert - API returns { commands: [...] }
			expect(result).toBeDefined();
			expect(Array.isArray(result.commands)).toBe(true);
		});
	});

	describe('handleExecuteCommand', () => {
		it('should execute command with valid ID', async () => {
			// Arrange - first get a list of commands to find a valid one
			const listMock = createMockExecuteFunctions({});
			const listResult = await handleListCommands.call(listMock, 0, TEST_CREDENTIALS);

			// Skip if no commands available
			const commands = listResult.commands as Array<{ id: string; name: string }>;
			if (!commands || commands.length === 0) {
				// eslint-disable-next-line no-console
				console.warn('No commands available to test execution');
				return;
			}

			// Get first available command ID
			const firstCommand = commands[0];

			const execMock = createMockExecuteFunctions({ commandId: firstCommand.id });

			// Act
			const result = await handleExecuteCommand.call(execMock, 0, TEST_CREDENTIALS);

			// Assert
			expect(result).toEqual({
				success: true,
				commandId: firstCommand.id,
			});
		});
	});
});
