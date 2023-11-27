import { useParams } from 'react-router-dom';
import Header from '../features/common/header';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { changeWordsToUpperCase } from '../utils/string-utils';
import { useGetSingleClubQueryQuery } from '../api/club-slice';
import { Box, Heading, Stack, Text } from '@chakra-ui/react';
import ClubBadges from '../features/common/club-badges';
import { FutureEvents, ReoccuringEvents } from '../domain/club';
import CurrentEvents from '../features/club-page/current-events';
import FutureEventsBox from '../features/club-page/future-events';
import { ExternalLinkIcon } from '@chakra-ui/icons';

const ClubPage = () => {
  const { id } = useParams();
  const city = useSelector((state: RootState) => state.city.value);
  const { data: club, isLoading: loading } = useGetSingleClubQueryQuery({ id });
  console.log(club);
  return (
    <>
      <Header city={changeWordsToUpperCase(city)}></Header>
      {!loading && club && (
        <Box
          w={{ base: '95%', lg: '60%' }}
          m={'auto'}
          mt={{ base: 5, md: 20, lg: 20 }}
        >
          <Heading fontSize={'6xl'}>{club.name}</Heading>
          <ClubBadges club={club} />
          <Box mb={3}>
            <a
              target='_blank'
              rel='noopener noreferrer'
              href={`${club.website}`}
            >
              <Text fontSize={'18px'} fontWeight={'500'} color={'grey'}>
                <ExternalLinkIcon /> {club.website}
              </Text>
            </a>
          </Box>
          <Box mb={10}>
            <Text fontSize={'24px'} fontWeight={'medium'}>
              {club.description}
            </Text>
          </Box>
          {club.reoccuringEvents !== undefined &&
            club.reoccuringEvents.length > 0 && (
              <Box>
                <Text
                  fontSize={'26px'}
                  fontWeight={'semibold'}
                  textAlign={{ base: 'center', md: 'left', lg: 'left' }}
                >
                  REGULAR PROGRAMS
                </Text>
                <Stack
                  direction={{ base: 'column', md: 'row', lg: 'row' }}
                  mt={3}
                  alignItems={{ base: 'center', md: 'left', lg: 'left' }}
                >
                  {club.reoccuringEvents.map((event: ReoccuringEvents) => (
                    <CurrentEvents event={event} />
                  ))}
                </Stack>
              </Box>
            )}
          {club.futureEvents !== undefined && club.futureEvents.length > 0 && (
            <Box mt={10} mb={5}>
              <Text
                fontSize={'26px'}
                fontWeight={'semibold'}
                textAlign={{ base: 'center', md: 'left', lg: 'left' }}
              >
                FUTURE ACTIVITIES
              </Text>
              <Stack
                direction={{ base: 'column', md: 'row', lg: 'row' }}
                mt={3}
                alignItems={{ base: 'center', md: 'left', lg: 'left' }}
              >
                {club.futureEvents.map((event: FutureEvents) => (
                  <FutureEventsBox event={event} />
                ))}
              </Stack>
            </Box>
          )}
        </Box>
      )}
    </>
  );
};

export default ClubPage;
