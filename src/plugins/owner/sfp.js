import fs from "fs";

export default {
	name: "sfp",
	description: "Save code to plugin.",
	category: "owner",
	command: ["sfp", "safeplugin"],
	settings: {
		owner: true,
		admin: false,
		botAdmin: false,
		group: false,
		private: false,
		wait: true,
		cooldown: 5,
	},
	code: async (m, { quoted }) => {
		if (!m.text)
			return m.reply(`Nama filenya??\nContoh: ${m.cmd} folder/namafile`);
		if (!m.quoted.body) return m.reply(`balas pesan nya!`);
		let path = "./src/plugins/" + m.text + ".js";
		fs.writeFileSync(path, quoted.body);
		m.reply(`tersimpan di ${path}`);
	},
};
