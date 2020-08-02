import React from "react";
import { ScrollView } from "react-native";
import styled from "styled-components";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";

import Post from "../Components/Post";
import Loader from "../Components/Loader";
import { POST_FRAGMENT } from "../fragments";

const POST_DETAIL = gql`
  query seeFullPost($id: String!) {
    seeFullPost(id: $id) {
      ...PostParts
    }
  }
  ${POST_FRAGMENT}
`;

const View = styled.View`
  flex: 1;
`;

export default ({ route }) => {
  const { id } = route.params.item;
  const { data, loading } = useQuery(POST_DETAIL, {
    variables: {
      id: id,
    },
  });
  return (
    <ScrollView>
      {loading ? (
        <Loader />
      ) : (
        data && data.seeFullPost && <Post {...data.seeFullPost} />
      )}
    </ScrollView>
  );
};
