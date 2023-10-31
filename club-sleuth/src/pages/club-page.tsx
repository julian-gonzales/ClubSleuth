import { useParams } from "react-router-dom";
import Header from "../features/common/header";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { changeWordsToUpperCase } from "../utils/string-utils";
import { useGetSingleClubQuery } from "../api/club-slice";
import { Box, Heading, Stack, Text } from "@chakra-ui/react";
import ClubBadges from "../features/common/club-badges";
import { FutureEvents, ReoccuringEvents } from "../domain/club";
import CurrentEvents from "../features/club-page/current-events";
import FutureEventsBox from "../features/club-page/future-events";

const ClubPage = () => {
  const { id } = useParams();
  const city = useSelector((state: RootState) => state.city.value);
  const { data: club, isLoading: loading } = useGetSingleClubQuery({ id });

  return (
    <>
      <Header city={changeWordsToUpperCase(city)}></Header>
      {!loading && club && (
        <Box w={"60%"} m={"auto"} mt={20}>
          <Heading fontSize={"6xl"}>{club.name}</Heading>
          <ClubBadges club={club} />
          <Box mb={10}>
            <Text fontSize={"24px"} fontWeight={"medium"}>
              {club.description}
            </Text>
          </Box>
          {club.reoccuringEvents !== undefined &&
            club.reoccuringEvents.length > 0 && (
              <Box>
                <Text fontSize={"26px"} fontWeight={"semibold"}>
                  CURRENT ACTIVITIES
                </Text>
                <Stack direction="row" mt={3}>
                  {club.reoccuringEvents.map((event: ReoccuringEvents) => (
                    <CurrentEvents event={event} />
                  ))}
                </Stack>
              </Box>
            )}
          {club.futureEvents !== undefined && club.futureEvents.length > 0 && (
            <Box mt={10} mb={5}>
              <Text fontSize={"26px"} fontWeight={"semibold"}>
                FUTURE ACTIVITIES
              </Text>
              <Stack direction={"row"} mt={3}>
                {club.futureEvents.map((event: FutureEvents) => (
                  <FutureEventsBox event={event} />
                ))}
              </Stack>
            </Box>
          )}
        </Box>
      )}
    </>
  );
};

export default ClubPage;
