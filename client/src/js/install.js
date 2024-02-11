const butInstall = document.getElementById("buttonInstall");

// Check download status.
if (localStorage.getItem("installed")) {
  hideInstallButton();
}

function hideInstallButton() {
  butInstall.style.display = "none";
}

window.addEventListener("beforeinstallprompt", async (event) => {
  window.deferredPrompt = event;
  const promptEvent = window.deferredPrompt;

  console.log(promptEvent);

  // Show install button.
  butInstall.style.display = "visible";

  if ("BeforeInstallPromptEvent" in window) {
    showResult("⏳ BeforeInstallPromptEvent supported but not fired yet");
  } else {
    showResult("❌ BeforeInstallPromptEvent NOT supported");
  }

  butInstall.addEventListener("click", async (event) => {
    event.preventDefault();

    if (promptEvent) {
      promptEvent.prompt();
      const { outcome } = await promptEvent.userChoice;

      promptEvent.userChoice.then(() => {
        // User choice.
        if (outcome === "accepted") {
          showResult("😀 User accepted the install prompt.", true);

          // Save installed flag.
          localStorage.setItem("installed", true);

          // Hide download button.
          hideInstallButton();
        } else if (outcome === "dismissed") {
          showResult("😟 User dismissed the install prompt.");
        }
      });

      window.deferredPrompt = null;
    }
  });
});

window.addEventListener("appinstalled", (event) => {
  showResult("✅ AppInstalled fired", true);
});

function showResult(text) {
  console.log(text);
}
