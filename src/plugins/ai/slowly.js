import api from "#utils/API/request";

global.chatbot ??= {};

export default {
	name: "chatbot",
	description: "Chat AI menggunakan Chatbot.",
	category: "ai",
	command: ["slowly", "ai"],
	settings: {
		wait: true,
		cooldown: 5,
	},

	code: async (sock, m) => {
		const input = m.isQuoted ? m.quoted.text : m.text?.trim();
		if (!input)
			return m.reply(
				`Masukkan pertanyaan atau perintah!\n\nContoh:\n.ai apa itu AI`
			);

		const sender = m.sender;
		if (!global.chatbot[sender]) global.chatbot[sender] = [];

		global.chatbot[sender].push({ role: "user", content: input });

		try {
			const response = await api.Neko.get("/ai/chatbot", {
				name: "Slowly",
				instruction:
					"Humble, expert ngoding bahasa apa aja, yapping, sedikit banyak ngomong, kadang suka pamer, suka sarkas/satir, ngomong gw pake gwe dan lu jadi luwh, suka pake emoji 😹 untuk ketawa, 🤬 sedikit marah dan 🤭 untuk menertawakan.",
				question: global.chatbot[sender],
			});

			const { success, result, message } = response.data || {};

			if (!success)
				return m.reply(message || "Gagal mendapatkan respons.");

			const replyText = result || "Maaf, tidak ada respons.";
			global.chatbot[sender].push({
				role: "assistant",
				content: replyText,
			});

			m.reply(replyText);
		} catch (err) {
			console.error(err);
			m.reply("Terjadi kesalahan saat menghubungi API.");
		}
	},
};
