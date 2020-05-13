import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import * as actions from "../../../../../store/actions/index";

import "./EnvironmentOptions.scss";

const EnvironmentOptions = props => {
  let classes;

  const options = props.environmentOptions.map(option => (
    // eslint-disable-next-line
    <img
      src={option.imgPath}
      key={option.name}
      alt={option.name}
      className={
        props.currentEnvironmentOption.name === option.name ? "selected" : ""
      }
      onClick={() => props.onSetEnvironmentOption(option)}
    />
  ));

  return <div className="environment-options">{options}</div>;
};

EnvironmentOptions.propTypes = {
  environmentOptions: PropTypes.array.isRequired,
  onSetEnvironmentOption: PropTypes.func.isRequired,
  currentEnvironmentOption: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  environmentOptions: state.environmentControls.environmentOptions,
  currentEnvironmentOption: state.environmentControls.currentEnvironmentOption
});

const mapDispatchToProps = dispatch => ({
  onSetEnvironmentOption: option =>
    dispatch(actions.setEnvironmentOption(option))
});

export default connect(mapStateToProps, mapDispatchToProps)(EnvironmentOptions);
