// .pnpmfile.cjs
module.exports = {
  hooks: {
    readPackage(pkg) {
      if (pkg.name === '@prisma/client') {
        pkg.scripts = pkg.scripts || {}
        pkg.scripts.postinstall = 'prisma generate'
      }
      return pkg
    }
  }
}
