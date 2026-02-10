## ADDED Requirements

### Requirement: Note operations integration tests
The system SHALL provide integration tests for all note operations using real Obsidian API calls.

#### Scenario: Get note from test vault
- **WHEN** the `handleGetNote` operation is called with path `test/note.md`
- **THEN** the system SHALL make a GET request to `/vault/test/note.md`
- **AND** return the note content

#### Scenario: Create note in test vault
- **WHEN** the `handleCreateNote` operation is called with path `test/new-note.md` and content
- **THEN** the system SHALL make a PUT request to `/vault/test/new-note.md`
- **AND** the note SHALL be created in the test vault

#### Scenario: Create note with overwrite
- **WHEN** the `handleCreateNote` operation is called with overwrite=true for an existing note
- **THEN** the system SHALL replace the existing note content

#### Scenario: Update existing note
- **WHEN** the `handleUpdateNote` operation is called with path and content
- **THEN** the system SHALL replace the note content via PUT request

#### Scenario: Patch note without heading
- **WHEN** the `handlePatchNote` operation is called without targetHeading
- **THEN** the system SHALL append content to the end of the note

#### Scenario: Patch note with heading
- **WHEN** the `handlePatchNote` operation is called with targetHeading
- **THEN** the system SHALL insert content under the specified heading

#### Scenario: Delete note
- **WHEN** the `handleDeleteNote` operation is called with path
- **THEN** the system SHALL delete the note via DELETE request
- **AND** return success response

#### Scenario: Copy note
- **WHEN** the `handleCopyNote` operation is called with source and destination paths
- **THEN** the system SHALL copy the note using X-Destination header

#### Scenario: Append to note
- **WHEN** the `handleAppendToNote` operation is called with path and content
- **THEN** the system SHALL append content using POST with X-Append header

### Requirement: Vault operations integration tests
The system SHALL provide integration tests for all vault operations using real Obsidian API calls.

#### Scenario: List all notes in test vault
- **WHEN** the `handleListNotes` operation is called without folder filter
- **THEN** the system SHALL return all notes in the test vault

#### Scenario: List notes in specific folder
- **WHEN** the `handleListNotes` operation is called with folder `test/folder`
- **THEN** the system SHALL return only notes in that folder

#### Scenario: Search notes
- **WHEN** the `handleSearchNotes` operation is called with query
- **THEN** the system SHALL return matching notes via POST to `/search/`

#### Scenario: List tags
- **WHEN** the `handleListTags` operation is called
- **THEN** the system SHALL return all tags via GET to `/tags/`

#### Scenario: Create folder
- **WHEN** the `handleCreateFolder` operation is called with folder path
- **THEN** the system SHALL create the folder via MKCOL request

#### Scenario: Delete folder
- **WHEN** the `handleDeleteFolder` operation is called with folder path
- **THEN** the system SHALL delete the folder via DELETE request

### Requirement: Periodic note operations integration tests
The system SHALL provide integration tests for periodic note operations.

#### Scenario: Get periodic note with date
- **WHEN** the `handleGetPeriodicNote` operation is called with period and date
- **THEN** the system SHALL return the periodic note for that date

#### Scenario: Get periodic note without date
- **WHEN** the `handleGetPeriodicNote` operation is called with period but no date
- **THEN** the system SHALL return the periodic note for current date

#### Scenario: Create periodic note
- **WHEN** the `handleCreatePeriodicNote` operation is called with period, date, and content
- **THEN** the system SHALL create the periodic note via PUT request

### Requirement: Command operations integration tests
The system SHALL provide integration tests for command operations.

#### Scenario: List commands
- **WHEN** the `handleListCommands` operation is called
- **THEN** the system SHALL return all available commands

#### Scenario: Execute command
- **WHEN** the `handleExecuteCommand` operation is called with valid command ID
- **THEN** the system SHALL execute the command via POST request

### Requirement: Test environment setup
The system SHALL provide test infrastructure for integration testing.

#### Scenario: Test vault cleanup
- **WHEN** a test starts
- **THEN** the system SHALL clean up all content in the test vault

#### Scenario: Obsidian health check
- **WHEN** tests initialize
- **THEN** the system SHALL verify Obsidian API is accessible
- **AND** fail fast with clear error if not available

#### Scenario: Test credentials configuration
- **WHEN** tests run
- **THEN** the system SHALL use HTTP protocol on port 27123
- **AND** use the fixed Bearer token for authentication
- **AND** use `test/` prefix for all vault paths
