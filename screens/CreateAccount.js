import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
export default function CreateAccount() {
  return (
    <View>
      <Text>CreateAccount!</Text>
      <TouchableOpacity onPress={() => navigation.navigate("CreateAccount")}>
        <View>
          <Text>Go to Create Account</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}
