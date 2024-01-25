const { DateTime } = require('luxon');


function formatItem (item) {
  const { date, _doc, ig_growth } = item
  const { ig_username, ig_followersCount, ig_followsCount, ig_highlightReelCount, ig_igtvVideoCount, ig_postsCount, ig_profilePicUrl, ig_profilePicUrlHD } = _doc
  return {
    fecha: DateTime.fromJSDate(new Date(date)).toFormat("dd-MM-yyyy"),
    ig_username,
    ig_followersCount,
    ig_growth,
    ig_followsCount,
    ig_highlightReelCount,
    ig_igtvVideoCount,
    ig_postsCount,
    ig_profilePicUrl,
    ig_profilePicUrlHD
  }
}

module.exports = { formatItem }