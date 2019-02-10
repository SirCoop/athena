import React from 'react';
import fp from 'lodash/fp';
import classnames from 'classnames';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Form from '../../components/Form';

const styles = theme => ({
  root: {},
});

class HomeContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      formObj: {},
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

    this.setState({
      formObj: {
        ...formObj,
        [name]: value,
      },
    });
  };

  render() {
    const { formObj } = this.state;
    return (
      <div>
        <Form
          handleInput={this.handleInput}
          formObj={formObj}
        />
      </div>
    )
  }
}

const mapStateToProps = ({}) => ({});
const mapDispatchToProps = dispatch => ({});

const ConnectedHomeContainer = fp.compose(
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles),
)(HomeContainer)

export default ConnectedHomeContainer;