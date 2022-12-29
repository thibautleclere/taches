# Tasks

[Angular CLI](https://github.com/angular/angular-cli) version 15.0.4.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Build extension for Chrome

Run `npm run build-prod`
The build artifacts will be stored in the `dist` directory.
Copy the file `src/manifest.json` to the `dist` directory.

## Add extension to Chrome

Go to `chrome://extensions/` then click on the toggle Developper Mode

![Mode developpeur](https://github.com/thibautleclere/taches/developperMode?raw=true)

Then load the packaged extension by selecting the dist directory
=> It will add the extension to Chrome
