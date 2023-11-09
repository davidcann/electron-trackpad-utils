const { app, BrowserWindow } = require("electron");
const trackpadUtils = require("../addon.js");

let mainWindow;

trackpadUtils.onTrackpadScrollBegan(() => {
	mainWindow.webContents.send("fromMain", { command: "onTrackpadScrollBegan" });
});

trackpadUtils.onTrackpadScrollEnded(() => {
	mainWindow.webContents.send("fromMain", { command: "onTrackpadScrollEnded" });
});

trackpadUtils.onForceClick(() => {
	mainWindow.webContents.send("fromMain", { command: "onForceClick" });
});

function createWindow() {
	mainWindow = new BrowserWindow({
		width: 600,
		height: 600,
		webPreferences: {
			preload: `${__dirname}/preload.js`,
		},
	});
	mainWindow.setTitle("Electron Trackpad Utilities");
	mainWindow.loadFile("index.html");
	mainWindow.webContents.ipc.on("toMain", (event, command, data) => {
		if (command === "triggerFeedback") {
			trackpadUtils.triggerFeedback();
		}
	});
}

app.whenReady().then(() => createWindow());
app.on("window-all-closed", () => app.quit());
