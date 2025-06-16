import { useAuth } from "@/lib/auth-context";
import { useRouter } from "expo-router";
import { useState } from "react";
import { KeyboardAvoidingView, Platform, StyleSheet, View } from "react-native";
import { Button, Text, TextInput, useTheme } from "react-native-paper";

export default function AuthScreen() {
  const [isSignUp, setIsSignUp] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("test@test.com");
  const [password, setPassword] = useState<string>("test123456");
  const [error, setError] = useState<string | null>(null);

  const theme = useTheme();
  const router = useRouter();

  const { signIn, signUp } = useAuth();

  const handAuth = async () => {
    if (!email || !password) {
      setError("邮箱和密码不能为空");
      return;
    }
    if (password.length <= 8) {
      setError("密码长度不能少9位");
      return;
    }
    setError(null);

    if (isSignUp) {
      const error = await signIn(email, password);
      if (error) {
        setError(error);
        return;
      }
    } else {
      const error = await signUp(email, password);
      if (error) {
        setError(error);
        return;
      }

      // 登录成功后，重定向到首页
      router.replace("/");
    }
  };

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
          onChangeText={setEmail}
          value={email}
        />
        <TextInput
          style={styles.input}
          label={"密码"}
          placeholder="请输入密码"
          secureTextEntry
          autoCapitalize="none"
          keyboardType="default"
          mode="outlined"
          value={password}
          onChangeText={setPassword}
        />
        {error && <Text style={{ color: theme.colors.error }}>{error}</Text>}
        <Button style={styles.button} mode="contained" onPress={handAuth}>
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
