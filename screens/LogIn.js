import { gql, useMutation } from "@apollo/client";
import React, { useEffect, useRef } from "react";
import { Controller, useForm } from "react-hook-form";
import { isLoggedInVar, logUserIn } from "../apollo";
import AuthButton from "../components/auth/AuthButton";
import AuthLayout from "../components/auth/AuthLayout";
import { TextInput } from "../components/auth/AuthShard";

const LOGIN_MUTATION = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      ok
      token
      error
    }
  }
`;

export default function LogIn({ route: { params } }) {
  const { control, handleSubmit, watch } = useForm({
    defaultValues: {
      password: params?.password,
      username: params?.username,
    },
  });
  const passwordRef = useRef();
  const onCompleted = async (data) => {
    const {
      login: { ok, token },
    } = data;
    if (ok) {
      await logUserIn(token);
    }
  };
  const [logInMutation, { loading }] = useMutation(LOGIN_MUTATION, {
    onCompleted,
  });
  const onNext = (nextone) => {
    nextone?.current?.focus();
  };
  //   const onValid = (data) => {
  //     console.log(data);
  //   };
  //   useEffect(() => {
  //     register("username");
  //     register("password");
  //   }, [register]);
  const onSubmit = (data) => {
    if (!loading) {
      logInMutation({
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
        rules={{
          required: true,
        }}
        render={({ field: { onChange, value, onBlur } }) => (
          <TextInput
            placeholder="Username"
            autoCapitalize={"none"}
            placeholderTextColor={"rgba(255,255,255,0.6)"}
            returnKeyType="next"
            onSubmitEditing={() => onNext(passwordRef)}
            onChangeText={onChange}
            onBlur={onBlur}
            value={value}
          />
        )}
        name="username"
        defaultValue={params?.username && ""}
      />
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, value, onBlur } }) => (
          <TextInput
            placeholder="Password"
            ref={passwordRef}
            autoCapitalize={"none"}
            placeholderTextColor={"rgba(255,255,255,0.6)"}
            returnKeyType="done"
            lastOne={true}
            secureTextEntry
            onChangeText={onChange}
            onBlur={onBlur}
            value={value}
            onSubmitEditing={handleSubmit(onSubmit)}
          />
        )}
        name="password"
        defaultValue={params?.password && ""}
      />
      {/* <TextInput
        ref={passwordRef}
        placeholder="PassWord"
        secureTextEntry
        placeholderTextColor={"rgba(255,255,255,0.6)"}
        returnKeyType="done"
        lastOne={true}
        // onSubmitEditing={handleSubmit(onValid)}
        onChageText={(text) => setValue("password", text)}
      /> */}
      <AuthButton
        text="Log In"
        loading={loading}
        disabled={!watch("username") || !watch("password")}
        // onPress={handleSubmit(onValid)}
        onPress={handleSubmit(onSubmit)}
      />
    </AuthLayout>
  );
}
