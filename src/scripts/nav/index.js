const MENU = '[data-menu]'
const MENU_ACTION = '[data-menu-action]'
const OPEN_MENU = 'menuOpen'

class Menu {
  static attach() {
    const menu = new Menu()
    menu.init()
  }

  init() {
    if (this.findMenu()) {
      this.applyListener()
    }
  }

  applyListener() {
    document.querySelector('*').addEventListener('click', e => {
      const element = e.target.closest(MENU_ACTION)
      const menuBox = e.target.closest(MENU)

      if (this.isCallMenuElement(element)) {
        if (this.isOpened()) {
          this.closeMenu()
        } else {
          this.openMenu()
        }
      }

      if (this.isCallMenuElement(element) !== true && this.menuOverlayIsClickedElement(menuBox) !== true) {
        if (this.isOpened()) {
          this.closeMenu()
        }
      }
    })
  }

  isCallMenuElement(element) {
    return element && OPEN_MENU in element.dataset
  }

  findMenu() {
    const menu = document.querySelector(MENU)

    if (menu) {
      this.menu = menu
      return true
    }
    return false
  }

  isOpened() {
    return this.menu.classList.contains('opened')
  }

  openMenu() {
    this.menu.classList.add('opened')
  }

  closeMenu() {
    this.menu.classList.remove('opened')
  }

  menuOverlayIsClickedElement(menuBox) {
    return menuBox && 'menu' in menuBox.dataset
  }
}

Menu.attach()
