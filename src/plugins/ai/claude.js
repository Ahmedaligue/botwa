import api from "#utils/API/request";

export default {
	name: "claude",
	description: "استخدام مودلClaude AI للذكاء الاستناعي.",
	category: "ai",
	command: ["claude"],
	settings: {
		wait: true,
		cooldown: 5,
	},

	code: async (sock, m) => {
		const input = m.isQuoted ? m.quoted.text : m.text?.trim();
		if (!input)
			return m.reply(
				`خاصك شي استفسار بعد الامر \nجرب هاد التويشية :.claude ماحكم النرد في الذين الاسلامي \nملاحضة ⚠️ الا جاب الله بديت كانخلبق قولها للمطور باش اصلحني`
			);

		try {
			const response = await api.Neko.get("/ai/claude/sonnet-4.5", {
				text: input,
				systemPrompt:
					"You are a helpful and friendly assistant, and use arabic language.",
			});

			const { success, result, message } = response.data || {};

			if (!success)
				return m.reply(message || "Gagal mendapatkan respons.");

			m.reply(result || "السموحات مالقيتش ليك جواب.");
		} catch (err) {
			console.error(err);
			m.reply("كاين واحد ال error ف api قلها لمطور باش اصلحو.");
		}
	},
};
