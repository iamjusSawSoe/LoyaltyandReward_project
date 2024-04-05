export const allowOnlyNumber = (
  event: React.KeyboardEvent<HTMLInputElement>
) => {
  // Allow: backspace, delete, tab, escape, enter and .
  if (
    [46, 8, 9, 27, 13, 110, 190].indexOf(event.keyCode) !== -1 ||
    // Allow: Ctrl+A, Ctrl+C, Ctrl+V
    (event.ctrlKey &&
      (event.keyCode === 65 || event.keyCode === 67 || event.keyCode === 86)) ||
    // Allow: home, end, left, right
    (event.keyCode >= 35 && event.keyCode <= 39)
  ) {
    // Let it happen, don't do anything
    return;
  }
  // Ensure that it is a number and stop the keypress
  if (
    event.shiftKey ||
    ((event.keyCode < 48 || event.keyCode > 57) &&
      (event.keyCode < 96 || event.keyCode > 105))
  ) {
    event.preventDefault();
  }
};
