import { Box, Text } from '@chakra-ui/react';
import { Club } from '../../domain/club';
import { truncate } from '../../utils/string-utils';
import { Link } from 'react-router-dom';
import ClubBadges from '../common/club-badges';

interface ClubDetailsProps {
  club: Club;
}

const ClubDetails = ({ club }: ClubDetailsProps) => {
  return (
    <Box
      key={club._id}
      borderTop={1}
      borderBottom={1}
      borderLeft={1}
      borderStyle={'solid'}
    >
      <Link to={`/clubs/${club._id}`}>
        <Box ml={5}>
          <Text fontSize={'36px'} fontWeight={'extrabold'}>
            {club.name}
          </Text>
          <ClubBadges club={club} />
          <Box mb={10}>
            <Text fontSize={'24px'} fontWeight={'medium'}>
              {truncate(club.description, 300)}
            </Text>
          </Box>
        </Box>
      </Link>
    </Box>
  );
};

export default ClubDetails;
