const dummy = blogs => {
  return 1
}

const totalLikes = blogs => {
  return Object.values(blogs).reduce((acc, { likes }) => acc + likes, 0)
}

const favoriteBlog = blogs => {
  if (!blogs.length) return undefined
  const favorite = blogs.reduce((prev, current) =>
    prev.likes >= current.likes ? prev : current
  )
  return favorite
}

const mostBlogs = blogs => {
  const valuesArr = blogs.map(e => e.author)

  const totalObj = valuesArr.reduce(
    (map, el) => ({
      ...map,
      [el]: (map[el] || 0) + 1,
    }),
    {}
  )

  const countsArr = Object.entries(totalObj)
  const sortedCountsArr = countsArr.sort((a, b) => b[1] - a[1])

  const result = {
    author: sortedCountsArr[0][0],
    blogs: totalObj[sortedCountsArr[0][0]],
  }
  return result
}

const mostLikes = blogs => {
  const templateObj = blogs.map(item => {
    const { author, likes } = item
    const container = {
      author,
      likes,
    }
    return container
  })

  const accumTotalsLikesObj = templateObj.reduce(
    (totals, p) => ({
      ...totals,
      [p.author]: (totals[p.author] || 0) + p.likes,
    }),
    {}
  )

  const accumTotalsLikesArr = Object.entries(accumTotalsLikesObj)
  const sortedTotalsLikesArr = accumTotalsLikesArr.sort((a, b) => b[1] - a[1])

  const result = {
    author: sortedTotalsLikesArr[0][0],
    likes: sortedTotalsLikesArr[0][1],
  }
  return result
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
}
