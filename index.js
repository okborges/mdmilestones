#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

function parseMilestones(filePath) {
	try {
		const content = fs.readFileSync(filePath, 'utf8');
		const lines = content.split(/\r?\n/);

		const milestones = [];
		let currentMilestone = null;

		const headerRegex = /^#+\s+(.+)$/;
		const checkboxRegex = /^\s*-\s*\[([xX ])\]/;

		lines.forEach((line) => {
			const headerMatch = line.match(headerRegex);
			const checkboxMatch = line.match(checkboxRegex);

			if (headerMatch) {
				// If we were tracking a milestone and it has tasks, save it
				// (Actually we save it at the end or when a new one starts,
				// but we only want to keep it if it has tasks?
				// The user said "Title com checkbox em seguida... caracteriza uma milestone")
				// Let's push the previous one if it exists.
				if (currentMilestone) {
					milestones.push(currentMilestone);
				}

				currentMilestone = {
					title: headerMatch[1].trim(),
					total: 0,
					completed: 0,
				};
			} else if (checkboxMatch && currentMilestone) {
				currentMilestone.total++;
				if (checkboxMatch[1].toLowerCase() === 'x') {
					currentMilestone.completed++;
				}
			}
		});

		// Push the last milestone
		if (currentMilestone) {
			milestones.push(currentMilestone);
		}

		// Filter out milestones with no tasks (based on "Title com checkbox em seguida... caracteriza uma milestone")
		const validMilestones = milestones.filter((m) => m.total > 0);

		// ANSI color codes
		const colors = {
			reset: '\x1b[0m',
			green: '\x1b[32m',
			yellow: '\x1b[33m',
			red: '\x1b[31m',
			cyan: '\x1b[36m',
		};

		const logPath = path.join(__dirname, 'milestones_log.md');
		const now = new Date().toLocaleString();
		let fileOutput = `\n### Execution: ${now}\n\n`;

		validMilestones.forEach((m) => {
			const percentage = Math.round((m.completed / m.total) * 100);
			let color = colors.red;
			let emoji = '🔴';

			if (percentage === 100) {
				color = colors.green;
				emoji = '✅';
			} else if (percentage > 0) {
				color = colors.yellow;
				emoji = '🚧';
			}

			console.log(
				`${emoji} ${color}${m.title} (${m.completed}/${m.total}) - ${percentage}%${colors.reset}`
			);

			fileOutput += `- ${emoji} **${m.title}** (${m.completed}/${m.total}) - ${percentage}%\n`;
		});

		try {
			fs.appendFileSync(logPath, fileOutput);
			console.log(`\nLog updated at: ${logPath}`);
		} catch (err) {
			console.error('Error writing to log file:', err);
		}
	} catch (error) {
		console.error('Error reading or parsing file:', error.message);
	}
}

const args = process.argv.slice(2);
const mdPath = args[0] ? path.resolve(args[0]) : path.join(__dirname, 'index.md');

parseMilestones(mdPath);
