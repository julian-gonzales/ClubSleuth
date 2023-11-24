import {
  Box,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  Spacer,
  Text,
} from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { changeWordsToUpperCase } from '../utils/string-utils';
import { useGetClubsQuery } from '../api/club-slice';
import { Club } from '../domain/club';
import { SearchIcon } from '@chakra-ui/icons';
import ClubDetails from '../features/search-page/club-details';
import { useMemo, useState } from 'react';
import { FiInbox } from 'react-icons/fi';
import Header from '../features/common/header';

type Params = {
  province: string;
  city: string;
};

const SearchPage = () => {
  const { province, city } = useParams<keyof Params>() as Params;
  const [str, setFilter] = useState(' ');
  const { data: dbClubs, isLoading: loading } = useGetClubsQuery({
    province,
    city,
  });
  let clubs = dbClubs;
  clubs = useMemo(() => {
    const re = RegExp(`.*${str.toLowerCase().split('').join('.*')}.*`);
    if (str.length > 3) {
      return clubs?.filter((club: any) => club.name.toLowerCase().match(re));
    } else {
      return dbClubs;
    }
  }, [clubs, dbClubs, str]);
  const handleChange = (event: any) => {
    setFilter(event.target.value);
  };

  return (
    <>
      <Header city={`${changeWordsToUpperCase(city)}`}></Header>
      <Flex
        verticalAlign={'middle'}
        w={'60%'}
        m={'auto'}
        mt={20}
        visibility={
          clubs !== undefined && clubs.length > 0 ? 'visible' : 'hidden'
        }
      >
        <InputGroup>
          <InputLeftElement pointerEvents={'none'}>
            <SearchIcon />
          </InputLeftElement>
          <Input
            borderRadius={25}
            border={1}
            borderStyle={'solid'}
            backgroundColor={'white'}
            width={'fit-content'}
            placeholder='Search by name'
            w={'400px'}
            mb={3}
            onChange={(e) => {
              handleChange(e);
            }}
          />
        </InputGroup>
        <Spacer />
        {/* <Button
          bgColor={'white'}
          fontSize={'24px'}
          fontWeight={'medium'}
          textAlign={'center'}
        >
          Sort By <ChevronDownIcon ml={3} />
        </Button> */}
      </Flex>
      <Box height={'74vh'} w={{base: '100%', lg: '60%'}} m={'auto'} overflow={'auto'}>
        <Box>
          {!loading && clubs !== undefined && clubs.length > 0 ? (
            clubs.map((club: Club) => (
              <ClubDetails key={club._id} club={club} />
            ))
          ) : (
            <Box justifyContent={'center'} mt={'28'} textAlign={'center'}>
              <FiInbox style={{ margin: 'auto' }} size={'80px'} />
              <Text mt={5} fontSize={'20px'}>
                No clubs found in this area
              </Text>
            </Box>
          )}
        </Box>
      </Box>
    </>
  );
};

export default SearchPage;
