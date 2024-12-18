import cloudflareR2API from "../../api/cloudflareR2API";
import ProcessTryCatchErrors from "../errors/ProcessErrors";

export type GameInfoJSONType = {
  titleOfGame?: string;
  descriptionOfGame?: string;
  steamUrl: string;
  itchUrl: string;
  epicUrl: string;
  appleUrl: string;
  playStoreUrl: string;
  gameJoltUrl: string;
  gogUrl: string;
  humbleBundleUrl: string;
  nintendoShopUrl: string;
  playstationStoreUrl: string;
  gameLandingPageUrl: string;
  youtubeUrl: string;
  tiktokUrl: string;
  redditUrl: string;
  discordUrl: string;
  instagramUrl: string;
  facebookUrl: string;
  linkedinUrl: string;
  twitterUrl: string;
  mastadonUrl: string;
  pinterestUrl: string;
  paypalUrl: string;
  kofiUrl: string;
  patreonUrl: string;
  kickstarterUrl: string;
  indiegogoUrl: string;
  websiteDonationUrl: string;
  youtubeTrailerTitle: string;
  youtubeVideoTrailerUrl: string;
  devName?: string;
  publisherName?: string;
  genre?: string;
  platforms?: string[];
  baseGamePrice?: string;
  releaseDate?: string;
  singlePlayer?: boolean;
  multiplayer?: boolean;
  coop?: boolean;
  achievements?: boolean;
  demo?: boolean;
  controllerSupport?: boolean;
  tenCustomTags?: string[];
  additionalTagsFromList?: string[];
  authorName: string;
  profession: string;
  articles: { title: string; description: string; imgUrl: string }[];
};

export default async function GetIndieDevJson({
  username,
}: {
  username: string;
}) {
  const defaultJsonObj: GameInfoJSONType = {
    steamUrl: "",
    itchUrl: "",
    epicUrl: "",
    appleUrl: "",
    playStoreUrl: "",
    gameJoltUrl: "",
    gogUrl: "",
    humbleBundleUrl: "",
    nintendoShopUrl: "",
    playstationStoreUrl: "",
    gameLandingPageUrl: "",
    youtubeUrl: "",
    tiktokUrl: "",
    redditUrl: "",
    discordUrl: "",
    instagramUrl: "",
    facebookUrl: "",
    linkedinUrl: "",
    twitterUrl: "",
    mastadonUrl: "",
    pinterestUrl: "",
    paypalUrl: "",
    kofiUrl: "",
    patreonUrl: "",
    kickstarterUrl: "",
    indiegogoUrl: "",
    websiteDonationUrl: "",
    youtubeTrailerTitle: "",
    youtubeVideoTrailerUrl: "",
    authorName: "",
    profession: "",
    articles: [
      {
        title: "",
        description: "",
        imgUrl: "",
      },
    ],
  };

  console.log(
    `/indiegamedevs/${username}/json-data-for-indie-game-showcase.json`
  );

  try {
    const response = await cloudflareR2API.get(
      `/indiegamedevs/${username}/json-data-for-indie-game-showcase.json`,
      {
        responseType: "json",
      }
    );

    if (response.status === 200) {
      return response.data;
    } else {
      console.log("Non-200 status, returning defaultJsonObj");
      return defaultJsonObj; // Fallback to default object
    }
  } catch (error) {
    ProcessTryCatchErrors({ error, customError: "", status: 500 });
    return defaultJsonObj; // Fallback to default object
  }
}
