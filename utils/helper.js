const id = url => {
  const normalizedUrl = url.replace(/\/+$/, '')
  return normalizedUrl.substring(normalizedUrl.lastIndexOf('/') + 1)
}

module.exports = {
  id
}
