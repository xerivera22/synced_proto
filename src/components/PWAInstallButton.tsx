import { useState, useEffect } from "react";
import { Download, X, Check } from "lucide-react";

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: "accepted" | "dismissed";
    platform: string;
  }>;
  prompt(): Promise<void>;
}

declare global {
  interface WindowEventMap {
    beforeinstallprompt: BeforeInstallPromptEvent;
  }
}

export default function PWAInstallButton() {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [isInstallable, setIsInstallable] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [showButton, setShowButton] = useState(true);

  useEffect(() => {
    // Check if app is already installed
    const checkIfInstalled = () => {
      const isStandalone = window.matchMedia(
        "(display-mode: standalone)"
      ).matches;
      const isNavigatorStandalone = (navigator as any).standalone === true;
      setIsInstalled(isStandalone || isNavigatorStandalone);
    };

    // Handle beforeinstallprompt event
    const handleBeforeInstallPrompt = (e: BeforeInstallPromptEvent) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsInstallable(true);

      // Store in session storage to show button on next visit if dismissed
      sessionStorage.setItem("showPWAInstall", "true");
    };

    // Handle app installed event
    const handleAppInstalled = () => {
      console.log("PWA installed successfully");
      setIsInstalled(true);
      setIsInstallable(false);
      setDeferredPrompt(null);
      sessionStorage.removeItem("showPWAInstall");
    };

    checkIfInstalled();

    // Check session storage on component mount
    const shouldShow = sessionStorage.getItem("showPWAInstall") === "true";
    if (shouldShow) {
      setIsInstallable(true);
    }

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    window.addEventListener("appinstalled", handleAppInstalled);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
      window.removeEventListener("appinstalled", handleAppInstalled);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    try {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;

      if (outcome === "accepted") {
        console.log("User accepted the install prompt");
        setIsInstalled(true);

        // Show success message briefly
        setTimeout(() => {
          setShowButton(false);
        }, 2000);
      } else {
        console.log("User dismissed the install prompt");
        // Keep showing the button for now
      }

      setDeferredPrompt(null);
    } catch (error) {
      console.error("Error during install:", error);
    }
  };

  const handleDismiss = () => {
    setShowButton(false);
    // Store dismissal for 7 days
    const expires = new Date();
    expires.setDate(expires.getDate() + 7);
    localStorage.setItem("pwaInstallDismissed", expires.toISOString());
  };

  // Check if dismissed within last 7 days
  useEffect(() => {
    const dismissedUntil = localStorage.getItem("pwaInstallDismissed");
    if (dismissedUntil) {
      const expiryDate = new Date(dismissedUntil);
      if (expiryDate > new Date()) {
        setShowButton(false);
      } else {
        localStorage.removeItem("pwaInstallDismissed");
      }
    }
  }, []);

  // Don't show if already installed or user dismissed
  if (isInstalled || !showButton) return null;

  // Don't show on iOS (handled differently)
  const isIOS =
    /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
  if (isIOS) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 animate-fade-in">
      <div className="bg-slate-50 dark:bg-slate-900 rounded-xl shadow-2xl border border-slate-200 dark:border-slate-700 max-w-sm overflow-hidden">
        <div className="p-4">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 bg-gradient-to-br from-slate-600 to-slate-800 rounded-lg flex items-center justify-center">
                <Download className="w-5 h-5 text-white" />
              </div>
            </div>

            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                Install Synced Proto
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                Get the app experience with offline access and faster loading.
              </p>

              <div className="flex items-center gap-2 mt-3">
                <button
                  onClick={handleInstallClick}
                  className="inline-flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-slate-700 to-slate-900 text-white text-sm font-medium rounded-lg hover:from-slate-800 hover:to-slate-950 transition-all duration-200 shadow-md hover:shadow-lg"
                >
                  <Download className="w-4 h-4" />
                  Install Now
                </button>

                <button
                  onClick={handleDismiss}
                  className="px-3 py-2 text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 transition-colors"
                >
                  Not now
                </button>
              </div>
            </div>

            <button
              onClick={handleDismiss}
              className="flex-shrink-0 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {isInstallable && (
          <div className="bg-gradient-to-r from-slate-100 to-slate-200 dark:from-slate-800/30 dark:to-slate-900/30 px-4 py-2 border-t border-slate-200 dark:border-slate-700">
            <div className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300">
              <Check className="w-3 h-3" />
              <span>Ready to install on your device</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
