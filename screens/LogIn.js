import React, { useEffect, useRef } from "react";
import { Controller, useForm } from "react-hook-form";
import AuthButton from "../components/auth/AuthButton";
import AuthLayout from "../components/auth/AuthLayout";
import { TextInput } from "../components/auth/AuthShard";

export default function LogIn() {
  const passwordRef = useRef();
  const {
    control,
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
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
  const onSubmit = (data) => console.log(data);

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
            // onSubmitEditing={() => onNext(passwordRef)}
            onChageText={onChange}
            onBlur={onBlur}
            value={value}
          />
        )}
        name="username"
        defaultValue=" "
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
        disabled={false}
        // onPress={handleSubmit(onValid)}
        onPress={handleSubmit(onSubmit)}
      />
    </AuthLayout>
  );
}
