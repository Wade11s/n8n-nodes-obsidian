## ADDED Requirements

### Requirement: List notes in vault
The system SHALL list all notes in the vault, optionally filtered by folder.

#### Scenario: List all notes
- **WHEN** the operation "listNotes" is invoked without a folder filter
- **THEN** the system SHALL return all notes in the vault

#### Scenario: List notes in specific folder
- **WHEN** the operation "listNotes" is invoked with a folder path
- **THEN** the system SHALL return only notes in that folder

