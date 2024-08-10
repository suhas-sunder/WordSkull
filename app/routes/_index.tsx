import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    {
      title:
        "💀 Word Skull - An educational word puzzle game designed to look like skulls and other fun shapes... 🎉✨",
    },
    {
      name: "Are you worthy? Find out by playing this fun word guessing game! Challenge your mind, and improve your vocabulary in no time!",
      content: " 🎉📲",
    },
  ];
};

export default function Index() {
  return (
    <>
      <header>
        <h1 className="w-full flex justify-center items-center text-6xl  -translate-y-[0.3em] sm:translate-y-0 sm:mt-5 sm:mb-1 text-slate-500  font-lora">
          W💀RD SKULL
        </h1>
      </header>
      <main></main>
    </>
  );
}
