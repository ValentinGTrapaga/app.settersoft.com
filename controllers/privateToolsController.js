// const translate = require('../services/translate');

// exports.translateFile = async (filename) => {
//     // Get file extension
//     const fileExtension = filename.split('.').pop();
    
//     if (fileExtension == 'mp4' || fileExtension == 'mp3') {
//         // Translate video
//         let transcription = await translate.translateVideo(filename);
//         console.log(transcription);

//         let translation = await translate.translateText(transcription);

//         console.log(translation);
//         return {
//             success: true,
//             transcription,
//             translation
//         }
//     }
// };