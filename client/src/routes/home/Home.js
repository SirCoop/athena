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
        fileName: '',
      },
      jobStarted: false,
      personalImageData: {
        name: '',
        size: '',
        type: '',
      },
      styleImageData: {
        name: '',
        size: '',
        type: '',
      },
      savedPersonalImage: false,
      savedArtImage: false,
    };
  }

  componentDidMount() {}

  onPersonalImageUpload = (images, formObj) => {
    const { name } = images[0];
    formObj.fileName = name;
    athenaService.uploadPersonalImage(images, formObj)
      .then(() => {
        console.log("The file is successfully uploaded");
        this.setState({
          savedPersonalImage: true,
          personalImageData: {
            name,
          },
        });
      }).catch((error) => {
        console.log('Error: ', error);
      });
  };

  onArtImageUpload = (images, formObj) => {
    const { name } = images[0];
    formObj.fileName = name;
    athenaService.uploadArtImage(images, formObj)
      .then(() => {
        console.log("The file is successfully uploaded");
        this.setState({
          savedArtImage: true,
          styleImageData: {
            name,
          },
        });
      }).catch((error) => {
        console.log('Error: ', error);
      });
  };

  startAthena = () => {
    const { formObj: { firstName, lastName, email }, personalImageData, styleImageData, } = this.state;
    const jobInfo = { 
      userDirectory: `${firstName}_${lastName}`,
      email: email,
      contentImage: personalImageData.name,
      styleImage: styleImageData.name,
    };
    athenaService.startAthenaJob(jobInfo)
      .then(() => {
        this.setState({
          jobStarted: true,
        });
      }).catch((error) => {
        console.log('Error: ', error);
      });
  }

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
    const {
      emailValid,
      firstNameValid,
      formObj,
      lastNameValid,
      personalImageData,
      savedArtImage,
      savedPersonalImage,
      styleImageData,
    } = this.state;
    const { classes } = this.props;
    const isValid = firstNameValid && lastNameValid && emailValid;
    return (
      <Grid container spacing={24} className={classnames(classes.gridContainer)}>
        <Grid item xs={12} sm={1} />
        <Grid item xs={12} sm={10} >
          <Form
            formObj={formObj}
            formValid={isValid}
            handleArtImageUpload={this.onArtImageUpload}
            handlePersonalImageUpload={this.onPersonalImageUpload}
            handleInput={this.handleInput}
            personalImageData={personalImageData}
            savedPersonalImage={savedPersonalImage}
            savedArtImage={savedArtImage}
            styleImageData={styleImageData}
            startAthena={this.startAthena}     
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