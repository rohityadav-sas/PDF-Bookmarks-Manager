import { client } from './client.js';
import { sejdaBaseHeaders } from './utils.js';
import FormData from 'form-data';
import fs from 'fs';

export async function checkUpload(url, uplid) {
	const data = new FormData();
	data.append('uplid', uplid);

	const response = await client.post(
		'https://www.sejda.com/api/files/upload-check',
		data,
		{ headers: { ...data.getHeaders(), ...sejdaBaseHeaders } }
	);
	return response.data;
}

export async function uploadFile(_s, path, uplid = 'MJTDC') {
	const data = new FormData();
	data.append('uplid', uplid);
	data.append('uplsrv', 'uploads3.sejda.com');
	data.append('file', fs.createReadStream(path));

	const response = await client.post(
		`https://www.sejda.com/api/files/upload?_s=${_s}`,
		data,
		{
			headers: { ...data.getHeaders(), ...sejdaBaseHeaders },
			onUploadProgress: (progressEvent) => {
				const percentage = Math.round(
					(progressEvent.loaded * 100) / progressEvent.total
				);
				console.log(`Upload Progress: ${percentage}%`);
			}
		}
	);
	return response.data;
}

export async function createTask(taskPayload) {
	const response = await client.post(
		'https://www.sejda.com/api/tasks',
		taskPayload,
		{
			headers: {
				'Content-Type': 'application/json',
				...sejdaBaseHeaders
			}
		}
	);
	return response.data;
}

export async function checkTaskStatus(taskId) {
	const response = await client.get(
		`https://www.sejda.com/api/tasks/${taskId}/change`,
		{
			headers: sejdaBaseHeaders
		}
	);
	return response.data;
}
