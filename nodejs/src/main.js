import { client } from './client.js';
import { getUrlWithTimestamp, getCookieValue } from './utils.js';
import { downloadFile } from './fileDownloader.js';
import {
	checkUpload,
	uploadFile,
	createTask,
	checkTaskStatus
} from './taskManager.js';
import { taskPayload } from './task.js';
import { __dirname } from './utils.js';
import editPdfMetadata from './pdfMetadata.js';
import metadata from '../input/metadata.json' assert { type: 'json' };
import path from 'path';

const pdfFilePath = path.join(
	__dirname,
	'..',
	'input',
	metadata.title + '.pdf'
);

async function main() {
	try {
		console.log('Editing PDF metadata...');
		await editPdfMetadata();
		console.log('PDF metadata edited successfully.');

		const url = getUrlWithTimestamp();
		await client.get(url, {
			responseType: 'stream',
			headers: {
				Host: 'downloads3.sejda.com',
				Referer: 'https://www.sejda.com/'
			}
		});
		const _s = await getCookieValue(url, '_s');
		if (!_s) {
			console.error('Error: "_s" cookie not found.');
			return;
		}
		console.log('Checking upload permission...');
		await checkUpload(url, 'MJTDC');
		console.log('Upload permission check successful.');

		const fileName = pdfFilePath.split('\\').pop();
		console.log(`Uploading file: ${fileName}...`);
		const uploadResponse = await uploadFile(_s, pdfFilePath);
		const fileId = uploadResponse.id;
		console.log(`Upload successful. File ID: ${fileId}`);

		console.log('Creating task with uploaded file...');
		taskPayload.files = [fileId];
		const taskId = await createTask(taskPayload);
		console.log(`Task created successfully. Task ID: ${taskId}`);

		console.log(`Checking status of task ID: ${taskId}...`);
		const statusResponse = await checkTaskStatus(taskId);
		console.log('Task status retrieved:', statusResponse);

		const downloadUrl = `https://${statusResponse.resultFullUrlPattern}`;
		console.log(`Starting download from URL: ${downloadUrl}`);
		const downloadPath = path.join(
			__dirname,
			'..',
			'output',
			statusResponse.resultFilename
		);
		await downloadFile(
			downloadUrl,
			String(downloadPath),
			statusResponse.resultFileSize
		);
		console.log('File downloaded successfully');
	} catch (error) {
		console.error('Error encountered:', error);
	}
}

main();
