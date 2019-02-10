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
    backgroundColor: '#efefef',
    flexGrow: 1,
    height: '90vh',
    marginTop: '2rem',
  },
  form: {},
  gridContainer: {
    width: '100%',
    padding: '0px'
  },
  textField: {
    width: '100%',
  }
});

class Form extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {}

  generateKey = index => `${index}_${new Date().getTime()}`;

  createteTestInput2Options = () => {
    const data = ['1', '2'];
    const opts = data.map((item, idx) => (
      <MenuItem
        key={this.generateKey(idx)}
        value={item}
      >
        {item}
      </MenuItem>
    ));
    return opts.length ? opts : [];
  }

  render() {
    const { classes, formObj, handleInput } = this.props;
    return (
      <Paper className={classes.root}>
        <form className={classes.form}>
          <Grid container spacing={24} className={classes.gridContainer}>
            <Grid item xs={12} sm={1} />
            <Grid item xs={12} sm={5}>
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

            <Grid item xs={12} sm={5}>
              <FormControl className={classes.textField}>
                <InputLabel htmlFor="testInput2">Test Input 2</InputLabel>
                <Select
                  name="testInput2"
                  value={formObj.testInput2}
                  onChange={handleInput}
                >
                  <MenuItem key={this.generateKey('none')} value="none">Select</MenuItem>
                  {this.createteTestInput2Options()}
                </Select>
              </FormControl>
              {/* Test Input2 */}
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