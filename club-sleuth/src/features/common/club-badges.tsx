import { Badge, Box, Stack, Text } from '@chakra-ui/react';
import { BsFillPeopleFill } from 'react-icons/bs';
import { Club } from '../../domain/club';
import { PiHandshakeFill } from 'react-icons/pi';

interface ClubDetailsProps {
  club: Club;
}

const ClubBadges = ({ club }: ClubDetailsProps) => {
  return (
    <Stack direction={'row'} verticalAlign={'middle'} mt={3} mb={3}>
      <Box mt={'auto'} mb={'auto'}>
        <Stack direction={'row'}>
          <BsFillPeopleFill size={'30px'} />
          <Text mt={'auto'} mb={'auto'} fontSize={'20px'} fontWeight={'medium'}>
            {club.members}
          </Text>
        </Stack>
      </Box>
      <Box ml={3}>
        <Stack direction={'row'}>
          <PiHandshakeFill size={'30px'} />
          <Text mt={'auto'} mb={'auto'} fontSize={'20px'} fontWeight={'medium'}>
            {club.participation}
          </Text>
        </Stack>
      </Box>
      <Badge
        colorScheme={club.active? 'green' : 'gray'}
        h={'fit-content'}
        fontSize={'16px'}
        fontWeight={'bold'}
        ml={3}
        borderRadius={5}
        mt={'auto'}
        mb={'auto'}
      >
        {club.active ? 'Active' : 'inactive'}
      </Badge>
    </Stack>
  );
};

export default ClubBadges;
