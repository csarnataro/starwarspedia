module.exports = {
  publicRuntimeConfig: { // Will be available on both server and client
    portNumber: process.env.PORT || 3000,
    serverName: process.env.SERVER || 'localhost'
  },
  useFileSystemPublicRoutes: false
}
