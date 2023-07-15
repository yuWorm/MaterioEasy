export function createPageLoadingGuard(router) {
  router.beforeEach(() => {
    window.$loadingBar?.start()
    console.log('bef')
  })

  router.afterEach(() => {
    console.log('aft')

    setTimeout(() => {
      window.$loadingBar?.finish()
    }, 200)
  })

  router.onError(() => {
    window.$loadingBar?.finish()
  })
}
