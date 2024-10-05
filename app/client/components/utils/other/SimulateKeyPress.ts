//Used by virtual keyboard & keypad to simulate key presses
function SimulateKeyPress(keyValue: string) {
  let key = keyValue.toLowerCase();

  if (key === " " || key === "space") key = "shift"; //Shift key has the same functionality as space when this click event is triggered, but using space bar causes a css bug with the current implementation, so this is a workaround.

  if (key === "delete") key = "backspace";

  const event = new KeyboardEvent("keydown", {
    key,
    bubbles: true, // Enable the event to bubble up
    cancelable: true, // Allow event to be canceled
  });

  document.dispatchEvent(event);
}

export default SimulateKeyPress;
