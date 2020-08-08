import React, { useState } from "react";
import styled from "styled-components";
import { TouchableWithoutFeedback, Keyboard, FlatList } from "react-native";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";

import useInput from "../../hooks/useInput";
import SearchBar from "../../Components/SearchBar";
import SquarePhoto from "../../Components/SquarePhoto";
import Loader from "../../Components/Loader";
import { useNavigation } from "@react-navigation/native";

export const SEARCH = gql`
  query search($term: String!) {
    searchPost(term: $term) {
      id
      files {
        url
        id
      }
      likeCount
      commentCount
    }
  }
`;

const ColumnContainer = styled.View`
  flex: 1;
`;

export default () => {
  const navigation = useNavigation();
  const searchInput = useInput("");
  const [shouldFetch, setShouldFetch] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const { data, loading, refetch } = useQuery(SEARCH, {
    variables: {
      term: searchInput.value,
    },
    skip: !shouldFetch,
    fetchPolicy: "network-only",
  });

  const searchSubmit = () => {
    setShouldFetch(true);
  };
  const onRefresh = async () => {
    try {
      setRefreshing(true);
      await refetch({ variables: { term: searchInput.value } });
    } catch (e) {
      console.log(e);
    } finally {
      setRefreshing(false);
    }
  };

  navigation.setOptions({
    headerTitle: () => (
      <SearchBar
        {...searchInput}
        onSubmit={searchSubmit}
        value={searchInput.value}
      />
    ),
  });
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ColumnContainer>
        {loading ? (
          <Loader />
        ) : (
          <FlatList
            onPress={() => navigation.navigate("Detail", { item })}
            data={data && data.searchPost}
            renderItem={({ item }) => <SquarePhoto item={item} key={item.id} />}
            refreshing={refreshing}
            onRefresh={onRefresh}
            numColumns={3}
          ></FlatList>
        )}
      </ColumnContainer>
    </TouchableWithoutFeedback>
  );
};
