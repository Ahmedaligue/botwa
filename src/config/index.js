/**
 * Copyright © 2025 [ slowlyh ]
 *
 * All rights reserved. This source code is the property of [ ChatGPT ].
 * Unauthorized copying, distribution, modification, or use of this file,
 * via any medium, is strictly prohibited without prior written permission.
 *
 * Contact: [ hyuuoffc@gmail.com ]
 * GitHub: https://github.com/slowlyh
 * Official: https://hyuu.tech
 */

import { logger } from "#lib/logger";
import { unwatchFile, watchFile } from "fs";
import { fileURLToPath } from "url";

// Nomor pairing (untuk scan QR/Pairing code)
global.PAIRING_NUMBER = 212752508788;

global.BOT_PREFIXES = ".";

// Nomor owner utama + cadangan
global.ownerNumber = ["212625457341", "62895622412769"];

// Mode bot:
// false  = self mode (hanya owner)
// true = public (semua user)
global.pubelik = true

// Pesan default untuk respon bot
global.mess = {
	wait: "صبر شوية...",
	owner: "هاد الامر ديال هاد الخصيم \n@212625457341.",
	group: "جرب الامر فالغروب.",
	admin: "نتا غي عضو عادي وباغي تستاعمل هاد الامر يااااه ضحكو عليك.",
	botAdmin: "ديرني مشرف ونخدمليك هاد الامر.",
	private: "هاد الامر خدام فالخاص.",
};

// Default watermark untuk stiker
global.stickpack = "AHMED BOT";
global.stickauth = "AHMED BOT";

global.title = "AHMED BOT";
global.body = "";
global.thumbnailUrl = "https://c.termai.cc/i37/jcnGyv.jpg";

const file = fileURLToPath(import.meta.url);
watchFile(file, () => {
	unwatchFile(file);
	logger.info("berhasil relooad file config.");
	import(`${file}?update=${Date.now()}`);
});
