import React, { useState } from "react";
import styled from "styled-components";
import { Alert, TouchableWithoutFeedback, Keyboard } from "react-native";
import { useMutation } from "@apollo/react-hooks";
import * as Facebook from "expo-facebook";
import * as Google from "expo-google-app-auth";

import AuthButton from "../../Components/AuthButton";
import AuthInput from "../../Components/AuthInput";
import useInput from "../../hooks/useInput";
import { CREATE_ACCOUNT } from "./AuthQueries";

const View = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;

const FbContainer = styled.View`
  margin-top: 50px;
  padding-top: 50px;
  border-color: ${(props) => props.theme.lightGreyColor};
  border-style: solid;
  border-top-width: 1px;
`;

const GoogleContainer = styled.View`
  margin-top: 25px;
`;

export default ({ route, navigation }) => {
  const emailInput = useInput(route.params ? route.params.email : "");
  const fNameInput = useInput("");
  const lNameInput = useInput("");
  const userNameInput = useInput("");
  const [loading, setLoading] = useState(false);
  const [createAccountMutation] = useMutation(CREATE_ACCOUNT, {
    variables: {
      email: emailInput.value,
      firstName: fNameInput.value,
      lastName: lNameInput.value,
      userName: userNameInput.value,
    },
  });

  const handleSignup = async () => {
    const { value: email } = emailInput;
    const { value: fName } = fNameInput;
    const { value: lName } = lNameInput;
    const { value: userName } = userNameInput;
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!emailRegex.test(email)) {
      return Alert.alert("That email is invalid");
    }
    if (fName === "") {
      return Alert.alert("I need your name");
    }
    if (userName === "") {
      return Alert.alert("Invalid username");
    }
    try {
      setLoading(true);
      const {
        data: { createAccount },
      } = await createAccountMutation();
      if (createAccount) {
        Alert.alert("Account created", "Log in now!");
        navigation.navigate("Login", { email });
      }
    } catch (e) {
      console.log(e);
      Alert.alert("Username taken.", "Log in instead");
      navigation.navigate("Login", { email });
    } finally {
      setLoading(false);
    }
  };

  const FbHandler = async () => {
    try {
      setLoading(true);
      await Facebook.initializeAsync(process.env.FACEBOOK_APP_ID);
      const { type, token } = await Facebook.logInWithReadPermissionsAsync({
        permissions: ["public_profile", "email"],
      });
      if (type === "success") {
        const response = await fetch(
          `https://graph.facebook.com/me?access_token=${token}&fields=id,first_name,last_name,email`
        );
        const { email, first_name, last_name } = await response.json();
        updateFormData(email, first_name, last_name);
        setLoading(false);
      } else {
        // type === 'cancel'
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
    }
  };

  const GoogleHandler = async () => {
    const GOOGLE_APP_ID = process.env.GOOGLE_APP_ID;
    try {
      setLoading(true);
      const result = await Google.logInAsync({
        androidClientId: GOOGLE_APP_ID,
        scopes: ["profile", "email"],
      });
      if (result.type === "success") {
        const user = await fetch("https://www.googleapis.com/userinfo/v2/me", {
          headers: { Authorization: `Bearer ${result.accessToken}` },
        });
        const { email, given_name, family_name } = await user.json();
        updateFormData(email, given_name, family_name);
      } else {
        return { cancelled: true };
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  const updateFormData = (email, firstName, lastName) => {
    emailInput.setValue(email);
    fNameInput.setValue(firstName);
    lNameInput.setValue(lastName);
    const [username] = email.split("@");
    userNameInput.setValue(username);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View>
        <AuthInput
          {...fNameInput}
          placeholder="First Name"
          autoCapitalize="words"
        />
        <AuthInput
          {...lNameInput}
          placeholder="Last Name"
          autoCapitalize="words"
        />
        <AuthInput
          {...emailInput}
          placeholder="Email"
          keyboardType="email-address"
          autoCorrect={false}
        />
        <AuthInput
          {...userNameInput}
          placeholder="Username"
          returnKeyType="send"
          autoCorrect={false}
        />
        <AuthButton loading={loading} text="Sign Up" onPress={handleSignup} />
        <FbContainer>
          <AuthButton
            loading={false}
            onPress={FbHandler}
            text="Connect Facebook"
            bgColor={"#2D4DA7"}
          />
        </FbContainer>
        <GoogleContainer>
          <AuthButton
            loading={false}
            onPress={GoogleHandler}
            text="Connect Google"
            bgColor={"#EE1922"}
          />
        </GoogleContainer>
      </View>
    </TouchableWithoutFeedback>
  );
};
