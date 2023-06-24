import React from "react";
import { Grid, Box, Text } from "@chakra-ui/react";
import Seat from "./Seat";

function SeatGrid({ seats }) {
  return (
    <Grid templateColumns="repeat(7, 1fr)" gap={2}>
      {seats.map((seat) => (
        <Seat
          key={seat.seatNumber}
          seatNumber={seat.seatNumber}
          isBooked={seat.isBooked}
        />
      ))}
    </Grid>
  );
}

export default SeatGrid;
