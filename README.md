# Git Bash History Cleaner

An automated, utility script built with Node.js to keep your Git Bash history clean, organized, and free of duplicate commands.

## How It Works

When you run the start command, the application automates the following workflow:

1. **Backup Phase**: It executes a backup script that safely copies your active `.bash_history` file from your user home directory into the local `./data` folder.
2. **Cleaning Phase**: It processes the backed-up file from bottom to top to preserve only the latest execution of each unique command, maintaining correct chronological order.
3. **Output Generation**: It writes the processed, deduplicated commands into a new file named `.bash_history_clean` inside the `./data` directory.

## Usage

To install the required dependencies (locally) and execute the pipeline, run the following commands in your terminal:

```bash
# Install local development dependencies
pnpm install

# Run the backup and deduplication pipeline
pnpm start
```
