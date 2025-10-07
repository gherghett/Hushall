# Husky + Prettier + ESLint Pre-commit Setup

This document explains how our automated code quality system works and how to reproduce this setup in other projects.

## 📋 Table of Contents

1. [Overview](#overview)
2. [How It Works](#how-it-works)
3. [Components](#components)
4. [Configuration Files](#configuration-files)
5. [Step-by-Step Setup Guide](#step-by-step-setup-guide)
6. [Testing the Setup](#testing-the-setup)
7. [Customization Options](#customization-options)
8. [Troubleshooting](#troubleshooting)

## 🎯 Overview

Our project uses an automated code quality system that runs every time you commit code. This system:

- **Formats** your code automatically with Prettier
- **Fixes** common ESLint issues automatically
- **Prevents** commits with unfixable linting errors
- **Only processes** staged files (not the entire codebase)

## 🔄 How It Works

Here's the complete flow when you run `git commit`:

```
1. 📝 git commit
   ↓
2. 🎯 Git triggers pre-commit hook
   ↓
3. 🐕 Husky runs .husky/pre-commit
   ↓
4. 🎭 Pre-commit runs 'npx lint-staged'
   ↓
5. 📋 lint-staged reads package.json config
   ↓
6. 🔄 For each staged file type:
   ├── JS/TS files: prettier --write → eslint --fix
   └── JSON/MD files: prettier --write
   ↓
7. ❓ All fixes successful?
   ├── ✅ Yes → Commit proceeds with fixes included
   └── ❌ No → Commit aborted - manual fixes needed
```

## 🧩 Components

### 1. **Husky** 🐕

- **What**: Git hooks manager
- **Purpose**: Runs scripts automatically on git events (commit, push, etc.)
- **Version**: `^9.1.7`

### 2. **lint-staged** 🎭

- **What**: Runs linters only on staged files
- **Purpose**: Processes only files being committed (fast & efficient)
- **Version**: `^16.2.3`

### 3. **Prettier** 💅

- **What**: Code formatter
- **Purpose**: Ensures consistent code style
- **Version**: `^3.6.2`

### 4. **ESLint** 🔍

- **What**: Code linter (already in project via Expo)
- **Purpose**: Finds and fixes code quality issues
- **Version**: `^9.25.0`

## 📁 Configuration Files

### `.husky/pre-commit`

```bash
npx lint-staged
```

This file runs when you commit. It simply executes lint-staged.

### `.prettierrc`

```json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": false,
  "printWidth": 80,
  "tabWidth": 2,
  "useTabs": false,
  "bracketSpacing": true,
  "arrowParens": "avoid"
}
```

Prettier formatting rules.

### `.prettierignore`

```
node_modules/
.expo/
dist/
build/
.next/
coverage/
*.log
*.lock
package-lock.json
yarn.lock
.git/
.vscode/
```

Files and directories Prettier should ignore.

### `package.json` (lint-staged config)

```json
{
  "lint-staged": {
    "*.{js,jsx,ts,tsx}": ["prettier --write", "eslint --fix"],
    "*.{json,md}": ["prettier --write"]
  }
}
```

Defines what commands run for which file types.

## 🚀 Step-by-Step Setup Guide

### 1. Install Dependencies

```bash
npm install --save-dev husky lint-staged prettier
```

### 2. Initialize Husky

```bash
npx husky init
```

This creates:

- `.husky/` directory
- `.husky/pre-commit` file (with default content)

### 3. Configure Pre-commit Hook

Edit `.husky/pre-commit`:

```bash
npx lint-staged
```

### 4. Add Scripts to package.json

```json
{
  "scripts": {
    "lint:fix": "expo lint --fix",
    "format": "prettier --write .",
    "format:check": "prettier --check ."
  }
}
```

### 5. Add lint-staged Configuration

Add to `package.json`:

```json
{
  "lint-staged": {
    "*.{js,jsx,ts,tsx}": ["prettier --write", "eslint --fix"],
    "*.{json,md}": ["prettier --write"]
  }
}
```

### 6. Create Prettier Configuration

Create `.prettierrc`:

```json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": false,
  "printWidth": 80,
  "tabWidth": 2,
  "useTabs": false,
  "bracketSpacing": true,
  "arrowParens": "avoid"
}
```

### 7. Create Prettier Ignore File

Create `.prettierignore`:

```
node_modules/
.expo/
dist/
build/
*.log
*.lock
.git/
```

## 🧪 Testing the Setup

### Test 1: Check Prettier

```bash
npm run format:check
```

Should show any unformatted files.

### Test 2: Format Files

```bash
npm run format
```

Should format all files.

### Test 3: Test lint-staged

```bash
# Stage some files
git add .

# Run lint-staged manually
npx lint-staged
```

### Test 4: Full Commit Test

```bash
# Make some changes
echo "console.log('test'  );" >> test.js

# Stage and commit
git add test.js
git commit -m "Test commit"
```

You should see:

```
✔ Backed up original state in git stash
✔ Running tasks for staged files...
✔ Applying modifications from tasks...
✔ Cleaning up temporary files...
```

## ⚙️ Customization Options

### Change lint-staged Behavior

**Current (Auto-fix):**

```json
"*.{js,jsx,ts,tsx}": [
  "prettier --write",
  "eslint --fix"
]
```

**Check-only (Abort on issues):**

```json
"*.{js,jsx,ts,tsx}": [
  "prettier --check",
  "eslint"
]
```

**Hybrid (Format auto, lint check-only):**

```json
"*.{js,jsx,ts,tsx}": [
  "prettier --write",
  "eslint"
]
```

### Add More File Types

```json
"lint-staged": {
  "*.{js,jsx,ts,tsx}": ["prettier --write", "eslint --fix"],
  "*.{json,md,yml,yaml}": ["prettier --write"],
  "*.{css,scss,less}": ["prettier --write"],
  "*.{png,jpg,jpeg,gif,svg}": ["imagemin"]
}
```

_Last updated: October 7, 2025_
_For questions or issues, ask the Daniel._
