import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Pressable,
  type ImageSourcePropType,
  FlatList,
  Dimensions,
  Image
} from "react-native";
import React from "react";
import { Stack } from "expo-router";

const { width, height } = Dimensions.get("screen");

const cars = [
  {
    name: "Model S",
    tagline: "Starting at $69,420",
    image: require("@assets/images/not-just/tesla-clone/ModelS.jpeg")
  },
  {
    name: "Model 3",
    tagline: "Order Online for",
    taglineCTA: "Touchless Delivery",
    image: require("@assets/images/not-just/tesla-clone/Model3.jpeg")
  },
  {
    name: "Model X",
    tagline: "Order Online for",
    taglineCTA: "Touchless Delivery",
    image: require("@assets/images/not-just/tesla-clone/ModelX.jpeg")
  },
  {
    name: "Model Y",
    tagline: "Order Online for",
    taglineCTA: "Touchless Delivery",
    image: require("@assets/images/not-just/tesla-clone/ModelY.jpeg")
  }
];

type Car = (typeof cars)[0];

export default function TeslaCloneScreen() {
  return (
    <>
      <Stack.Screen
        options={{
          title: "特斯拉克隆",
          headerBackTitle: "返回",
          headerShown: false
        }}
      />
      <View style={styles.container}>
        <Header />
        <FlatList
          data={cars}
          keyExtractor={(item) => item.name}
          showsVerticalScrollIndicator={false}
          // pagingEnabled
          snapToAlignment="start"
          snapToInterval={height}
          decelerationRate={"fast"}
          renderItem={({ item, index }) => {
            return (
              <CarItem
                title={item.name}
                tagline={item.tagline}
                taglineCTA={item.taglineCTA}
                image={item.image}
              />
            );
          }}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
    // justifyContent: "center",
    // alignItems: "center"
  }
});

type CarItemProps = {
  title: string;
  tagline: string;
  taglineCTA?: string;
  image: ImageSourcePropType;
};
function CarItem({ title, tagline, taglineCTA, image }: CarItemProps) {
  return (
    <View style={carItemStyles.container}>
      <ImageBackground source={image} style={carItemStyles.image} />
      <View style={carItemStyles.titles}>
        <Text style={carItemStyles.title}>{title}</Text>
        <Text style={carItemStyles.subtitle}>
          {tagline} <Text style={carItemStyles.subtitleCTA}>{taglineCTA}</Text>
        </Text>
      </View>
      <View style={carItemStyles.buttonsContainer}>
        <StyledButton
          type="primary"
          text="Custom Order"
          onPress={() => {
            console.log("onPress");
          }}
        />
        <StyledButton
          type="secondary"
          text="Existing Inventory"
          onPress={() => {
            console.log("onPress");
          }}
        />
      </View>
    </View>
  );
}

const carItemStyles = StyleSheet.create({
  container: {
    width,
    height
  },
  titles: {
    marginTop: "30%",
    width: "100%",
    alignItems: "center"
  },
  title: {
    fontSize: 40,
    fontWeight: "500"
  },
  subtitle: {
    fontSize: 16,
    color: "#5c5e62"
  },
  subtitleCTA: {
    textDecorationLine: "underline"
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    position: "absolute"
  },
  buttonsContainer: {
    position: "absolute",
    width: "100%",
    bottom: 50
  }
});

type StyledButtonProps = {
  type: "primary" | "secondary";
  text: string;
  onPress?: () => void;
};
function StyledButton({ type, text, onPress }: StyledButtonProps) {
  const backgroundColor = type === "primary" ? "#171A20CC" : "#FFFFFFA6";
  const textColor = type === "primary" ? "#ffffff" : "#171a20";

  return (
    <View style={styledButtonStyles.container}>
      <Pressable
        style={[
          styledButtonStyles.button,
          {
            backgroundColor
          }
        ]}
      >
        <Text style={[styledButtonStyles.text, { color: textColor }]}>
          {text}
        </Text>
      </Pressable>
    </View>
  );
}

const styledButtonStyles = StyleSheet.create({
  container: {
    width: "100%",
    padding: 10
  },
  button: {
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center"
  },
  text: {
    fontSize: 12,
    fontWeight: "500",
    textTransform: "uppercase"
  }
});

function Header() {
  return (
    <View style={headerStyles.container}>
      <Image
        source={require("@assets/images/not-just/tesla-clone/logo.png")}
        style={headerStyles.logo}
      />
      <Image
        source={require("@assets/images/not-just/tesla-clone/menu.png")}
        style={headerStyles.menu}
      />
    </View>
  );
}

const headerStyles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 50,
    zIndex: 100,
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 20
  },
  logo: {
    width: 100,
    height: 20,
    resizeMode: "contain"
  },
  menu: {
    width: 25,
    height: 25,
    resizeMode: "contain"
  }
});
