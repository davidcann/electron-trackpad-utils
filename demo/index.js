function triggerFeedback() {
	window.electronAPI.send("toMain", "triggerFeedback");
}

window.electronAPI.receive("fromMain", (data) => {
	const log = document.getElementById("log");
	log.innerText += data.command + "\n";
});
