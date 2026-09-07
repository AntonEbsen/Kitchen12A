import QRCode from 'qrcode';
import fs from 'fs';

const url = 'https://kitchen12a.vercel.app/';
const outputPath = 'C:\\Users\\Anton\\.gemini\\antigravity-ide\\brain\\153e2aa7-9a01-4a50-9f5a-f6ddbf2568ac\\qrcode.png';

QRCode.toFile(outputPath, url, {
  color: {
    dark: '#000000',  // Blue dots
    light: '#0000' // Transparent background
  },
  width: 500,
  margin: 1
}, function (err) {
  if (err) throw err;
  console.log('QR code generated successfully using qrcode package!');
});
