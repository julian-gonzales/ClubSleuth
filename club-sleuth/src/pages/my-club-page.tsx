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
  Hide,
  Modal,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
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
import { FiInbox } from 'react-icons/fi';

const UserClubs = () => {
  const user: User = useSelector((state: RootState) => state.user.value);
  const { data: clubs, isFetching } = useGetUserClubsQuery({ id: user._id });
  const defaultClub: Club = {
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
    website: '',
  };
  const [deleteClub] = useDeleteClubMutation();
  const [clubToEdit, setClubToEdit] = useState<Club>(defaultClub);
  const [update, setUpdate] = useState(true);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: confirmationIsOpen,
    onOpen: confirmationOnOpen,
    onClose: confirmationOnClose,
  } = useDisclosure();

  const handleClubInfoClick = (club: Club) => {
    setClubToEdit(club);
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
          <Button
            colorScheme='green'
            size={'sm'}
            onClick={() => {
              setUpdate(false);
              handleClubInfoClick(defaultClub);
            }}
          >
            <AddIcon />
          </Button>
        </Box>
        <Card maxH={'100%'} w={{base: '95%', md: '80%'}} shadow={'2xl'} m={'auto'} mb={10}>
          <CardHeader textAlign={'center'}>
            <Heading size={'lg'}>CURRENT CLUBS</Heading>
          </CardHeader>
          <CardBody>
            <TableContainer>
              <Table variant='simple' size={'md'}>
                <Thead>
                  <Tr>
                    <Th fontWeight={'900'}>Name</Th>
                    <Hide below='md'>
                      <Th fontWeight={'900'}>Province</Th>
                      <Th fontWeight={'900'}>City</Th>
                      <Th fontWeight={'900'}>Members</Th>
                      <Th fontWeight={'900'}>Commitment</Th>
                      <Th fontWeight={'900'}>Active</Th>
                    </Hide>
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
                          <Hide below='md'>
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
                          </Hide>
                          <Td>
                            <Button
                              leftIcon={<EditIcon />}
                              size={'sm'}
                              onClick={() => {
                                setUpdate(true);
                                handleClubInfoClick(club);
                              }}
                            >
                              <Hide below='md'>
                                <Box>Edit</Box>
                              </Hide>
                            </Button>
                            <Button
                              ml={5}
                              colorScheme='red'
                              size={'sm'}
                              onClick={() => {
                                confirmationOnOpen();
                              }}
                            >
                              <Modal
                                isOpen={confirmationIsOpen}
                                onClose={confirmationOnClose}
                                isCentered
                                size={'xs'}
                              >
                                <ModalContent>
                                  <ModalHeader textAlign={'center'}>
                                    Are you sure?
                                  </ModalHeader>
                                  <ModalFooter>
                                    <Button
                                      variant='ghost'
                                      onClick={confirmationOnClose}
                                    >
                                      Close
                                    </Button>
                                    <Button
                                      bg={'black'}
                                      color={'white'}
                                      _hover={{
                                        bg: 'grey',
                                      }}
                                      ml={3}
                                      type='submit'
                                      onClick={() => {
                                        confirmationOnClose();
                                        deleteClub({ id: club._id })
                                          .then((result) => {
                                            console.log(result);
                                          })
                                          .catch((error) => console.log(error));
                                      }}
                                    >
                                      Delete
                                    </Button>
                                  </ModalFooter>
                                </ModalContent>
                              </Modal>
                              <DeleteIcon />
                            </Button>
                          </Td>
                        </Tr>
                      </>
                    ))}
                </Tbody>
              </Table>
              {user.clubs.length <= 0 && !isFetching && (
                <Box
                  justifyContent={'center'}
                  mt={'28'}
                  w={'100%'}
                  textAlign={'center'}
                >
                  <FiInbox style={{ margin: 'auto' }} size={'80px'} />
                  <Text mt={5} fontSize={'20px'}>
                    Create a club!
                  </Text>
                </Box>
              )}
            </TableContainer>
          </CardBody>
        </Card>
      </Box>
    </>
  );
};

export default UserClubs;
