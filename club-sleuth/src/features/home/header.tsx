import { Box, Flex, Button, Stack, useColorModeValue } from '@chakra-ui/react';
import BackgroundImage from '../../assets/background-image-flipped.jpg';
import { AiFillFacebook, AiFillInstagram } from 'react-icons/ai';
import { RiTwitterXFill } from 'react-icons/ri';
import { Link } from 'react-router-dom';

export default function WithSubnavigation() {
  // const { isOpen, onToggle } = useDisclosure();

  return (
    <Box>
      <Flex
        bg={useColorModeValue('black', 'black.800')}
        color={useColorModeValue('black.600', 'white')}
        minH={'60px'}
        py={{ base: 2 }}
        px={{ base: 4 }}
        backgroundImage={BackgroundImage}
        align={'center'}
        height={'150px'}
      >
        <Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'start' }}>
          <Stack
            direction={'row'}
            spacing={{ base: 'none', md: 5 }}
            ml={{ base: 'none', md: 10 }}
          >
            <AiFillFacebook size={'40px'} color='black'></AiFillFacebook>
            <AiFillInstagram size={'40px'} color='black'></AiFillInstagram>
            <RiTwitterXFill size={'40px'} color='black'></RiTwitterXFill>
          </Stack>
          <Flex display={{ base: 'none', md: 'flex' }} ml={10}></Flex>
        </Flex>

        <Stack
          flex={{ base: 1, md: 0 }}
          justify={'flex-end'}
          direction={'row'}
          spacing={6}
          color={'white'}
        >
          <Link to={'/sign-in'}>
            <Button
              as={'a'}
              fontSize={'lg'}
              fontWeight={700}
              background={'transparent'}
              href={'#'}
              color={'black'}
              _hover={{
                bg: 'transparent',
              }}
            >
              Sign In
            </Button>
          </Link>
          <Link to={'/sign-up'}>
            <Button
              as={'a'}
              display={{ base: 'none', md: 'inline-flex' }}
              fontSize={'lg'}
              fontWeight={600}
              href={'#'}
              _hover={{
                bg: 'blackAlpha',
              }}
              color={'white'}
              backgroundColor={'black'}
            >
              Sign Up
            </Button>
          </Link>
        </Stack>
      </Flex>
    </Box>
  );
}
