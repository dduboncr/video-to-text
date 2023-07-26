const extractFrames = require('ffmpeg-extract-frames');
const Tesseract = require('tesseract.js');

const fs = require('fs');
// extract 3 frames at 1s, 2s, and 3.5s respectively

// get offsets from video

const main = async () => {
  await extractFrames({
    input: 'video.mp4',
    output: './outputfolder/screenshot-%i.jpg',
    offsets: [2000, 4000, 6000, 8000, 10000, 12000, 14000, 16000],
  });

  // get files from outputfolder
  const files = fs.readdirSync('./outputfolder');

  // loop through files
  for (const file of files) {
    const imagePath = `./outputfolder/${file}`;
    Tesseract.recognize(
      imagePath,
      'eng', // Replace 'eng' with the language code (e.g., 'eng' for English, 'fra' for French)
      {
        logger: (info) => {
          //   if (info.progress === 1) {
          //     console.log('Text extracted');
          //     console.log(info.text);
          //   }
        },
      }
    )
      .then(({data: {text}}) => {
        console.log('Extracted text:');
        console.log(text);
      })
      .catch((error) => {
        console.error('Error during OCR:', error.message);
      });
  }
};

main();
