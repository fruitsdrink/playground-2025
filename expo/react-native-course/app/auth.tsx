import { KeyboardAvoidingView, Platform, View } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";

export default function AuthScreen() {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View>
        <Text>注册帐号</Text>
        <TextInput
          label={"邮箱"}
          placeholder="请输入邮箱"
          autoCapitalize="none"
          keyboardType="email-address"
          mode="outlined"
        />
        <TextInput
          label={"密码"}
          placeholder="请输入密码"
          secureTextEntry
          autoCapitalize="none"
          keyboardType="default"
          mode="outlined"
        />
        <Button mode="contained">注册</Button>
        <Button mode="text">已有帐号？登录</Button>
      </View>
    </KeyboardAvoidingView>
  );
}
