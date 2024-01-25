function getGrowthByDay (itemArray) {
  const flatArray = []
  const group = itemArray.reduce((acc, currItem) => {
    const { ig_username } = currItem
    if (acc[ig_username]) {
      acc[ig_username].push(currItem)
    } else {
      acc[ig_username] = [currItem]
    }

    return acc
  }, {})
  for (const prop in group) {
    for (let i = 0; i < group[prop].length; i++) {
      if (i === 0) {
        group[prop][i]['ig_growth'] = 0
      } else {
        const curr = group[prop][i]
        const prev = group[prop][i - 1]
        const growth = curr.ig_followersCount - prev.ig_followersCount
        group[prop][i]['ig_growth'] = growth
      }
      flatArray.push(group[prop][i])
    }
  }
  return (flatArray)
}

module.exports = getGrowthByDay