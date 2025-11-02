import chalk from "chalk";

export default function (m, conn) {
	const from = m.isGroup ? conn.chats[m.chat]?.subject : m.pushname;

	const chatType = m.isGroup
		? `${chalk.blue("GROUP")} ${chalk.dim("(" + m.chat + ")")}`
		: `${chalk.green("PRIVATE")} ${chalk.dim("(" + m.chat + ")")}`;

	const senderInfo = m.isGroup
		? `[ ${chalk.yellow(m.sender.split("@")[0])} ] ${chalk.white(m.pushname)}`
		: chalk.white(m.pushname);

	const message = m.body || `[${chalk.red.bold(m.type.toUpperCase())}]`;
	const time = new Date(m.timesTamp * 1000).toLocaleString("id-ID", {
		timeZone: "Asia/Jakarta",
	});

	const separator = chalk.gray("────────────────────────────────");

	console.log(
		chalk.bgCyan.black.bold(` 💬 NEW MESSAGE `) +
			" " +
			chalk.dim(`[ ${time} ]`) +
			"\n" +
			separator +
			`\n${chalk.magenta("◆")} ${chalk.bold("FROM")}:   ${chalk.cyan(from)}` +
			`\n${chalk.magenta("◆")} ${chalk.bold("TYPE")}:   ${chatType}` +
			`\n${chalk.magenta("◆")} ${chalk.bold("SENDER")}: ${senderInfo}` +
			`\n${chalk.magenta("◆")} ${chalk.bold("BODY")}:   ${chalk.white(message.length > 50 ? message.substring(0, 50) + "..." : message)}` +
			"\n" +
			separator +
			"\n"
	);
}
