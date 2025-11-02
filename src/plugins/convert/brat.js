import Sticker from "#lib/sticker";
import api from "#utils/API/request";

export default {
	name: "brat",
	description: "Convert text to sticker brat.",
	category: "convert",
	command: ["brat"],
	settings: {
		owner: false,
		group: false,
		private: false,
		admin: false,
		botAdmin: false,
		wait: true,
		cooldown: 5,
	},

	code: async (sock, m) => {
		const input = m.isQuoted ? m.quoted.text : m.text?.trim();

		if (!input) {
			return m.reply(`*Usage:* .brat <text> atau reply pesan teks.`);
		}

		try {
			const response = await api.Neko.get(
				"/canvas/brat/v2",
				{ text: input },
				{ responseType: "arraybuffer" }
			);

			const mediaBuffer = Buffer.from(response.data);

			const sticker = await Sticker.create(mediaBuffer, {
				packname: "@slowlyh.",
				author: m.pushName || "Bot User",
				emojis: "🤣",
			});

			await m.reply({ sticker });
		} catch (error) {
			console.error("[BRAT STICKER ERROR]", error);
			await m.reply("⚠️ Terjadi error saat memproses stiker.");
		}
	},
};
