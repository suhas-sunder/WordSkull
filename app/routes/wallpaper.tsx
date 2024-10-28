import { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    {
      title:
        "💀 Fantasy Wallpapers on WordSkull – 4K HD Anime, Fantasy, Dragons, Skulls & E-Girl Vibes 🖼️🎉✨",
    },
    {
      name: "description",
      content:
        "✨ Discover stunning free 4K wallpapers that bring the fantasy world of Word Skull to life! Whether you’re into epic dragons, cool skull art, anime, or e-girl aesthetics, we’ve got something for every vibe. Download your favorites and give your screen a magical new look! 🖼️✨ 🧠💜",
    },
  ];
};

function Wallpaper() {
  return (
    <div className="flex flex-col leading-relaxed tracking-wider mt-3 sm:mt-5 gap-8 overflow-hidden justify-center items-center">
      <header>
        <h1 className="mt-[0.7em] text-5xl font-nunito text-skull-dark-brown">
          Free 4K HD Wallpapers
        </h1>
      </header>
      <main className="flex w-full max-w-[1200px] justify-center items-center">
        <div className="flex flex-col w-full max-w-[800px]">
          <input type="search" className="flex border-2 rounded-full w-full" />
        </div>
      </main>
    </div>
  );
}

export default Wallpaper;
