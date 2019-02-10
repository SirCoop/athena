import React from 'react';
import fp from 'lodash/fp';
import classnames from 'classnames';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { 
  Grid,
  withStyles,
} from '@material-ui/core';
import Form from '../../components/Form';

const styles = theme => ({
  root: {
  },
  gridContainer: {
    width: '100%',
    padding: '0px'
  },
});

class HomeContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      formObj: {
        testInput: '',
        testInput2: '',
      },
    };
  }

  componentDidMount() {}

  handleInput = ({ target }) => {
    const {
      name,
      value,
    } = target;

    console.log('name: ', name);
    console.log('value: ', value);

    const { formObj } = this.state;

    this.setState({
      formObj: {
        ...formObj,
        [name]: value,
      },
    });
  };

  render() {
    const { formObj } = this.state;
    const { classes } = this.props;
    return (
      <Grid container spacing={24} className={classnames(classes.gridContainer)}>
        <Grid item xs={12} sm={1} />
        <Grid item xs={12} sm={10} >
          <Form
            handleInput={this.handleInput}
            formObj={formObj}
          />
        </Grid>
        <Grid item xs={12} sm={1} />
      </Grid>
        
    );
  }
}

const mapStateToProps = ({}) => ({});
const mapDispatchToProps = dispatch => ({});

const ConnectedHomeContainer = fp.compose(
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles),
)(HomeContainer)

export default ConnectedHomeContainer;