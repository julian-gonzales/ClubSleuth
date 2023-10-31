import {
  Badge,
  Box,
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spacer,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { FutureEvents } from '../../domain/club';
import { dateToString } from '../../utils/string-utils';

type FutureEventsProp = {
  event: FutureEvents;
};

const FutureEventsBox = ({ event }: FutureEventsProp) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size={'lg'}>
        <ModalOverlay>
          <ModalContent>
            <ModalHeader textAlign={'center'}>{event.title}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Text>
                Date: {dateToString(event.date)} {event.time}
              </Text>
              <Text>Location: {event.location}</Text>
              <Text mt={5}>{event.description}</Text>
            </ModalBody>
            <ModalFooter>
              <Button onClick={onClose}>Close</Button>
            </ModalFooter>
          </ModalContent>
        </ModalOverlay>
      </Modal>
      <Box
        w={'325px'}
        h={'200px'}
        borderRadius={15}
        boxShadow={'lg'}
        bg={'rgba(0, 141, 172, 0.19)'}
        onClick={onOpen}
      >
        <Flex>
          <Spacer />
          <Box textAlign={'end'} mr={3}>
            <Badge bg='rgba(0, 141, 172, 0.5)' borderRadius={5}>
              {event.memberOnly ? 'Member Only' : 'Anyone'}
            </Badge>
          </Box>
        </Flex>
        <Text fontSize={'20px'} textAlign={'center'} fontWeight={'medium'}>
          {event.title}
        </Text>
        <Box
          w={'80%'}
          m={'auto'}
          fontSize={'16px'}
          fontWeight={'medium'}
          mt={5}
        >
          <Text>
            Date: {dateToString(event.date)} {event.time}
          </Text>
          <Text mt={5}>
            Location:{' '}
            {event.memberOnly ? 'Censored for members' : event.location}
          </Text>
          <Text fontSize={'10px'} color={'#6C6B6B'} textAlign={'center'} mt={3}>
            Click for more info
          </Text>
        </Box>
      </Box>
    </>
  );
};

export default FutureEventsBox;
