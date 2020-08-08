import React, { useState } from "react";
import styled from "styled-components";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";

import { USER_FRAGMENT } from "../../fragments";
import Loader from "../../Components/Loader";
import UserProfile from "../../Components/UserProfile";

const MY_PROFILE = gql`
  {
    myProfile {
      ...UserParts
    }
  }
  ${USER_FRAGMENT}
`;

const View = styled.View`
  flex: 1;
`;

export default () => {
  const { loading, data } = useQuery(MY_PROFILE);

  return (
    <View>
      {loading ? (
        <Loader />
      ) : (
        data && data.myProfile && <UserProfile {...data.myProfile} />
      )}
    </View>
  );
};
