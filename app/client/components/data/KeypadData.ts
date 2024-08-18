export default function KeypadData() {
  const keyboardData = {
    firstRowKeys: [
      { id: "firstRow-firstKey", defaultKey: "q" },
      { id: "firstRow-secondKey", defaultKey: "w" },
      { id: "firstRow-thirdKey", defaultKey: "e" },
      { id: "firstRow-fourthKey", defaultKey: "r" },
      { id: "firstRow-fifthKey", defaultKey: "t" },
      { id: "firstRow-sixthKey", defaultKey: "y" },
      { id: "firstRow-seventhKey", defaultKey: "u" },
      { id: "firstRow-eighthKey", defaultKey: "i" },
      { id: "firstRow-ninthKey", defaultKey: "o" },
      { id: "firstRow-tenthKey", defaultKey: "p" },
    ],
    secondRowKeys: [
      { id: "secondRow-firstKey", defaultKey: "a" },
      { id: "secondRow-secondKey", defaultKey: "s" },
      { id: "secondRow-thirdKey", defaultKey: "d" },
      { id: "secondRow-fourthKey", defaultKey: "f" },
      { id: "secondRow-fifthKey", defaultKey: "g" },
      { id: "secondRow-sixthKey", defaultKey: "h" },
      { id: "secondRow-seventhKey", defaultKey: "j" },
      { id: "secondRow-eighthKey", defaultKey: "k" },
      { id: "secondRow-ninthKey", defaultKey: "l" },
    ],
    thirdRowKeys: [
      { id: "thirdRow-secondKey", defaultKey: "z" },
      { id: "thirdRow-thirdKey", defaultKey: "x" },
      { id: "thirdRow-fourthKey", defaultKey: "c" },
      { id: "thirdRow-fifthKey", defaultKey: "v" },
      { id: "thirdRow-sixthKey", defaultKey: "b" },
      { id: "thirdRow-seventhKey", defaultKey: "n" },
      { id: "thirdRow-eighthKey", defaultKey: "m" },
    ],
    fourthRowKeys: [
      { id: "thirdRow-ninthKey", defaultKey: "delete" },
      { id: "fourthRow-thirdKey", defaultKey: "enter" },
    ],
    fifthRowKeys: [
      { id: "thirdRow-firstKey", defaultKey: "caps" },
      { id: "fourthRow-secondKey", defaultKey: "space" },
    ],
  };
  return keyboardData;
}
