import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import {
  Button,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  Icon,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
  withStyles,
} from '@material-ui/core';
import Send from '@material-ui/icons/Send';
// import CloudUploadIcon from '@material-ui/icons/CloudUpload';
// import { DropzoneDialog } from 'material-ui-dropzone';
import FileUploader from '../Upload/FileUploader';


const styles = theme => ({
  root: {
    backgroundColor: '#efefef',
    flexGrow: 1,
    height: '90vh',
    paddingTop: '2rem',
  },
  header: {
    fontFamily: 'Khula, sans-serif !important',
    color: '#000',
    marginTop: '1rem',
    marginBottom: '4rem',
  },
  form: {},
  gridContainer: {
    width: '100%',
    padding: '0px'
  },
  guide: {
    textAlign: 'center',
    marginTop: '10rem',
    fontSize: '2rem',
  },
  textField: {
    width: '100%',
  },
  button: {
    margin: theme.spacing.unit,
    fontFamily: 'Khula, sans-serif !important',
  },
  input: {
    display: 'none',
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
  actionBtnGroup: {
    marginTop: '1rem',
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
});

class Form extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  // files is an array regardless of file limit prop on uploader
  handlePersonalImageSave = (file) => {
    console.log('file: ', file);    
    const { formObj, handlePersonalImageUpload, startAthena } = this.props;
    handlePersonalImageUpload(file, formObj);
    this.setState({
      open: false,
    });
  };

  // files is an array regardless of file limit prop on uploader
  handleArtImageSave = (file) => {
    const { formObj, handleArtImageUpload } = this.props;
    handleArtImageUpload(file, formObj);
    this.setState({
      open: false,
    });
  };

  generateKey = index => `${index}_${new Date().getTime()}`;

  render() {
    const {
      classes,
      formObj,
      handleInput,
      formValid,
      personalImageData,
      savedPersonalImage,
      savedArtImage,
      styleImageData,
      startAthena,
    } = this.props;
    return (
      <Paper className={classes.root}>
        <Typography
          variant="h4"
          align="center"
          className={classes.header}
        >
          -- NuvoPastiche --
        </Typography>
        <form className={classes.form}>
          <Grid container spacing={24} className={classes.gridContainer}>
            <Grid item xs={12} sm={4} />
            <Grid item xs={12} sm={2}>
              <TextField
                label="First Name"
                type="text"
                name="firstName"
                className={classes.textField}
                InputProps={{
                  value: formObj.firstName,
                  onChange: handleInput,
                }}
                placeholder="First Name"
              />
              {/* First Name */}
            </Grid>
            <Grid item xs={12} sm={2}>
              <TextField
                label="Last Name"
                type="text"
                name="lastName"
                className={classes.textField}
                InputProps={{
                  value: formObj.lastName,
                  onChange: handleInput,
                }}
                placeholder="Last Name"
              />
              {/* Last Name */}
            </Grid>
            <Grid item xs={12} sm={4} />
          </Grid>
          <Grid container spacing={24} className={classes.gridContainer}>
            <Grid item xs={12} sm={4} />
            <Grid item xs={12} sm={4}>
              <TextField
                label="Email"
                type="text"
                name="email"
                className={classes.textField}
                InputProps={{
                  value: formObj.email,
                  onChange: handleInput,
                }}
                placeholder="abc@gmail.com"
              />
              {/* Email */}
            </Grid>            
            <Grid item xs={12} sm={4} />
          </Grid>
          <Grid container spacing={24} className={classes.gridContainer}>
            <Grid item xs={12} sm={1} />
            <Grid item xs={12} sm={5}>
              <div className={classes.guide}>
                <span>Upload a personal photo.</span>
              </div>
              <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
                className={classes.actionBtnGroup}
              >
                <FileUploader
                  disable={!formValid || savedPersonalImage}
                  filesLimit={1}
                  handleUploadSubmit={this.handlePersonalImageSave}
                />
                <div>
                  {
                    personalImageData.name ? personalImageData.name : ''
                  }
                </div>
              </Grid>
            </Grid>
              <Grid item xs={12} sm={5}>
              <div className={classes.guide}>
                <span>Upload an artistic image.</span>
              </div>
              <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
                className={classes.actionBtnGroup}
              >
                <FileUploader
                  disable={!formValid || !savedPersonalImage || (savedPersonalImage && savedArtImage)}
                  filesLimit={1}
                  handleUploadSubmit={this.handleArtImageSave}
                />
                <div>
                  {
                    styleImageData.name ? styleImageData.name : ''
                  }
                </div>
              </Grid>              
            </Grid>
            <Grid item xs={12} sm={1} />
          </Grid>
          <Grid container
                direction="row"
                justify="center"
                alignItems="center"
                className={classes.actionBtnGroup}
          >
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              disabled={!savedPersonalImage || !savedArtImage}
              onClick={startAthena}
            >
              Send                
              <Send className={classes.rightIcon} />
              </Button>
          </Grid>
        </form>
      </Paper>
    );
  }
}

Form.defaultProps = {
  classes: PropTypes.shape({}).isRequired,
  formObj: PropTypes.shape({}).isRequired,
  formValid: PropTypes.bool.isRequired,
  handleArtImageUpload: PropTypes.func.isRequired,
  handlePersonalImageUpload: PropTypes.func.isRequired,
  handleInput: PropTypes.func.isRequired,
  savedPersonalImage: PropTypes.bool.isRequired,
};

Form.propTypes = {
  classes: PropTypes.shape({}),
  formObj: PropTypes.shape({}),
  formValid: PropTypes.bool,
  handleArtImageUpload: PropTypes.func,
  handlePersonalImageUpload: PropTypes.func,
  handleInput: PropTypes.func,
  savedPersonalImage: PropTypes.bool,
};

export default withStyles(styles)(Form);