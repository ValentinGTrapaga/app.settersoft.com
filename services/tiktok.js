const tiktok = {
  getLastRun: async () => {
    const data = await fetch('https://api.apify.com/v2/acts/apidojo~tiktok-profile-scraper/runs/last/dataset/items?token=apify_api_E5s0VEdjik8GHK0IqONzBMab7UEBWa2zgVHz')
    const resultsArray = await data.json()
    const formattedArray = resultsArray.reduce((acc, currProfile) => {
      const alreadyProfInArray = acc.find(profile => profile.tiktok_username === currProfile.username)
      if (alreadyProfInArray) {
        return acc
      } else {
        const formattedProfile = {
          tiktok_username: currProfile.username,
          tiktok_followersCount: currProfile.followers,
          tiktok_followsCount: currProfile.following,
          tiktok_profilePicUrl: currProfile.avatar,
          tiktok_postsCount: currProfile.videos,
        }
        acc.push(formattedProfile)
      }
      return acc
    }, [])
    return (formattedArray)
  }
}

module.exports = tiktok