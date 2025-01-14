import { Image, StyleSheet, Platform, View, Text } from "react-native";

import ParallaxScrollView from "@/tempFolder/app-example/ParallaxScrollView";
import { styles } from "./_layout";

export default function HomeScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <Image
          source={require("@/assets/images/partial-react-logo.png")}
          style={styles.reactLogo}
        />
      }
    >
      <View>
        <Text>Index</Text>
        <Text>Index</Text>
        <Text>Index</Text>
        <Text>Index</Text>
        <Text>Index</Text>
      </View>
    </ParallaxScrollView>
  );
}
