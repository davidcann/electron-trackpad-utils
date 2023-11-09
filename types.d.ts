declare module "electron-trackpad-utils" {
	export function onTrackpadScrollBegan(callback: () => void): void;
	export function onTrackpadScrollEnded(callback: () => void): void;
	export function onForceClick(callback: () => void): void;
	export function triggerFeedback(): void;
}
