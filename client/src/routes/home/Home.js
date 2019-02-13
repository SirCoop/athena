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
import athenaService from '../../services/athena.service';

const styles = theme => ({
  root: {
  },
  gridContainer: {
    width: '100%',
    padding: '2rem 0px 0px 0px',
  },
});

class HomeContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      firstNameValid: false,
      lastNameValid: false,
      emailValid: false,
      formObj: {
        firstName: '',
        lastName: '',
        email: '',
      },
      savedPersonalImage: false,
    };
  }

  componentDidMount() {}


  // need to create success and fail server responses
  // so that I can set savedPersonalImage = true or false
  // to allow last upload button enable.
  onPersonalImageUpload = (images) => {
    console.log('Personal Image: ', images);
    athenaService.uploadPersonalImage(images).then(res => {
      console.log('uploadPersonalImage res: ', res);
    });
  };

  onArtImageUpload = (images) => {
    console.log('Art Image: ', images);
    athenaService.uploadArtImage(images).then(res => {
      console.log('uploadArtImage res: ', res);
    });
  };

  handleInput = ({ target }) => {
    const {
      name,
      value,
    } = target;

    const { formObj } = this.state;
    const formValid = `${name}Valid`;

    this.setState({
      formObj: {
        ...formObj,
        [name]: value,
      },
      [formValid]: true,
    });
  };

  get formValid() {
    const {
      firstNameValid,
      lastNameValid,
      emailValid,
    } = this.state;

    return firstNameValid && lastNameValid && emailValid;
  }

  render() {
    const { formObj, savedPersonalImage } = this.state;
    const { classes } = this.props;
    return (
      <Grid container spacing={24} className={classnames(classes.gridContainer)}>
        <Grid item xs={12} sm={1} />
        <Grid item xs={12} sm={10} >
          <Form
            handleArtImageUpload={this.onArtImageUpload}
            handlePersonalImageUpload={this.onPersonalImageUpload}
            handleInput={this.handleInput}
            formObj={formObj}
            formValid={this.formValid}
            savedPersonalImage={savedPersonalImage}
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
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles),
)(HomeContainer)

export default ConnectedHomeContainer;