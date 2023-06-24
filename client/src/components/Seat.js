import React from "react";
import { CloseIcon } from "@chakra-ui/icons";
import { Box } from "@chakra-ui/react";

function Seat({ seatNumber, isBooked }) {
  const seatColor = isBooked ? "red.500" : "green.500";

  return (
    <Box
      key={seatNumber}
      textAlign="center"
      border="1px solid"
      borderRadius="10px"
      p="2"
      borderColor={seatColor}
      bg={seatColor}
      color="white"
      alignSelf="center"
    >
      <Box fontSize="l" fontWeight="bold">
        {seatNumber}
      </Box>
    </Box>
  );
}

export default Seat;
