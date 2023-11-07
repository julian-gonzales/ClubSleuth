import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { User } from "../domain/user";
import {
  Box,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import Header from "../features/common/header";
import { Club } from "../domain/club";
import { useGetSingleClubMutation } from "../api/club-slice";

const UserClubs = () => {
  const user: User = useSelector((state: RootState) => state.user.value);
  const [getClub] = useGetSingleClubMutation();
  let clubs: Club[] = [];
  user.clubs.forEach(async (clubID) => {
    await getClub(clubID._id)
      .unwrap()
      .then((dbClub) => {
        // clubs.push(dbClub);
        console.log(dbClub);
      });
  });
  console.log(user);
  return (
    <>
      <Header city="" searching={false}></Header>
      <Box>
        <TableContainer>
          <Table variant="simple">
            <TableCaption>Imperial to metric conversion factors</TableCaption>
            <Thead>
              <Tr>
                <Th>Name</Th>
                <Th>Members</Th>
                <Th>Commitment</Th>
              </Tr>
            </Thead>
            <Tbody>
              {user.clubs.length > 0 &&
                clubs.map((club) => (
                  <Tr key={club._id}>
                    <Td>{club.name}</Td>
                    <Td>{club.members}</Td>
                    <Td>{club.participation}</Td>
                  </Tr>
                ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
};

export default UserClubs;
