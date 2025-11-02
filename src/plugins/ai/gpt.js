import api from "#utils/API/request";

global.chatgpt ??= {};

export default {
	name: "chatgpt",
	description: "Chat AI menggunakan ChatGPT.",
	category: "ai",
	command: ["chatgpt", "gpt"],
	settings: {
		wait: true,
		cooldown: 5,
	},

	code: async (sock, m) => {
		const input = m.isQuoted ? m.quoted.text : m.text?.trim();
		if (!input)
			return m.reply(
				`Masukkan pertanyaan atau perintah!\n\nContoh:\n.gpt apa itu AI`
			);

		// Inisialisasi session chat jika belum ad
		if (!global.chatgpt[m.sender]) global.chatgpt[m.sender] = [];

		// Tambahkan pesan user
		global.chatgpt[m.sender].push({ role: "user", content: input });

		try {
			const params = {
				text: global.chatgpt[m.sender],
				systemPrompt: "You are a helpful assistant.",
			};

			const res = await api.Neko.get("/ai/gpt/5", {
				text: global.chatgpt[m.sender],
				systemPrompt: "You are a helpful and friendly asistant.",
			});
			//console.log(res?.data)
			const result = res?.data?.result || "Maaf, tidak ada respons.";

			// Simpan respons dari asisten ke riwayat percakapan
			global.chatgpt[m.sender].push({
				role: "assistant",
				content: result,
			});

			m.reply(result);
		} catch (err) {
			console.error(err);
			m.reply("Terjadi kesalahan saat menghubungi API.");
		}
	},
};
