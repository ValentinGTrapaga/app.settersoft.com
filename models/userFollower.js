const { Schema, model } = require('mongoose');

const IgUserDataSchema = new Schema({
  ig_username: String,
  ig_followersCount: Number,
  ig_followsCount: Number,
  ig_profilePicUrl: String,
  ig_profilePicUrlHD: String,
  ig_igtvVideoCount: Number,
  ig_postsCount: Number,
  ig_highlightReelCount: Number,
  date: { type: Date, default: Date.now },
});

//TODO: Add tiktok and yt
module.exports = model('UserFollowers', IgUserDataSchema)
