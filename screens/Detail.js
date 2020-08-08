import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import { POST_FRAGMENT } from "../fragments";
import Loader from "../Components/Loader";
import Post from "../Components/Post";
import { View, FlatList } from "react-native";

const POST_DETAIL = gql`
  query seeFullPost($id: String!) {
    seeFullPost(id: $id) {
      ...PostParts
    }
  }
  ${POST_FRAGMENT}
`;

export default ({ route }) => {
  const { id } = route.params.item;
  const [refreshing, setRefreshing] = useState(false);
  const { loading, data } = useQuery(POST_DETAIL, {
    variables: { id: id },
  });
  const arr = [data.seeFullPost];
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
          data={arr}
          renderItem={({ item }) => <Post item={item} key={item.id} />}
          onRefresh={onRefresh}
          refreshing={refreshing}
        />
      )}
    </View>
  );
};
