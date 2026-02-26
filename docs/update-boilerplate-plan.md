# Update Boilerplate Webapp — System Design

## Overview

A Claude Code skill + helper script system for syncing improvements from source projects (aerwave, webkart, etc.) back to `boilerplate-webapp`. Run from any source project directory.

## Architecture

```
┌──────────────────────┐     ┌─────────────────────────────┐
│  /update-boilerplate │     │  update-boilerplate.sh      │
│  -webapp (SKILL.md)  │────→│  (mechanical file ops)      │
│                      │     │                             │
│  Intelligence layer: │     │  - Path resolution          │
│  - Detects project   │     │  - File copying             │
│  - Picks sync mode   │     │  - Sed genericization       │
│  - Smart genericize  │     │  - Dry-run support          │
└──────────────────────┘     └─────────────────────────────┘
         │                              │
         ▼                              ▼
┌──────────────────────────────────────────────────────────┐
│  boilerplate-sync-config.json                            │
│                                                          │
│  - Project definitions (repo path, app_map, replacements)│
│  - Tracked file manifest (studio, console, infra)        │
│  - Sync profiles (ui, layout, theme, lib, styles, infra) │
└──────────────────────────────────────────────────────────┘
```

## File Locations

| File | Path |
|------|------|
| Skill definition | `~/code/github/claude-config/skills/update-boilerplate-webapp/SKILL.md` |
| Helper script | `~/code/github/claude-config/update-boilerplate.sh` |
| Config | `~/code/github/claude-config/boilerplate-sync-config.json` |
| This doc | `~/code/github/boilerplate-webapp/docs/update-boilerplate-plan.md` |

## Usage

| Command | Behavior |
|---------|----------|
| `/update-boilerplate-webapp` | Auto-detect changed tracked files, show list, sync selected |
| `/update-boilerplate-webapp ui` | Sync all UI components via profile |
| `/update-boilerplate-webapp theme` | Sync theme files (globals.css, components.css, theme-context) |
| `/update-boilerplate-webapp src/components/ui/card.tsx` | Sync a specific file |
| `/update-boilerplate-webapp theme --smart` | AI-assisted genericization for complex files |

## Sync Modes

- **Mode A (Direct copy)**: No project-specific content. Fastest.
- **Mode B (Sed genericization)**: Only simple brand-string differences. Uses replacement list from config.
- **Mode C (Smart genericization)**: Files with project-specific logic. AI reads both versions, ports the improvement while keeping boilerplate generic.

## Tracked Files

The config maintains a manifest of files we monitor, grouped by app:

- **studio**: UI components, layout components, lib utilities, theme files, build config
- **console**: Layout components, stylesheets, build config
- **infra**: docker-compose files

## Adding a New Project

1. Add entry in `projects` section of config JSON
2. Define `app_map` (directory mapping to boilerplate's `apps/studio`, `apps/console`)
3. Define `replacements` (brand strings → generic equivalents)
4. Tracked files and sync profiles are shared across all projects

## How It Integrates

- Skill auto-deployed via existing `claude-config-sync.sh`
- Script and config live in `claude-config/` repo
- Works from any directory via absolute paths
- Uses `git diff` for efficient change detection in no-args mode
