import React from 'react';
import { Formik } from 'formik';
import { View } from 'react-native';
import { Text, TextInput, Button } from 'react-native-paper';
import Styled from 'styled-components/native';

const Root = Styled.View`
  max-width: 300px;
`;
export const LoginForm = () => {
  const [passwordVisible, setPasswordVisible] = React.useState(false);
  return (
    <Root>
      <Text>Login Form</Text>
      <Formik
        onSubmit={() => console.log('submit')}
        initialValues={{
          email: '',
          password: '',
        }}
      >
        {({ handleBlur, handleChange, values, handleSubmit }) => (
          <>
            <TextInput
              onBlur={handleBlur('email')}
              nativeID="email"
              label="Email"
              onChangeText={handleChange('email')}
              value={values.email}
            />
            <TextInput
              secureTextEntry={!passwordVisible}
              label="Password"
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              nativeID="password"
              value={values.password}
              right={
                <TextInput.Icon
                  name="eye"
                  onPress={() => setPasswordVisible(!passwordVisible)}
                />
              }
            />
            <Button onPress={handleSubmit}>Login</Button>
          </>
        )}
      </Formik>
    </Root>
  );
};

export default LoginForm;
