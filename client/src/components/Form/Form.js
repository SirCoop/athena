import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import {
  Button,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  withStyles,
} from '@material-ui/core';
import Upload from 'material-ui-upload/Upload';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Typography from '@material-ui/core/Typography';
import { DropzoneDialog } from 'material-ui-dropzone';


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
});

class Form extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      files: []
    };
  }

  componentDidMount() {}

  handleClose = () => {
    this.setState({
        open: false
    });
  };

  handleOpen = () => {
      this.setState({
          open: true,
      });
  };

  handleSave = (Files) => {
    const { handleFileUpload } = this.props;
    handleFileUpload(Files);
    this.setState({
      open: false,
    });
  }

  generateKey = index => `${index}_${new Date().getTime()}`;

  render() {
    const { classes, formObj} = this.props;
    const { open } = this.state;
    return (
      <Paper className={classes.root}>
        <Typography
          variant="title"
          align="center"
          className={classes.header}
        >
          -- Athena --
        </Typography>
        <form className={classes.form}>
          <Grid container spacing={24} className={classes.gridContainer}>
            <Grid item xs={12} sm={1} />
            <Grid item xs={12} sm={10}>
              <div className={classes.guide}>
                <span>Upload a personal photo to get started.</span>
              </div>
              <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
                className={classes.actionBtnGroup}
              >
                <Button onClick={this.handleOpen}>
                  Add Image
                </Button>
                <DropzoneDialog
                    open={open}
                    onSave={this.handleSave}
                    acceptedFiles={['image/jpeg', 'image/png', 'image/bmp']}
                    showPreviews={true}
                    maxFileSize={5000000}
                    onClose={this.handleClose}
                    filesLimit={1}
                />
              </Grid>
            </Grid>
            <Grid item xs={12} sm={1} />
          </Grid>
        </form>
      </Paper>
    );
  }
}

Form.defaultProps = {
  classes: PropTypes.shape({}).isRequired,
  formObj: PropTypes.shape({}).isRequired,
  handleFileUpload: PropTypes.func.isRequired,
  handleInput: PropTypes.func.isRequired,
};

Form.propTypes = {
  classes: PropTypes.shape({}),
  formObj: PropTypes.shape({}),
  handleFileUpload: PropTypes.func,
  handleInput: PropTypes.func,
};

export default withStyles(styles)(Form);