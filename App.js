import React, { useEffect, useState } from "react";
import { StyleSheet, View, TouchableOpacity, Alert } from "react-native";
import { Fontisto, MaterialCommunityIcons } from "@expo/vector-icons";
import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";

export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [cameraRef, setCameraRef] = useState(null);
  const [mediaStatus, setMediaStatus] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === "granted");
      let result = await MediaLibrary.requestPermissionsAsync();
      console.log({ result });
      setMediaStatus(result.status === "granted");
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }

  if (hasPermission === false) {
    return Alert.alert("No access to Camers", "Please grant us permission");
  }

  if (mediaStatus === false) {
    return Alert.alert("No access to Media", "Please grant us permission");
  }

  return (
    <View style={{ flex: 1 }}>
      <Camera
        style={{ flex: 1 }}
        type={type}
        ref={(ref) => {
          setCameraRef(ref);
        }}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: "transparent",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <View
            style={{
              flex: 0.1,
              alignSelf: "flex-end",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "row",
            }}
          >
            <View style={styles.container}>
              <TouchableOpacity
                style={styles.camera}
                onPress={() => {
                  setType(
                    type == Camera.Constants.Type.back
                      ? Camera.Constants.Type.front
                      : Camera.Constants.Type.back
                  );
                }}
              >
                <Fontisto name="camera" size={24} color="white" />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.capture}
                onPress={async () => {
                  if (cameraRef) {
                    let photo = await cameraRef.takePictureAsync();
                    console.log("photo", photo);
                    const asset = await MediaLibrary.createAssetAsync(
                      photo.uri
                    );
                    console.log("asset", asset);
                    Alert.alert(
                      "Saved to Album",
                      "Check your beautiful capture in gallery"
                    );
                  }
                }}
              >
                <MaterialCommunityIcons
                  name="camera-iris"
                  size={31}
                  color="white"
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Camera>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  camera: {
    marginBottom: 10,
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
  },
  capture: {
    marginBottom: 10,
    width: 50,
    height: 50,
    borderRadius: 50,
    marginLeft: 20,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
  },
});
