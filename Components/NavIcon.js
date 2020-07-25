import React from "react";
import PropTypes from "prop-types";
import { Ionicons } from "@expo/vector-icons";
import styles from "../styles";

const NavIcon = ({
  focused = true,
  name,
  color = styles.blackColor,
  size = 36,
}) => (
  <Ionicons
    name={name}
    color={focused ? color : styles.darkGreyColor}
    size={size}
  />
);

NavIcon.propTypes = {
  name: PropTypes.string.isRequired,
  color: PropTypes.string,
  size: PropTypes.number,
  focused: PropTypes.bool,
};

export default NavIcon;
