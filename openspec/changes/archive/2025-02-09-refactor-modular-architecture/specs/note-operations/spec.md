## ADDED Requirements

### Requirement: Get note content
The system SHALL retrieve the content of a note at the specified path.

#### Scenario: Successfully retrieve note
- **WHEN** the operation "getNote" is invoked with a valid path
- **THEN** the system SHALL return the note content and metadata

#### Scenario: Note does not exist
- **WHEN** the operation "getNote" is invoked with a non-existent path
- **THEN** the system SHALL return an error indicating the note was not found

### Requirement: Create new note
The system SHALL create a new note at the specified path with the provided content.

#### Scenario: Successfully create note
- **WHEN** the operation "createNote" is invoked with path and content
- **THEN** the system SHALL create the note and return success

#### Scenario: Note already exists without overwrite
- **WHEN** the operation "createNote" is invoked for an existing path with overwrite=false
- **THEN** the system SHALL return an error indicating the note already exists

#### Scenario: Note already exists with overwrite
- **WHEN** the operation "createNote" is invoked for an existing path with overwrite=true
- **THEN** the system SHALL replace the note content and return success

### Requirement: Update existing note
The system SHALL replace the entire content of an existing note.

#### Scenario: Successfully update note
- **WHEN** the operation "updateNote" is invoked with path and new content
- **THEN** the system SHALL replace the note content and return success

### Requirement: Patch note with targeted insertion
The system SHALL insert content into a specific section of a note, optionally under a target heading.

#### Scenario: Append to end of note
- **WHEN** the operation "patchNote" is invoked with path and content without targetHeading
- **THEN** the system SHALL append the content to the end of the note

#### Scenario: Insert under specific heading
- **WHEN** the operation "patchNote" is invoked with path, content, and targetHeading
- **THEN** the system SHALL insert the content under the specified heading

### Requirement: Delete note
The system SHALL delete a note at the specified path.

#### Scenario: Successfully delete note
- **WHEN** the operation "deleteNote" is invoked with a valid path
- **THEN** the system SHALL delete the note and return success

#### Scenario: Note does not exist
- **WHEN** the operation "deleteNote" is invoked with a non-existent path
- **THEN** the system SHALL return an error indicating the note was not found

### Requirement: Copy note to new location
The system SHALL copy a note from a source path to a destination path.

#### Scenario: Successfully copy note
- **WHEN** the operation "copyNote" is invoked with source and destination paths
- **THEN** the system SHALL create a copy of the note at the destination and return success

#### Scenario: Source note does not exist
- **WHEN** the operation "copyNote" is invoked with a non-existent source path
- **THEN** the system SHALL return an error indicating the source note was not found

### Requirement: Append content to note
The system SHALL append content to the end of an existing note.

#### Scenario: Successfully append to note
- **WHEN** the operation "appendToNote" is invoked with path and content
- **THEN** the system SHALL append the content to the end of the note and return success

#### Scenario: Note does not exist
- **WHEN** the operation "appendToNote" is invoked with a non-existent path
- **THEN** the system SHALL return an error indicating the note was not found
