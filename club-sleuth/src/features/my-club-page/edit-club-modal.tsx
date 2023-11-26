import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Card,
  CardBody,
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
import { Club } from '../../domain/club';
import { Field, FieldArray, Form, Formik } from 'formik';
import PROVINCES from '../../domain/provinces';
import {
  useCreateUserClubMutation,
  useUpdateUserClubMutation,
} from '../../api/club-slice';
import { AddIcon, DeleteIcon } from '@chakra-ui/icons';
import { User } from '../../domain/user';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './date-css.css';

type Params = {
  isOpen: any;
  onClose: any;
  club: Club;
  user: User;
  update: boolean;
};

const EditClubModal = ({ isOpen, onClose, club, user, update }: Params) => {
  const [updateClub] = useUpdateUserClubMutation();
  const [createClub] = useCreateUserClubMutation();
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
            website: club.website,
          }}
          onSubmit={async (values) => {
            if (update) {
              updateClub({
                id: club._id,
                name: values.name,
                description: values.description,
                active: values.active,
                province: values.province,
                city: values.city,
                members: values.members,
                participation: values.participation,
                reoccuringEvents: values.reoccuringEvents,
                futureEvents: values.futureEvents,
                website: values.website,
              })
                .unwrap()
                .then(() => {
                  onClose();
                })
                .catch((error) => console.log(error));
            } else {
              createClub({
                user: user._id,
                name: values.name,
                description: values.description,
                active: values.active,
                province: values.province,
                city: values.city,
                members: values.members,
                participation: values.participation,
                reoccuringEvents: values.reoccuringEvents,
                futureEvents: values.futureEvents,
                website: values.website,
              })
                .unwrap()
                .then(() => {
                  onClose();
                })
                .catch((error) => console.log(error));
            }
          }}
        >
          {({ values, handleSubmit, isValid, setFieldValue }) => (
            <Form>
              <ModalContent>
                <ModalHeader textAlign={'center'}>
                  {update ? <>Edit</> : <>Add</>}
                </ModalHeader>
                <ModalBody>
                  <Stack direction={{ base: 'column', md: 'row', lg: 'row' }}>
                    <Field
                      name='name'
                      validate={(value: string) => {
                        let error;
                        if (!value) {
                          error = 'Name is required';
                        }
                        return error;
                      }}
                    >
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
                  <Field
                    name='description'
                    validate={(value: string) => {
                      let error;
                      if (!value) {
                        error = 'Description is required';
                      }
                      return error;
                    }}
                  >
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
                  <Stack
                    direction={{ base: 'column', md: 'row', lg: 'row' }}
                    mt={5}
                    
                  >
                    <Stack direction={'row'}>
                      <Field
                        name='province'
                        validate={(value: string) => {
                          let error;
                          if (!value) {
                            error = 'Province is required';
                          }
                          return error;
                        }}
                      >
                        {({ field, form }: any) => (
                          <FormControl
                            isInvalid={
                              form.errors.province && form.touched.province
                            }
                            isRequired
                            w={'fit-content'}
                          >
                            <FormLabel>Province</FormLabel>
                            <Select
                              backgroundColor={'white'}
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
                      <Field
                        name='city'
                        validate={(value: string) => {
                          let error;
                          if (!value) {
                            error = 'City is required';
                          }
                          return error;
                        }}
                      >
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
                    <Stack direction={'row'}>
                      <Field
                        name='members'
                        validate={(value: string) => {
                          let error;
                          if (!value) {
                            error = 'Number of members is required';
                          }
                          return error;
                        }}
                      >
                        {({ field, form }: any) => (
                          <FormControl
                            isInvalid={
                              form.errors.members && form.touched.members
                            }
                            w={'fit-content'}
                            isRequired
                          >
                            <FormLabel>Members</FormLabel>
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
                      <Field
                        name='participation'
                        validate={(value: string) => {
                          let error;
                          if (!value) {
                            error = 'Commitment level is required';
                          }
                          return error;
                        }}
                      >
                        {({ field, form }: any) => (
                          <FormControl
                            isInvalid={
                              form.errors.participation &&
                              form.touched.participation
                            }
                            w={'fit-content'}
                            isRequired
                          >
                            <FormLabel>Commitment level</FormLabel>
                            <Select
                              backgroundColor={'white'}
                              p={0}
                              isRequired={true}
                              {...field}
                            >
                              <option value={'Casual'} key={'casual'}>
                                Casual
                              </option>
                              <option
                                value={'Intermediate'}
                                key={'intermediate'}
                              >
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
                    <Field name='website'>
                      {({ field, form }: any) => (
                        <FormControl w={'-webkit-max-content'}>
                          <FormLabel>Website</FormLabel>
                          <Input {...field} />
                        </FormControl>
                      )}
                    </Field>
                  </Stack>
                  <Card mt={5}>
                    <CardBody>
                      <Accordion allowMultiple>
                        <FieldArray
                          name='reoccuringEvents'
                          render={(arrayHelpers) => (
                            <Box>
                              <Stack direction={'row'} mb={5}>
                                <Text
                                  fontWeight={600}
                                  fontSize={'20px'}
                                  w={'50%'}
                                >
                                  REGULAR PROGRAMS
                                </Text>
                                <Box textAlign={'end'} w={'100%'}>
                                  <Button
                                    colorScheme='green'
                                    size={'sm'}
                                    onClick={() => {
                                      arrayHelpers.push({
                                        title: '',
                                        when: '',
                                        description: '',
                                        date: '',
                                        time: '',
                                        location: '',
                                        memberOnly: false,
                                      });
                                    }}
                                  >
                                    <AddIcon />
                                  </Button>
                                </Box>
                              </Stack>
                              {values.reoccuringEvents &&
                                values.reoccuringEvents.length > 0 &&
                                values.reoccuringEvents.map((event, index) => (
                                  <AccordionItem>
                                    <h2>
                                      <AccordionButton>
                                        <Box
                                          as='span'
                                          flex='1'
                                          textAlign='left'
                                        >
                                          {event.title}
                                        </Box>
                                        <AccordionIcon />
                                      </AccordionButton>
                                    </h2>
                                    <AccordionPanel>
                                      <Box w={'100%'} textAlign={'end'}>
                                        <Button
                                          colorScheme='red'
                                          size={'sm'}
                                          onClick={() => {
                                            arrayHelpers.remove(index);
                                          }}
                                        >
                                          <DeleteIcon />
                                        </Button>
                                      </Box>
                                      <Stack
                                        direction={{
                                          base: 'column',
                                          md: 'row',
                                          lg: 'row',
                                        }}
                                      >
                                        <Field
                                          name={`reoccuringEvents[${index}].title`}
                                          validate={(value: string) => {
                                            let error;
                                            if (!value) {
                                              error = 'Title is required';
                                            }
                                            return error;
                                          }}
                                        >
                                          {({ field, form }: any) => (
                                            <FormControl isRequired w={'100%'}>
                                              <FormLabel>Title</FormLabel>
                                              <Input
                                                defaultValue={event.title}
                                                {...field}
                                              />
                                            </FormControl>
                                          )}
                                        </Field>
                                        <Field
                                          type='checkbox'
                                          name={`reoccuringEvents[${index}].memberOnly`}
                                          validate={() => {}}
                                        >
                                          {({ field, form }: any) => (
                                            <FormControl
                                              isRequired
                                              m={'auto'}
                                              textAlign={'center'}
                                            >
                                              <Checkbox
                                                defaultChecked={
                                                  event.memberOnly
                                                }
                                                {...field}
                                                colorScheme='green'
                                              >
                                                Member Only
                                              </Checkbox>
                                            </FormControl>
                                          )}
                                        </Field>
                                      </Stack>
                                      <Field
                                        name={`reoccuringEvents[${index}].description`}
                                        validate={(value: string) => {
                                          let error;
                                          if (!value) {
                                            error = 'Description is required';
                                          }
                                          return error;
                                        }}
                                      >
                                        {({ field, form }: any) => (
                                          <FormControl isRequired w={'100%'}>
                                            <FormLabel>Description</FormLabel>
                                            <Textarea
                                              defaultValue={event.description}
                                              {...field}
                                            />
                                          </FormControl>
                                        )}
                                      </Field>
                                      <Stack
                                        direction={{
                                          base: 'column',
                                          md: 'row',
                                          lg: 'row',
                                        }}
                                      >
                                        <Field
                                          name={`reoccuringEvents[${index}].location`}
                                          validate={(value: string) => {
                                            let error;
                                            if (!value) {
                                              error = 'Location is required';
                                            }
                                            return error;
                                          }}
                                        >
                                          {({ field, form }: any) => (
                                            <FormControl isRequired w={'100%'}>
                                              <FormLabel>Location</FormLabel>
                                              <Input
                                                defaultValue={event.location}
                                                {...field}
                                              />
                                            </FormControl>
                                          )}
                                        </Field>
                                        <Field
                                          name={`reoccuringEvents[${index}].time`}
                                          validate={(value: string) => {
                                            let error;
                                            if (!value) {
                                              error = 'Time is required';
                                            }
                                            return error;
                                          }}
                                        >
                                          {({ field, form }: any) => (
                                            <FormControl
                                              isRequired
                                              w={{
                                                base: '100%',
                                                md: '30%',
                                                lg: '30%',
                                              }}
                                            >
                                              <FormLabel>Time</FormLabel>
                                              <Input
                                                defaultValue={event.time}
                                                {...field}
                                              />
                                            </FormControl>
                                          )}
                                        </Field>
                                      </Stack>
                                      <Stack
                                        direction={{
                                          base: 'column',
                                          md: 'row',
                                          lg: 'row',
                                        }}
                                      >
                                        <Field
                                          name={`reoccuringEvents[${index}].when`}
                                          validate={(value: string) => {
                                            let error;
                                            if (!value) {
                                              error = 'When is required';
                                            }
                                            return error;
                                          }}
                                        >
                                          {({ field, form }: any) => (
                                            <FormControl isRequired w={'100%'}>
                                              <FormLabel>When</FormLabel>
                                              <Input
                                                defaultValue={event.when}
                                                {...field}
                                              />
                                            </FormControl>
                                          )}
                                        </Field>
                                        <Field
                                          name={`reoccuringEvents[${index}].date`}
                                          validate={(value: string) => {
                                            let error;
                                            if (!value) {
                                              error = 'Date is required';
                                            }
                                            return error;
                                          }}
                                        >
                                          {({ field, form }: any) => (
                                            <FormControl isRequired w={'100%'}>
                                              <FormLabel>Date</FormLabel>
                                              <Input
                                                defaultValue={event.date}
                                                {...field}
                                              />
                                            </FormControl>
                                          )}
                                        </Field>
                                      </Stack>
                                    </AccordionPanel>
                                  </AccordionItem>
                                ))}
                            </Box>
                          )}
                        />
                      </Accordion>
                      <Accordion allowMultiple mt={5}>
                        <FieldArray
                          name='futureEvents'
                          render={(arrayHelpers) => (
                            <Box>
                              <Stack direction={'row'} mb={5}>
                                <Text
                                  fontWeight={600}
                                  fontSize={'20px'}
                                  w={'50%'}
                                >
                                  FUTURE EVENTS
                                </Text>
                                <Box textAlign={'end'} w={'100%'}>
                                  <Button
                                    colorScheme='green'
                                    size={'sm'}
                                    onClick={() => {
                                      arrayHelpers.push({
                                        title: '',
                                        description: '',
                                        date: '',
                                        time: '',
                                        location: '',
                                        memberOnly: false,
                                      });
                                    }}
                                  >
                                    <AddIcon />
                                  </Button>
                                </Box>
                              </Stack>
                              {values.futureEvents &&
                                values.futureEvents.length > 0 &&
                                values.futureEvents.map((event, index) => (
                                  <AccordionItem>
                                    <h2>
                                      <AccordionButton>
                                        <Box
                                          as='span'
                                          flex='1'
                                          textAlign='left'
                                        >
                                          {event.title}
                                        </Box>
                                        <AccordionIcon />
                                      </AccordionButton>
                                    </h2>
                                    <AccordionPanel>
                                      <Box w={'100%'} textAlign={'end'}>
                                        <Button
                                          colorScheme='red'
                                          size={'sm'}
                                          onClick={() => {
                                            arrayHelpers.remove(index);
                                          }}
                                        >
                                          <DeleteIcon />
                                        </Button>
                                      </Box>
                                      <Stack
                                        direction={{
                                          base: 'column',
                                          md: 'row',
                                          lg: 'row',
                                        }}
                                      >
                                        <Field
                                          name={`futureEvents[${index}].title`}
                                          validate={(value: string) => {
                                            let error;
                                            if (!value) {
                                              error = 'Title is required';
                                            }
                                            return error;
                                          }}
                                        >
                                          {({ field, form }: any) => (
                                            <FormControl isRequired w={'100%'}>
                                              <FormLabel>Title</FormLabel>
                                              <Input
                                                defaultValue={event.title}
                                                {...field}
                                              />
                                            </FormControl>
                                          )}
                                        </Field>
                                        <Field
                                          type='checkbox'
                                          name={`futureEvents[${index}].memberOnly`}
                                          validate={() => {}}
                                        >
                                          {({ field, form }: any) => (
                                            <FormControl
                                              isRequired
                                              m={'auto'}
                                              textAlign={'center'}
                                            >
                                              <Checkbox
                                                defaultChecked={
                                                  event.memberOnly
                                                }
                                                {...field}
                                                colorScheme='green'
                                              >
                                                Member Only
                                              </Checkbox>
                                            </FormControl>
                                          )}
                                        </Field>
                                      </Stack>
                                      <Field
                                        name={`futureEvents[${index}].description`}
                                        validate={(value: string) => {
                                          let error;
                                          if (!value) {
                                            error = 'Description is required';
                                          }
                                          return error;
                                        }}
                                      >
                                        {({ field, form }: any) => (
                                          <FormControl isRequired w={'100%'}>
                                            <FormLabel>Description</FormLabel>
                                            <Textarea
                                              defaultValue={event.description}
                                              {...field}
                                            />
                                          </FormControl>
                                        )}
                                      </Field>
                                      <Field
                                        name={`futureEvents[${index}].location`}
                                        validate={(value: string) => {
                                          let error;
                                          if (!value) {
                                            error = 'Location is required';
                                          }
                                          return error;
                                        }}
                                      >
                                        {({ field, form }: any) => (
                                          <FormControl isRequired w={'100%'}>
                                            <FormLabel>Location</FormLabel>
                                            <Input
                                              defaultValue={event.location}
                                              {...field}
                                            />
                                          </FormControl>
                                        )}
                                      </Field>
                                      <Stack
                                        direction={{
                                          base: 'column',
                                          md: 'row',
                                          lg: 'row',
                                        }}
                                      >
                                        <Field
                                          name={`futureEvents[${index}].date`}
                                          validate={(value: string) => {
                                            let error;
                                            if (!value) {
                                              error = 'Date is required';
                                            }
                                            return error;
                                          }}
                                        >
                                          {({ field, form }: any) => (
                                            <FormControl isRequired w={'100%'}>
                                              <FormLabel>Date</FormLabel>
                                              <DatePicker
                                                wrapperClassName='datePickerCSS'
                                                selected={
                                                  (field.value &&
                                                    new Date(field.value)) ||
                                                  null
                                                }
                                                onChange={(val) => {
                                                  setFieldValue(
                                                    field.name,
                                                    val
                                                  );
                                                }}
                                              />
                                            </FormControl>
                                          )}
                                        </Field>
                                        <Field
                                          name={`futureEvents[${index}].time`}
                                          validate={(value: string) => {
                                            let error;
                                            if (!value) {
                                              error = 'Time is required';
                                            }
                                            return error;
                                          }}
                                        >
                                          {({ field, form }: any) => (
                                            <FormControl isRequired w={'100%'}>
                                              <FormLabel>Time</FormLabel>
                                              <Input
                                                defaultValue={event.time}
                                                {...field}
                                              />
                                            </FormControl>
                                          )}
                                        </Field>
                                      </Stack>
                                    </AccordionPanel>
                                  </AccordionItem>
                                ))}
                            </Box>
                          )}
                        />
                      </Accordion>
                    </CardBody>
                  </Card>
                </ModalBody>
                <ModalFooter>
                  <Button variant='ghost' onClick={onClose}>
                    Close
                  </Button>
                  <Button
                    bg={'black'}
                    color={'white'}
                    _hover={{
                      bg: 'grey',
                    }}
                    mr={3}
                    onClick={() => {
                      if (isValid) {
                        confirmationOnOpen();
                      }
                    }}
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
                      bg={'black'}
                      color={'white'}
                      _hover={{
                        bg: 'grey',
                      }}
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
