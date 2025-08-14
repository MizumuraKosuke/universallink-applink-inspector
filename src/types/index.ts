export type AppleAppSiteAssociation = {
  applinks: {
    apps: string[]
    details: Array<{
      appID: string
      paths: string[]
    }>
  }
  activitycontinuation?: {
    apps: string[]
  }
  webcredentials?: {
    apps: string[]
  }
}

export type AssetLink = {
  relation: string[]
  target: {
    namespace: string
    package_name: string
    sha256_cert_fingerprints: string[]
  }
}
