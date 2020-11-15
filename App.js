import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Fontisto, MaterialCommunityIcons } from "@expo/vector-icons";
import { Camera } from "expo-camera";

export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }

  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={{ flex: 1 }}>
      <Camera style={{ flex: 1 }} type={type}>
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
              <View style={styles.capture}>
                <MaterialCommunityIcons
                  name="camera-iris"
                  size={31}
                  color="white"
                />
              </View>
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
