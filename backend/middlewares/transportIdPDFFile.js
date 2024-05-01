const PDFDocument = require('pdfkit');
const axios = require('axios');
const { cloudinaryFileUpload } = require('../helpers/cloudinaryFileUpload');

// Function to generate PDF
const generatePDF = async (greetingMessage, transportId) => {
  try {
    console.log('Generating PDF...');
    const doc = new PDFDocument({ size: [400, 300] });
    doc.moveDown(2);

    // Add greeting message
    doc.fontSize(16).text(greetingMessage, { align: 'center' }).moveDown(1);

    // Embed the image from the provided URL
    doc.moveDown(0.5);
    // const imageBuffer = await downloadImage(imageUrl);
    // doc.image(imageBuffer, { width: 150, align: 'center' }).moveDown(1);

    // Add transport ID
    doc
      .fontSize(14)
      .text(`Here is your Transport Id: ${transportId}`, { align: 'center' })
      .moveDown(1);

    // Return the generated PDF as a buffer
    const pdfBuffer = await new Promise((resolve, reject) => {
      const chunks = [];
      doc.on('data', (chunk) => {
        chunks.push(chunk);
      });
      doc.on('end', () => {
        resolve(Buffer.concat(chunks));
      });
      doc.end();
    });

    console.log('PDF generated successfully');
    return pdfBuffer;
  } catch (error) {
    console.log(error);
    throw new Error('Failed to generate PDF');
  }
};

// Function to download an image from URL

// Generate the PDF

const handleTransportIdCardGenerate = async (
  greetingMessage,
  transportId,
  transactionId
) => {
  try {
    const pdfBuffer = await generatePDF(greetingMessage, transportId);
    const uploadFile = await cloudinaryFileUpload(pdfBuffer, transactionId);
    console.log(uploadFile.url);
    return uploadFile.url;
  } catch (error) {
    console.error('Error generating or uploading PDF:', error);
    throw new Error('Failed to generate or upload PDF');
  }
};

module.exports = handleTransportIdCardGenerate;
