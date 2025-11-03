import api from "#utils/API/request";

export default {
	name: "gemini",
	description: "Chat AI باستخدام Gemini AI.",
	category: "ai",
	command: ["gemini", "gm"],
	settings: {
		wait: true,
		cooldown: 5,
	},

	code: async (sock, m) => {
		const input = m.isQuoted ? m.quoted.text : m.text?.trim();
		if (!input)
			return m.reply(
				`حط استفسار بعد الامر \nبحال هكا : .gm من هو سينكو ايشيغامي`
			);

		try {
			// gunakan POST agar bisa kirim data JSON
			const response = await api.Neko.get("/ai/gemini/2.5-flash/v1", {
				text: input,
				systemPrompt:
					"You are a helpful and friendly assistant, and use arabic language.",
			});

			const { success, result, message } = response.data || {};

			if (!success)
				return m.reply(message || "اودييي مالقيتش ليك جاواب يا اتكون نتا سبيتي يا مني الغلاط.");

			m.reply(result || "السموحات pas de jawab.");
		} catch (err) {
			console.error(err);
			m.reply("api عندي مات ليه الحوت قولها للمطور باش اصلحو.");
		}
	},
};
