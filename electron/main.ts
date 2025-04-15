import * as url from "url";
import { app, BrowserWindow } from "electron";


const createWindow = () => {
  const win = new BrowserWindow({
    title: "Main window",
    webPreferences: {
      preload: url.fileURLToPath(new URL("preload.mjs", import.meta.url)),
    },
    width: 1400,
    height: 800,
  });
  return win;
}

app.whenReady().then(async () => {
  const win = createWindow();

  if (process.env.VITE_DEV_SERVER_URL) {
    // cargando la url de astro si se esta en dev
    await win.loadURL(process.env.VITE_DEV_SERVER_URL);
  } else {
    // Cargando el archivo index de astro si no se esta en dev
    await win.loadFile("dist/index.html");
  }
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})