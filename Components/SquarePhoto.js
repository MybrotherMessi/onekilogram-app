import React from "react";
import { TouchableOpacity, Image } from "react-native";
import PropTypes from "prop-types";
import { useNavigation } from "@react-navigation/native";

import constants from "../constants";

const SquarePhoto = ({ item, id }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity onPress={() => navigation.navigate("Detail", { item })}>
      <Image
        source={{ uri: item.files[0].url }}
        style={{ width: constants.width / 3, height: constants.height / 6 }}
      />
    </TouchableOpacity>
  );
};

SquarePhoto.propTypes = {
  files: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    })
  ),
  id: PropTypes.string,
};

export default SquarePhoto;
