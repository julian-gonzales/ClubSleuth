import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { User } from '../domain/user';
import {
  Badge,
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Heading,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from '@chakra-ui/react';
import Header from '../features/common/header';
import { Club } from '../domain/club';
import { useGetUserClubsQuery } from '../api/club-slice';
import { AddIcon, EditIcon } from '@chakra-ui/icons';
import EditClubModal from '../features/my-club-page/edit-club-modal';
import { useState } from 'react';

const UserClubs = () => {
  const user: User = useSelector((state: RootState) => state.user.value);
  const { data: clubs, isFetching } = useGetUserClubsQuery({ id: user._id });
  const [clubToEdit, setClubToEdit] = useState<Club>();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleClick = (club: Club) => {
    setClubToEdit(club);
    onOpen();
  };
  return (
    <>
      {clubToEdit && (
        <EditClubModal isOpen={isOpen} onClose={onClose} club={clubToEdit} />
      )}
      <Header city='' searching={false}></Header>
      <Box w={'100%'} overflow={'auto'} m={'auto'} mt={20} bg={'transparent'}>
        <Box textAlign={'end'} w={'80%'} m={'auto'} mb={3}>
          <Button colorScheme='green' size={'sm'}>
            <AddIcon />
          </Button>
        </Box>
        <Card maxH={'100%'} w={'80%'} shadow={'2xl'} m={'auto'} mb={10}>
          <CardHeader textAlign={'center'}>
            <Heading size={'lg'}>CURRENT CLUBS</Heading>
          </CardHeader>
          <CardBody>
            <TableContainer>
              <Table variant='simple' size={'md'}>
                <Thead>
                  <Tr>
                    <Th fontWeight={'900'}>Name</Th>
                    <Th fontWeight={'900'}>Province</Th>
                    <Th fontWeight={'900'}>City</Th>
                    <Th fontWeight={'900'}>Members</Th>
                    <Th fontWeight={'900'}>Commitment</Th>
                    <Th fontWeight={'900'}>Active</Th>
                    <Th fontWeight={'900'}></Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {user.clubs.length > 0 &&
                    !isFetching &&
                    clubs?.map((club: Club) => (
                      <>
                        <Tr key={club._id}>
                          <Td>{club.name}</Td>
                          <Td>{club.province}</Td>
                          <Td>{club.city}</Td>
                          <Td>{club.members}</Td>
                          <Td>{club.participation}</Td>
                          <Td>
                            {' '}
                            <Badge
                              colorScheme={club.active ? 'green' : 'gray'}
                              h={'fit-content'}
                              fontWeight={'bold'}
                              borderRadius={5}
                              mt={'auto'}
                              mb={'auto'}
                            >
                              {club.active ? 'Active' : 'inactive'}
                            </Badge>
                          </Td>
                          <Td>
                            <Button
                              leftIcon={<EditIcon />}
                              size={'sm'}
                              onClick={() => {
                                handleClick(club);
                              }}
                            >
                              Edit
                            </Button>
                          </Td>
                        </Tr>
                      </>
                    ))}
                </Tbody>
              </Table>
            </TableContainer>
          </CardBody>
        </Card>
      </Box>
    </>
  );
};

export default UserClubs;
