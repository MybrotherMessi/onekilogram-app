import React, { useState, useEffect } from "react";
import { FlatList, View, Image, TouchableOpacity } from "react-native";
import styled from "styled-components";
import * as MediaLibrary from "expo-media-library";
import * as Permissions from "expo-permissions";

import Loader from "../../Components/Loader";
import constants from "../../constants";

const Text = styled.Text``;

export default () => {
  const [loading, setLoading] = useState(true);
  const [hasPermission, setHasPermission] = useState(false);
  const [selected, setSelected] = useState();
  const [allPhotos, setAllPhotos] = useState();
  const changeSelected = (photo) => {
    setSelected(photo);
  };
  const getPhotos = async () => {
    try {
      const { assets } = await MediaLibrary.getAssetsAsync({
        sortBy: [[MediaLibrary.SortBy.creationTime, false]],
      });
      const [firstPhoto] = assets;
      setSelected(firstPhoto);
      setAllPhotos(assets);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };
  const askPermission = async () => {
    try {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status === "granted") {
        setHasPermission(true);
        getPhotos();
      }
    } catch (e) {
      console.log(e);
      setHasPermission(false);
    }
  };
  useEffect(() => {
    askPermission();
  }, []);
  return (
    <View style={{ flex: 1 }}>
      {loading ? (
        <Loader />
      ) : (
        <>
          {hasPermission ? (
            <>
              <Image
                style={{
                  width: constants.width,
                  height: constants.height / 2,
                }}
                source={{ uri: selected.uri }}
              />

              <FlatList
                data={allPhotos}
                renderItem={(photo) => (
                  <TouchableOpacity onPress={() => changeSelected(photo.item)}>
                    <Image
                      style={{
                        width: constants.width / 4,
                        height: constants.height / 8,
                      }}
                      source={{ uri: photo.item.uri }}
                      key={photo.id}
                    />
                  </TouchableOpacity>
                )}
                numColumns={4}
              />
            </>
          ) : null}
        </>
      )}
    </View>
  );
};
