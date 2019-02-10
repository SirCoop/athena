/**
 * Start athena
 * @param req
 * @param res
 * @returns void
 */
export function saveImages(req, res) {
  if (!req.body.images) {
    res.status(403).end();
  }

  console.log('req.body: ', req.body);
  const artGeneratorConfig = req.body.images;
  // spawnPythonProcess(artGeneratorConfig);

  // Let's sanitize inputs
  // newProfile.title = sanitizeHtml(newProfile.title);
  // newProfile.name = sanitizeHtml(newProfile.name);
  // newProfile.content = sanitizeHtml(newProfile.content);

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
