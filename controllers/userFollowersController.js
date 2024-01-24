const User = require('../models/userFollower');

const mongoAPI = {
  getAll: async () => {
    const data = await User.find({});

    return data
  },
  getAfterThan: async (dateQuery) => {
    const data = await User.find({ date: { $gte: dateQuery } });

    return data
  },
  getBetween: async (date1, date2) => {
    const startDate = new Date(date1);
    const endDate = new Date(date2);

    const data = await User.find({ date: { $gte: startDate, $lte: endDate } });

    return data
  },
  getLastRun: async () => {
    const data = (await User.findOne().sort({ date: -1 }))

    return data
  },
  createARun: async (runArray) => {
    const UserArray = await User.insertMany(runArray);

    return UserArray
  },
};

module.exports = mongoAPI;