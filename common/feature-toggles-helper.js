const getActiveFeatures = feat => feat && feat.split(',')
const getActiveFeaturesFromRequest = req => {
  const feat = req.headers.feat
  return getActiveFeatures(feat)
}

module.exports = {
  getActiveFeatures,
  getActiveFeaturesFromRequest
}
