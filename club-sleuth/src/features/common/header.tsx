import {
  Box,
  Flex,
  Avatar,
  Text,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useColorModeValue,
  Stack,
  Center,
} from "@chakra-ui/react";
import Logo from "./logo";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { Link, useNavigate } from "react-router-dom";
import { changeUser } from "../../slice/user-slice";

interface HeaderProps {
  city: string;
  searching?: boolean;
}

export default function Header({ city, searching }: HeaderProps) {
  const user = useSelector((state: RootState) => state.user.value);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <>
      <Box bg={useColorModeValue("black", "black.800")} minH={"100px"} px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <Box mt={"auto"}>
            <Stack direction={"row"}>
              <Logo></Logo>
              {searching && city !== "" ? (
                <Text color={"white"} mt="auto" mb="auto">
                  <Stack direction="row">
                    <Text fontWeight={"medium"}>Searching.... at</Text>
                    <Text fontWeight={"bold"}>{city}</Text>
                  </Stack>
                </Text>
              ) : (
                <Text
                  color={"white"}
                  mt={"auto"}
                  mb={"auto"}
                  fontWeight={"medium"}
                >
                  Search for clubs
                </Text>
              )}
            </Stack>
          </Box>

          <Flex alignItems={"center"} mt={"auto"}>
            <Stack direction={"row"} spacing={7}>
              {/* <Button onClick={toggleColorMode}>
                {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
              </Button> */}
              {user._id !== "" ? (
                <Menu>
                  <MenuButton
                    as={Button}
                    rounded={"full"}
                    variant={"link"}
                    cursor={"pointer"}
                    minW={0}
                  >
                    <Avatar
                      size={"sm"}
                      src={"https://avatars.dicebear.com/api/male/username.svg"}
                    />
                  </MenuButton>
                  <MenuList alignItems={"center"}>
                    <br />
                    <Center>
                      <Avatar
                        size={"2xl"}
                        src={
                          "https://avatars.dicebear.com/api/male/username.svg"
                        }
                      />
                    </Center>
                    <br />
                    <Center>
                      <p>Username</p>
                    </Center>
                    <br />
                    <MenuDivider />
                    <Link to="/user-clubs">
                      <MenuItem>Your Clubs</MenuItem>
                    </Link>
                    <MenuItem>Account Settings</MenuItem>
                    <MenuItem
                      onClick={() => {
                        dispatch(
                          changeUser({
                            _id: "",
                            activated: false,
                            clubs: [],
                            email: "",
                            firstName: "",
                            lastName: "",
                          })
                        );
                        navigate('/sign-in')
                      }}
                    >
                      Logout
                    </MenuItem>
                  </MenuList>
                </Menu>
              ) : (
                <>
                  <Link to={"/sign-in"}>
                    <Button
                      as={"a"}
                      fontSize={"lg"}
                      fontWeight={600}
                      variant={"link"}
                      color={"white"}
                      _hover={{
                        bg: "blackAlpha",
                      }}
                    >
                      Sign In
                    </Button>
                  </Link>
                  <Link to={"/sign-up"}>
                    <Button
                      as={"a"}
                      display={{ base: "none", md: "inline-flex" }}
                      fontSize={"lg"}
                      fontWeight={600}
                      _hover={{
                        bg: "blackAlpha",
                      }}
                      color={"white"}
                      backgroundColor={"black"}
                      borderStyle={"solid"}
                      borderColor={"white"}
                      border={"2px"}
                    >
                      Sign Up
                    </Button>
                  </Link>
                </>
              )}
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  );
}
