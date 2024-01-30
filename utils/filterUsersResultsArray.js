const { DateTime } = require('luxon')

function filterUserResultsArray (data, tiktokUsersResultsArray, igUsersResultsArray) {
  const dataWithTiktok = data.map((item) => {
    const userData = {
      ig_username: "",
      ig_followersCount: 0,
      ig_followsCount: 0,
      ig_profilePicUrl: "",
      ig_profilePicUrlHD: "",
      ig_igtvVideoCount: 0,
      ig_postsCount: 0,
      ig_highlightReelCount: 0,
      date: DateTime.now().setZone("utc").toJSDate().toISOString(),
      tiktok_username: "",
      tiktok_followersCount: 0,
      tiktok_followsCount: 0,
      tiktok_profilePicUrl: "",
      tiktok_postsCount: 0,
    }
    const tiktokItem = tiktokUsersResultsArray.find((tiktok) => tiktok.tiktok_username === item.tiktok);
    const igItem = igUsersResultsArray.find((ig) => ig.ig_username === item.ig);
    if (igItem) {
      userData.ig_username = igItem.ig_username;
      userData.ig_followersCount = igItem.ig_followersCount;
      userData.ig_followsCount = igItem.ig_followsCount;
      userData.ig_profilePicUrl = igItem.ig_profilePicUrl;
      userData.ig_profilePicUrlHD = igItem.ig_profilePicUrlHD;
      userData.ig_igtvVideoCount = igItem.ig_igtvVideoCount;
      userData.ig_postsCount = igItem.ig_postsCount;
      userData.ig_highlightReelCount = igItem.ig_highlightReelCount;
    }
    if (tiktokItem) {
      userData.tiktok_username = tiktokItem.tiktok_username;
      userData.tiktok_followersCount = tiktokItem.tiktok_followersCount;
      userData.tiktok_followsCount = tiktokItem.tiktok_followsCount;
      userData.tiktok_profilePicUrl = tiktokItem.tiktok_profilePicUrl;
      userData.tiktok_postsCount = tiktokItem.tiktok_postsCount;
    }
    if (!tiktokItem && !igItem) {
      return null
    }
    return userData
  })

  return dataWithTiktok
}

module.exports = filterUserResultsArray