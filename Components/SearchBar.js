import React from "react";
import PropTypes from "prop-types";
import { TextInput } from "react-native";

import styles from "../styles";
import constants from "../constants";

const SearchBar = ({ value, onChange, onSubmit = () => null, placeholder }) => (
  <TextInput
    style={{
      textAlign: "center",
      width: constants.width - 32,
      height: 35,
      backgroundColor: styles.lightGreyColor,
      padding: 10,
      borderRadius: 5,
    }}
    value={value}
    placeholder={placeholder}
    onChangeText={onChange}
    onSubmitEditing={onSubmit}
    returnKeyType={"search"}
    placeholder={"Search"}
    placeholderTextColor={styles.darkGreyColor}
  />
);

SearchBar.propTypes = {
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func,
  value: PropTypes.string.isRequired,
};

export default SearchBar;
