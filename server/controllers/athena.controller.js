import path from 'path';

export function saveContentImage(req, res) {
  console.log('========CONTENT=========');
  const { file } = req;
  /*
  * File Object
   { 
      fieldname: 'image',
      originalname: 'muay-thai-prayer.jpg',
      encoding: '7bit',
      mimetype: 'image/jpeg',
      destination: 'E:\\Drive\\athena\\python\\athena_package\\input_images',
      filename: 'muay-thai-prayer.jpg',
      path: 'E:\\Drive\\athena\\python\\athena_package\\input_images\\muay-thai-prayer.jpg',
      size: 615970
    }
  */
  if (file.filename && file.size > 0) {
    res.status(200).end();
  } else {
    res.status(500).end();
  }
}

export function saveStyleImage(req, res) {
  console.log('========STYLE=========');
  const { file } = req;
  if (file.filename && file.size > 0) {
    res.status(200).end();
  } else {
    res.status(500).end();
  }
}

function spawnPythonProcess(config) {
  // call neural style transfer algorithm
  const pathToChildProcess = path.resolve(__dirname, '../python/athena_package/neural_style_transfer_tf_eager.py');
  const contentImage = path.resolve(__dirname, '../python/athena_package/input_images/green_sea_turtle.jpg');
  const styleImage = path.resolve(__dirname, '../python/athena_package/input_images/Starry_Night.jpg');
  const numIterations = 4;
  const pythonArgs = [
    contentImage,
    styleImage,
    numIterations,
  ];
  let pythonChildProcessOptions = {
    args: pythonArgs,
    mode: 'text',
    pythonOptions: ['-u'], // get print results in real-time
    parser: (message) => console.log('PYTHON MESSAGE: ', message), // all print() statements in python are recieved here as messages
    stderrParser: (stderr) => {
      console.log('====== PYTHON ERROR ===========');
      console.log(stderr);
      console.log('====== END PYTHON ERROR ===========');
    }
  };
  
  PythonShell.run(pathToChildProcess, pythonChildProcessOptions, (err, results) => {
    if (err) throw err;
    // results is an array consisting of messages collected during execution
    console.log('results: %j', results);
  });
};
