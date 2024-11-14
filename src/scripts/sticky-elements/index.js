const HEADER = '[data-header]'
const STICKY_SECTION = '[data-sticky-section]'
const BANNER_SECTION = '[data-banner-section]'

class StickyElements {
    static attach() {
        const sticky = new StickyElements()
        sticky.init()
    }

    init() {
        if (this.findStickyElements()) {
            this.applyListener()
        }
    }

    applyListener() {
        const headerHeight = this.header.offsetHeight
        const bannerSectionHeight = this.banner.offsetHeight

        window.addEventListener('scroll' , () => {
            if (document.documentElement.scrollTop > headerHeight) {
                this.setTransformForHeader(headerHeight)
                this.setFixedPositionForHeader()
            } else {
                this.setDefaultTransformForHeader()
                this.setDefaultPositionForHeader()
                this.setDefaultTransitionForHeader()
            }

            if (document.documentElement.scrollTop > bannerSectionHeight - headerHeight) {
                this.addHeaderStickyFunc()
                this.addStickyPanelStyles()
                this.setDefaultTransformForHeader()
            } else {
                this.removeHeaderStickyFunc()
                this.removeStickyPanelStyles()
            }
        })

        if (document.documentElement.scrollTop > bannerSectionHeight - headerHeight) {
            this.addHeaderStickyFunc()
            this.addStickyPanelStyles()
            this.setDefaultTransformForHeader()
        }
    }

    findStickyElements() {
        const header = document.querySelector(HEADER)
        const sticky = document.querySelector(STICKY_SECTION)
        const banner = document.querySelector(BANNER_SECTION)

        if (header || sticky || banner) {
            this.header = header
            this.sticky = sticky
            this.banner = banner
            return true
        }
        return false
    }

    addHeaderStickyFunc() {
        this.header.classList.add('sticky')
        this.header.style.transition = '0.3s'
    }

    removeHeaderStickyFunc() {
        this.header.classList.remove('sticky')
    }

    setTransformForHeader(headerHeight) {
        this.header.style.transform = 'translateY(-' + headerHeight + 'px)'
    }

    setDefaultTransformForHeader() {
        this.header.style.transform = 'translateY(0)'
    }

    setDefaultTransitionForHeader() {
        this.header.style.transition = 'none'
    }

    setFixedPositionForHeader() {
        this.header.style.position = 'fixed'
    }

    setDefaultPositionForHeader() {
        this.header.style.position = 'absolute'
    }

    addStickyPanelStyles() {
        this.sticky.classList.add('box-shadow')
    }

    removeStickyPanelStyles() {
        this.sticky.classList.remove('box-shadow')
    }
}

StickyElements.attach()
