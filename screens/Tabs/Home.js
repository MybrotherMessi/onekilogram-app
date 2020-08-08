import React, { useState } from "react";
import {
  ScrollView,
  RefreshControl,
  FlatList,
  View,
  Dimensions,
} from "react-native";
import styled from "styled-components";
import { gql } from "apollo-boost";
import Loader from "../../Components/Loader";
import { useQuery } from "@apollo/react-hooks";
import Post from "../../Components/Post";
import { POST_FRAGMENT } from "../../fragments";

export const FEED_QUERY = gql`
  {
    seeFeed {
      ...PostParts
    }
  }
  ${POST_FRAGMENT}
`;

export default () => {
  const [refreshing, setRefreshing] = useState(false);
  const { loading, data, refetch } = useQuery(FEED_QUERY);
  const [page, setPage] = useState(1);
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
        <FlatList
          data={data && data.seeFeed}
          renderItem={({ item }) => <Post item={item} key={item.id} />}
          onEndReachedThreshold={1}
          initialNumToRender={5}
          onRefresh={onRefresh}
          refreshing={refreshing}
        />
      )}
    </View>
  );
};
