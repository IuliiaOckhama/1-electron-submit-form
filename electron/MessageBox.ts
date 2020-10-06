import { app, dialog, Tray, Menu, nativeImage } from 'electron';
// import { appManager } from './AppManager';

class MessageBox {
  // Create a variable to store our tray
  // Public: Make it accessible outside of the class;
  // Readonly: Value can't be changed
  public readonly tray: Tray;

  // Path where should we fetch our icon;
  private iconPath: string = '/assets/clock-icon.png';


  constructor() {
    this.tray = new Tray(this.createNativeImage());
    this.tray.setContextMenu(this.createMenu());
    // this.tray.setToolTip('Deskink')
  }

  createNativeImage() {
    // Since we never know where the app is installed,
    // we need to add the app base path to it.
    const path = `${app.getAppPath()}${this.iconPath}`;
    console.log(path);
    const image = nativeImage.createFromPath(path);
    // Marks the image as a template image.
    image.setTemplateImage(true);
    return image;
  }

  showMessage(message: string) {
    dialog.showMessageBox({
      type: 'info',
      message: `You activated action: "${message}"`,
      buttons: ['Close'],
     })
  }

  createMenu(): Menu {
    const contextMenu = Menu.buildFromTemplate([
  {
   label: 'Preferences',
   submenu: [
    {
     label: 'Color',
     submenu: [
      {
       label: 'Red',
       type: 'radio',
       accelerator: 'CmdOrCtrl+R',
       click: () => this.showMessage('Red'),
      },
      {
       label: 'Green',
       type: 'radio',
       accelerator: 'CmdOrCtrl+G',
       click: () => this.showMessage('Green'),
      },
      {
       label: 'Blue',
       type: 'radio',
       accelerator: 'CmdOrCtrl+B',
       click: () => this.showMessage('Blue'),
      },
     ],
    },
   ],
  },
  ])
    return contextMenu;
  }
}
module.exports = MessageBox