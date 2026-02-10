# n8n-nodes-obsidian-rest-local

[![npm](https://img.shields.io/npm/v/n8n-nodes-obsidian-rest-local)](https://www.npmjs.com/package/n8n-nodes-obsidian-rest-local)

This is an n8n community node that enables you to interact with [Obsidian](https://obsidian.md/) via the [Local REST API](https://github.com/coddingtonbear/obsidian-local-rest-api) plugin. Automate your note-taking workflows by creating, reading, updating, and managing your Obsidian vault from n8n.

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/sustainable-use-license/) workflow automation platform.

## Table of Contents

- [Installation](#installation)
- [Credentials](#credentials)
- [Operations](#operations)
- [Compatibility](#compatibility)
- [Usage](#usage)
- [Testing](#testing)
- [Resources](#resources)

## Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation.

```bash
npm install n8n-nodes-obsidian-rest-local
```

## Credentials

To use this node, you need to install and configure the **Local REST API** plugin in Obsidian.

### Setup Steps

1. **Install the plugin:**
   - Open Obsidian Settings → Community Plugins
   - Search for "Local REST API" by Adam Coddington
   - Install and enable the plugin

2. **Configure the API:**
   - Go to Settings → Local REST API
   - Enable the HTTP server (or HTTPS if you have certificates)
   - Copy the API Key displayed in the settings
   - Note the port number (default: 27123 for HTTP, 27124 for HTTPS)

3. **Create n8n credentials:**
   - In n8n, go to Settings → Credentials
   - Click "Add Credential" and search for "Obsidian API"
   - Fill in the fields:
     - **API Key**: The key from step 2
     - **Base URL**: `http://localhost:27123` (HTTP) or `https://localhost:27124` (HTTPS)
     - **Ignore SSL Issues**: Enable if using the default self-signed certificate

### SSL Certificate Handling

The Local REST API plugin uses a self-signed certificate by default. You have two options:

1. **Ignore SSL issues** (recommended for local use): Enable the "Ignore SSL Issues" option in credentials
2. **Install the certificate**: Download the certificate from the plugin settings and add it to your system trust store

## Operations

This node organizes functionality into **Resources** and **Operations**. First select a resource type, then choose the specific operation:

| Resource | Operations | Description |
|----------|-----------|-------------|
| **Note** | Get, Create, Update, Delete, Copy, Append | Work with individual notes |
| **Vault** | List Notes | Vault-wide operations |
| **Periodic** | Get, Create | Work with periodic notes (daily, weekly, monthly, quarterly, yearly) |
| **Command** | List Commands, Execute | Control Obsidian application |

### Note Operations

| Operation | Description |
|-----------|-------------|
| **Get** | Retrieve the content of a note by path |
| **Create** | Create a new note. Supports `overwrite` option to replace existing notes |
| **Update** | Replace the entire content of an existing note |
| **Delete** | Delete a note from the vault |
| **Copy** | Copy a note from one location to another |
| **Append** | Append content to the end of an existing note (creates if not exists) |

### Vault Operations

| Operation | Description |
|-----------|-------------|
| **List Notes** | List all notes in the vault, optionally filtered by folder |

### Periodic Operations

| Operation | Description |
|-----------|-------------|
| **Get** | Retrieve a daily, weekly, monthly, quarterly, or yearly note |
| **Create** | Create or update a periodic note |

### Command Operations

| Operation | Description |
|-----------|-------------|
| **List Commands** | Get all available Obsidian commands with their IDs |
| **Execute** | Execute an Obsidian command by ID |

## Compatibility

- **Minimum n8n version**: Not specified (uses n8n-workflow peer dependency)
- **Obsidian**: Compatible with Obsidian v1.0+
- **Local REST API plugin**: v1.0+
- **Node.js**: v22+ (for development)

## Usage

### Basic Example: Create a Note

1. Add the Obsidian node to your workflow
2. Select **Resource**: `Note`
3. Select **Operation**: `Create`
4. Set the path: `Projects/My Project.md`
5. Set the content:
   ```markdown
   # My Project

   - Task 1: Setup environment
   - Task 2: Configure API
   ```

### Working with Periodic Notes

Periodic notes are automatically organized by date:

- **Daily**: `2024-01-15` format
- **Weekly**: `2024-W03` format
- **Monthly**: `2024-01` format
- **Quarterly**: `2024-Q1` format
- **Yearly**: `2024` format

Leave the date field empty to use the current date.

### Executing Commands

To execute an Obsidian command:

1. Add an Obsidian node and select **Resource**: `Command`
2. Select **Operation**: `List Commands` to get available commands
3. Find the command ID you need
4. Add another Obsidian node with **Resource**: `Command`, **Operation**: `Execute`
5. Paste the command ID

Example command IDs:
- `app:reload`: Reload the app
- `workspace:close`: Close current tab
- `editor:save-file`: Save current file

## Testing

### Unit Tests

```bash
npm test
```

### Integration Tests

Integration tests require a running Obsidian instance with the Local REST API plugin configured.

**Prerequisites:**
1. Install [Obsidian](https://obsidian.md/) and the [Local REST API](https://github.com/coddingtonbear/obsidian-local-rest-api) plugin
2. Enable HTTP server on port 27123
3. Create a vault named "test" (all test operations use `test/` prefix)
4. Set the API key as an environment variable:
   ```bash
   export OBSIDIAN_TEST_API_KEY="your-api-key-here"
   ```
   Optional: Set a custom base URL (defaults to `http://127.0.0.1:27123`):
   ```bash
   export OBSIDIAN_TEST_BASE_URL="http://localhost:27123"
   ```

**Run integration tests:**

```bash
# With environment variable
OBSIDIAN_TEST_API_KEY=your-api-key npm run test:integration

# Or if already exported
npm run test:integration
```

**Note:** Integration tests will create, modify, and delete files in the test vault. Ensure the test vault doesn't contain important data.

## Resources

- [n8n community nodes documentation](https://docs.n8n.io/integrations/#community-nodes)
- [Obsidian Local REST API Documentation](https://coddingtonbear.github.io/obsidian-local-rest-api/)
- [Obsidian Local REST API GitHub](https://github.com/coddingtonbear/obsidian-local-rest-api)
- [Obsidian](https://obsidian.md/)

## Version History

### 0.3.0
- **Breaking Change**: Standardized output format across all operations
  - All operations now return unified response envelope with `data`, `meta`, and optional `error` fields
  - Query operations return data in `data` field with metadata
  - Mutation operations return `data: null` with confirmation metadata
  - Error responses include structured `error` object with `message`, `code`, and `statusCode`
  - Metadata includes `resource`, `operation`, `timestamp`, `statusCode`, `success`

### 0.2.0
- **Breaking Change**: Reorganized UI with Resource-Operation pattern
  - Resources: Note, Vault, Periodic, Command
  - Operations grouped under each resource
  - Backward compatibility maintained for existing workflows

### 0.1.0
- Initial release
- Support for note CRUD operations
- Vault listing operations
- Periodic notes support
- Command execution
