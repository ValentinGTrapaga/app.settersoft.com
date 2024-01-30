const tiktokDB = require('../models/tiktokUserFollower')

const tiktokMongoAPI = {
  getAll: async () => {
    const data = await tiktokDB.find({});

    return data
  },
  getAfterThan: async (dateQuery) => {
    const data = await tiktokDB.find({ date: { $gte: dateQuery } });

    return data
  },
  getBetween: async (date1, date2) => {
    const startDate = new Date(date1);
    const endDate = new Date(date2);

    const data = await tiktokDB.find({ date: { $gte: startDate, $lte: endDate } });

    return data
  },
  getLastRun: async () => {
    const data = (await tiktokDB.findOne().sort({ date: -1 }))

    return data
  },
  createARun: async (runArray) => {
    const UserArray = await tiktokDB.insertMany(runArray);

    return UserArray
  },
  getByUsername: async (username) => {
    const data = await tiktokDB.find({ tiktok_username: username });

    return data
  }
};

module.exports = tiktokMongoAPI;