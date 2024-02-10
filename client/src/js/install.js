const butInstall = document.getElementById("buttonInstall");

window.addEventListener("beforeinstallprompt", (event) => {
  // Store triggered events.
  window.deferredPrompt = event;

  // Remove hidden class from button.
  butInstall.classList.toggle("hidden", false);
});

// Determines app installation status.
butInstall.addEventListener("click", async () => {
  const promptEvent = window.deferredPrompt;

  if (!promptEvent) {
    return;
  }

  // Show prompt
  promptEvent.prompt();

  // Reset deferred prompt variable, it can only be used once.
  window.deferredPrompt = null;

  butInstall.classList.toggle("hidden", true);
});

// App installed.
window.addEventListener("appinstalled", () => {
  // Clear prompt
  window.deferredPrompt = null;
});
