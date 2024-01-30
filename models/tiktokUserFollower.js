const { Schema, model } = require('mongoose');

const TiktokUserFollowerSchema = new Schema({
  tiktok_username: String,
  tiktok_followersCount: Number,
  tiktok_followsCount: Number,
  tiktok_profilePicUrl: String,
  tiktok_postsCount: Number,
  date: { type: Date, default: Date.now },
});

module.exports = model('TiktokUserFollower', TiktokUserFollowerSchema);