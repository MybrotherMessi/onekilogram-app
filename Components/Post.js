import React, { useState } from "react";
import { Image, Platform } from "react-native";
import styled from "styled-components";
import PropTypes from "prop-types";
import { gql } from "apollo-boost";
import { useMutation } from "@apollo/react-hooks";
import Swiper from "react-native-swiper";
import { Ionicons, SimpleLineIcons } from "@expo/vector-icons";

import constants from "../constants";
import styles from "../styles";

export const TOGGLE_LIKE = gql`
  mutation toggelLike($postId: String!) {
    toggleLike(postId: $postId)
  }
`;

const Container = styled.View``;

const Header = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 15px;
`;

const Touchable = styled.TouchableOpacity``;

const HeaderUserContainer = styled.View`
  margin-left: 10px;
`;
const NameText = styled.Text`
  font-size: 16px;
  font-weight: 400;
  font-family: "sans-serif-medium";
  margin-right: 5px;
`;
const BoldText = styled.Text`
  font-size: 16px;
  font-weight: bold;
`;
const Text = styled.Text`
  font-size: 14px;
`;
const LightGreyText = styled.Text`
  opacity: 0.5;
  font-size: 13px;
`;

const Location = styled.Text`
  font-size: 12px;
`;
const InfoContainer = styled.View`
  margin-top: -45px;
  margin-left: 10px;
  padding: 10px;
`;
const IconsContainer = styled.View`
  flex-direction: row;
  margin-bottom: 5px;
`;
const IconContainer = styled.View`
  margin-right: 15px;
`;
const CaptionContainer = styled.Text`
  flex-direction: row;
  flex: 1;
  margin-bottom: 5px;
`;

const Post = ({
  id,
  user,
  location,
  files = [],
  likeCount: likeCountProp,
  caption,
  comments = [],
  isLiked: isLikedProp,
}) => {
  const [isLiked, setIsLiked] = useState(isLikedProp);
  const [likeCount, setLikeCount] = useState(likeCountProp);
  const [toggleLikeMutation] = useMutation(TOGGLE_LIKE, {
    variables: { postId: id },
  });
  const handleLike = async () => {
    if (isLiked === true) {
      setLikeCount((l) => l - 1);
    } else {
      setLikeCount((l) => l + 1);
    }
    setIsLiked((p) => !p);
    try {
      toggleLikeMutation();
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <Container>
      <Header>
        <Touchable>
          <Image
            source={{ uri: user.avatar }}
            style={{
              height: 40,
              width: 40,
              borderRadius: 20,
              borderWidth: 0.3,
              borderColor: styles.lightGreyColor,
            }}
          />
        </Touchable>
        <HeaderUserContainer>
          <NameText>{user.userName}</NameText>
          <Location>{location}</Location>
        </HeaderUserContainer>
      </Header>
      <Swiper
        style={{ height: constants.height / 2.5 }}
        paginationStyle={{ position: "absolute", bottom: 15 }}
        dotStyle={{ width: 6, height: 6 }}
        activeDotStyle={{ width: 6, height: 6 }}
      >
        {files.map((file) => (
          <Image
            style={{
              width: constants.width,
              height: constants.height / 3,
            }}
            key={file.id}
            source={{ uri: file.url }}
          />
        ))}
      </Swiper>
      <InfoContainer>
        <IconsContainer>
          <Touchable onPress={handleLike}>
            <IconContainer>
              <Ionicons
                size={28}
                color={isLiked ? styles.redColor : styles.blackColor}
                name={
                  Platform.OS === "ios"
                    ? isLiked
                      ? "ios-heart"
                      : "ios-heart-empty"
                    : isLiked
                    ? "md-heart"
                    : "md-heart-empty"
                }
              />
            </IconContainer>
          </Touchable>
          <Touchable>
            <IconContainer>
              <SimpleLineIcons size={26} name="bubble" />
            </IconContainer>
          </Touchable>
        </IconsContainer>
        <Touchable>
          <BoldText>
            {likeCount === 1 ? "1 like" : `${likeCount} likes`}
          </BoldText>
        </Touchable>
        <CaptionContainer numberOfLines={50}>
          <NameText>{user.userName} </NameText>
          <Text>{caption}</Text>
        </CaptionContainer>

        <Touchable>
          <LightGreyText>See all {comments.length} comments</LightGreyText>
        </Touchable>
      </InfoContainer>
    </Container>
  );
};

Post.propTypes = {
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
};

export default Post;
