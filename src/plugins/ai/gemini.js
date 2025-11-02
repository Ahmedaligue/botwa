import api from "#utils/API/request";

export default {
	name: "gemini",
	description: "Chat AI menggunakan Gemini AI.",
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
				`Masukkan pertanyaan atau perintah!\n\nContoh:\n.gm apa itu AI`
			);

		try {
			// gunakan POST agar bisa kirim data JSON
			const response = await api.Neko.get("/ai/gemini/2.5-flash/v1", {
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
