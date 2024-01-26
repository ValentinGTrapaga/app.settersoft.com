const mongoAPI = require('../controllers/userFollowersController');
const express = require('express');
const router = express.Router();
const excel = require('../services/excel.js')

const { DateTime } = require('luxon');
const { formatItem } = require('../utils/formatItem');
const getGrowthByDay = require('../utils/getGrowthByDay.js');

router.get('/', async (req, res) => {
  const usernameQuery = req.query.username
  if (usernameQuery) {
    console.log({ usernameQuery })
    try {
      const data = await mongoAPI.getByUsername(usernameQuery);
      const addedGrowthArray = getGrowthByDay(data)
      const formattedData = addedGrowthArray.map(formatItem)

      return res.json({ data: formattedData });
    } catch (error) {
      console.log({ error })
      return res.status(500).json({ error: "Internal Server Error" })
    }
  } else {
    try {

      const data = await mongoAPI.getAll();
      const addedGrowthArray = getGrowthByDay(data)
      const formattedData = addedGrowthArray.map(formatItem)

      return res.json({ data: formattedData });
    } catch (error) {
      console.log({ error })
      return res.status(500).json({ error: "Internal Server Error" })
    }
  }
})
router.get('/lastDay', async (req, res) => {
  try {

    const now = DateTime.now().set({ hour: 0, minute: 0, second: 0, millisecond: 0 }).setZone("utc");
    const twentyFourHoursAgo = now.minus({ days: 1 }).toJSDate()

    const data = await mongoAPI.getAfterThan(twentyFourHoursAgo);
    const addedGrowthArray = getGrowthByDay(data)
    const formattedData = addedGrowthArray.map(formatItem)

    return res.json({ data: formattedData });
  } catch (error) {
    console.log({ error })
    return res.status(500).json({ error: "Internal Server Error" })
  }
}
)
router.get('/lastWeek', async (req, res) => {
  try {

    const now = DateTime.now().set({ hour: 0, minute: 0, second: 0, millisecond: 0 }).setZone("utc");
    const sevenDaysAgo = now.minus({ days: 7 }).toJSDate()

    const data = await mongoAPI.getAfterThan(sevenDaysAgo);

    const addedGrowthArray = getGrowthByDay(data)
    const formattedData = addedGrowthArray.map(formatItem)

    return res.json({ data: formattedData });
  } catch (error) {
    console.log({ error })
    return res.status(500).json({ error: "Internal Server Error" })
  }
})
router.get('/lastMonth', async (req, res) => {
  try {

    const now = DateTime.now().set({ hour: 0, minute: 0, second: 0, millisecond: 0 }).setZone("utc");
    const thirtyDaysAgo = now.minus({ month: 1 }).toJSDate().toUTCString()

    const data = await mongoAPI.getAfterThan(thirtyDaysAgo);

    const addedGrowthArray = getGrowthByDay(data)
    const formattedData = addedGrowthArray.map(formatItem)

    return res.json({ data: formattedData });
  } catch (error) {
    console.log({ error })
    return res.status(500).json({ error: "Internal Server Error" })
  }
})
router.get('/createRun', async (req, res) => {
  try {

    const apiKeyFromQuery = req.query.apiKey
    const { apiKey } = await excel.getData();

    if (apiKeyFromQuery !== apiKey) {
      return res.status(401).json({ error: "Unauthorized" })
    }

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
    const igRun = await mongoAPI.createARun(igFollowers);

    return res.status(200).json({ data: igRun });
  } catch (error) {
    console.log({ error })
    return res.status(500).json({ error: "Internal Server Error" })
  }
})



module.exports = router

