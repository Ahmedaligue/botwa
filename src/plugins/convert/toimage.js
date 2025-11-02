import { webpToImage } from "#utils/converter";

export default {
	name: "toimage",
	description: "Convert to image.",
	command: ["toimage", "toimg"],
	category: "convert",
	settings: {
		owner: false,
		group: false,
		private: false,
		admin: false,
		botAdmin: false,
		wait: true,
		cooldown: 5,
	},

	/**
	 * @param {import('baileys').WASocket} sock - The Baileys socket object.
	 * @param {object} m - The serialized message object.
	 */
	code: async (sock, m) => {
		const q = m.isQuoted ? m.quoted : m;
		const mime = q.type || "";
		if (!/webp|sticker|document/i.test(mime)) {
			return m.reply("Please reply/send a sticker with the command.");
		}
		const media = await q.download();
		const buffer = Buffer.isBuffer(media)
			? media
			: Buffer.from(media, "utf-8");
		const convert = await webpToImage(buffer);
		await m.reply({ image: convert });
	},
};
