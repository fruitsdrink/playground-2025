import { useState } from "react";
import { KeyboardAvoidingView, Platform, StyleSheet, View } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";

export default function AuthScreen() {
  const [isSignUp, setIsSignUp] = useState<boolean>(false);

  const handleSwitchMode = () => {
    setIsSignUp((prev) => !prev);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <View style={styles.content}>
        <Text style={styles.title} variant="headlineMedium">
          {isSignUp ? "欢迎回来" : "注册帐号"}
        </Text>
        <TextInput
          style={styles.input}
          label={"邮箱"}
          placeholder="请输入邮箱"
          autoCapitalize="none"
          keyboardType="email-address"
          mode="outlined"
        />
        <TextInput
          style={styles.input}
          label={"密码"}
          placeholder="请输入密码"
          secureTextEntry
          autoCapitalize="none"
          keyboardType="default"
          mode="outlined"
        />
        <Button style={styles.button} mode="contained">
          {isSignUp ? "登录" : "注册"}
        </Button>
        <Button
          style={styles.switchModeButton}
          mode="text"
          onPress={handleSwitchMode}
        >
          {isSignUp ? "没有帐号？注册" : "已有帐号？登录"}
        </Button>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
  },
  title: {
    textAlign: "center",
    marginBottom: 24,
  },
  input: {
    marginBottom: 16,
  },
  button: {
    marginTop: 8,
  },
  switchModeButton: {
    marginTop: 16,
  },
});
