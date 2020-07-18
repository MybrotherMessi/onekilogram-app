import React from "react";
import styled from "styled-components";
import constants from "../../constants";
import AuthButton from "../../Components/AuthButton";

const View = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
  background-color: white;
`;

const Touchable = styled.TouchableOpacity``;

const Image = styled.Image`
  width: ${constants.width / 1.5}px;
  height: ${constants.height / 10}px;
  margin-bottom: 50px;
`;

const LoginLink = styled.View``;
const LoginLinkText = styled.Text`
  color: ${(props) => props.theme.blueColor};
  font-weight: bold;
  margin-top: 20px;
`;

export default ({ navigation }) => {
  return (
    <View>
      <Image source={require("../../assets/logo.png")} />
      <AuthButton
        text={"Create New Account"}
        onPress={() => navigation.navigate("Signup")}
      />
      <Touchable onPress={() => navigation.navigate("Login")}>
        <LoginLink>
          <LoginLinkText>Log in</LoginLinkText>
        </LoginLink>
      </Touchable>
    </View>
  );
};
