import axios from 'axios';
import fs from 'fs';

export async function downloadFile(url, path, fileSize) {
	try {
		const response = await axios.get(url, {
			responseType: 'stream',
			onDownloadProgress: (progressEvent) => {
				const totalLength = progressEvent.headers?.['content-length'];
				if (totalLength) {
					const progress = Math.round(
						(progressEvent.loaded * 100) / totalLength
					);
					process.stdout.write(`Download Progress: ${progress}%\r`);
				} else {
					let percentage = (progressEvent.loaded / fileSize) * 100;
					console.log(`Downloaded: ${percentage.toFixed(2)} %`);
				}
			}
		});

		const writer = fs.createWriteStream(path);
		response.data.pipe(writer);

		return new Promise((resolve, reject) => {
			writer.on('finish', resolve);
			writer.on('error', reject);
		});
	} catch (error) {
		console.error('Error downloading file:', error);
	}
}
