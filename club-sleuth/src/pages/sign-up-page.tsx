import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  FormErrorMessage,
  Alert,
  AlertIcon,
  AlertDescription,
} from "@chakra-ui/react";
import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { Field, Form, Formik } from "formik";
import { emailReg } from "../utils/string-utils";
import { useCreateUserMutation } from "../api/user-slice";
import { Link, useNavigate } from "react-router-dom";

export default function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [signUp, { isLoading }] = useCreateUserMutation();
  const [alertError, setAlertError] = useState("");
  const navigate = useNavigate();

  return (
    <Flex minH={"100vh"} align={"center"} justify={"center"}>
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"} textAlign={"center"}>
            Sign up
          </Heading>
        </Stack>
        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            email: "",
            password: "",
          }}
          onSubmit={async (values) => {
            console.log("hit submit");
            const firstName = values.firstName;
            const lastName = values.lastName;
            const email = values.email;
            const password = values.password;
            signUp({ firstName, lastName, email, password })
              .unwrap()
              .then((data) => navigate("/sign-in"))
              .catch((error) => setAlertError(error.data.message));
          }}
        >
          {() => (
            <Form>
              {alertError && (
                <Alert status="error">
                  <AlertIcon />
                  <AlertDescription>{alertError}</AlertDescription>
                </Alert>
              )}
              <Box rounded={"lg"} bg={"white"} boxShadow={"lg"} p={8}>
                <Stack spacing={4}>
                  <HStack>
                    <Box>
                      <Field
                        name="firstName"
                        validate={(value: string) => {
                          let error;
                          if (!value) {
                            error = "First name is required";
                          }
                          return error;
                        }}
                      >
                        {({ field, form }: any) => (
                          <FormControl
                            id="firstName"
                            isRequired
                            isInvalid={
                              form.errors.firstName && form.touched.firstName
                            }
                          >
                            <FormLabel>First Name</FormLabel>
                            <Input type="text" {...field} />
                            <FormErrorMessage>
                              {form.errors.firstName}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                    </Box>
                    <Box>
                      <Field
                        name="lastName"
                        validate={(value: string) => {
                          let error;
                          if (!value) {
                            error = "First name is required";
                          }
                          return error;
                        }}
                      >
                        {({ field, form }: any) => (
                          <FormControl
                            id="lastName"
                            isRequired
                            isInvalid={
                              form.errors.lastName && form.touched.lastName
                            }
                          >
                            <FormLabel>Last Name</FormLabel>
                            <Input type="text" {...field} />
                            <FormErrorMessage>
                              {form.errors.lastName}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                    </Box>
                  </HStack>
                  <Field
                    name="email"
                    validate={(value: string) => {
                      let error;
                      if (!value) {
                        error = "Email is required";
                      } else if (!value.match(emailReg)) {
                        error = "Enter a valid email address";
                      }
                      return error;
                    }}
                  >
                    {({ field, form }: any) => (
                      <FormControl
                        id="email"
                        isRequired
                        isInvalid={form.errors.email && form.touched.email}
                      >
                        <FormLabel>Email address</FormLabel>
                        <Input type="email" {...field} />
                        <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Field
                    name="password"
                    validate={(value: string) => {
                      let error;
                      if (!value) {
                        error = "Password is required";
                      } else if (value.length <= 3) {
                        error = "Password length must be greater than 3";
                      }
                      return error;
                    }}
                  >
                    {({ field, form }: any) => (
                      <FormControl
                        id="password"
                        isRequired
                        isInvalid={
                          form.errors.password && form.touched.password
                        }
                      >
                        <FormLabel>Password</FormLabel>
                        <InputGroup>
                          <Input
                            type={showPassword ? "text" : "password"}
                            {...field}
                          />
                          <InputRightElement h={"full"}>
                            <Button
                              variant={"ghost"}
                              onClick={() =>
                                setShowPassword((showPassword) => !showPassword)
                              }
                            >
                              {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                            </Button>
                          </InputRightElement>
                        </InputGroup>
                        <FormErrorMessage>
                          {form.errors.password}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Stack spacing={10} pt={2}>
                    <Button
                      loadingText="Submitting"
                      size={"lg"}
                      bg={"black"}
                      color={"white"}
                      _hover={{
                        bg: "grey",
                      }}
                      type="submit"
                      isLoading={isLoading}
                    >
                      Sign up
                    </Button>
                  </Stack>
                  <Stack pt={6}>
                    <Text align={"center"}>
                      Already a user?{" "}
                      <Link to="/sign-in">
                        <Text color={"blue.400"}>Login</Text>
                      </Link>
                    </Text>
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
