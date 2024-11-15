import { jar } from './client.js';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);

const inputPath = fs.readdirSync(path.join(__dirname, '..', 'input'));
const pdfFile = inputPath.find((file) => file.endsWith('.pdf'));
export const pdfFilePath = path.join(__dirname, '..', 'input', pdfFile);

export const getUrlWithTimestamp = () =>
	`https://downloads3.sejda.com/assets/new_document.pdf?d=${Date.now()}`;

export const sejdaBaseHeaders = {
	Origin: 'https://www.sejda.com'
};

export async function getCookieValue(url, cookieKey) {
	try {
		const cookies = await jar.getCookies(url);
		const cookie = cookies.find((c) => c.key === cookieKey);
		return cookie ? cookie.value : null;
	} catch (err) {
		console.error('Error getting cookies:', err);
	}
}
