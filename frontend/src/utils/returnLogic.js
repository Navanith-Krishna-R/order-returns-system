export function calculateReturnStatus(purchaseDate, condition) {
  const today = new Date();
  const purchase = new Date(purchaseDate);

  if (purchase > today) {
    return "Invalid Purchase Date";
  }

  const differenceInDays = Math.floor(
    (today - purchase) / (1000 * 60 * 60 * 24)
  );

  if (differenceInDays > 30) {
    return "Rejected - Return Window Expired";
  }

  if (condition === "Damaged") {
    return "Rejected - Item Damaged";
  }

  return "Approved";
}
