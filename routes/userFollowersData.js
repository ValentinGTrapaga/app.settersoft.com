const mongoAPI = require('../controllers/igUserFollowersController.js')
const express = require('express')
const router = express.Router()
const excel = require('../services/excel.js')
const instagram = require('../services/instagram.js')
const tiktok = require('../services/tiktok.js')

const { DateTime } = require('luxon')
const { formatItem } = require('../utils/formatItem')
const getGrowthByDay = require('../utils/getGrowthByDay.js')
const filterUserResultsArray = require('../utils/filterUsersResultsArray.js')

router.get('/', async (req, res) => {
  const usernameQuery = req.query.username
  if (usernameQuery) {
    console.log({ usernameQuery })
    try {
      const data = await mongoAPI.getByUsername(usernameQuery)
      const addedGrowthArray = getGrowthByDay(data)
      const formattedData = addedGrowthArray.map(formatItem)

      return res.json({ data: formattedData })
    } catch (error) {
      console.log({ error })
      return res.status(500).json({ error: 'Internal Server Error' })
    }
  } else {
    try {
      const data = await mongoAPI.getAll()
      const addedGrowthArray = getGrowthByDay(data)
      const formattedData = addedGrowthArray.map(formatItem)

      return res.json({ data: formattedData })
    } catch (error) {
      console.log({ error })
      return res.status(500).json({ error: 'Internal Server Error' })
    }
  }
})
router.get('/lastDay', async (req, res) => {
  try {
    const now = DateTime.now().set({ hour: 0, minute: 0, second: 0, millisecond: 0 }).setZone('utc')
    const twentyFourHoursAgo = now.minus({ days: 1 }).toJSDate()

    const data = await mongoAPI.getAfterThan(twentyFourHoursAgo)
    const addedGrowthArray = getGrowthByDay(data)
    const formattedData = addedGrowthArray.map(formatItem)

    return res.json({ data: formattedData })
  } catch (error) {
    console.log({ error })
    return res.status(500).json({ error: 'Internal Server Error' })
  }
}
)
router.get('/lastWeek', async (req, res) => {
  try {
    const now = DateTime.now().set({ hour: 0, minute: 0, second: 0, millisecond: 0 }).setZone('utc')
    const sevenDaysAgo = now.minus({ days: 7 }).toJSDate()

    const data = await mongoAPI.getAfterThan(sevenDaysAgo)

    const addedGrowthArray = getGrowthByDay(data)
    const formattedData = addedGrowthArray.map(formatItem)

    return res.json({ data: formattedData })
  } catch (error) {
    console.log({ error })
    return res.status(500).json({ error: 'Internal Server Error' })
  }
})
router.get('/lastMonth', async (req, res) => {
  try {
    const now = DateTime.now().set({ hour: 0, minute: 0, second: 0, millisecond: 0 }).setZone('utc')
    const thirtyDaysAgo = now.minus({ month: 1 }).toJSDate().toUTCString()

    const data = await mongoAPI.getAfterThan(thirtyDaysAgo)

    const addedGrowthArray = getGrowthByDay(data)
    const formattedData = addedGrowthArray.map(formatItem)

    return res.json({ data: formattedData })
  } catch (error) {
    console.log({ error })
    return res.status(500).json({ error: 'Internal Server Error' })
  }
})
router.get('/createRun', async (req, res) => {
  try {
    const apiKeyFromQuery = req.query.apiKey
    const { data, apiKey } = await excel.getData()

    if (apiKeyFromQuery !== apiKey) {
      return res.status(401).json({ error: 'Unauthorized' })
    }

    const igFollowers = await instagram.getLastRun()
    const tiktokFollowers = await tiktok.getLastRun()

    // return res.status(200).json({ tiktokFollowers });

    const dataWithTiktok = filterUserResultsArray(data, tiktokFollowers, igFollowers)
    const filteredData = dataWithTiktok.filter((item) => item)
    const savedRun = await mongoAPI.createARun(filteredData)

    return res.status(200).json({ savedRun })
  } catch (error) {
    console.log({ error })
    return res.status(500).json({ error: 'Internal Server Error' })
  }
})
router.get('/resetDB', async (req, res) => {
  const testEnv = process.env.NODE_ENV === 'test'
  console.log(testEnv)
  if (!testEnv) {
    throw new Error("You can't do this on production")
  }
  try {
    const deleted = await mongoAPI.deleteAll()
    return res.status(200).json({ deleted })
  } catch (error) {
    console.log({ error })
    return res.status(500).json({ error: 'Internal Server Error' })
  }
})

module.exports = router
