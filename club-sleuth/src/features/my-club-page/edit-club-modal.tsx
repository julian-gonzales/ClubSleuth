import {
  Button,
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
  Radio,
  RadioGroup,
  Select,
  Stack,
  Textarea,
} from "@chakra-ui/react";
import { Club } from "../../domain/club";
import { Field, Form, Formik } from "formik";
import PROVINCES from "../../domain/provinces";

type Params = {
  isOpen: any;
  onClose: any;
  club: Club;
};

const EditClubModal = ({ isOpen, onClose, club }: Params) => {
  console.log(club);
  return (
    <Modal isOpen={isOpen} onClose={onClose} size={"full"}>
      <ModalContent>
        <ModalHeader textAlign={"center"}>{club.name}</ModalHeader>
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
          >
            {(setValue) => (
              <Form>
                <Field name="name" validate={() => {}}>
                  {({ field, form }: any) => (
                    <FormControl
                      isInvalid={form.errors.name && form.touched.name}
                      isRequired
                    >
                      <FormLabel>Name</FormLabel>
                      <Input {...field} />
                      <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <Field type='checkbox' name="active" validate={() => {}}>
                  {({ field, form }: any) => (
                    <FormControl
                      isInvalid={form.errors.active && form.touched.active}
                      isRequired
                    >
                      <FormLabel>Active?</FormLabel>
                      <Checkbox {...field} />
                      <FormErrorMessage>{form.errors.active}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <Field name="description" validate={() => {}}>
                  {({ field, form }: any) => (
                    <FormControl
                      isInvalid={
                        form.errors.description && form.touched.description
                      }
                      isRequired
                    >
                      <FormLabel>Description</FormLabel>
                      <Textarea {...field} />
                      <FormErrorMessage>
                        {form.errors.description}
                      </FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <Field name="province" validate={() => {}}>
                  {({ field, form }: any) => (
                    <FormControl
                      isInvalid={form.errors.province && form.touched.province}
                      isRequired
                    >
                      <FormLabel>Province</FormLabel>
                      <Select
                        backgroundColor={"white"}
                        width={"fit-content"}
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
                <Field name="city" validate={() => {}}>
                  {({ field, form }: any) => (
                    <FormControl
                      isInvalid={form.errors.city && form.touched.city}
                      isRequired
                    >
                      <FormLabel>City</FormLabel>
                      <Input {...field} />
                      <FormErrorMessage>{form.errors.city}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <Field name="members" validate={() => {}}>
                  {({ field, form }: any) => (
                    <FormControl
                      isInvalid={form.errors.members && form.touched.members}
                      isRequired
                    >
                      <FormLabel>Number of members</FormLabel>
                      <Select
                        backgroundColor={"white"}
                        width={"fit-content"}
                        p={0}
                        isRequired={true}
                        {...field}
                      >
                        <option value={"0-10"} key={"0-10"}>
                          0-10
                        </option>
                        <option value={"10-20"} key={"10-20"}>
                          10-20
                        </option>
                        <option value={"20+"} key={"20+"}>
                          20+
                        </option>
                      </Select>
                      <FormErrorMessage>{form.errors.members}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <Field name="participation" validate={() => {}}>
                  {({ field, form }: any) => (
                    <FormControl
                      isInvalid={
                        form.errors.participation && form.touched.participation
                      }
                      isRequired
                    >
                      <FormLabel>Commitment level</FormLabel>
                      <Select
                        backgroundColor={"white"}
                        width={"fit-content"}
                        p={0}
                        isRequired={true}
                        {...field}
                      >
                        <option value={"casual"} key={"casual"}>
                          Casual
                        </option>
                        <option value={"intermediate"} key={"intermediate"}>
                          Intermediate
                        </option>
                        <option value={"priority"} key={"priority"}>
                          Priority
                        </option>
                      </Select>
                      <FormErrorMessage>{form.errors.members}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
              </Form>
            )}
          </Formik>
        </ModalBody>
        <ModalFooter>
          <Button variant="ghost" onClick={onClose}>
            Close
          </Button>
          <Button colorScheme="blue" mr={3}>
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EditClubModal;
