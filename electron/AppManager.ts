import { BrowserWindow } from "electron";
import { NativeMenu } from 'Menu'

class AppManager {
  private menu!: NativeMenu;
  private windowManager: Map<string, BrowserWindow> = new Map();

  setMenu(menu: NativeMenu): void {
    this.menu = menu;
  }

  getMenu(): NativeMenu {
    return this.menu;
  }

  setWindow(name: string, element: BrowserWindow): void {
    this.windowManager.set(name, element);
    console.log('SET', name, element)
  }

  getWindow(name: string): BrowserWindow {
    const element = this.windowManager.get(name);
    console.log(this.windowManager)
    if (element) {
      return element;
    }
    throw new Error(`[AppManager] - Element with name ${name} doesn't exist!`)
  }

  deleteWindow(name: string): void {
    this.windowManager.delete(name)
  }
}

export default new AppManager();