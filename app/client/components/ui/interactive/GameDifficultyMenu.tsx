import { useNavigate } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";
import Skull_1 from "../../../assets/images/skull_1.png";
import Skull_2 from "../../../assets/images/skull_2.png";
import Skull_3 from "../../../assets/images/skull_3.png";
import Skull_4 from "../../../assets/images/skull_4.png";
import Skull_1_Webp from "../../../assets/images/skull_1.webp";
import Skull_2_Webp from "../../../assets/images/skull_2.webp";
import Skull_3_Webp from "../../../assets/images/skull_3.webp";
import Skull_4_Webp from "../../../assets/images/skull_4.webp";

interface PropType {
  title: string;
  emoji: string;
}

function GameDifficultyMenu({ title, emoji }: PropType) {
  const { darkThemeActive } = useTheme();
  const navigate = useNavigate();

  return (
    <div className="flex flex-col flex-wrap justify-center gap-10 items-center w-full pb-14">
      <div className="flex flex-col justify-center max-w-[1200px] items-center gap-2">
        <div className="absolute -top-20"></div>
        <h2
          className={`${
            darkThemeActive ? "text-stone-400" : "text-skull-dark-brown"
          } font-nunito text-2xl `}
        >
          {title}
        </h2>
        <p
          className={`${
            darkThemeActive ? "text-stone-300" : "text-skull-super-dark-brown"
          }  sm:text-lg leading-loose font-lato mx-5 sm:mx-8 text-center`}
        >
          <span className="hidden sm:inline">
            Complete this word game puzzle by guessing
          </span>{" "}
          <span className="inline sm:hidden">Guess</span> the correct word for
          each row before your lives run out. Defeat the skulls to unlock the
          final boss (coming soon) and win the weekly challenge.
        </p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-12 lg:gap-16 justify-center items-center">
        <button
          onClick={() => navigate(`/word-skull-game-easy-mode`)}
          className="group relative flex h-full col-span-2 flex-col gap-2 w-[15em] text-pumpkin-orange hover:text-amber-600 justify-center items-center text-center pt-8 pb-12 hover:scale-[1.05] transition-scale duration-300 shadow-md hover:shadow-lg hover:shadow-amber-600/30 rounded-t-[150em] rounded-b-full bg-white shadow-pumpkin-orange/20 bg-opacity-10"
        >
          <div className="absolute bottom-2 shadow-inner rounded-full p-[0.08em] shadow-pumpkin-orange/20 group-hover:shadow-amber-600/30  opacity-65">{emoji}</div>
          <h3 className="text-lg font-nunito">Boneheads</h3>
          <picture>
            <source srcSet={`${Skull_1_Webp}`} type="image/webp" />
            <source srcSet={`${Skull_1}`} type="image/png" />
            <img
              src={Skull_1}
              alt="Word Skull Classic boneheads difficulty easy"
              className="flex rounded-lg"
              width="180"
              height="180"
              loading="lazy"
            />
          </picture>
          <h3 className="font-lato mt-auto">Difficulty: Easy</h3>
          <p className="font-lato">3 - 5 letters per word</p>
          <div
            className={`group-hover:bg-amber-600 bg-pumpkin-orange flex z-10 text-white px-8 text-lg font-nunito rounded-full mt-2 tracking-widest leading-relaxed border-stone-300 hover:border-stone-400`}
          >
            Play
          </div>
        </button>
        <button
          onClick={() => navigate(`/word-skull-game-medium-mode`)}
          className="group relative flex h-full col-span-2 flex-col gap-2 w-[15em] text-pumpkin-orange hover:text-amber-600 justify-center items-center text-center pt-8 pb-12  hover:scale-[1.05] transition-scale duration-300 shadow-md hover:shadow-lg hover:shadow-amber-600/30 rounded-t-[150em] rounded-b-full bg-white shadow-pumpkin-orange/20 bg-opacity-10"
        >
          <div className="absolute bottom-2 shadow-inner rounded-full p-[0.08em] shadow-pumpkin-orange/20 group-hover:shadow-amber-600/30  opacity-65">{emoji}</div>
          <h3 className="text-lg font-nunito">Specter</h3>
          <picture>
            <source srcSet={`${Skull_2_Webp}`} type="image/webp" />
            <source srcSet={`${Skull_2}`} type="image/png" />
            <img
              src={Skull_2}
              alt="Word Skull Classic specter medium difficulty"
              className="flex rounded-lg"
              width="180"
              height="180"
              loading="lazy"
            />
          </picture>
          <h4 className="font-lato mt-auto">Difficulty: Medium</h4>
          <p className="font-lato">3 - 6 letters per word</p>
          <div
            className={`group-hover:bg-amber-600 bg-pumpkin-orange flex z-10 text-white px-8 text-lg font-nunito rounded-full mt-2 tracking-widest leading-relaxed border-stone-300 hover:border-stone-400`}
          >
            Play
          </div>
        </button>
        <button
          onClick={() => navigate(`/word-skull-game-hard-mode`)}
          className="group relative flex h-full col-span-2 flex-col gap-2 w-[15em] text-pumpkin-orange hover:text-amber-600 justify-center items-center text-center pt-8 pb-12 hover:scale-[1.05] transition-scale duration-300 shadow-md hover:shadow-lg hover:shadow-amber-600/30 rounded-t-[150em] rounded-b-full bg-white shadow-pumpkin-orange/20 bg-opacity-10"
        >
          <div className="absolute bottom-2 shadow-inner rounded-full p-[0.08em] shadow-pumpkin-orange/20 group-hover:shadow-amber-600/30  opacity-65">{emoji}</div>
          <h3 className="text-lg font-nunito">Reapers</h3>
          <picture>
            <source srcSet={`${Skull_3_Webp}`} type="image/webp" />
            <source srcSet={`${Skull_3}`} type="image/png" />
            <img
              src={Skull_3}
              alt="Word Skull Classic reapers hard difficulty"
              className="flex rounded-lg"
              width="180"
              height="180"
              loading="lazy"
            />
          </picture>
          <h4 className="font-lato mt-auto">Difficulty: Hard</h4>
          <p className="font-lato">3 - 7 letters per word</p>
          <div
            className={`group-hover:bg-amber-600 bg-pumpkin-orange flex z-10 text-white px-8 text-lg font-nunito rounded-full mt-2 tracking-widest leading-relaxed border-stone-300 hover:border-stone-400`}
          >
            Play
          </div>
        </button>
        <button
          onClick={() => navigate(`/word-skull-game-extreme-mode`)}
          className="group relative flex h-full col-span-2 flex-col lg:col-start-3 xl:col-start-auto gap-2 w-[15em] text-pumpkin-orange hover:text-amber-600 justify-center items-center text-center pt-8 pb-12  hover:scale-[1.05] transition-scale duration-300 shadow-md hover:shadow-lg hover:shadow-amber-600/30 rounded-t-[150em] rounded-b-full bg-white shadow-pumpkin-orange/20 bg-opacity-10"
        >
          <div className="absolute bottom-2 shadow-inner rounded-full p-[0.08em] shadow-pumpkin-orange/20 group-hover:shadow-amber-600/30  opacity-65">{emoji}</div>
          <h3 className="text-lg font-nunito">Royal Lichen</h3>
          <picture>
            <source srcSet={`${Skull_4_Webp}`} type="image/webp" />
            <source srcSet={`${Skull_4}`} type="image/png" />
            <img
              src={Skull_4}
              alt="Word Skull Classic royal lichen extreme difficulty"
              className="flex rounded-lg"
              width="180"
              height="180"
              loading="lazy"
            />
          </picture>
          <h4 className="font-lato mt-auto">Difficulty: Extreme</h4>
          <p className="font-lato">3 - 9 letters per word</p>
          <div
            className={`group-hover:bg-amber-600 bg-pumpkin-orange flex z-10 text-white px-8 text-lg font-nunito rounded-full mt-2 tracking-widest leading-relaxed border-stone-300 hover:border-stone-400`}
          >
            Play
          </div>
        </button>
      </div>
    </div>
  );
}

export default GameDifficultyMenu;
