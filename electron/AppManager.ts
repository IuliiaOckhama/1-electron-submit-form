import { NativeMenu } from "Menu";

type ManagerTypes = any;

class AppManager {
  private menu!: NativeMenu;
  private windowManager: Map<string, any> = new Map();

  setMenu(menu: NativeMenu): void {
    this.menu = menu;
  }

  getMenu(): NativeMenu {
    return this.menu;
  }

  setWindow(name: string, element: ManagerTypes): void {
    this.windowManager.set(name, element);
  }

  getWindow(name: string): ManagerTypes {
    const element = this.windowManager.get(name);
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