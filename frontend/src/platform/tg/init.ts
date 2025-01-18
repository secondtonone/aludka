import {
  $debug,
  backButton,
  initData,
  init as initSDK,
  isTMA,
  miniApp,
  swipeBehavior,
  themeParams,
  viewport,
} from '@telegram-apps/sdk-react';

/**
 * Initializes the application and configures its dependencies.
 */
export function init(debug: boolean): void {
  if (isTMA('simple')) {
    // Set @telegram-apps/sdk-react debug mode.
    $debug.set(debug);

    // Initialize special event handlers for Telegram Desktop, Android, iOS, etc.
    // Also, configure the package.
    initSDK();

    // Add Eruda if needed.
    debug &&
      import('eruda').then((lib) => lib.default.init()).catch(console.error);

    // Mount all components used in the project.
    if (backButton.isSupported()) backButton.mount();
    if (miniApp.isSupported()) miniApp.mount();
    themeParams.mount();
    initData.restore();
    if (swipeBehavior.isSupported()) swipeBehavior.mount();
    void viewport
      .mount()
      .catch((e) => {
        console.error('Something went wrong mounting the viewport', e);
      })
      .then(() => {
        viewport.bindCssVars();
      });

    // Define components-related CSS variables.
    miniApp.bindCssVars();
    themeParams.bindCssVars();
  }
}
