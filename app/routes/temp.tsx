import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    {
      title:
        "💀 Word Skull - An educational word puzzle game designed to look like skulls and other fun shapes... 🎉✨",
    },
    {
      name: "description",

      content:
        "Are you worthy? Find out by playing this fun word guessing game! Challenge your mind, and improve your vocabulary in no time! 🎉📲",
    },
  ];
};

export default function Index() {
  return (
    <>
      <header className=" mb-10">
        <h1 className="w-full flex justify-center items-center text-6xl text-center mt-10 leading-snug -translate-y-[0.3em] sm:translate-y-0 sm:mt-5 sm:mb-1 text-slate-500  font-lora">
          W💀RD SKULL
        </h1>
      </header>
      <main className="flex justify-center flex-col pt-10 gap-14 items-center">
        <div className=" relative flex-col w-full max-w-[800px] capitalize flex font-nunito  text-slate-400 items-center min-h-[40em]">
          {/* <img
            src={Skull}
            alt="skull"
            className="w-[50em] opacity-10 -top-[7em] mx-auto -z-10 flex absolute"
          /> */}

          <ul className="flex">
            <li className="relative text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              <div className="absolute text-sm text-slate-300 flex top-[0.02em] left-[0.3em]">
                1
              </div>
              W
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] relative border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              o
              <div className="absolute text-sm text-slate-300 flex top-[0.02em] left-[0.3em]">
                2
              </div>
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] relative border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              <div className="absolute text-sm text-slate-300 flex top-[0.02em] left-[0.3em]">
                3
              </div>
              r
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] relative border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
              <div className="absolute text-sm text-slate-300 flex top-[0.02em] left-[0.3em]">
                4
              </div>
            </li>
          </ul>
          <ul className="flex">
            <li className="text-[1.1rem] sm:text-[2rem] relative border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              <div className="absolute text-sm text-slate-300 flex top-[0.02em] left-[0.3em]">
                1
              </div>
              W
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              o
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              r
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>
          </ul>
          <ul className="flex">
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              W
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              o
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              r
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>
          </ul>
          <ul className="flex">
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              W
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>
          </ul>
          <ul className="flex">
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              W
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-700 bg-slate-800 rounded-lg w-[2em] h-[2em] flex justify-center items-center"></li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-700 bg-slate-800 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              0
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-700 bg-slate-800 rounded-lg w-[2em] h-[2em] flex justify-center items-center"></li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-700 bg-slate-800 rounded-lg w-[2em] h-[2em] flex justify-center items-center"></li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-700 bg-slate-800 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              0
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-700 bg-slate-800 rounded-lg w-[2em] h-[2em] flex justify-center items-center"></li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>
          </ul>
          <ul className="flex">
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              W
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400  rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              o
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400  rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              r
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2  rounded-lg w-[2em] h-[2em] flex justify-center items-center"></li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              s
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>
          </ul>
          <ul className="flex">
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              s
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400  rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              o
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400  rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              r
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              s
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              s
            </li>
          </ul>
          <ul className="flex">
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400  rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              o
            </li>

            <li className="text-[1.1rem] sm:text-[2rem] border-2  rounded-lg w-[2em] h-[2em] flex justify-center items-center"></li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>

            <li className="text-[1.1rem] sm:text-[2rem] border-2  rounded-lg w-[2em] h-[2em] flex justify-center items-center"></li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              s
            </li>
          </ul>
        </div>
        <div className=" relative flex-col w-full max-w-[800px] capitalize flex font-nunito  text-slate-400 items-center min-h-[40em]">
          {/* <img
            src={Skull}
            alt="skull"
            className="w-[50em] opacity-10 -top-[7em] mx-auto -z-10 flex absolute"
          /> */}

          <ul className="flex">
            <li className="relative text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              <div className="absolute text-sm text-slate-300 flex top-[0.02em] left-[0.3em]">
                1
              </div>
              W
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] relative border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              o
              <div className="absolute text-sm text-slate-300 flex top-[0.02em] left-[0.3em]">
                2
              </div>
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] relative border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              <div className="absolute text-sm text-slate-300 flex top-[0.02em] left-[0.3em]">
                3
              </div>
              r
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] relative border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
              <div className="absolute text-sm text-slate-300 flex top-[0.02em] left-[0.3em]">
                4
              </div>
            </li>
          </ul>
          <ul className="flex">
            <li className="text-[1.1rem] sm:text-[2rem] relative border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              <div className="absolute text-sm text-slate-300 flex top-[0.02em] left-[0.3em]">
                1
              </div>
              W
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              o
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              r
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>
          </ul>
          <ul className="flex">
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              W
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              o
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              r
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>
          </ul>
          <ul className="flex">
            {" "}
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              s
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              W
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>
          </ul>
          <ul className="flex">
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              W
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-r-0 border-slate-700 bg-slate-800 border-b-0 rounded-l-lg w-[2em] h-[2em] flex justify-center items-center"></li>
            <li className="text-[1.1rem] sm:text-[2rem] border-t-2 border-slate-700 bg-slate-800  w-[2em] h-[2em] flex justify-center items-center">
              0
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-700 bg-slate-800 border-l-0 border-b-0 rounded-r-lg w-[2em] h-[2em] flex justify-center items-center"></li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-r-0 border-slate-700 bg-slate-800 border-b-0 rounded-l-lg w-[2em] h-[2em] flex justify-center items-center"></li>
            <li className="text-[1.1rem] sm:text-[2rem] border-t-2 border-slate-700 bg-slate-800  w-[2em] h-[2em] flex justify-center items-center">
              0
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-700 bg-slate-800 border-l-0 border-b-0 rounded-r-lg w-[2em] h-[2em] flex justify-center items-center"></li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>
          </ul>
          <ul className="flex">
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              W
            </li>

            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-700 bg-slate-800 border-r-0 border-t-0 rounded-l-lg w-[2em] h-[2em] flex justify-center items-center"></li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-700 border-l-0 bg-slate-800 border-t-0 rounded-r-lg w-[2em] h-[2em] flex justify-center items-center"></li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400  rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              r
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-700 bg-slate-800 border-r-0 border-t-0 rounded-l-lg w-[2em] h-[2em] flex justify-center items-center"></li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-700 border-l-0 bg-slate-800 border-t-0 rounded-r-lg  w-[2em] h-[2em] flex justify-center items-center"></li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>
          </ul>
          <ul className="flex">
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              W
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              W
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400  rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              o
            </li>

            <li className="text-[1.1rem] sm:text-[2rem] border-2  rounded-lg w-[2em] h-[2em] flex justify-center items-center"></li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2  rounded-lg w-[2em] h-[2em] flex justify-center items-center"></li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              s
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>
          </ul>
          <ul className="flex">
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              s
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400  rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              o
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              s
            </li>

            <li className="text-[1.1rem] sm:text-[2rem] border-2  rounded-lg w-[2em] h-[2em] flex justify-center items-center"></li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              s
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              s
            </li>
          </ul>
          <ul className="flex">
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              s
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              s
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400  rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              o
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400  rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              r
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              s
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              s
            </li>
          </ul>
          <ul className="flex">
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400  rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              o
            </li>

            <li className="text-[1.1rem] sm:text-[2rem] border-2  rounded-lg w-[2em] h-[2em] flex justify-center items-center"></li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2  rounded-lg w-[2em] h-[2em] flex justify-center items-center"></li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              s
            </li>

            <li className="text-[1.1rem] sm:text-[2rem] border-2  rounded-lg w-[2em] h-[2em] flex justify-center items-center"></li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              s
            </li>
          </ul>
        </div>
        <div className=" relative flex-col w-full max-w-[800px] capitalize flex font-nunito  text-slate-400 items-center min-h-[40em]">
          {/* <img
            src={Skull}
            alt="skull"
            className="w-[50em] opacity-10 scale-125 -top-[1em] mx-auto -z-10 flex absolute"
          /> */}

          <ul className="flex">
            <li className="relative text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              <div className="absolute text-sm text-slate-300 flex top-[0.02em] left-[0.3em]">
                1
              </div>
              W
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] relative border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              o
              <div className="absolute text-sm text-slate-300 flex top-[0.02em] left-[0.3em]">
                2
              </div>
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] relative border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              <div className="absolute text-sm text-slate-300 flex top-[0.02em] left-[0.3em]">
                3
              </div>
              r
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] relative border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
              <div className="absolute text-sm text-slate-300 flex top-[0.02em] left-[0.3em]">
                4
              </div>
            </li>
          </ul>
          <ul className="flex">
            <li className="text-[1.1rem] sm:text-[2rem] relative border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              <div className="absolute text-sm text-slate-300 flex top-[0.02em] left-[0.3em]">
                1
              </div>
              W
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              o
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              r
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>
          </ul>
          <ul className="flex">
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              W
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              o
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              r
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>
          </ul>
          <ul className="flex">
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              W
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>
          </ul>
          <ul className="flex">
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              W
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>
          </ul>
          <ul className="flex">
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              W
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>
          </ul>
          <ul className="flex">
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              W
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-700 bg-slate-800 rounded-lg w-[2em] h-[2em] flex justify-center items-center"></li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-700 bg-slate-800 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              0
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-700 bg-slate-800 rounded-lg w-[2em] h-[2em] flex justify-center items-center"></li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-700 bg-slate-800 rounded-lg w-[2em] h-[2em] flex justify-center items-center"></li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-700 bg-slate-800 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              0
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-700 bg-slate-800 rounded-lg w-[2em] h-[2em] flex justify-center items-center"></li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>
          </ul>
          <ul className="flex">
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              W
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400  rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              o
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400  rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              r
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2  rounded-lg w-[2em] h-[2em] flex justify-center items-center"></li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              s
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>
          </ul>
          <ul className="flex">
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              s
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400  rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              o
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400  rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              r
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              s
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              s
            </li>
          </ul>
          <ul className="flex">
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400  rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              o
            </li>

            <li className="text-[1.1rem] sm:text-[2rem] border-2  rounded-lg w-[2em] h-[2em] flex justify-center items-center"></li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>

            <li className="text-[1.1rem] sm:text-[2rem] border-2  rounded-lg w-[2em] h-[2em] flex justify-center items-center"></li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              s
            </li>
          </ul>
        </div>
        <div className=" relative flex-col w-full max-w-[800px] capitalize flex font-nunito  text-slate-400 items-center min-h-[40em]">
          {/* <img
            src={Skull}
            alt="skull"
            className="w-[50em] opacity-10 scale-125 -top-[1em] mx-auto -z-10 flex absolute"
          /> */}

          <ul className="flex">
            <li className="relative text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              <div className="absolute text-sm text-slate-300 flex top-[0.02em] left-[0.3em]">
                1
              </div>
              W
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] relative border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              o
              <div className="absolute text-sm text-slate-300 flex top-[0.02em] left-[0.3em]">
                2
              </div>
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] relative border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              <div className="absolute text-sm text-slate-300 flex top-[0.02em] left-[0.3em]">
                3
              </div>
              r
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] relative border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
              <div className="absolute text-sm text-slate-300 flex top-[0.02em] left-[0.3em]">
                4
              </div>
            </li>
          </ul>
          <ul className="flex">
            <li className="text-[1.1rem] sm:text-[2rem] relative border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              <div className="absolute text-sm text-slate-300 flex top-[0.02em] left-[0.3em]">
                1
              </div>
              W
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              o
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              r
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>
          </ul>
          <ul className="flex">
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              W
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              o
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              r
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>
          </ul>
          <ul className="flex">
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              W
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>
          </ul>
          <ul className="flex">
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              W
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>
          </ul>
          <ul className="flex">
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              W
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>
          </ul>
          <ul className="flex">
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              W
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-700 bg-slate-800 rounded-lg w-[2em] h-[2em] flex justify-center items-center"></li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-700 bg-slate-800 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              0
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-700 bg-slate-800 rounded-lg w-[2em] h-[2em] flex justify-center items-center"></li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-700 bg-slate-800 rounded-lg w-[2em] h-[2em] flex justify-center items-center"></li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-700 bg-slate-800 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              0
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-700 bg-slate-800 rounded-lg w-[2em] h-[2em] flex justify-center items-center"></li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>
          </ul>
          <ul className="flex">
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              W
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400  rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              o
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400  rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              r
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2  rounded-lg w-[2em] h-[2em] flex justify-center items-center"></li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              s
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>
          </ul>
          <ul className="flex">
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400  rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              o
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400  rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              r
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2  rounded-lg w-[2em] h-[2em] flex justify-center items-center"></li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2  rounded-lg w-[2em] h-[2em] flex justify-center items-center"></li>

            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              s
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>
          </ul>
          <ul className="flex">
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              s
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400  rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              o
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400  rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              r
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              s
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              s
            </li>
          </ul>
          <ul className="flex">
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400  rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              o
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400  rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              o
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400  rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              o
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              s
            </li>
          </ul>
          <ul className="flex">
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400  rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              o
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400  rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              o
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              s
            </li>
          </ul>
        </div>
        <div className=" relative flex-col w-full max-w-[800px] capitalize flex font-nunito  text-slate-400 items-center min-h-[40em]">
          {/* <img
            src={Skull}
            alt="skull"
            className="w-[50em] opacity-10 -top-[7em] mx-auto -z-10 flex absolute"
          /> */}

          <ul className="flex">
            <li className="relative text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              <div className="absolute text-sm text-slate-300 flex top-[0.02em] left-[0.3em]">
                1
              </div>
              W
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] relative border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              o
              <div className="absolute text-sm text-slate-300 flex top-[0.02em] left-[0.3em]">
                2
              </div>
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] relative border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              <div className="absolute text-sm text-slate-300 flex top-[0.02em] left-[0.3em]">
                3
              </div>
              r
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] relative border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
              <div className="absolute text-sm text-slate-300 flex top-[0.02em] left-[0.3em]">
                4
              </div>
            </li>
          </ul>
          <ul className="flex">
            <li className="text-[1.1rem] sm:text-[2rem] relative border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              <div className="absolute text-sm text-slate-300 flex top-[0.02em] left-[0.3em]">
                1
              </div>
              W
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              o
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              r
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>
          </ul>
          <ul className="flex">
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              W
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              o
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              r
            </li>

            <li className="text-[1.1rem] sm:text-[2rem] border-2  rounded-lg w-[2em] h-[2em] flex justify-center items-center"></li>

            <li className="text-[1.1rem] sm:text-[2rem] border-2  rounded-lg w-[2em] h-[2em] flex justify-center items-center"></li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>
          </ul>
          <ul className="flex">
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              W
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>

            <li className="text-[1.1rem] sm:text-[2rem] border-2  rounded-lg w-[2em] h-[2em] flex justify-center items-center"></li>

            <li className="text-[1.1rem] sm:text-[2rem] border-2  rounded-lg w-[2em] h-[2em] flex justify-center items-center"></li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>
          </ul>
          <ul className="flex">
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              W
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-700 bg-slate-800 rounded-lg w-[2em] h-[2em] flex justify-center items-center"></li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-700 bg-slate-800 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              0
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-700 bg-slate-800 rounded-lg w-[2em] h-[2em] flex justify-center items-center"></li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-700 bg-slate-800 rounded-lg w-[2em] h-[2em] flex justify-center items-center"></li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-700 bg-slate-800 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              0
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-700 bg-slate-800 rounded-lg w-[2em] h-[2em] flex justify-center items-center"></li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>
          </ul>
          <ul className="flex">
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              W
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400  rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              o
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400  rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              r
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2  rounded-lg w-[2em] h-[2em] flex justify-center items-center"></li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              s
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>
          </ul>
          <ul className="flex">
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              W
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400  rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              o
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400  rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              r
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2  rounded-lg w-[2em] h-[2em] flex justify-center items-center"></li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              s
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>
          </ul>
          <ul className="flex">
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              s
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400  rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              o
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400  rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              r
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              s
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              s
            </li>
          </ul>
          <ul className="flex">
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400  rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              o
            </li>

            <li className="text-[1.1rem] sm:text-[2rem] border-2  rounded-lg w-[2em] h-[2em] flex justify-center items-center"></li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>

            <li className="text-[1.1rem] sm:text-[2rem] border-2  rounded-lg w-[2em] h-[2em] flex justify-center items-center"></li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              s
            </li>
          </ul>
          <ul className="flex">
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400  rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              o
            </li>

            <li className="text-[1.1rem] sm:text-[2rem] border-2  rounded-lg w-[2em] h-[2em] flex justify-center items-center"></li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>

            <li className="text-[1.1rem] sm:text-[2rem] border-2  rounded-lg w-[2em] h-[2em] flex justify-center items-center"></li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              s
            </li>
          </ul>
        </div>
        <div className=" relative flex-col w-full max-w-[800px] capitalize flex font-nunito  text-slate-400 items-center min-h-[40em]">
          {/* <img
            src={Skull}
            alt="skull"
            className="w-[50em] opacity-10 scale-[1.2] -top-[7em] mx-auto -z-10 flex absolute"
          /> */}

          <ul className="flex">
            <li className="text-[1.1rem] sm:text-[2rem] relative border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              <div className="absolute text-sm text-slate-300 flex top-[0.02em] left-[0.3em]">
                1
              </div>
              W
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              o
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              r
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>
          </ul>
          <ul className="flex">
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              r
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>
          </ul>
          <ul className="flex">
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>
          </ul>
          <ul className="flex">
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              W
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-700 bg-slate-800 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              0
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-700 bg-slate-800 rounded-lg w-[2em] h-[2em] flex justify-center items-center"></li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-700 bg-slate-800 rounded-lg w-[2em] h-[2em] flex justify-center items-center"></li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-700 bg-slate-800 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              0
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>
          </ul>
          <ul className="flex">
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              W
            </li>

            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-700 bg-slate-800 rounded-lg w-[2em] h-[2em] flex justify-center items-center"></li>

            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-700 bg-slate-800 rounded-lg w-[2em] h-[2em] flex justify-center items-center"></li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>

            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-700 bg-slate-800 rounded-lg w-[2em] h-[2em] flex justify-center items-center"></li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-700 bg-slate-800 rounded-lg w-[2em] h-[2em] flex justify-center items-center"></li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>
          </ul>
          <ul className="flex">
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              s
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400  rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              o
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400  rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              r
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              s
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              s
            </li>
          </ul>
          <ul className="flex">
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400  rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              o
            </li>

            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>

            <li className="text-[1.1rem] sm:text-[2rem] border-2  rounded-lg w-[2em] h-[2em] flex justify-center items-center"></li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400  rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              o
            </li>

            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>
          </ul>
          <ul className="flex">
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400  rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              o
            </li>

            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>

            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400  rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              o
            </li>

            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>
          </ul>
          <ul className="flex">
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400  rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              o
            </li>

            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>

            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400  rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              o
            </li>

            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>
          </ul>
        </div>
        <div className=" relative flex-col w-full max-w-[800px] capitalize flex font-nunito text-slate-400 items-center min-h-[40em]">
          {/* <img
            src={Skull}
            alt="skull"
            className="w-[50em] opacity-10 -top-[7em] mx-auto -z-10 flex absolute"
          /> */}

          <ul className="flex">
            <li className="relative text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              <div className="absolute text-sm text-slate-300 flex top-[0.02em] left-[0.3em]">
                1
              </div>
              W
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] relative border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              o
              <div className="absolute text-sm text-slate-300 flex top-[0.02em] left-[0.3em]">
                2
              </div>
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] relative border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              <div className="absolute text-sm text-slate-300 flex top-[0.02em] left-[0.3em]">
                3
              </div>
              r
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] relative border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
              <div className="absolute text-sm text-slate-300 flex top-[0.02em] left-[0.3em]">
                4
              </div>
            </li>
          </ul>
          <ul className="flex">
            <li className="text-[1.1rem] sm:text-[2rem] relative border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              <div className="absolute text-sm text-slate-300 flex top-[0.02em] left-[0.3em]">
                1
              </div>
              W
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              o
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              r
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>
          </ul>
          <ul className="flex">
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              W
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              o
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              r
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>
          </ul>
          <ul className="flex">
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              W
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>
          </ul>
          <ul className="flex">
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              W
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2  rounded-lg w-[2em] h-[2em] flex justify-center items-center"></li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2  rounded-lg w-[2em] h-[2em] flex justify-center items-center"></li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2  rounded-lg w-[2em] h-[2em] flex justify-center items-center"></li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2  rounded-lg w-[2em] h-[2em] flex justify-center items-center"></li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2  rounded-lg w-[2em] h-[2em] flex justify-center items-center"></li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2  rounded-lg w-[2em] h-[2em] flex justify-center items-center"></li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>
          </ul>
          <ul className="flex">
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              W
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400  rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              o
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400  rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              o
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400  rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              r
            </li>{" "}
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400  rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              r
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              s
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>
          </ul>
          <ul className="flex">
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              s
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400  rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              o
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400  rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              r
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              s
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              s
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              s
            </li>
          </ul>
          <ul className="flex">
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              s
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400  rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              o
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400  rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              r
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              s
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              s
            </li>
          </ul>
          <ul className="flex">
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400  rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              o
            </li>

            <li className="text-[1.1rem] sm:text-[2rem] border-2  rounded-lg w-[2em] h-[2em] flex justify-center items-center"></li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>

            <li className="text-[1.1rem] sm:text-[2rem] border-2  rounded-lg w-[2em] h-[2em] flex justify-center items-center"></li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              s
            </li>
          </ul>
        </div>
        <div className=" relative flex-col w-full max-w-[800px] capitalize flex font-nunito text-slate-400 items-center min-h-[40em]">
          {/* <img
            src={Skull}
            alt="skull"
            className="w-[50em] opacity-10 -top-[7em] mx-auto -z-10 flex absolute"
          /> */}

          <ul className="flex">
            <li className="relative text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              <div className="absolute text-sm text-slate-300 flex top-[0.02em] left-[0.3em]">
                1
              </div>
              W
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] relative border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              o
              <div className="absolute text-sm text-slate-300 flex top-[0.02em] left-[0.3em]">
                2
              </div>
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] relative border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              <div className="absolute text-sm text-slate-300 flex top-[0.02em] left-[0.3em]">
                3
              </div>
              r
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] relative border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
              <div className="absolute text-sm text-slate-300 flex top-[0.02em] left-[0.3em]">
                4
              </div>
            </li>
          </ul>
          <ul className="flex">
            <li className="text-[1.1rem] sm:text-[2rem] relative border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              <div className="absolute text-sm text-slate-300 flex top-[0.02em] left-[0.3em]">
                1
              </div>
              W
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              o
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              r
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>
          </ul>
          <ul className="flex">
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              W
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              o
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              r
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>
          </ul>
          <ul className="flex">
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              W
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>
          </ul>
          <ul className="flex">
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              W
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2  rounded-lg w-[2em] h-[2em] flex justify-center items-center"></li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2  rounded-lg w-[2em] h-[2em] flex justify-center items-center"></li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2  rounded-lg w-[2em] h-[2em] flex justify-center items-center"></li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2  rounded-lg w-[2em] h-[2em] flex justify-center items-center"></li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>
          </ul>
          <ul className="flex">
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              W
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400  rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              o
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400  rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              r
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2  rounded-lg w-[2em] h-[2em] flex justify-center items-center"></li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              s
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>
          </ul>
          <ul className="flex">
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              s
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400  rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              o
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400  rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              r
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              s
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              s
            </li>
          </ul>
          <ul className="flex">
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400  rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              o
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              s
            </li>
          </ul>

          <ul className="flex">
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400  rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              o
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              s
            </li>
          </ul>
        </div>
        <div className=" relative flex-col w-full max-w-[800px] capitalize flex font-nunito text-slate-400 items-center min-h-[40em]">
          {/* <img
            src={Skull}
            alt="skull"
            className="w-[50em] opacity-10 -top-[3.9em] mx-auto -z-10 flex absolute"
          /> */}

          <ul className="flex">
            <li className="relative text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              <div className="absolute text-sm text-slate-300 flex top-[0.02em] left-[0.3em]">
                1
              </div>
              W
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] relative border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              o
              <div className="absolute text-sm text-slate-300 flex top-[0.02em] left-[0.3em]">
                2
              </div>
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] relative border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              <div className="absolute text-sm text-slate-300 flex top-[0.02em] left-[0.3em]">
                3
              </div>
              r
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] relative border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
              <div className="absolute text-sm text-slate-300 flex top-[0.02em] left-[0.3em]">
                4
              </div>
            </li>
          </ul>
          <ul className="flex">
            <li className="text-[1.1rem] sm:text-[2rem] relative border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              <div className="absolute text-sm text-slate-300 flex top-[0.02em] left-[0.3em]">
                1
              </div>
              W
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              o
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              r
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>
          </ul>
          <ul className="flex">
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              W
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              o
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              r
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>
          </ul>
          <ul className="flex">
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              W
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2  rounded-lg w-[2em] h-[2em] flex justify-center items-center"></li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2  rounded-lg w-[2em] h-[2em] flex justify-center items-center"></li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2  rounded-lg w-[2em] h-[2em] flex justify-center items-center"></li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2  rounded-lg w-[2em] h-[2em] flex justify-center items-center"></li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2  rounded-lg w-[2em] h-[2em] flex justify-center items-center"></li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2  rounded-lg w-[2em] h-[2em] flex justify-center items-center"></li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>
          </ul>
          <ul className="flex">
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              W
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2  rounded-lg w-[2em] h-[2em] flex justify-center items-center"></li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2  rounded-lg w-[2em] h-[2em] flex justify-center items-center"></li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2  rounded-lg w-[2em] h-[2em] flex justify-center items-center"></li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2  rounded-lg w-[2em] h-[2em] flex justify-center items-center"></li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2  rounded-lg w-[2em] h-[2em] flex justify-center items-center"></li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2  rounded-lg w-[2em] h-[2em] flex justify-center items-center"></li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>
          </ul>
          <ul className="flex">
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              W
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400  rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              o
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400  rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              r
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2  rounded-lg w-[2em] h-[2em] flex justify-center items-center"></li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              s
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>
          </ul>
          <ul className="flex">
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              s
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400  rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              o
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400  rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              r
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              s
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              s
            </li>
          </ul>
          <ul className="flex">
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400  rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              o
            </li>

            <li className="text-[1.1rem] sm:text-[2rem] border-2  rounded-lg w-[2em] h-[2em] flex justify-center items-center"></li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>

            <li className="text-[1.1rem] sm:text-[2rem] border-2  rounded-lg w-[2em] h-[2em] flex justify-center items-center"></li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              s
            </li>
          </ul>
        </div>
        <div className="relative flex-col w-full max-w-[800px] capitalize flex font-nunito text-slate-400 items-center min-h-[40em]">
          {/* <img
            src={Skull}
            alt="skull"
            className="w-[50em] opacity-10 -top-[3.9em] mx-auto -z-10 flex absolute"
          /> */}

          <ul className="flex">
            <li className="relative text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              <div className="absolute text-sm text-slate-300 flex top-[0.02em] left-[0.3em]">
                1
              </div>
              W
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] relative border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              o
              <div className="absolute text-sm text-slate-300 flex top-[0.02em] left-[0.3em]">
                2
              </div>
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] relative border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              <div className="absolute text-sm text-slate-300 flex top-[0.02em] left-[0.3em]">
                3
              </div>
              r
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] relative border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
              <div className="absolute text-sm text-slate-300 flex top-[0.02em] left-[0.3em]">
                4
              </div>
            </li>
          </ul>
          <ul className="flex">
            <li className="text-[1.1rem] sm:text-[2rem] relative border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              <div className="absolute text-sm text-slate-300 flex top-[0.02em] left-[0.3em]">
                1
              </div>
              W
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              o
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              r
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>
          </ul>
          <ul className="flex">
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              W
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              o
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              r
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>
          </ul>
          <ul className="flex">
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              W
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              o
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              r
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>
          </ul>
          <ul className="flex">
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              W
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2  rounded-lg w-[2em] h-[2em] flex justify-center items-center"></li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2  rounded-lg w-[2em] h-[2em] flex justify-center items-center"></li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2  rounded-lg w-[2em] h-[2em] flex justify-center items-center"></li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2  rounded-lg w-[2em] h-[2em] flex justify-center items-center"></li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2  rounded-lg w-[2em] h-[2em] flex justify-center items-center"></li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2  rounded-lg w-[2em] h-[2em] flex justify-center items-center"></li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>
          </ul>
          <ul className="flex">
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              W
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2  rounded-lg w-[2em] h-[2em] flex justify-center items-center"></li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2  rounded-lg w-[2em] h-[2em] flex justify-center items-center"></li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2  rounded-lg w-[2em] h-[2em] flex justify-center items-center"></li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2  rounded-lg w-[2em] h-[2em] flex justify-center items-center"></li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2  rounded-lg w-[2em] h-[2em] flex justify-center items-center"></li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2  rounded-lg w-[2em] h-[2em] flex justify-center items-center"></li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>
          </ul>
          <ul className="flex">
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              W
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400  rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              o
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400  rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              r
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2  rounded-lg w-[2em] h-[2em] flex justify-center items-center"></li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              s
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>
          </ul>
          <ul className="flex">
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              s
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400  rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              o
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400  rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              r
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              s
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              s
            </li>
          </ul>
          <ul className="flex">
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400  rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              o
            </li>

            <li className="text-[1.1rem] sm:text-[2rem] border-2  rounded-lg w-[2em] h-[2em] flex justify-center items-center"></li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>

            <li className="text-[1.1rem] sm:text-[2rem] border-2  rounded-lg w-[2em] h-[2em] flex justify-center items-center"></li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              s
            </li>
          </ul>
        </div>
        <div className=" relative flex-col w-full max-w-[800px] capitalize  flex font-nunito text-slate-400 items-center min-h-[40em]">
          {/* <img
            src={Skull}
            alt="skull"
            className="w-[50em] opacity-10 -top-[3.9em] mx-auto -z-10 flex absolute"
          /> */}
          <ul className="flex">
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              W
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              o
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              r
            </li>
          </ul>
          <ul className="flex">
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              W
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              o
            </li>

            <li className="text-[1.1rem] sm:text-[2rem] rounded-lg w-[2em] h-[2em] flex justify-center items-center"></li>

            <li className="text-[1.1rem] sm:text-[2rem] rounded-lg w-[2em] h-[2em] flex justify-center items-center"></li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>
          </ul>
          <ul className="flex">
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              o
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              r
            </li>

            <li className="text-[1.1rem] sm:text-[2rem] rounded-lg w-[2em] h-[2em] flex justify-center items-center"></li>
            <li className="text-[1.1rem] sm:text-[2rem] rounded-lg w-[2em] h-[2em] flex justify-center items-center"></li>

            <li className="text-[1.1rem] sm:text-[2rem] rounded-lg w-[2em] h-[2em] flex justify-center items-center"></li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>
          </ul>
          <ul className="flex">
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              W
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              o
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              r
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>
          </ul>
          <ul className="flex">
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              W
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              W
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] rounded-lg w-[2em] h-[2em] flex justify-center items-center"></li>
            <li className="text-[1.1rem] sm:text-[2rem] rounded-lg w-[2em] h-[2em] flex justify-center items-center"></li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] rounded-lg w-[2em] h-[2em] flex justify-center items-center"></li>
            <li className="text-[1.1rem] sm:text-[2rem] rounded-lg w-[2em] h-[2em] flex justify-center items-center"></li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              W
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>
          </ul>
          <ul className="flex">
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              W
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] rounded-lg w-[2em] h-[2em] flex justify-center items-center"></li>
            <li className="text-[1.1rem] sm:text-[2rem] rounded-lg w-[2em] h-[2em] flex justify-center items-center"></li>
            <li className="text-[1.1rem] sm:text-[2rem] rounded-lg w-[2em] h-[2em] flex justify-center items-center"></li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] rounded-lg w-[2em] h-[2em] flex justify-center items-center"></li>
            <li className="text-[1.1rem] sm:text-[2rem] rounded-lg w-[2em] h-[2em] flex justify-center items-center"></li>
            <li className="text-[1.1rem] sm:text-[2rem] rounded-lg w-[2em] h-[2em] flex justify-center items-center"></li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>
          </ul>
          <ul className="flex">
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              W
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400  rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              o
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400  rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              r
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] rounded-lg w-[2em] h-[2em] flex justify-center items-center"></li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              s
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>
          </ul>
          <ul className="flex">
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              s
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400  rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              o
            </li>

            <li className="text-[1.1rem] sm:text-[2rem]  rounded-lg w-[2em] h-[2em] flex justify-center items-center"></li>

            <li className="text-[1.1rem] sm:text-[2rem]  rounded-lg w-[2em] h-[2em] flex justify-center items-center"></li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              s
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              s
            </li>
          </ul>
          <ul className="flex">
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              s
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400  rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              o
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400  rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              r
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              s
            </li>
          </ul>
          <ul className="flex">
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400  rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              o
            </li>

            <li className="text-[1.1rem] sm:text-[2rem]  rounded-lg w-[2em] h-[2em] flex justify-center items-center"></li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>

            <li className="text-[1.1rem] sm:text-[2rem] rounded-lg w-[2em] h-[2em] flex justify-center items-center"></li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              s
            </li>
          </ul>
        </div>
        <div className="relative flex-col w-full max-w-[800px] capitalize  flex font-nunito text-slate-400 items-center min-h-[40em]">
          {/* <img
            src={Skull}
            alt="skull"
            className="w-[50em] opacity-10 -top-[3.9em] mx-auto -z-10 flex absolute"
          /> */}
          <ul className="flex">
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              W
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              o
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              r
            </li>
          </ul>
          <ul className="flex">
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              W
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              o
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              r
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>
          </ul>
          <ul className="flex">
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              o
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              r
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>
          </ul>
          <ul className="flex">
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              W
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              o
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              r
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>
          </ul>
          <ul className="flex">
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              W
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              W
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] rounded-lg w-[2em] h-[2em] flex justify-center items-center"></li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              W
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              W
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] rounded-lg w-[2em] h-[2em] flex justify-center items-center"></li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              W
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>
          </ul>
          <ul className="flex">
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              W
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] rounded-lg w-[2em] h-[2em] flex justify-center items-center"></li>
            <li className="text-[1.1rem] sm:text-[2rem] rounded-lg w-[2em] h-[2em] flex justify-center items-center"></li>
            <li className="text-[1.1rem] sm:text-[2rem] rounded-lg w-[2em] h-[2em] flex justify-center items-center"></li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] rounded-lg w-[2em] h-[2em] flex justify-center items-center"></li>
            <li className="text-[1.1rem] sm:text-[2rem] rounded-lg w-[2em] h-[2em] flex justify-center items-center"></li>
            <li className="text-[1.1rem] sm:text-[2rem] rounded-lg w-[2em] h-[2em] flex justify-center items-center"></li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>
          </ul>
          <ul className="flex">
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              W
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400  rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              o
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400  rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              r
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] rounded-lg w-[2em] h-[2em] flex justify-center items-center"></li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              s
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>
          </ul>
          <ul className="flex">
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              s
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400  rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              o
            </li>

            <li className="text-[1.1rem] sm:text-[2rem]  rounded-lg w-[2em] h-[2em] flex justify-center items-center"></li>

            <li className="text-[1.1rem] sm:text-[2rem]  rounded-lg w-[2em] h-[2em] flex justify-center items-center"></li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              s
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              s
            </li>
          </ul>
          <ul className="flex">
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              s
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400  rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              o
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400  rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              r
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              s
            </li>
          </ul>
          <ul className="flex">
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400  rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              o
            </li>

            <li className="text-[1.1rem] sm:text-[2rem]  rounded-lg w-[2em] h-[2em] flex justify-center items-center"></li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>

            <li className="text-[1.1rem] sm:text-[2rem] rounded-lg w-[2em] h-[2em] flex justify-center items-center"></li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              s
            </li>
          </ul>
        </div>
        <div className="relative flex-col w-full max-w-[800px] capitalize  flex font-nunito text-slate-400 items-center min-h-[40em]">
          {/* <img
            src={Skull}
            alt="skull"
            className="w-[50em] opacity-10 -top-[3.9em] mx-auto -z-10 flex absolute"
          /> */}
          <ul className="flex">
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              W
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              o
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              r
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              W
            </li>
          </ul>
          <ul className="flex">
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              W
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              o
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              r
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>
          </ul>
          <ul className="flex">
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              o
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              r
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>
          </ul>
          <ul className="flex">
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              W
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              o
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              r
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>
          </ul>
          <ul className="flex">
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              W
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              W
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] rounded-lg w-[2em] h-[2em] flex justify-center items-center"></li>
            <li className="text-[1.1rem] sm:text-[2rem] rounded-lg w-[2em] h-[2em] flex justify-center items-center"></li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] rounded-lg w-[2em] h-[2em] flex justify-center items-center"></li>
            <li className="text-[1.1rem] sm:text-[2rem] rounded-lg w-[2em] h-[2em] flex justify-center items-center"></li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              W
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>
          </ul>
          <ul className="flex">
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              W
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              W
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] rounded-lg w-[2em] h-[2em] flex justify-center items-center"></li>
            <li className="text-[1.1rem] sm:text-[2rem] rounded-lg w-[2em] h-[2em] flex justify-center items-center"></li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] rounded-lg w-[2em] h-[2em] flex justify-center items-center"></li>
            <li className="text-[1.1rem] sm:text-[2rem] rounded-lg w-[2em] h-[2em] flex justify-center items-center"></li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              W
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>
          </ul>
          <ul className="flex">
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              W
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400  rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              o
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400  rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              r
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] rounded-lg w-[2em] h-[2em] flex justify-center items-center"></li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              s
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>
          </ul>
          <ul className="flex">
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              s
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400  rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              o
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400  rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              r
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              s
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              s
            </li>
          </ul>
          <ul className="flex">
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              s
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400  rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              o
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400  rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              r
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              s
            </li>
          </ul>
          <ul className="flex">
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400  rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              o
            </li>

            <li className="text-[1.1rem] sm:text-[2rem]  rounded-lg w-[2em] h-[2em] flex justify-center items-center"></li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              d
            </li>

            <li className="text-[1.1rem] sm:text-[2rem] rounded-lg w-[2em] h-[2em] flex justify-center items-center"></li>
            <li className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center">
              s
            </li>
          </ul>
        </div>
      </main>
    </>
  );
}
