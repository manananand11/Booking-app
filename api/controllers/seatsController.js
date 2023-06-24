const { Seat } = require("../models/seatModel");

exports.getSeats = async (req, res) => {
  try {
    const seats = await Seat.find();
    res.json(seats);
  } catch (error) {
    console.error("Error retrieving seats:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.resetSeats = async (req, res) => {
  try {
    await Seat.updateMany({}, { isBooked: false });
    res.json({ message: "All seats have been reset" });
  } catch (error) {
    console.error("Error resetting seats:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
exports.reserveSeats = async (req, res) => {
  const { numberOfSeats } = req.body;

  if (numberOfSeats <= 0 || numberOfSeats > 7) {
    return res.status(400).json({ error: 'Invalid number of seats' });
  }

  try {
    let seatNumbers = [];
    const rows = 11; // Total number of rows (A-K)

    // Find available seats in consecutive rows
    for (let row = 0; row < rows; row++) {
      const seatsInRow = await Seat.find({
        seatNumber: { $regex: `^${String.fromCharCode(65 + row)}` }, // Match seats in the current row
        isBooked: false
      })
        .sort({ seatNumber: 1 }) // Sort seats in ascending order
        .limit(numberOfSeats); // Limit the result to the requested number of seats

      if (seatsInRow.length === numberOfSeats) {
        seatNumbers = seatsInRow.map(seat => seat.seatNumber);
        break; // Found consecutive seats in the current row, exit the loop
      }
    }

    // If consecutive seats not found, find seats in different rows
    if (seatNumbers.length === 0) {
      const seats = await Seat.find({ isBooked: false });

      if (seats.length >= numberOfSeats) {
        seatNumbers = seats.slice(0, numberOfSeats).map(seat => seat.seatNumber);
      } else {
        return res.status(400).json({ error: 'Not enough seats available' });
      }
    }

    await Seat.updateMany({ seatNumber: { $in: seatNumbers } }, { isBooked: true });

    res.json({ message: 'Seats reserved successfully', seatNumbers });
  } catch (error) {
    console.error('Error reserving seats:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
