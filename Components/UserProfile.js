import React, { useState } from "react";
import {
  Image,
  View,
  TouchableOpacity,
  Platform,
  FlatList,
} from "react-native";
import styled from "styled-components";
import { Ionicons } from "@expo/vector-icons";
import PropTypes from "prop-types";

import styles from "../styles";
import constants from "../constants";
import SquarePhoto from "./SquarePhoto";
import Post from "./Post";

const ProfileHeader = styled.View`
  padding: 20px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
const HeaderColumn = styled.View``;

const ProfileStats = styled.View`
  flex-direction: row;
`;

const Stat = styled.View`
  align-items: center;
  margin-left: 40px;
`;

const Bold = styled.Text`
  font-weight: bold;
`;

const StatName = styled.Text`
  margin-top: 5px;
  font-size: 12px;
  color: ${styles.darkGreyColor};
`;

const ProfileMeta = styled.View`
  margin-top: 10px;
  padding-left: 20px;
`;

const Bio = styled.Text``;

const ButtonContainer = styled.View`
  border: 1px solid ${styles.lightGreyColor};
  flex-direction: row;
  margin-top: 30px;
`;

const Button = styled.View`
  width: ${constants.width / 2}px;
  align-items: center;
`;

const SquareContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
`;

const UserProfile = ({
  avatar,
  postsCount,
  followersCount,
  followingCount,
  bio,
  fullName,
  posts,
}) => {
  const [isGrid, setIsGrid] = useState(true);
  const toggleGrid = () => setIsGrid((i) => !i);
  const HeaderComponent = () => {
    return (
      <View>
        <ProfileHeader>
          <Image
            style={{ height: 80, width: 80, borderRadius: 40 }}
            source={{ uri: avatar }}
          />
          <HeaderColumn>
            <ProfileStats>
              <Stat>
                <Bold>{postsCount}</Bold>
                <StatName>Posts</StatName>
              </Stat>
              <Stat>
                <Bold>{followersCount}</Bold>
                <StatName>Followers</StatName>
              </Stat>
              <Stat>
                <Bold>{followingCount}</Bold>
                <StatName>Following</StatName>
              </Stat>
            </ProfileStats>
          </HeaderColumn>
        </ProfileHeader>
        <ProfileMeta>
          <Bold>{fullName}</Bold>
          <Bio>{bio}</Bio>
        </ProfileMeta>
        <ButtonContainer>
          <TouchableOpacity onPress={toggleGrid}>
            <Button>
              <Ionicons
                color={isGrid ? styles.black : styles.darkGreyColor}
                size={32}
                name={Platform.OS === "ios" ? "ios-grid" : "md-grid"}
              />
            </Button>
          </TouchableOpacity>
          <TouchableOpacity onPress={toggleGrid}>
            <Button>
              <Ionicons
                color={!isGrid ? styles.black : styles.darkGreyColor}
                size={32}
                name={Platform.OS === "ios" ? "ios-list" : "md-list"}
              />
            </Button>
          </TouchableOpacity>
        </ButtonContainer>
      </View>
    );
  };
  return (
    <View>
      {isGrid ? (
        <FlatList
          ListHeaderComponent={HeaderComponent}
          data={posts}
          renderItem={({ item }) => <SquarePhoto item={item} key={item.id} />}
          numColumns={3}
        ></FlatList>
      ) : null}
      {isGrid ? null : (
        <FlatList
          ListHeaderComponent={HeaderComponent}
          data={posts}
          renderItem={({ item }) => <Post item={item} />}
        />
      )}
    </View>
  );
};

UserProfile.propTypes = {
  id: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
  userName: PropTypes.string.isRequired,
  fullName: PropTypes.string.isRequired,
  isFollowing: PropTypes.bool.isRequired,
  isSelf: PropTypes.bool.isRequired,
  bio: PropTypes.string.isRequired,
  followingCount: PropTypes.number.isRequired,
  followersCount: PropTypes.number.isRequired,
  postsCount: PropTypes.number.isRequired,
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      user: PropTypes.shape({
        id: PropTypes.string.isRequired,
        avatar: PropTypes.string,
        userName: PropTypes.string.isRequired,
      }).isRequired,
      files: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string.isRequired,
          url: PropTypes.string.isRequired,
        })
      ).isRequired,
      likeCount: PropTypes.number.isRequired,
      isLiked: PropTypes.bool.isRequired,
      comments: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string.isRequired,
          text: PropTypes.string.isRequired,
          user: PropTypes.shape({
            id: PropTypes.string.isRequired,
            userName: PropTypes.string.isRequired,
          }).isRequired,
        })
      ).isRequired,
      caption: PropTypes.string.isRequired,
      location: PropTypes.string,
      createdAt: PropTypes.string.isRequired,
    })
  ),
};
export default UserProfile;
