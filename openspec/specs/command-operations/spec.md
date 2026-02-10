## ADDED Requirements

### Requirement: List available commands
The system SHALL retrieve all available Obsidian commands with their IDs and names.

#### Scenario: Successfully list commands
- **WHEN** the operation "listCommands" is invoked
- **THEN** the system SHALL return all available commands with their IDs and display names

### Requirement: Execute command
The system SHALL execute an Obsidian command by its ID.

#### Scenario: Successfully execute command
- **WHEN** the operation "executeCommand" is invoked with a valid command ID
- **THEN** the system SHALL execute the command and return success

#### Scenario: Command does not exist
- **WHEN** the operation "executeCommand" is invoked with an invalid command ID
- **THEN** the system SHALL return an error indicating the command was not found

#### Scenario: Command execution fails
- **WHEN** the operation "executeCommand" is invoked and the command fails during execution
- **THEN** the system SHALL return an error with the failure reason
