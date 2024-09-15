const { Sequelize } = require("sequelize");
require("dotenv").config();
const toBool = x => (x && x.toLowerCase() === "true") || false;
const DATABASE_URL = process.env.DATABASE_URL || "./database.db";
module.exports = {
	SESSION_ID: (process.env.SESSION_ID || "").trim(),
	BOT_INFO: process.env.BOT_NAME || "HEROBRINE;MD",
	SUDO: process.env.SUDO || "918761888106",
	HANDLERS: process.env.HANDLER === "false" || process.env.HANDLER === "null" ? "^" : ".",
	WELCOME_MSG: process.env.WELCOME_MSG || "Hi @user Welcome to @gname",
	GOODBYE_MSG: process.env.GOODBYE_MSG || "Hi @user It was Nice Seeing you. IM, HEROBRINE🍷.",
	STATUS_SAVER: toBool(process.env.STATUS_SAVER) || true,
	AUTO_READ: toBool(process.env.AUTO_READ) || false,
	AUTO_STATUS_READ: toBool(process.env.AUTO_STATUS_READ) || false,
	STICKER_PACK: process.env.AUTHOR || "いや、私が勝つ (\ (\ („• ֊ •„) ━O━O━━━━━━━━━ ・:。уσ ι¢нι тєηкαι「 ✉️ 」・:三 ━━━━━━━━━━━━━ ㅤㅤㅤㅤ ⛩️Շѧмѯ_️θѵэя🎋( ₊₉₁ ₉₆₁₄₄ ₇₇₁₁₆ )ཀㅤㅤㅤㅤⳜꓴƁ𐤠Ɽꓴ",
	LOGS: toBool(process.env.LOGS) || true,
	WORK_TYPE: process.env.WORK_TYPE || "public",
	DATABASE_URL: DATABASE_URL,
	DATABASE:
		DATABASE_URL === "./database.db"
			? new Sequelize({
					dialect: "sqlite",
					storage: DATABASE_URL,
					logging: false,
			  })
			: new Sequelize(DATABASE_URL, {
					dialect: "postgres",
					ssl: true,
					protocol: "postgres",
					dialectOptions: {
						native: true,
						ssl: { require: true, rejectUnauthorized: false },
					},
					logging: false,
			  }),
	BRANCH: "master",
	WARN_COUNT: 3,
	RMBG_API_KEY: process.env.RMBG_API_KEY || "",
	DELETED_LOG: toBool(process.env.DELETED_LOG) || false,
	DELETED_LOG_CHAT: toBool(process.env.DELETED_LOG_CHAT) || false,
	TIME_ZONE: process.env.TZ,
	VERSION: require("./package.json").version,
};
