import {
  Box,
  Flex,
  Button,
  Stack,
  useColorModeValue,
  Menu,
  MenuButton,
  Avatar,
  MenuList,
  Center,
  MenuDivider,
  MenuItem,
} from "@chakra-ui/react";
import BackgroundImage from "../../assets/background-image-flipped.jpg";
import { AiFillFacebook, AiFillInstagram } from "react-icons/ai";
import { RiTwitterXFill } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { changeUser } from "../../slice/user-slice";

export default function WithSubnavigation() {
  // const { isOpen, onToggle } = useDisclosure();
  const user = useSelector((state: RootState) => state.user.value);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <Box>
      <Flex
        bg={useColorModeValue("black", "black.800")}
        color={useColorModeValue("black.600", "white")}
        minH={"60px"}
        py={{ base: 2 }}
        px={{ base: 4 }}
        backgroundImage={BackgroundImage}
        align={"center"}
        height={"150px"}
      >
        <Flex flex={{ base: 1 }} justify={{ base: "center", md: "start" }}>
          <Stack
            direction={"row"}
            spacing={{ base: "none", md: 5 }}
            ml={{ base: "none", md: 10 }}
          >
            <AiFillFacebook size={"40px"} color="black"></AiFillFacebook>
            <AiFillInstagram size={"40px"} color="black"></AiFillInstagram>
            <RiTwitterXFill size={"40px"} color="black"></RiTwitterXFill>
          </Stack>
          <Flex display={{ base: "none", md: "flex" }} ml={10}></Flex>
        </Flex>

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
                  src={"https://avatars.dicebear.com/api/male/username.svg"}
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
                  navigate("/sign-in");
                }}
              >
                Logout
              </MenuItem>
            </MenuList>
          </Menu>
        ) : (
          <Stack
            flex={{ base: 1, md: 0 }}
            justify={"flex-end"}
            direction={"row"}
            spacing={6}
            color={"white"}
          >
            <Link to={"/sign-in"}>
              <Button
                as={"a"}
                fontSize={"lg"}
                fontWeight={700}
                background={"transparent"}
                href={"#"}
                color={"black"}
                _hover={{
                  bg: "transparent",
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
                href={"#"}
                _hover={{
                  bg: "blackAlpha",
                }}
                color={"white"}
                backgroundColor={"black"}
              >
                Sign Up
              </Button>
            </Link>
          </Stack>
        )}
      </Flex>
    </Box>
  );
}
