import { MetaFunction } from "@remix-run/node";
import SocialLinks from "../client/components/navigation/SocialLinks";

export const meta: MetaFunction = () => {
  return [
    {
      title:
        "💀 Fantasy Wallpapers on WordSkull – 4K HD Anime, Fantasy, Dragons, Skulls & E-Girl Vibes 🖼️🎉✨",
    },
    {
      name: "description",
      content:
        "✨ Free 4K wallpapers from Word Skull's fantasy world! Epic dragons, dungeon, anime, e-girl vibes. Download now to give your screen a magical touch! 🖼️✨",
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
      <main className="flex flex-col gap-8 w-full max-w-[1200px] justify-center items-center">
        <div className="flex flex-col w-full max-w-[800px]">
          <input type="search" className="flex border-2 rounded-full w-full" />
        </div>
        <SocialLinks />
      </main>
    </div>
  );
}

export default Wallpaper;
