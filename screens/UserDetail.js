import React, { useState } from "react";
import styled from "styled-components";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";

import UserProfile from "../Components/UserProfile";
import Loader from "../Components/Loader";
import { USER_FRAGMENT } from "../fragments";

const USER_DETAIL = gql`
  query seeUser($userName: String!) {
    seeUser(userName: $userName) {
      ...UserParts
    }
  }
  ${USER_FRAGMENT}
`;

const View = styled.View`
  flex: 1;
`;

export default ({ route }) => {
  const { userName } = route.params;
  const [refreshing, setRefreshing] = useState(false);
  const { data, loading, refetch } = useQuery(USER_DETAIL, {
    variables: {
      userName: userName,
    },
  });
  const onRefresh = async () => {
    try {
      setRefreshing(true);
      await refetch();
    } catch (e) {
      console.log(e);
    } finally {
      setRefreshing(false);
    }
  };
  return (
    <View>
      {loading ? (
        <Loader />
      ) : (
        data && data.seeUser && <UserProfile {...data.seeUser} />
      )}
    </View>
  );
};
