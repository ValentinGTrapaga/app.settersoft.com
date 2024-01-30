const { DateTime } = require('luxon')

function formatItem (item) {
  const { date, _doc, ig_growth, tiktok_growth } = item
  const { ig_username, ig_followersCount, tiktok_username, tiktok_followersCount } = _doc
  return {
    fecha: DateTime.fromJSDate(new Date(date)).toFormat('dd-MM-yyyy'),
    ig_username,
    ig_followersCount,
    ig_growth,
    tiktok_username,
    tiktok_followersCount,
    tiktok_growth
  }
}

module.exports = { formatItem }
