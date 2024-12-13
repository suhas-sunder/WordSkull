import cloudflareR2API from "../../api/cloudflareR2API";
import ProcessTryCatchErrors from "../errors/ProcessTryCatchErrors";

export default async function GetIndieDevJson({
  username,
}: {
  username: string;
}) {
  const defaultJsonObj = {
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
    devName: "",
    publisherName: "",
    genre: "",
    platforms: [],
    baseGamePrice: "",
    releaseDate: "",
    singlePlayer: true,
    Multiplayer: false,
    coop: false,
    achievements: false,
    demo: false,
    controllerSupport: false,
    tenCustomTags: [],
    additionalTagsFromList: [],
    authorName: "",
    profession: "",
    articles: [
      {
        title: "",
        description: "",
      },
    ],
  };

  try {
    const response = await cloudflareR2API.get(
      `wordskull-read-write/indiegamedevs/${username}/indiedevdata.json`,
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
