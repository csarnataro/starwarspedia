module.exports = {
  publicRuntimeConfig: { // Will be available on both server and client
    portNumber: process.env.PORT || 3000,
    publicServerName: process.env.PUBLIC_SERVER_NAME || `${process.env.SERVER}:${process.env.PORT}`
  },
  useFileSystemPublicRoutes: false
}
