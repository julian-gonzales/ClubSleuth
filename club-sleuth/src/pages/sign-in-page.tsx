import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Button,
  Heading,
  Text,
  FormErrorMessage,
  Alert,
  AlertIcon,
  AlertDescription,
} from '@chakra-ui/react';
import { Field, Form, Formik } from 'formik';
import { useGetUserByInfoMutation } from '../api/user-slice';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { changeUser } from '../slice/user-slice';
import { useNavigate } from 'react-router-dom';
import { emailReg } from '../utils/string-utils';

export default function SignInPage() {
  const [logIn, { isLoading }] = useGetUserByInfoMutation();
  const [alertError, setAlertError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <Flex minH={'100vh'} align={'center'} justify={'center'}>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'}>Sign in to your account</Heading>
        </Stack>
        <Formik
          initialValues={{ email: '', password: '' }}
          onSubmit={async (values) => {
            const email = values.email;
            const password = values.password;
            logIn({ email, password })
              .unwrap()
              .then((user) => {
                dispatch(changeUser(user));
                navigate('/');
              })
              .catch((error) => {
                setAlertError(error.data.message);
              });
          }}
        >
          {() => (
            <Form>
              {alertError && (
                <Alert status='error'>
                  <AlertIcon />
                  <AlertDescription>{alertError}</AlertDescription>
                </Alert>
              )}
              <Box rounded={'lg'} boxShadow={'lg'} p={8}>
                <Stack spacing={4}>
                  <Field
                    name='email'
                    validate={(value: string) => {
                      let error;
                      if (!value) {
                        error = 'Email is required';
                      } else if (!value.match(emailReg)) {
                        error = 'Enter a valid email address';
                      }
                      return error;
                    }}
                  >
                    {({ field, form }: any) => (
                      <FormControl
                        isInvalid={form.errors.email && form.touched.email}
                        isRequired
                      >
                        <FormLabel>Email address</FormLabel>
                        <Input {...field} />
                        <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Field
                    name='password'
                    validate={(value: string) => {
                      let error;
                      if (!value) {
                        error = 'Password is required';
                      }
                      return error;
                    }}
                  >
                    {({ field, form }: any) => (
                      <FormControl
                        isInvalid={
                          form.errors.password && form.touched.password
                        }
                        isRequired
                      >
                        <FormLabel>Password</FormLabel>
                        <Input type='password' {...field} />
                        <FormErrorMessage>
                          {form.errors.password}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Stack spacing={10}>
                    <Stack
                      direction={{ base: 'column', sm: 'row' }}
                      align={'start'}
                      justify={'space-between'}
                    >
                      <Checkbox>Remember me</Checkbox>
                      <Text color={'blue.400'}>Forgot password?</Text>
                    </Stack>
                    <Button
                      bg={'black'}
                      color={'white'}
                      _hover={{
                        bg: 'grey',
                      }}
                      type='submit'
                      isLoading={isLoading}
                    >
                      Sign in
                    </Button>
                  </Stack>
                </Stack>
              </Box>
            </Form>
          )}
        </Formik>
      </Stack>
    </Flex>
  );
}
