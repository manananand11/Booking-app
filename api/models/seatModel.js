const mongoose = require('mongoose');

const seatSchema = new mongoose.Schema({
  seatNumber: {
    type: String,
    required: true,
    unique: true
  },
  isBooked: {
    type: Boolean,
    default: false
  }
});

// Function to generate seat numbers based on row and column
function generateSeatNumber(row, column) {
    const rowChar = String.fromCharCode(65 + row); // A: 65, B: 66, ...
    const seatNumber = `${rowChar}${(column + 1).toString().padStart(2, '0')}`;
    return seatNumber;
  }
  

// Initialize seats if not already initialized
async function initializeSeats() {
    const count = await Seat.countDocuments();
  
    if (count === 0) {
      const seats = [];
  
      // Create 10 rows with 7 seats each
      for (let row = 0; row < 10; row++) {
        for (let column = 0; column < 7; column++) {
          const seatNumber = generateSeatNumber(row, column);
          const seat = new Seat({
            seatNumber,
            isBooked: false
          });
          seats.push(seat);
        }
      }
  
      // Create the last row with 3 seats
      for (let column = 0; column < 3; column++) {
        const seatNumber = generateSeatNumber(10, column);
        const seat = new Seat({
          seatNumber,
          isBooked: false
        });
        seats.push(seat);
      }
  
      await Seat.insertMany(seats);
      console.log('Seats initialized successfully');
    }
  }

const Seat = mongoose.model('Seat', seatSchema);

module.exports = {
    Seat,
    initializeSeats
  };
