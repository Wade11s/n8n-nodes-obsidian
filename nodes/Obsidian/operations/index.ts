import type { OperationHandler } from '../helpers/types';
import {
	handleGetNote,
	handleCreateNote,
	handleUpdateNote,
	handleDeleteNote,
	handleCopyNote,
	handleAppendToNote,
} from './note.operations';
import { handleListNotes } from './vault.operations';
import { handleGetPeriodicNote, handleCreatePeriodicNote } from './periodic.operations';
import { handleListCommands, handleExecuteCommand } from './command.operations';

/**
 * Operation registry mapping resource.operation keys to their handlers
 * Supports both new format (resource.operation) and legacy format (operationName)
 */
export const operations: Record<string, OperationHandler> = {
	// Note operations - new format
	'note.get': handleGetNote,
	'note.create': handleCreateNote,
	'note.update': handleUpdateNote,
	'note.delete': handleDeleteNote,
	'note.copy': handleCopyNote,
	'note.append': handleAppendToNote,

	// Vault operations - new format
	'vault.listNotes': handleListNotes,

	// Periodic operations - new format
	'periodic.get': handleGetPeriodicNote,
	'periodic.create': handleCreatePeriodicNote,

	// Command operations - new format
	'command.listCommands': handleListCommands,
	'command.execute': handleExecuteCommand,

	// Legacy format for backward compatibility
	getNote: handleGetNote,
	createNote: handleCreateNote,
	updateNote: handleUpdateNote,
	deleteNote: handleDeleteNote,
	copyNote: handleCopyNote,
	appendToNote: handleAppendToNote,
	listNotes: handleListNotes,
	getPeriodicNote: handleGetPeriodicNote,
	createPeriodicNote: handleCreatePeriodicNote,
	listCommands: handleListCommands,
	executeCommand: handleExecuteCommand,
};

// Re-export all handlers for direct use if needed
export {
	handleGetNote,
	handleCreateNote,
	handleUpdateNote,
	handleDeleteNote,
	handleCopyNote,
	handleAppendToNote,
	handleListNotes,
	handleGetPeriodicNote,
	handleCreatePeriodicNote,
	handleListCommands,
	handleExecuteCommand,
};
