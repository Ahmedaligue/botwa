import api from "#utils/API/request";

export default {
	name: "claude",
	description: "Chat AI menggunakan Claude AI.",
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
				`Masukkan pertanyaan atau perintah!\n\nContoh:\n.claude apa itu AI`
			);

		try {
			const response = await api.Neko.get("/ai/claude/sonnet-4.5", {
				text: input,
				systemPrompt:
					"You are a helpful and friendly assistant, and use Indonesian language.",
			});

			const { success, result, message } = response.data || {};

			if (!success)
				return m.reply(message || "Gagal mendapatkan respons.");

			m.reply(result || "Maaf, tidak ada respons.");
		} catch (err) {
			console.error(err);
			m.reply("Terjadi kesalahan saat menghubungi API.");
		}
	},
};
