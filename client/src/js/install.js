const butInstall = document.getElementById("buttonInstall");

window.addEventListener("beforeinstallprompt", (event) => {
  event.preventDefault();

  // Store the triggered events
  window.deferredPrompt = event;

  // Remove the hidden class from the button.
  butInstall.classList.toggle("hidden", false);

  butInstall.addEventListener("click", async (event) => {
    console.log("clicked");

    const promptEvent = window.deferredPrompt;

    if (!promptEvent) {
      console.log("no prompt event");
      return;
    }

    console.log("prompt event successful");

    // Show prompt
    promptEvent.prompt();

    // Reset the deferred prompt variable, it can only be used once.
    window.deferredPrompt = null;

    butInstall.classList.toggle("hidden", true);
  });
});

window.addEventListener("appinstalled", (event) => {
  // Clear prompt
  window.deferredPrompt = null;
});
