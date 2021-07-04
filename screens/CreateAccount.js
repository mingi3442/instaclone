import { gql, useMutation } from "@apollo/client";
import React, { useRef } from "react";
import { Controller, useForm } from "react-hook-form";
import { KeyboardAvoidingView, Platform } from "react-native";
import AuthButton from "../components/auth/AuthButton";
import AuthLayout from "../components/auth/AuthLayout";
import { TextInput } from "../components/auth/AuthShard";

const CREATE_ACCOUNT_MUTATION = gql`
  mutation createAccount(
    $firstName: String!
    $lastName: String
    $username: String!
    $email: String!
    $password: String!
  ) {
    createAccount(
      firstName: $firstName
      lastName: $lastName
      username: $username
      email: $email
      password: $password
    ) {
      ok
      error
    }
  }
`;

export default function CreateAccount({ navigation }) {
  const { control, handleSubmit, getValues } = useForm();
  const onCompleted = (data) => {
    const {
      createAccount: { ok },
    } = data;
    const { username, password } = getValues();
    if (ok) {
      navigation.navigate("LogIn", {
        username,
        password,
      });
    }
  };
  const [createAccountMutation, { loading }] = useMutation(
    CREATE_ACCOUNT_MUTATION,
    {
      onCompleted,
    }
  );
  const lastNameRef = useRef();
  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const onNext = (nextone) => {
    nextone?.current?.focus();
  };
  const onSubmit = (data) => {
    if (!loading) {
      createAccountMutation({
        variables: {
          ...data,
        },
      });
    }
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
