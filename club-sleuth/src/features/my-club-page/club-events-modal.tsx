import {
  Accordion,
  AccordionItem,
  Button,
  Card,
  CardBody,
  CardHeader,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Text,
} from '@chakra-ui/react';
import { Club } from '../../domain/club';
import { Field, Formik } from 'formik';
import { Form } from 'react-router-dom';

type Params = {
  isOpen: any;
  onClose: any;
  club: Club;
};

const ClubEventsModal = ({ isOpen, onClose, club }: Params) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size={'4xl'}>
      <Formik
        initialValues={{
          name: club.name,
          reoccuringEvents: club.reoccuringEvents,
          futureEvents: club.futureEvents,
        }}
        onSubmit={async (values) => {}}
      >
        {({ values }) => (
          <Form>
            <ModalContent>
              <ModalHeader textAlign={'center'}>{club.name}</ModalHeader>
              <ModalBody>
                <Card>
                  <CardHeader>REGULAR ACTIVITIES</CardHeader>
                  <CardBody>
                    <Accordion>
                      {club.reoccuringEvents?.map((event) => (
                        <AccordionItem key={event.title}>
                          <Text>{event.title}</Text>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </CardBody>
                </Card>
                {/* // <Field name='name' validate={() => {}}>
                //   {({ field, form }: any) => (
                //     <FormControl
                //       isInvalid={form.errors.name && form.touched.name}
                //       isRequired
                //       w={'100%'}
                //     >
                //       <FormLabel>Name</FormLabel>
                //       <Input {...field} />
                //       <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                //     </FormControl>
                //   )}
                // </Field> */}
              </ModalBody>
              <ModalFooter>
                <Button variant='ghost' onClick={onClose}>
                  Close
                </Button>
                <Button colorScheme='blue' mr={3} type='submit'>
                  Save
                </Button>
              </ModalFooter>
            </ModalContent>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default ClubEventsModal;
