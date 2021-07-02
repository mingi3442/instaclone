import React, { useRef } from "react";
import { Controller, useForm } from "react-hook-form";
import { KeyboardAvoidingView, Platform } from "react-native";
import AuthButton from "../components/auth/AuthButton";
import AuthLayout from "../components/auth/AuthLayout";
import { TextInput } from "../components/auth/AuthShard";

export default function CreateAccount() {
  const { control, handleSubmit } = useForm();
  const lastNameRef = useRef();
  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const onNext = (nextone) => {
    nextone?.current?.focus();
  };
  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <AuthLayout>
      <Controller
        control={control}
        rules={{ required: true }}
        render={({ field: { onChange, value, onBlur } }) => (
          <TextInput
            autoFocus
            placeholder="First Name"
            placeholderTextColor={"rgba(255,255,255,0.6)"}
            returnKeyType="next"
            onSubmitEditing={() => onNext(lastNameRef)}
            onChangeText={onChange}
            onBlur={onBlur}
            value={value}
          />
        )}
        name="firstName"
        defaultValue=""
      />
      <Controller
        control={control}
        rules={{ required: true }}
        render={({ field: { onChange, value, onBlur } }) => (
          <TextInput
            ref={lastNameRef}
            placeholder="Last Name"
            placeholderTextColor={"rgba(255,255,255,0.6)"}
            returnKeyType="next"
            onSubmitEditing={() => onNext(usernameRef)}
            onChangeText={onChange}
            onBlur={onBlur}
            value={value}
          />
        )}
        name="lastName"
        defaultValue=""
      />
      <Controller
        control={control}
        rules={{ required: true }}
        render={({ field: { onChange, value, onBlur } }) => (
          <TextInput
            ref={usernameRef}
            autoCapitalize={"none"}
            placeholder="Username"
            placeholderTextColor={"rgba(255,255,255,0.6)"}
            returnKeyType="next"
            onSubmitEditing={() => onNext(emailRef)}
            onChangeText={onChange}
            onBlur={onBlur}
            value={value}
          />
        )}
        name="username"
        defaultValue=""
      />
      <Controller
        control={control}
        rules={{ required: true }}
        render={({ field: { onChange, value, onBlur } }) => (
          <TextInput
            ref={emailRef}
            placeholder="Email"
            placeholderTextColor={"rgba(255,255,255,0.6)"}
            returnKeyType="next"
            keyboardType="email-address"
            onSubmitEditing={() => onNext(passwordRef)}
            onChangeText={onChange}
            onBlur={onBlur}
            value={value}
          />
        )}
        name="email"
        defaultValue=""
      />
      <Controller
        control={control}
        rules={{ required: true }}
        render={({ field: { onChange, value, onBlur } }) => (
          <TextInput
            ref={passwordRef}
            placeholder="PassWord"
            secureTextEntry
            placeholderTextColor={"rgba(255,255,255,0.6)"}
            returnKeyType="done"
            lastOne={true}
            onChangeText={onChange}
            onBlur={onBlur}
            value={value}
            onSubmitEditing={handleSubmit(onSubmit)}
          />
        )}
        name="password"
        defaultValue=""
      />

      <AuthButton
        text="Create Account"
        disabled={false}
        onPress={handleSubmit(onSubmit)}
      />
    </AuthLayout>
  );
}
