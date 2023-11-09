import {
  Accordion,
  AccordionItem,
  Button,
  Card,
  CardBody,
  CardHeader,
  Checkbox,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  Stack,
  Text,
  Textarea,
  useDisclosure,
} from '@chakra-ui/react';
import { Club, ReoccuringEvents } from '../../domain/club';
import { Field, Form, Formik } from 'formik';
import PROVINCES from '../../domain/provinces';
import { useUpdateUserClubMutation } from '../../api/club-slice';

type Params = {
  isOpen: any;
  onClose: any;
  club: Club;
};

const EditClubModal = ({ isOpen, onClose, club }: Params) => {
  const [updateClub] = useUpdateUserClubMutation();
  const {
    isOpen: confirmationIsOpen,
    onOpen: confirmationOnOpen,
    onClose: confirmationOnClose,
  } = useDisclosure();
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size={'4xl'}>
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
          onSubmit={async (values) => {
            const id = club._id;
            const name = values.name;
            const description = values.description;
            const active = values.active;
            const members = values.members;
            const participation = values.participation;
            const city = values.city;
            const province = values.province;
            const reoccuringEvents = values.reoccuringEvents;
            const futureEvents = values.futureEvents;
            updateClub({
              id,
              name,
              active,
              description,
              province,
              city,
              members,
              participation,
            })
              .unwrap()
              .then(() => {
                onClose();
              })
              .catch((error) => console.log(error));
          }}
        >
          {({ values, handleSubmit }) => (
            <Form>
              <ModalContent>
                <ModalHeader textAlign={'center'}>Edit</ModalHeader>
                <ModalBody>
                  <Stack direction={'row'}>
                    <Field name='name' validate={() => {}}>
                      {({ field, form }: any) => (
                        <FormControl
                          isInvalid={form.errors.name && form.touched.name}
                          isRequired
                          w={'100%'}
                        >
                          <FormLabel>Name</FormLabel>
                          <Input {...field} />
                          <FormErrorMessage>
                            {form.errors.name}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                    <Field type='checkbox' name='active' validate={() => {}}>
                      {({ field, form }: any) => (
                        <FormControl
                          isInvalid={form.errors.active && form.touched.active}
                          isRequired
                          m={'auto'}
                          textAlign={'center'}
                        >
                          <Checkbox
                            defaultChecked={values.active}
                            {...field}
                            colorScheme='green'
                          >
                            Currently Active
                          </Checkbox>
                          <FormErrorMessage>
                            {form.errors.active}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                  </Stack>
                  <Field name='description' validate={() => {}}>
                    {({ field, form }: any) => (
                      <FormControl
                        isInvalid={
                          form.errors.description && form.touched.description
                        }
                        isRequired
                        mt={5}
                      >
                        <FormLabel>Description</FormLabel>
                        <Textarea height={'200px'} {...field} />
                        <FormErrorMessage>
                          {form.errors.description}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Stack direction={'row'} mt={5}>
                    <Field name='province' validate={() => {}}>
                      {({ field, form }: any) => (
                        <FormControl
                          isInvalid={
                            form.errors.province && form.touched.province
                          }
                          isRequired
                          w={'50%'}
                        >
                          <FormLabel>Province</FormLabel>
                          <Select
                            backgroundColor={'white'}
                            width={'fit-content'}
                            p={0}
                            isRequired={true}
                            {...field}
                          >
                            {Object.keys(PROVINCES).map((key) => (
                              <option value={key} key={key}>
                                {key}
                              </option>
                            ))}
                          </Select>
                          <FormErrorMessage>
                            {form.errors.province}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                    <Field name='city' validate={() => {}}>
                      {({ field, form }: any) => (
                        <FormControl
                          isInvalid={form.errors.city && form.touched.city}
                          isRequired
                          w={'250px'}
                        >
                          <FormLabel>City</FormLabel>
                          <Input {...field} />
                          <FormErrorMessage>
                            {form.errors.city}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                  </Stack>
                  <Stack direction={'row'} mt={5}>
                    <Field name='members' validate={() => {}}>
                      {({ field, form }: any) => (
                        <FormControl
                          isInvalid={
                            form.errors.members && form.touched.members
                          }
                          isRequired
                        >
                          <FormLabel>Number of members</FormLabel>
                          <Select
                            backgroundColor={'white'}
                            width={'fit-content'}
                            p={0}
                            isRequired={true}
                            {...field}
                          >
                            <option value={'0-10'} key={'0-10'}>
                              0-10
                            </option>
                            <option value={'10-20'} key={'10-20'}>
                              10-20
                            </option>
                            <option value={'20+'} key={'20+'}>
                              20+
                            </option>
                          </Select>
                          <FormErrorMessage>
                            {form.errors.members}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                    <Field name='participation' validate={() => {}}>
                      {({ field, form }: any) => (
                        <FormControl
                          isInvalid={
                            form.errors.participation &&
                            form.touched.participation
                          }
                          isRequired
                        >
                          <FormLabel>Commitment level</FormLabel>
                          <Select
                            backgroundColor={'white'}
                            width={'fit-content'}
                            p={0}
                            isRequired={true}
                            {...field}
                          >
                            <option value={'Casual'} key={'casual'}>
                              Casual
                            </option>
                            <option value={'Intermediate'} key={'intermediate'}>
                              Intermediate
                            </option>
                            <option value={'Priority'} key={'priority'}>
                              Priority
                            </option>
                          </Select>
                          <FormErrorMessage>
                            {form.errors.members}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                  </Stack>
                  <Card>
                    <CardHeader>REGULAR ACTIVITIES</CardHeader>
                    <CardBody>
                      <Accordion>
                        {values.reoccuringEvents?.map(
                          (event: ReoccuringEvents) => (
                            <AccordionItem key={event.title}>
                              <Text>{event.title}</Text>
                            </AccordionItem>
                          )
                        )}
                      </Accordion>
                    </CardBody>
                  </Card>
                </ModalBody>
                <ModalFooter>
                  <Button variant='ghost' onClick={onClose}>
                    Close
                  </Button>
                  <Button
                    colorScheme='blue'
                    mr={3}
                    onClick={() => confirmationOnOpen()}
                  >
                    Save
                  </Button>
                </ModalFooter>
              </ModalContent>
              <Modal
                isOpen={confirmationIsOpen}
                onClose={confirmationOnClose}
                isCentered
                size={'xs'}
              >
                <ModalContent>
                  <ModalHeader textAlign={'center'}>Are you sure?</ModalHeader>
                  <ModalFooter>
                    <Button variant='ghost' onClick={confirmationOnClose}>
                      Close
                    </Button>
                    <Button
                      colorScheme='blue'
                      ml={3}
                      type='submit'
                      onClick={() => {
                        confirmationOnClose();
                        handleSubmit();
                      }}
                    >
                      Save
                    </Button>
                  </ModalFooter>
                </ModalContent>
              </Modal>
            </Form>
          )}
        </Formik>
      </Modal>
    </>
  );
};

export default EditClubModal;
