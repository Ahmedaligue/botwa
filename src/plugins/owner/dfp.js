import fs from "fs";

export default {
	name: "dfp",
	description: "Delete plugin.",
	category: "owner",
	command: ["dfp", "delplugin"],
	settings: {
		owner: true,
		wait: true,
		cooldown: 3,
	},
	code: async (conn, m) => {
		if (!m.text)
			return m.reply(`Nama filenya??\nContoh: ${m.cmd} folder/namafile`);
		let path = "./src/plugins/" + m.text + ".js";

		if (!fs.existsSync(path)) {
			return m.reply(`File ${path} tidak ditemukan!`);
		}

		try {
			fs.unlinkSync(path);
			m.reply(`Berhasil menghapus plugin: ${path}`);
		} catch (err) {
			m.reply(`Gagal menghapus file!\nError: ${err.message}`);
		}
	},
};
