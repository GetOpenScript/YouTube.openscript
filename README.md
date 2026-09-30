# YouTube.openscript

User scripts for YouTube powered by [OpenScript](https://github.com/GetOpenScript/OpenScript).

## Scripts

### 1. Better Share Button (`better-share-button.os.js`)

Clicking **Share** instantly copies a clean video link to your clipboard: no share dialog, no `?si=` tracking token.

#### Features
- **One Click Copy:** Share skips the dialog and copies the link straight away, with a small confirmation toast.
- **Tracking Stripped:** Copies `https://youtu.be/<id>` instead of `https://youtu.be/<id>?si=...`.
- **Shorts Support:** The Shorts share button copies `https://youtube.com/shorts/<id>`.
- **Player Buttons Too:** Covers the watch page, the fullscreen player actions, and the player share button.
- **Dialog Fallback:** If the native share dialog still opens, its **Copy** button copies the link without tracking parameters (keeps `t` and `list`).
- **Language Independent:** Targets the share icon rather than the localized `Share` label.

#### Installation
1. Install [OpenScript](https://chromewebstore.google.com/detail/openscript/dkelmgdchndagjemmodhkphdikhpnfol).
2. Open the OpenScript popup and click **New Script**.
3. Copy and paste the contents of [`better-share-button.os.js`](better-share-button.os.js) into the editor.
4. Save the script and ensure it is enabled.
5. Open any YouTube video or Short and click **Share**.
