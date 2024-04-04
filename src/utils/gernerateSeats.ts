export const generateSeats = (rowCount: number[], columnCounts: any) => {
  const seats = [];
  for (let i = 0; i < rowCount.length; i++) {
    const row = [];
    for (let j = 0; j < columnCounts[i]; j++) {
      row.push({
        number: `${String.fromCharCode(65 + i)}${j + 1}`,
        booked: false,
      });
    }
    seats.push(row);
  }
  return seats;
};
