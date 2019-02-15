import path from 'path';
import fs from 'fs-extra';
import { PythonShell } from 'python-shell';
// import crypto from 'crypto';

const fileLocation = path.resolve(__dirname, '../../python/athena_package/user_images/');

/*
   File Object
   { 
      fieldname: 'image',
      originalname: 'muay-thai-prayer.jpg',
      encoding: '7bit',
      mimetype: 'image/jpeg',
      destination: 'E:\\Drive\\athena\\python\\athena_package\\user_images',
      filename: 'muay-thai-prayer.jpg',
      path: 'E:\\Drive\\athena\\python\\athena_package\\user_images\\muay-thai-prayer.jpg',
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
};

export function saveStyleImage(req, res) {
  console.log('========STYLE CTRL=========');
  const { file } = req;
  if (file.filename && file.size > 0) {
    moveStyleImage(req.body);
    res.status(200).end();
  } else {
    res.status(500).end();
  }
};

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
};

export function startAthena(req, res) {
  console.log('====START ATHENA====');
  console.log('req.body: ', req.body);
  const config = configurePythonProcess(req.body);
  return spawnPythonProcess(config);  
};

function configurePythonProcess(jobInfo) {
  const baseDirectory = path.resolve(__dirname, '../../python/athena_package');
  const { userDirectory, contentImage, styleImage } = jobInfo;
  // call neural style transfer algorithm
  // const pathToModel = path.resolve(__dirname, '../python/athena_package/neural_style_transfer_tf_eager.py');
  // const pathToModel = `${baseDirectory}/neural_style_transfer_tf_eager.py`;
  const pathToModel = path.resolve(`${baseDirectory}`, './neural_style_transfer_tf_eager.py');
  // const contentImagePath = `${baseDirectory}/user_images/${userDirectory}/content/${contentImage}`;
  // const styleImagePath = `${baseDirectory}/user_images/${userDirectory}/content/${styleImage}`;

  const contentImagePath = path.resolve(`${baseDirectory}`, `./user_images/${userDirectory}/content/${contentImage}`);
  const styleImagePath = path.resolve(`${baseDirectory}`, `./user_images/${userDirectory}/style/${styleImage}`);

  // python will reference this with respect to its own script
  // const outputDirectory = `${userDirectory}/output/`;
  const outputDirectory = path.resolve(`${baseDirectory}`, `./user_images/${userDirectory}/output/`);
  const outputFileName = `Final_${contentImage}`;
  const numIterations = 4;
  const pythonArgs = [
    contentImagePath,
    styleImagePath,
    numIterations,
    outputDirectory,
    outputFileName,
  ];
  const pythonChildProcessOptions = {
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

  const config = {
    pathToModel: pathToModel,
    options: pythonChildProcessOptions,
  };

  return config;
};

function spawnPythonProcess(config) {
  const { pathToModel, options } = config;
  PythonShell.run(pathToModel, options, (err, results) => {
    if (err) throw err;
    // results is an array consisting of messages collected during execution
    console.log('results: %j', results);
  });
}