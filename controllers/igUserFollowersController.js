const userFollowers = require('../models/UserFollower')

const mongoAPI = {
  getAll: async () => {
    const data = await userFollowers.find({})

    return data
  },
  getAfterThan: async (dateQuery) => {
    const data = await userFollowers.find({ date: { $gte: dateQuery } })

    return data
  },
  getBetween: async (date1, date2) => {
    const startDate = new Date(date1)
    const endDate = new Date(date2)

    const data = await userFollowers.find({ date: { $gte: startDate, $lte: endDate } })

    return data
  },
  getLastRun: async () => {
    const data = (await userFollowers.findOne().sort({ date: -1 }))

    return data
  },
  createARun: async (runArray) => {
    const UserArray = await userFollowers.insertMany(runArray)

    return UserArray
  },
  getByUsername: async (username) => {
    const data = await userFollowers.find({ ig_username: username })

    return data
  },
  deleteAll: async () => {
    const data = await userFollowers.deleteMany({})

    return data
  }
}

module.exports = mongoAPI
