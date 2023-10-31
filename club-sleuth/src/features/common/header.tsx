import {
  Box,
  Flex,
  IconButton,
  Button,
  Stack,
  useColorModeValue,
  useDisclosure,
  Text,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import Logo from './logo';

interface HeaderProps {
  city: string;
}

export default function Header({ city }: HeaderProps) {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Box>
      <Flex
        bg={useColorModeValue('black', 'black.800')}
        color={useColorModeValue('black.600', 'white')}
        minH={'60px'}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={'solid'}
        borderColor={useColorModeValue('gray.200', 'gray.900')}
        align={'center'}
      >
        <Flex
          flex={{ base: 1, md: 'auto' }}
          ml={{ base: -2 }}
          display={{ base: 'flex', md: 'none' }}
        >
          <IconButton
            onClick={onToggle}
            icon={
              isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
            }
            variant={'ghost'}
            aria-label={'Toggle Navigation'}
          />
        </Flex>
        <Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'start' }}>
          <Logo></Logo>
          <Text color={'white'} mt='auto' mb='auto'>
            <Stack direction='row'>
              <Text fontWeight={'medium'}>Searching.... at</Text>
              <Text fontWeight={'bold'}>{city}</Text>
            </Stack>
          </Text>

          <Flex display={{ base: 'none', md: 'flex' }} ml={10}>
            {/* TODO: Add Search city */}
            {/* <DesktopNav /> */}
          </Flex>
        </Flex>

        <Stack
          flex={{ base: 1, md: 0 }}
          justify={'flex-end'}
          direction={'row'}
          spacing={6}
          color={'white'}
        >
          <Button
            as={'a'}
            fontSize={'lg'}
            fontWeight={600}
            variant={'link'}
            href={'#'}
            color={'white'}
          >
            Sign In
          </Button>
          <Button
            as={'a'}
            display={{ base: 'none', md: 'inline-flex' }}
            fontSize={'lg'}
            fontWeight={600}
            href={'#'}
            _hover={{
              bg: 'white.300',
            }}
            colorScheme='white'
            variant={'outline'}
          >
            Sign Up
          </Button>
        </Stack>
      </Flex>

      {/* <Collapse in={isOpen} animateOpacity>
        <MobileNav />
      </Collapse> */}
    </Box>
  );
}

// const DesktopNav = () => {
//   const linkColor = useColorModeValue('gray.600', 'gray.200');
//   const linkHoverColor = useColorModeValue('gray.800', 'white');
//   const popoverContentBgColor = useColorModeValue('white', 'gray.800');

//   return (
//     <Stack direction={'row'} spacing={4}>
//         <Box key={'say'}>
//           <Popover trigger={'hover'} placement={'bottom-start'}>
//             <PopoverTrigger>
//               <Box
//                 as='a'
//                 p={2}
//                 href={'#'}
//                 fontSize={'sm'}
//                 fontWeight={500}
//                 color={linkColor}
//                 _hover={{
//                   textDecoration: 'none',
//                   color: linkHoverColor,
//                 }}
//               >
//                 asd
//               </Box>
//             </PopoverTrigger>
//           </Popover>
//         </Box>
//     </Stack>
//   );
// };
