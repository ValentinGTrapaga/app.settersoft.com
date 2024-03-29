const { CuteFFMPEG, FFMPEGRequest } = require('cute-ffmpeg')
const fs = require('fs')

// Import the OpenAI SDK
const OpenAI = require('openai')
const openai = new OpenAI()

exports.translateVideo = async (filename) => {
  console.log('Vamos a convertir el archivo ' + filename + ' a mp3')

  const ffmpeg = new CuteFFMPEG({
    overwrite: true
  })

  const request = new FFMPEGRequest({
    input: {
      path: 'uploads/' + filename
    },
    output: {
      path: 'uploads/' + filename + '.mp3',
      bitrate: 320
    }
  })

  filePath = await ffmpeg.convert(request).then(filePath => {
    // Here, we have the audio file converted to mp3
    console.log('Archivo convertido a mp3')
    return filePath
  }).catch(error => {
    console.log('Error al convertir el audio')
  })

  // Translate mp3 file
  const transcription = await transcriptMP3(filePath)

  return transcription
}

exports.translateText = async (text) => {
  console.log('Vamos a traducir el texto: ' + text)

  // Use chat engine to translate text, then return translation
  const translate = await openai.createChatCompletion({
    model: 'gpt-4-vision-preview',
    messages: [
      {
        role: 'system',
        content: 'Translate the text provided from USER to Spanish.'
      },
      {
        role: 'user',
        content: text
      }
    ],
    max_tokens: 3000
  }
  )

  console.log(translate.data.choices[0].message.content)

  return translate.data.choices[0].message.content
}

async function transcriptMP3 (filePath) {
  const transcript = await openai.createTranscription(
    fs.createReadStream(filePath),
    'whisper-1'
  )

  return transcript.data.text
}
