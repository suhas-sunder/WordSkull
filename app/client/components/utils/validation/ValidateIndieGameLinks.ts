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
          "Please add at least one valid link if you wish to submit this optional links form.",
      },
    };
  }

  const patterns: Record<string, { regex: RegExp; message: string }> = {
    steam_url: {
      regex: /^https:\/\/store\.steampowered\.com\/app\/\d+\/.*$/,
      message:
        "Invalid Steam URL. It should match: https://store.steampowered.com/app/{appId}/{name}",
    },
    itch_url: {
      regex: /^https:\/\/[a-z0-9-]+\.itch\.io\/.*$/,
      message:
        "Invalid Itch.io URL. It should match: https://{username}.itch.io/{game-slug}",
    },
    epic_url: {
      regex: /^https:\/\/store\.epicgames\.com\/[a-z]{2}\/p\/.*$/,
      message:
        "Invalid Epic Games URL. It should match: https://store.epicgames.com/{locale}/p/{game-slug}",
    },
    apple_url: {
      regex: /^https:\/\/apps\.apple\.com\/[a-z]{2}\/app\/.*\/id\d+.*$/,
      message:
        "Invalid Apple URL. It should match: https://apps.apple.com/{locale}/app/{name}/id{appId}",
    },
    play_store_url: {
      regex:
        /^https:\/\/play\.google\.com\/store\/apps\/details\?id=[a-zA-Z0-9._-]+$/,
      message:
        "Invalid Play Store URL. It should match: https://play.google.com/store/apps/details?id={package_name}",
    },
    game_jolt_url: {
      regex: /^https:\/\/gamejolt\.com\/games\/[a-zA-Z0-9_-]+\/\d+$/,
      message:
        "Invalid Game Jolt URL. It should match: https://gamejolt.com/games/{game-name}/{id}",
    },
    gog_url: {
      regex: /^https:\/\/www\.gog\.com\/game\/[a-zA-Z0-9_]+$/,
      message:
        "Invalid GOG URL. It should match: https://www.gog.com/game/{game-name}",
    },
    humble_bundle_url: {
      regex: /^https:\/\/www\.humblebundle\.com\/store\/[a-zA-Z0-9_-]+$/,
      message:
        "Invalid Humble Bundle URL. It should match: https://www.humblebundle.com/store/{game-name}",
    },
    nintendo_shop_url: {
      regex:
        /^https:\/\/www\.nintendo\.com\/store\/products\/[a-zA-Z0-9-]+-switch\/$/,
      message:
        "Invalid Nintendo Shop URL. It should match: https://www.nintendo.com/store/products/{game-name-switch}/",
    },
    playstation_store_url: {
      regex:
        /^https:\/\/store\.playstation\.com\/[a-z]{2}-[a-z]{2}\/product\/[A-Z0-9]{12}$/,
      message:
        "Invalid PlayStation Store URL. It should match: https://store.playstation.com/{locale}/product/{product-id}",
    },
    game_landing_page_url: {
      regex: /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/.*)?$/,
      message: "Invalid Game Landing Page URL. It should be a valid web URL.",
    },
    youtube_url: {
      regex: /^https:\/\/(www\.)?youtube\.com\/channel\/[a-zA-Z0-9_-]+$/,
      message:
        "Invalid YouTube URL. It should match: https://www.youtube.com/channel/{channel-id}",
    },
    tiktok_url: {
      regex: /^https:\/\/(www\.)?tiktok\.com\/@.+$/,
      message:
        "Invalid TikTok URL. It should match: https://www.tiktok.com/@{username}",
    },
    reddit_url: {
      regex: /^https:\/\/(www\.)?reddit\.com\/r\/[a-zA-Z0-9_-]+$/,
      message:
        "Invalid Reddit URL. It should match: https://www.reddit.com/r/{subreddit}",
    },
    discord_url: {
      regex: /^https:\/\/discord\.gg\/[a-zA-Z0-9]{7,}$/,
      message:
        "Invalid Discord URL. It should match: https://discord.gg/{invite-code}",
    },
    instagram_url: {
      regex: /^https:\/\/(www\.)?instagram\.com\/[a-zA-Z0-9._-]+\/?$/,
      message:
        "Invalid Instagram URL. It should match: https://www.instagram.com/{username}",
    },
    facebook_url: {
      regex: /^https:\/\/(www\.)?facebook\.com\/[a-zA-Z0-9._-]+\/?$/,
      message:
        "Invalid Facebook URL. It should match: https://www.facebook.com/{page-name}",
    },
    linkedin_url: {
      regex: /^https:\/\/(www\.)?linkedin\.com\/in\/[a-zA-Z0-9_-]+$/,
      message:
        "Invalid LinkedIn URL. It should match: https://www.linkedin.com/in/{username}",
    },
    twitter_url: {
      regex: /^https:\/\/twitter\.com\/[a-zA-Z0-9_]{1,15}$/,
      message:
        "Invalid Twitter URL. It should match: https://twitter.com/{username}",
    },
    mastodon_url: {
      regex: /^https:\/\/[a-zA-Z0-9_-]+\.mastodon\.social\/@[a-zA-Z0-9_-]+$/,
      message:
        "Invalid Mastodon URL. It should match: https://{instance}.mastodon.social/@{username}",
    },
    pinterest_url: {
      regex: /^https:\/\/www\.pinterest\.com\/[a-zA-Z0-9._-]+\/?$/,
      message:
        "Invalid Pinterest URL. It should match: https://www.pinterest.com/{username}/",
    },
    paypal_url: {
      regex:
        /^https:\/\/www\.paypal\.com\/donate\/\?hosted_button_id=[a-zA-Z0-9]+$/,
      message:
        "Invalid PayPal URL. It should match: https://www.paypal.com/donate/?hosted_button_id={id}",
    },
    kofi_url: {
      regex: /^https:\/\/ko-fi\.com\/[a-zA-Z0-9_-]+$/,
      message:
        "Invalid Ko-fi URL. It should match: https://ko-fi.com/{username}",
    },
    patreon_url: {
      regex: /^https:\/\/(www\.)?patreon\.com\/[a-zA-Z0-9_-]+$/,
      message:
        "Invalid Patreon URL. It should match: https://www.patreon.com/{username}",
    },
    kickstarter_url: {
      regex:
        /^https:\/\/www\.kickstarter\.com\/projects\/[a-zA-Z0-9_-]+\/[a-zA-Z0-9_-]+$/,
      message:
        "Invalid Kickstarter URL. It should match: https://www.kickstarter.com/projects/{project-id}/{project-name}",
    },
    indiegogo_url: {
      regex: /^https:\/\/www\.indiegogo\.com\/projects\/[a-zA-Z0-9_-]+$/,
      message:
        "Invalid Indiegogo URL. It should match: https://www.indiegogo.com/projects/{project-name}",
    },
    website_donation_url: {
      regex: /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/.*)?$/,
      message: "Invalid Website Donation URL. It should be a valid web URL.",
    },
    youtube_trailer_title: {
      regex: /^.{1,100}$/,
      message:
        "Invalid YouTube Trailer Title. It should be a non-empty string up to 100 characters.",
    },
    youtube_video_trailer_url: {
      regex: /^https:\/\/(www\.)?youtube\.com\/watch\?v=[a-zA-Z0-9_-]+$/,
      message:
        "Invalid YouTube Trailer URL. It should match: https://www.youtube.com/watch?v={video-id}",
    },
  };

  const errors: Record<string, { error: string }> = {};

  for (const [key, url] of Object.entries(urls)) {
    if (url) {
      const validation = patterns[key];
      if (validation && !validation.regex.test(url)) {
        errors[key] = { error: validation.message };
      }
    }
  }

  return Object.keys(errors).length > 0 ? errors : null;
}

export default ValidateIndieGameLinks;
