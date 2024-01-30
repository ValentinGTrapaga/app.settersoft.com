const { DateTime } = require("luxon");

const instagram = {
  getLastRun: async () => {
    const igLastRun = await fetch(
      `https://api.apify.com/v2/acts/apify~instagram-profile-scraper/runs/last/dataset/items?token=${process.env.APIFY_TOKEN}`,
      { method: "GET" },
    );

    const items = (await igLastRun.json())

    const itemsFiltered = items.filter((ig) => !ig.error);

    const igFollowers = itemsFiltered.map((item) => {
      const {
        username,
        followersCount,
        followsCount,
        profilePicUrl,
        profilePicUrlHD,
        igtvVideoCount,
        postsCount,
        highlightReelCount,
      } = item;

      return {
        ig_username: String(username),
        ig_followersCount: Number(followersCount),
        ig_followsCount: Number(followsCount),
        ig_profilePicUrl: String(profilePicUrl),
        ig_profilePicUrlHD: String(profilePicUrlHD),
        ig_igtvVideoCount: Number(igtvVideoCount),
        ig_postsCount: Number(postsCount),
        ig_highlightReelCount: Number(highlightReelCount),
        date: DateTime.now().setZone("utc").toJSDate().toISOString(),
      };
    });

    return igFollowers
  }
}

module.exports = instagram