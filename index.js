const { spawn } = require('child_process');
const path = require('path');

// Your YouTube RTMP URL and Stream Key
const streamURL = 'rtmp://a.rtmp.youtube.com/live2';
const streamKey = 'ffq1-15r3-jdut-ajsq-8auz';

// FFmpeg command to generate Mandelbrot and stream to YouTube
function startStream() {
  const ffmpegArgs = [
    '-f', 'lavfi', 
    '-i', 'mandelbrot=w=1280:h=720:zoom=1.5:x=-0.7:y=0:d=10', // Mandelbrot effect settings
    '-f', 'flv', 
    `${streamURL}/${streamKey}`, // Stream to YouTube
  ];

  const ffmpegProcess = spawn('ffmpeg', ffmpegArgs);

  ffmpegProcess.stdout.on('data', (data) => {
    console.log(`FFmpeg stdout: ${data}`);
  });

  ffmpegProcess.stderr.on('data', (data) => {
    console.error(`FFmpeg stderr: ${data}`);
  });

  ffmpegProcess.on('close', (code) => {
    console.log(`FFmpeg process exited with code ${code}`);
  });
}

// Start the stream
startStream();
