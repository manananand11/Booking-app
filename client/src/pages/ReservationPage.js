import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Button,
  Flex,
  Input,
  Text,
  VStack,
  useBreakpointValue,
  useToast,
  AbsoluteCenter,
  Checkbox,
  FormControl,
  FormLabel,
  Heading,
  Link,
  Stack,
} from "@chakra-ui/react";
import SeatGrid from "../components/SeatGrid";
import { Image } from "@chakra-ui/react";

function ReservationPage() {
  const [seats, setSeats] = useState([]);
  const [numberOfSeats, setNumberOfSeats] = useState(0);
  const [bookingMessage, setBookingMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const apiUrl = "https://seat-booking-04e3f815223b.herokuapp.com";
  const toast = useToast();

  useEffect(() => {
    fetchSeats();
  }, []);

  const fetchSeats = async () => {
    try {
      const response = await axios.get(`${apiUrl}/seats`);

      setSeats(response.data);
    } catch (error) {
      console.error("Error retrieving seats:", error);
    }
  };

  const handleSeatReservation = async () => {
    try {
      const response = await axios.post(`${apiUrl}/seats/reserve`, {
        numberOfSeats,
      });
      setBookingMessage(
        `Seats reserved successfully: ${response.data.seatNumbers.join(", ")}`
      );

      setNumberOfSeats(0);
      fetchSeats();
    } catch (error) {
      console.error("Error Reserving seats:", error.response.data.error);
      setBookingMessage(`Error Reserving Seats - ${error.response.data.error}`);
    }
  };

  const handleReset = async () => {
    try {
      await axios.post(`${apiUrl}/seats/reset`);
      fetchSeats();
      toast({
        title: "Reset.",
        description: "All the seats have been reset.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      setBookingMessage("All the seats have been reset.");
    } catch (error) {
      console.error("Error resetting seats:", error);

      toast({
        title: "Fail.",
        description: "Failed to reset seats.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const isMobile = useBreakpointValue({ base: true, lg: false });
  const bg =
    "https://images.pexels.com/photos/7130555/pexels-photo-7130555.jpeg";

  return (
    <>
      <Stack
        minH={"100vh"}
        direction={{ base: "column", md: "row" }}
        style={{ backgroundImage: isMobile ? "url(" + bg + ")" : "none" }}
        backgroundRepeat={"no-repeat"}
        backgroundSize={"cover"}
      >
        <Flex
          p={8}
          flex={1}
          align={"center"}
          justify={"center"}
          textAlign={"center"}
          style={{ backgroundImage: !isMobile ? "url(" + bg + ")" : "none" }}
          backgroundRepeat={"no-repeat"}
          backgroundSize={"cover"}
        >
          <Stack spacing={4} w={"full"} maxW={"md"}>
            <Image
              boxSize="100px"
              src="https://d8it4huxumps7.cloudfront.net/uploads/images/unstop/svg/unstop-logo.svg"
              alt="Dan Abramov"
              alignSelf={"center"}
            />

            <Heading fontSize={"2xl"}>Train Reservation</Heading>
            <Box>
              <Box>
                <Text>Number of seats:</Text>
                <Input
                  type="number"
                  min="1"
                  max="7"
                  value={numberOfSeats}
                  onChange={(e) => setNumberOfSeats(Number(e.target.value))}
                />
              </Box>

              <Text>{bookingMessage}</Text>
            </Box>
            <Stack spacing={6}>
              <Button
                onClick={handleSeatReservation}
                colorScheme={"teal"}
                variant={"solid"}
              >
                Reserve
              </Button>
              <Button
                onClick={handleReset}
                colorScheme={"red"}
                variant={"solid"}
              >
                Reset
              </Button>
            </Stack>
          </Stack>
        </Flex>
        <Flex flex={2} justifyContent="center">
          <SeatGrid seats={seats} />
        </Flex>
      </Stack>
    </>
  );
}

export default ReservationPage;
