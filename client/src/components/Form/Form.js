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

const styles = theme => ({
  root: {
    backgroundColor: '#afafaf',
    flexGrow: 1,
  },
  form: {},
});

class Form extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {}

  render() {
    const { classes, formObj, handleInput } = this.props;
    return (
      <Paper className={classes.root}>
        <form className={classes.form}>
          <Grid container spacing={24}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Test"
                type="text"
                name="testInput"
                className={classes.textField}
                InputProps={{
                  value: formObj.testInput,
                  onChange: handleInput,
                }}
                placeholder="Write something"
              />
              {/* Test Input */}
            </Grid>
          </Grid>
        </form>
      </Paper>
    )
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