interface PropType {
  urls: Record<string, string | undefined>;
}

function ValidateIndieGameLinks({ urls }: PropType) {
  // Check if all URLs are empty or undefined
  const isEmpty = Object.values(urls).every((value) => !value);

  if (isEmpty) {
    return {
      isEmpty: {
        error:
          "Please add at least one valid link if you wish to submit this optional links form or something similar. If a valid link is being rejected, please contact us!",
      },
    };
  }

  const patterns: Record<string, { regex: RegExp; message: string }> = {
    steam_url: {
      regex: /store\.steampowered\.com\/app\/\d+/i,
      message: "Invalid Steam URL. It should match: https://store.steampowered.com/app/{appId}/{name} and end with .com, .co, or .io or something similar. If a valid link is being rejected, please contact us!",
    },
    itch_url: {
      regex: /[a-z0-9-]+\.itch\.io/i,
      message: "Invalid Itch.io URL. It should match: https://{username}.itch.io/{game-slug} and end with .com, .co, or .io or something similar. If a valid link is being rejected, please contact us!",
    },
    epic_url: {
      regex: /store\.epicgames\.com/i,
      message: "Invalid Epic Games URL. It should match: https://store.epicgames.com/{locale}/p/{game-slug} and end with .com, .co, or .io or something similar. If a valid link is being rejected, please contact us!",
    },
    apple_url: {
      regex: /apps\.apple\.com/i,
      message: "Invalid Apple URL. It should match: https://apps.apple.com/{locale}/app/{name}/id{appId} and end with .com, .co, or .io or something similar. If a valid link is being rejected, please contact us!",
    },
    play_store_url: {
      regex: /play\.google\.com\/store\/apps\/details/i,
      message: "Invalid Play Store URL. It should match: https://play.google.com/store/apps/details?id={package_name} and end with .com, .co, or .io or something similar. If a valid link is being rejected, please contact us!",
    },
    game_jolt_url: {
      regex: /gamejolt\.com\/games/i,
      message: "Invalid Game Jolt URL. It should match: https://gamejolt.com/games/{game-name}/{id} and end with .com, .co, or .io or something similar. If a valid link is being rejected, please contact us!",
    },
    gog_url: {
      regex: /gog\.com\/game/i,
      message: "Invalid GOG URL. It should match: https://www.gog.com/game/{game-name} and end with .com, .co, or .io or something similar. If a valid link is being rejected, please contact us!",
    },
    humble_bundle_url: {
      regex: /humblebundle\.com\/store/i,
      message: "Invalid Humble Bundle URL. It should match: https://www.humblebundle.com/store/{game-name} and end with .com, .co, or .io or something similar. If a valid link is being rejected, please contact us!",
    },
    youtube_url: {
      regex: /youtube\.com/i,
      message: "Invalid YouTube URL. It should match: https://www.youtube.com/channel/{channel-id} and end with .com, .co, or .io or something similar. If a valid link is being rejected, please contact us!",
    },
    tiktok_url: {
      regex: /tiktok\.com/i,
      message: "Invalid TikTok URL. It should match: https://www.tiktok.com/@{username} and end with .com, .co, or .io or something similar. If a valid link is being rejected, please contact us!",
    },
    reddit_url: {
      regex: /reddit\.com/i,
      message: "Invalid Reddit URL. It should match: https://www.reddit.com/r/{subreddit} and end with .com, .co, or .io or something similar. If a valid link is being rejected, please contact us!",
    },
    discord_url: {
      regex: /discord\.gg/i,
      message: "Invalid Discord URL. It should match: https://discord.gg/{invite-code} and end with .com, .co, or .io or something similar. If a valid link is being rejected, please contact us!",
    },
    instagram_url: {
      regex: /instagram\.com/i,
      message: "Invalid Instagram URL. It should match: https://www.instagram.com/{username} and end with .com, .co, or .io or something similar. If a valid link is being rejected, please contact us!",
    },
    facebook_url: {
      regex: /facebook\.com/i,
      message: "Invalid Facebook URL. It should match: https://www.facebook.com/{page-name} and end with .com, .co, or .io or something similar. If a valid link is being rejected, please contact us!",
    },
    linkedin_url: {
      regex: /linkedin\.com\/in/i,
      message: "Invalid LinkedIn URL. It should match: https://www.linkedin.com/in/{username} and end with .com, .co, or .io or something similar. If a valid link is being rejected, please contact us!",
    },
    twitter_url: {
      regex: /twitter\.com/i,
      message: "Invalid Twitter URL. It should match: https://twitter.com/{username} and end with .com, .co, or .io or something similar. If a valid link is being rejected, please contact us!",
    },
    mastodon_url: {
      regex: /mastodon\.social/i,
      message: "Invalid Mastodon URL. It should match: https://{instance}.mastodon.social/@{username} and end with .com, .co, or .io or something similar. If a valid link is being rejected, please contact us!",
    },
    pinterest_url: {
      regex: /pinterest\.com/i,
      message: "Invalid Pinterest URL. It should match: https://www.pinterest.com/{username}/ and end with .com, .co, or .io or something similar. If a valid link is being rejected, please contact us!",
    },
    paypal_url: {
      regex: /paypal\.com/i,
      message: "Invalid PayPal URL. It should match: https://www.paypal.com/donate/?hosted_button_id={id} and end with .com, .co, or .io or something similar. If a valid link is being rejected, please contact us!",
    },
    kofi_url: {
      regex: /ko-fi\.com/i,
      message: "Invalid Ko-fi URL. It should match: https://ko-fi.com/{username} and end with .com, .co, or .io or something similar. If a valid link is being rejected, please contact us!",
    },
    patreon_url: {
      regex: /patreon\.com/i,
      message: "Invalid Patreon URL. It should match: https://www.patreon.com/{username} and end with .com, .co, or .io or something similar. If a valid link is being rejected, please contact us!",
    },
    kickstarter_url: {
      regex: /kickstarter\.com/i,
      message: "Invalid Kickstarter URL. It should match: https://www.kickstarter.com/projects/{project-id}/{project-name} and end with .com, .co, or .io or something similar. If a valid link is being rejected, please contact us!",
    },
    indiegogo_url: {
      regex: /indiegogo\.com/i,
      message: "Invalid Indiegogo URL. It should match: https://www.indiegogo.com/projects/{project-name} and end with .com, .co, or .io or something similar. If a valid link is being rejected, please contact us!",
    },
    website_donation_url: {
      regex: /([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}/i,
      message: "Invalid Website Donation URL. It should be a valid web URL and end with .com, .co, or .io or something similar. If a valid link is being rejected, please contact us!",
    },
    youtube_trailer_title: {
      regex: /^.{1,100}$/,
      message: "Invalid YouTube Trailer Title. It should be a non-empty string up to 100 characters or something similar. If a valid link is being rejected, please contact us!",
    },
    youtube_video_trailer_url: {
      regex: /youtube\.com\/watch\?v=/i,
      message: "Invalid YouTube Trailer URL. It should match: https://www.youtube.com/watch?v={video-id} and end with .com, .co, or .io or something similar. If a valid link is being rejected, please contact us!",
    },
  };

  const errors: Record<string, { error: string }> = {};

    // Universal URL pattern to match URLs with common domain endings like .com, .co, .io
    const universalPattern = /^(https?:\/\/)?([a-z0-9-]+\.)+[a-z]{2,}(\/[^\s]*)?$/i;

    // Universal error message for invalid URLs
    const universalErrorMessage = "Invalid URL. It should be a valid web URL ending with .com, .co, or .io.";
  

  for (const [key, url] of Object.entries(urls)) {
    if (url) {
      const validation = patterns[key];
      if (validation && !validation.regex.test(url)) {
        errors[key] = { error: validation.message };
      } else  if (!universalPattern.test(url)) {
        errors[key] = { error: universalErrorMessage };
      }
    }
  }

  return Object.keys(errors).length > 0 ? errors : null;
}

export default ValidateIndieGameLinks;
