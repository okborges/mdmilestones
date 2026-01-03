# mdmilestones

> A CLI tool that parses Markdown files to track project milestones and task progress directly in your terminal.

`mdmilestones` reads a Markdown file, identifies headers as milestones, and calculates progress based on checkbox tasks (`- [ ]` vs `- [x]`). It provides a colorful, emoji-rich summary of your project's status.

## Features

-   📝 **Markdown Parsing**: Uses standard Markdown syntax for headers and task lists.
-   📊 **Progress Tracking**: Automatically calculates completion percentages.
-   🎨 **Visual Feedback**: Color-coded output (Green for done, Yellow for in-progress, Red for stuck/started) with emojis.
-   💻 **CLI Ready**: Run it against any markdown file in your system.

## Installation

You can use this tool directly with `npx` or by running the development script.

### Using npx (Recommended)

```bash
npx mdmilestones <path-to-your-file.md>
```

### Local Development

```bash
npm run dev
# or
yarn dev
```

## Usage

Create a markdown file (e.g., `TODO.md`) with the following structure:

```markdown
# Version 1.0 Release

-   [x] Setup project structure
-   [x] Implement core logic
-   [ ] Write documentation

# Future Features

-   [ ] Add JSON output support
-   [ ] Add HTML report generation
```

Then run the tool:

```bash
npx mdmilestones TODO.md
```

**Output:**

```text
🚧 Version 1.0 Release (2/3) - 67%
🔴 Future Features (0/2) - 0%
```

If you run it without arguments, it looks for an `index.md` file in the current directory.

```bash
npx mdmilestones
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

Distributed under the MIT License. See `LICENSE` for more information.
