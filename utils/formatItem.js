const { DateTime } = require('luxon');


function formatItem (item) {
  const { date, _doc, ig_growth } = item
  const { ig_username, ig_followersCount, ig_followsCount } = _doc
  return {
    fecha: DateTime.fromJSDate(new Date(date)).toFormat("dd-MM-yyyy"),
    ig_username,
    ig_followersCount,
    ig_growth,
  }
}

module.exports = { formatItem }