import Header from '../features/home/header';
import {
  Box,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  Stack,
  Text,
} from '@chakra-ui/react';
import SecondRowImage from '../assets/homepage-stock.png';
import BackgroundImage from '../assets/background-image.jpg';
import { SearchIcon } from '@chakra-ui/icons';
import PROVINCES from '../domain/provinces';
import { Formik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { changeCity } from '../slice/city-slice';

const HomePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <>
      <Header></Header>
      <Stack direction={'column'} spacing={'none'}>
        <Box
          pos='relative'
          h='600px'
          _before={{
            content: '""',
            bgImage: SecondRowImage,
            bgSize: 'cover',
            pos: 'absolute',
            top: 0,
            right: 0,
            left: 0,
            bottom: 0,
            opacity: 1,
          }}
          textAlign={'center'}
        >
          <Text
            mt={'100px'}
            position={'relative'}
            fontWeight={350}
            fontSize={'36px'}
            color={'white'}
          >
            <Stack
              direction={{ base: 'column', md: 'row' }}
              justifyContent={'center'}
            >
              <Text>Enter your</Text>
              <Text fontWeight={600}>province</Text>
              <Text>and</Text>
              <Text fontWeight={600}>city</Text>
              <Text>to get started</Text>
            </Stack>
          </Text>
          <Formik
            initialValues={{ province: 'SK', city: '' }}
            onSubmit={(values) => {
              dispatch(changeCity(values.city));
              navigate(
                `/clubs/${values.province}/${values.city.toLowerCase()}`
              );
            }}
          >
            {({ handleChange, handleSubmit }) => (
              <form onSubmit={handleSubmit}>
                <Stack
                  direction={'row'}
                  justifyContent={'center'}
                  spacing={0}
                  mt={'100px'}
                >
                  <Select
                    borderRightRadius={0}
                    borderLeftRadius={15}
                    backgroundColor={'white'}
                    width={'fit-content'}
                    p={0}
                    isRequired={true}
                    onChange={handleChange}
                    defaultValue={'SK'}
                    name='province'
                  >
                    {Object.keys(PROVINCES).map((key) => (
                      <option value={key} key={key}>
                        {key}
                      </option>
                    ))}
                  </Select>
                  <Stack>
                    <InputGroup>
                      <InputLeftElement pointerEvents={'none'}>
                        <SearchIcon />
                      </InputLeftElement>
                      <Input
                        borderLeftRadius={0}
                        borderRightRadius={15}
                        isRequired={true}
                        backgroundColor={'white'}
                        width={'fit-content'}
                        placeholder='Enter your city'
                        w={'300px'}
                        onChange={handleChange}
                        name='city'
                      />
                    </InputGroup>
                  </Stack>
                </Stack>
              </form>
            )}
          </Formik>
        </Box>
        <Box
          pos='relative'
          h='400px'
          _before={{
            content: '""',
            bgImage: BackgroundImage,
            bgSize: 'cover',
            pos: 'absolute',
            top: 0,
            right: 0,
            left: 0,
            bottom: 0,
            opacity: 1,
          }}
          color={'black'}
          textAlign={'center'}
          justifyContent={'center'}
          alignItems={'center'}
        >
          <Text
            position={'relative'}
            m={'auto'}
            mt={{ base: 0, md: 20 }}
            w={{ base: 'none', md: '70%' }}
            fontWeight={600}
            fontSize={{ base: '20px', md: '28px' }}
          >
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum."
          </Text>
        </Box>
      </Stack>
    </>
  );
};

export default HomePage;
