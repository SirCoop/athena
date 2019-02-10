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
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Typography from '@material-ui/core/Typography';

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

    this.state = {};
  }

  componentDidMount() {}

  generateKey = index => `${index}_${new Date().getTime()}`;

  render() {
    const { classes, formObj, handleInput } = this.props;
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
                <input
                  accept="image/*"
                  className={classes.input}
                  id="contained-button-file"
                  multiple
                  type="file"
                />
                <label htmlFor="contained-button-file">
                <Button variant="contained" color="primary" className={classes.button}>
                  Upload
                  <CloudUploadIcon className={classes.rightIcon} />
                </Button>
                </label>
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
  handleInput: PropTypes.func.isRequired,
};

Form.propTypes = {
  classes: PropTypes.shape({}),
  formObj: PropTypes.shape({}),
  handleInput: PropTypes.func,
};

export default withStyles(styles)(Form);