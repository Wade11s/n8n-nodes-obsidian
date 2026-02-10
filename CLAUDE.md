# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an n8n community node package that provides integration with Obsidian (via Local REST API plugin) for n8n workflows. It is built using n8n's official `@n8n/node-cli` tooling.

## Common Commands

```bash
# Build the project
npm run build

# Build in watch mode (for development)
npm run build:watch

# Start development mode with n8n-node
npm run dev

# Run ESLint
npm run lint

# Run ESLint with auto-fix
npm run lint:fix

# Create a release
npm run release

# Pre-release checks (runs automatically before publish)
npm run prepublishOnly

# Run unit tests
npm test

# Run tests in watch mode
npm run test:watch

# Run integration tests (requires running Obsidian instance)
npm run test:integration
```

## Architecture

### Node Structure

Each n8n node follows a standard pattern:

1. **Node Class** (`.node.ts`): Implements `INodeType` interface with:
   - `description`: Node metadata (name, icon, inputs/outputs, properties)
   - `execute`: Main execution function that processes input data

2. **Node Metadata** (`.node.json`): Documentation links and categories

3. **Icons**: SVG files for light (`.svg`) and dark (`.dark.svg`) themes

4. **Credentials** (`.credentials.ts`): API authentication configuration

### Key Directories

- `nodes/Obsidian/`: Obsidian node implementation
- `credentials/`: Credential definitions
- `dist/`: Compiled output (not in repo, created by build)

### Node Registration

Nodes are registered in `package.json` under the `n8n` object:

```json
"n8n": {
    "n8nNodesApiVersion": 1,
    "strict": true,
    "credentials": [
        "dist/credentials/ObsidianApi.credentials.js"
    ],
    "nodes": [
        "dist/nodes/Obsidian/Obsidian.node.js"
    ]
}
```

### Path Encoding Pattern

When encoding file paths for the Obsidian API, use the `encodePath` helper function that encodes each path segment separately while preserving `/` separators:

```typescript
const encodePath = (path: string): string => {
    return path
        .split('/')
        .map((part) => encodeURIComponent(part))
        .join('/');
};
```

This ensures paths like `folder/note.md` are correctly encoded as `folder/note.md` (not `folder%2Fnote.md`).

### Supported Operations

The Obsidian node supports operations organized by resource:

| Resource | Operations |
|----------|-----------|
| **Note** | Get, Create, Update, Delete, Copy, Append |
| **Vault** | List Notes |
| **Periodic** | Get, Create (daily, weekly, monthly, quarterly, yearly) |
| **Command** | List Commands, Execute |

### API Endpoints

The node communicates with Obsidian Local REST API:
- Base URL: `https://localhost:27124` (HTTPS) or `http://localhost:27123` (HTTP)
- Authentication: Bearer token in `Authorization` header
- Endpoints:
  - `/vault/${path}` - Note CRUD operations
  - `/vault/` - List notes (with folder path suffix)
  - `/periodic/${period}/${date}/` - Periodic notes
  - `/commands/` - List commands
  - `/commands/${commandId}/` - Execute command

## Code Style

- **TypeScript**: Strict mode enabled, target ES2019, CommonJS modules
- **Formatting**: Prettier with tabs, single quotes, trailing commas, 100 char print width
- **Linting**: ESLint using `@n8n/node-cli/eslint` configuration

## CI/CD

GitHub Actions workflow (`.github/workflows/ci.yml`) runs on PRs and pushes to main:
1. Installs dependencies with `npm ci`
2. Runs lint
3. Runs build

Uses Node.js version 22.

## OpenSpec Workflow

This project uses OpenSpec for spec-driven development. The `openspec/` directory contains:
- `config.yaml` - OpenSpec configuration
- `specs/` - Feature specifications organized by feature
- `changes/` - Active change specifications

Use the OpenSpec skills for working with changes:
- `/opsx:new` - Start a new change
- `/opsx:continue` - Continue working on a change
- `/opsx:ff` - Fast-forward through artifact creation
- `/opsx:apply` - Implement tasks from a change
- `/opsx:verify` - Verify implementation matches specs
- `/opsx:archive` - Archive a completed change

## Operation Handler Pattern

All operation handlers implement the `OperationHandler` type:

```typescript
export type OperationHandler = (
	this: IExecuteFunctions,
	itemIndex: number,
	credentials: ObsidianCredentials,
) => Promise<IDataObject>;
```

Operations are organized by resource in `nodes/Obsidian/operations/`:
- `note.operations.ts` - Note CRUD operations
- `vault.operations.ts` - Vault listing
- `periodic.operations.ts` - Periodic notes (daily, weekly, etc.)
- `command.operations.ts` - Command listing and execution

## Development Notes

- The `listNotes` operation uses URL path for folder filtering (not query params)
- The `includeSubfolders` parameter is accepted but ignored by the Obsidian API
- All path parameters support nested folders (e.g., `folder/subfolder/note.md`)
- SSL certificate validation is skipped by default for the self-signed certificate
- The node maintains backward compatibility by mapping old operation names (`getNote`, `createNote`) to new resource-based format (`note.get`, `note.create`)
- Integration tests require a running Obsidian instance with Local REST API plugin and use a test vault with `test/` prefix
