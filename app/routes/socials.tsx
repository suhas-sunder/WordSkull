import { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    {
      title:
        "💀 Links on Word Skull – Socials, News & Resources for Word Games 🎉✨",
    },
    {
      name: "description",
      content:
        "✨ Welcome to your go-to hub for all things Word Skull! 🎉 Here, you can connect with us across social platforms, get updates, and dive deeper into the world of wordplay and learning fun! Whether you’re here to share your scores, stay in the loop, or just want a handy list of all our links, this page keeps you connected and in the game! 🧠💜",
    },
  ];
};

function socials() {
  return (
    <div className="flex flex-col">
      <header>
        <h1>Links</h1>
      </header>
      <main>
        <div>
          <h2>Socials</h2>
        </div>
        <div>
          <h2>Related Projects</h2>
        </div>
      </main>
    </div>
  );
}

export default socials;
