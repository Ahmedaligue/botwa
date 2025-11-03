import api from "#utils/API/request";

global.chatgpt ??= {};

export default {
	name: "chatgpt",
	description: "Chat AI باستخدام ChatGPT.",
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
				`حط شي استفسار باش نقدر نجاوبك بحال \n.gpt من هو سينكو ايشيغامي`
			);

		// Inisialisasi session chat jika belum ad
		if (!global.chatgpt[m.sender]) global.chatgpt[m.sender] = [];

		// Tambahkan pesan user
		global.chatgpt[m.sender].push({ role: "مستخدم", content: input });

		try {
			const params = {
				text: global.chatgpt[m.sender],
				systemPrompt: "You are a helpful assistant. Use arabic language",
			};

			const res = await api.Neko.get("/ai/gpt/5", {
				text: global.chatgpt[m.sender],
				systemPrompt: "You are a helpful and friendly asistant. Use arabic language",
			});
			//console.log(res?.data)
			const result = res?.data?.result || "mal9itx lik jawab 3awd sowl bsi4a o5ra.";

			// Simpan respons dari asisten ke riwayat percakapan
			global.chatgpt[m.sender].push({
				role: "مساعد",
				content: result,
			});

			m.reply(result);
		} catch (err) {
			console.error(err);
			m.reply("Terjadi kesalahan saat menghubungi API.");
		}
	},
};
