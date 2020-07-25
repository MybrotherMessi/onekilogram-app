import React from "react";
import styled from "styled-components";

const View = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;

const Image = styled.Image``;

export default () => (
  <View>
    <Image source={require("../assets/logo.png")} />
  </View>
);
