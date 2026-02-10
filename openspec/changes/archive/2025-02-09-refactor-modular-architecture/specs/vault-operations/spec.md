## ADDED Requirements

### Requirement: List notes in vault
The system SHALL list all notes in the vault, optionally filtered by folder.

#### Scenario: List all notes
- **WHEN** the operation "listNotes" is invoked without a folder filter
- **THEN** the system SHALL return all notes in the vault

#### Scenario: List notes in specific folder
- **WHEN** the operation "listNotes" is invoked with a folder path
- **THEN** the system SHALL return only notes in that folder

### Requirement: Search notes by content
The system SHALL search for notes matching a query string using Obsidian search syntax.

#### Scenario: Search with results
- **WHEN** the operation "searchNotes" is invoked with a query
- **THEN** the system SHALL return matching notes up to the specified limit

#### Scenario: Search with no results
- **WHEN** the operation "searchNotes" is invoked with a query that matches nothing
- **THEN** the system SHALL return an empty results list

### Requirement: List all tags
The system SHALL retrieve all tags used in the vault.

#### Scenario: Successfully list tags
- **WHEN** the operation "listTags" is invoked
- **THEN** the system SHALL return all unique tags in the vault

### Requirement: Create folder
The system SHALL create a new folder at the specified path.

#### Scenario: Successfully create folder
- **WHEN** the operation "createFolder" is invoked with a folder path
- **THEN** the system SHALL create the folder and return success

#### Scenario: Folder already exists
- **WHEN** the operation "createFolder" is invoked for an existing folder
- **THEN** the system SHALL return an error indicating the folder already exists

#### Scenario: Create nested folders
- **WHEN** the operation "createFolder" is invoked with a nested path where parent does not exist
- **THEN** the system SHALL create all necessary parent folders

### Requirement: Delete folder
The system SHALL delete a folder at the specified path.

#### Scenario: Successfully delete empty folder
- **WHEN** the operation "deleteFolder" is invoked on an empty folder
- **THEN** the system SHALL delete the folder and return success

#### Scenario: Delete folder with contents
- **WHEN** the operation "deleteFolder" is invoked on a folder with contents
- **THEN** the system SHALL return an error indicating the folder is not empty

#### Scenario: Folder does not exist
- **WHEN** the operation "deleteFolder" is invoked with a non-existent path
- **THEN** the system SHALL return an error indicating the folder was not found
