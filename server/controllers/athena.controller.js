import path from 'path';
import fs from 'fs-extra';
import crypto from 'crypto';

const fileLocation = path.resolve(__dirname, '../../python/athena_package/input_images/');

/*
   File Object
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
export function saveContentImage(req, res) {
  console.log('========CONTENT CTRL=========');
  const { file } = req;  
  if (file.filename && file.size > 0) {
    moveContentImage(req.body);
    res.status(200).end();
  } else {
    res.status(500).end();
  }
}

export function saveStyleImage(req, res) {
  console.log('========STYLE CTRL=========');
  const { file } = req;
  if (file.filename && file.size > 0) {
    moveStyleImage(req.body);
    res.status(200).end();
  } else {
    res.status(500).end();
  }
}

/* 
    TODO: create hash or user id for file directory in
      case multiple people with same name use the app.

      The below hash will not work because it creates a different hash
      for both photos with no way to tell unique users.

      // const dirPrefix = `${firstName}_${lastName}`;
      // const hash = crypto.createHash('md5').update(dirPrefix).digest('hex');
      // const newDir = `${dirPrefix}_${hash}`;
*/
  
const moveContentImage = (postBody) => {
  const { firstName, lastName, email, fileName } = postBody;
  const tmpLocation = `${fileLocation}/${fileName}`;
  const finalLocation = `${fileLocation}/${firstName}_${lastName}/content/${fileName}`;
  // Sync:
  try {
    fs.copySync(tmpLocation, finalLocation)
    console.log('success - copy content file!');
    removeFile(tmpLocation);
  } catch (err) {
    console.error(err)
  }
};

const moveStyleImage = (postBody) => {
  const { firstName, lastName, email, fileName } = postBody;
  const tmpLocation = `${fileLocation}/${fileName}`;
  const finalLocation = `${fileLocation}/${firstName}_${lastName}/style/${fileName}`;
  // Sync:
  try {
    fs.copySync(tmpLocation, finalLocation)
    console.log('success - copy style file!');
    removeFile(tmpLocation);
  } catch (err) {
    console.error(err)
  }
};

const removeFile = (tmpLocation) => {
  // remove original file to prevent duplicates
  fs.remove(tmpLocation, err => {
    if (err) return console.error(err)

    console.log('successfully removed tmp file!')
  });
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
