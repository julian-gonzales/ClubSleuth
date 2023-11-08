import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from '@chakra-ui/react';
import { Club } from '../../domain/club';
import { Formik } from 'formik';

type Params = {
  isOpen: any;
  onClose: any;
  club: Club;
};

const EditClubModal = ({ isOpen, onClose, club }: Params) => {
  console.log(club);
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <ModalHeader textAlign={'center'}>{club.name}</ModalHeader>
        <ModalBody>
          <Formik
            initialValues={{
              name: club.name,
              description: club.description,
              active: club.active,
              members: club.members,
              participation: club.participation,
              city: club.city,
              province: club.province,
              reoccuringEvents: club.reoccuringEvents,
              futureEvents: club.futureEvents,
            }}
            onSubmit={() => {}}
          ></Formik>
        </ModalBody>
        <ModalFooter>
          <Button variant='ghost' onClick={onClose}>
            Close
          </Button>
          <Button colorScheme='blue' mr={3}>
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EditClubModal;
