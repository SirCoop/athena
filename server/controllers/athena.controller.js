import path from 'path';
import fs from 'fs-extra';
import { PythonShell } from 'python-shell';
import  emailerService from '../services/emailer.service';
// import crypto from 'crypto';

const baseDirectory = path.resolve(__dirname, '../../python/athena_package');
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
  const { file } = req;
  const userHasJobPending = checkCurrentJobStatus(req.body);
  if (userHasJobPending) {
    res.status(200).json({message: 'Please wait until your current pastiche has been delivered before creating a new one.'});
    cleanUnwantedImages();
  }
  if (file.filename && file.size > 0 && !userHasJobPending) {
    moveContentImage(req.body);
    res.status(200).end();
  } else {
    res.status(500).end();
  }
};

export function saveStyleImage(req, res) {
  const { file } = req;
  const userHasJobPending = checkCurrentJobStatus(req.body);
  if (userHasJobPending) {
    res.status(200).json({message: 'Please wait until your current pastiche has been delivered before creating a new one.'});
    cleanUnwantedImages();
  }
  if (file.filename && file.size > 0 && !userHasJobPending) {
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

const cleanUnwantedImages = () => {
  const contents = fs.readdirSync(fileLocation);
  contents.forEach((item) => {
    console.log('cleaning: ', item);
    const path = `${fileLocation}/${item}`;
    try {
      const stat = fs.lstatSync(path);
      // if file then remove
      if (!stat.isDirectory()) {
        console.log('Removing: ', item);
        fs.removeSync(path)
      }
    } catch (e) {
      console.log('ERROR: ', e);
    }
  });
};

const checkCurrentJobStatus = (postBody) => {
  const { firstName, lastName, } = postBody;
  const userDir = `${fileLocation}/${firstName}_${lastName}/output`;
  // if output directory exists, user has started job by clicking send
  try {
    fs.statSync(userDir);
    return true;
  } catch(e) {
    // dir does not exist
    return false;
  }
};

const checkForExistingImage = (userDir) => {
  // does dir contain files?
  try {
    fs.readdirSync(userDir);
    return true;
  } catch (error) {
    return false;
  }
};
  
const moveContentImage = (postBody) => {
  const { firstName, lastName, email, fileName } = postBody;
  const tmpLocation = `${fileLocation}/${fileName}`;
  const finalFileDir = `${fileLocation}/${firstName}_${lastName}/content`;
  const finalFilePath = `${fileLocation}/${firstName}_${lastName}/content/${fileName}`;

  // check content directory for existing image, if exists then overwrite with new image
  try {
    const hasImage = checkForExistingImage(finalFileDir);
    if(hasImage) {
      fs.emptyDirSync(finalFileDir);
    }
  } catch (error) {
    console.error('Error removing existing content image: ', error);
  }
  
  try {
    fs.copySync(tmpLocation, finalFilePath)
    console.log('success - copy content file!');
    removeFile(tmpLocation);
  } catch (err) {
    console.error(err)
  }
};

const moveStyleImage = (postBody) => {
  const { firstName, lastName, email, fileName } = postBody;
  const tmpLocation = `${fileLocation}/${fileName}`;
  const finalFileDir = `${fileLocation}/${firstName}_${lastName}/style`;
  const finalFilePath = `${fileLocation}/${firstName}_${lastName}/style/${fileName}`;

  // check content directory for existing image, if exists then overwrite with new image
  try {
    const hasImage = checkForExistingImage(finalFileDir);
    if(hasImage) {
      fs.emptyDirSync(finalFileDir);
    }
  } catch (error) {
    console.error('Error removing existing style image: ', error);
  }

  try {
    fs.copySync(tmpLocation, finalFilePath)
    console.log('success - copy style file!');
    removeFile(tmpLocation);
  } catch (err) {
    console.error(err);
  }
};

const removeFile = (tmpLocation) => {
  // remove original file to prevent duplicates
  fs.remove(tmpLocation, err => {
    if (err) return console.error(err);
    console.log('successfully removed tmp file!');
  });
};

export function startAthena(req, res) {
  try {
    const { config, emailDetails } = configurePythonProcess(req.body);
    res.status(200).end();
    spawnPythonProcess(config, emailDetails);
  } catch (error) {
    res.status(500).end();
  }
};

function createOutputDirectory(userDirectory) {
  const outputDirectory = path.resolve(`${baseDirectory}`, `./user_images/${userDirectory}/output`);

  // create output directory for pastiche
  try {
    fs.mkdirSync(outputDirectory);
    console.log('Output directory created!');
  } catch (err) {
    console.log('Error making output directory: ', err);
  }
}

function configurePythonProcess(jobInfo) {
  const { userDirectory, contentImage, styleImage, email, intensity } = jobInfo;
  createOutputDirectory(userDirectory);
  // intensity range: 1-100 => max iterations = 400;
  console.log('iterations: ', intensity);
  // convert float to int
  const convertedIntensity = Math.floor(intensity);
  // an odd number multiplied by an even number results in an even number
  // python logger only outputs on iterations divisible by 10
  const iterations = Math.round(convertedIntensity * 4);
  console.log('Num Iterations = ', iterations);
  // call neural style transfer algorithm
  const pathToModel = path.resolve(`${baseDirectory}`, './neural_style_transfer_tf_eager.py');
  const contentImagePath = path.resolve(`${baseDirectory}`, `./user_images/${userDirectory}/content/${contentImage}`);
  const styleImagePath = path.resolve(`${baseDirectory}`, `./user_images/${userDirectory}/style/${styleImage}`);
  const outputDirectory = path.resolve(`${baseDirectory}`, `./user_images/${userDirectory}/output/`);
  const numIterations = iterations;
  const outputFileName = `Final_${numIterations}_${contentImage}`;
  const pythonArgs = [
    contentImagePath,
    styleImagePath,
    numIterations,
    outputDirectory,
    outputFileName,
  ];
  
  const names = userDirectory.split('_');
  const firstName = names[0];
  const lastName = names[1];

  const emailDetails = {
    filePath: path.resolve(outputDirectory, outputFileName),
    firstName: firstName,
    lastName: lastName,
    emailAddress: email,
    errorMessage: '',
  };

  const pythonChildProcessOptions = {
    args: pythonArgs,
    mode: 'text',
    pythonOptions: ['-u'], // get print results in real-time
    parser: (message) => pythonMessageParser(message), // all print() statements in python are recieved here as messages
    stderrParser: (stderr) => {
      console.log('====== PYTHON ERROR ===========');
      console.log(stderr);
      console.log('====== END PYTHON ERROR ===========');
      // emailDetails.errorMessage = stderr;
      // sendErrorEmail(emailDetails);
    }
  };

  const config = {
    pathToModel: pathToModel,
    options: pythonChildProcessOptions,
  };

  return { config: config, emailDetails: emailDetails };
};

function spawnPythonProcess(config, emailDetails) {
  const { pathToModel, options } = config;

  let pyshell = new PythonShell(pathToModel, options);

  pyshell.on('error', (err) => {
    // handle stderr (a line of text from stderr)
    emailDetails.errorMessage = err;
    sendErrorEmail(emailDetails);
    // clean up directory so the user can try again
    console.log('OPTS: ', options);
  });
  
  // end the input stream and allow the process to exit
  pyshell.end((err,code) => {
    console.log('The exit:');
    console.log('code: ', code);
    if (code === 0)  {
      sendEmail(emailDetails); 
    }
  });
};

function pythonMessageParser(message) {
  console.log('PYTHON MESSAGE: ', message);
};

async function sendEmail(emailDetails) {
  try {
    await emailerService.sendEmail(emailDetails);
    console.log('Successfully Emailed!');
    const { firstName, lastName } = emailDetails;
    const cleanupDirectory = `${firstName}_${lastName}`;
    cleanupFiles(cleanupDirectory);
  } catch (error) {
    console.log('ERROR - Email: ', error);
  }
};

async function sendErrorEmail(emailDetails) {
  try {
    await emailerService.sendErrorEmail(emailDetails);
    console.log('Successfully Emailed!');
    const { firstName, lastName } = emailDetails;
    const cleanupDirectory = `${firstName}_${lastName}`;
    cleanupFiles(cleanupDirectory);
  } catch (error) {
    console.log('ERROR - Email: ', error);
  }
};

function cleanupFiles(dir) {
  const cleanupDirectory = path.resolve(`${baseDirectory}`, `./user_images/${dir}`);
  fs.remove(cleanupDirectory, err => {
    if (err) return console.error(err)
  
    console.log(`Successfully removed ${cleanupDirectory}!`);
  });
};
