import { PDFDocument } from 'pdf-lib';
import fs from 'fs';
import path from 'path';
import { __dirname } from './utils.js';
import metadata from '../input/metadata.json' assert { type: 'json' };
import { pdfFilePath } from './utils.js';

export default async function editPdfMetadata() {
	const pdfBytes = fs.readFileSync(pdfFilePath);
	const pdfDoc = await PDFDocument.load(pdfBytes);

	pdfDoc.setTitle(metadata.title);
	pdfDoc.setAuthor(metadata.author);
	pdfDoc.setSubject(metadata.title);

	const updatedPdfBytes = await pdfDoc.save();
	const outputPath = path.join(
		__dirname,
		'..',
		'input',
		`${metadata.title}.pdf`
	);
	fs.writeFileSync(outputPath, updatedPdfBytes);
	if (pdfFilePath === outputPath) return;
	console.log(`Deleting original PDF file: ${pdfFilePath}`);
	fs.unlinkSync(pdfFilePath);
}
