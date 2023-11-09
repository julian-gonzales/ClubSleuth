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
import { useDeleteClubMutation, useGetUserClubsQuery } from '../api/club-slice';
import { AddIcon, DeleteIcon, EditIcon } from '@chakra-ui/icons';
import EditClubModal from '../features/my-club-page/edit-club-modal';
import { useState } from 'react';

const UserClubs = () => {
  const user: User = useSelector((state: RootState) => state.user.value);
  const { data: clubs, isFetching } = useGetUserClubsQuery({ id: user._id });
  const [deleteClub] = useDeleteClubMutation();
  const [clubToEdit, setClubToEdit] = useState<Club>();
  const [update, setUpdate] = useState(true);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleClubInfoClick = (club: Club) => {
    setClubToEdit(club);
    setUpdate(true);
    onOpen();
  };

  const handleAddClubClick = () => {
    const club: Club = {
      name: '',
      members: '0-10',
      description: '',
      province: 'SK',
      city: '',
      country: '',
      reoccuringEvents: [],
      futureEvents: [],
      active: false,
      participation: 'Casual',
      user: user._id,
    };
    setClubToEdit(club);
    setUpdate(false);
    onOpen();
  };

  return (
    <>
      {clubToEdit && (
        <>
          <EditClubModal
            isOpen={isOpen}
            onClose={onClose}
            club={clubToEdit}
            user={user}
            update={update}
          />
        </>
      )}
      <Header city='' searching={false}></Header>
      <Box w={'100%'} overflow={'auto'} m={'auto'} mt={20} bg={'transparent'}>
        <Box textAlign={'end'} w={'80%'} m={'auto'} mb={3}>
          <Button colorScheme='green' size={'sm'}>
            <AddIcon
              onClick={() => {
                handleAddClubClick();
              }}
            />
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
                                handleClubInfoClick(club);
                              }}
                            >
                              Edit
                            </Button>
                            <Button
                              ml={5}
                              colorScheme='red'
                              size={'sm'}
                              onClick={() => {
                                deleteClub({ id: club._id })
                                  .then((result) => {
                                    console.log(result);
                                  })
                                  .catch((error) => console.log(error));
                              }}
                            >
                              <DeleteIcon />
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
