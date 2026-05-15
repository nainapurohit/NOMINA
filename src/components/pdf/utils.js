// utils.js

export const escapeHtml = (unsafe) => {
	if (unsafe === null || unsafe === undefined) return "";

	return String(unsafe)
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;")
		.replace(/'/g, "&#039;");
};

export const isValidHttpUrl = (value) => {
	if (!value) return false;

	try {
		const url = new URL(value);
		return url.protocol === "http:" || url.protocol === "https:";
	} catch {
		return false;
	}
};
