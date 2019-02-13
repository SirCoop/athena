import path from 'path';

/**
 * Upload Image
 * @param req
 * @param res
 * @returns void
 */
export function saveImage(req, res) {
  console.log('========CTRL=========');
  console.log('req: ', req.file);


  // if (!req.body.image) {
    res.status(200).end();
  // }

  const artGeneratorConfig = req.body.images;

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
