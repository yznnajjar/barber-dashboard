import { useState } from 'react'
import { usePWAInstall } from '../hooks/usePWAInstall'

export function PWAInstallBanner() {
  const { canInstall, isInstalled, isIOS, install } = usePWAInstall()
  const [dismissed, setDismissed] = useState(false)
  const [showIOSGuide, setShowIOSGuide] = useState(false)

  // Don't show if already installed, dismissed, or can't install
  if (isInstalled || dismissed || !canInstall) return null

  // iOS manual instructions
  if (isIOS) {
    return (
      <>
        <div className="bg-[#1A1A18] text-white rounded-xl p-4 mb-4 flex items-start gap-3">
          <span className="text-2xl flex-shrink-0">📲</span>
          <div className="flex-1">
            <div className="font-semibold text-sm">Install BarberApp on your iPhone</div>
            <div className="text-xs text-gray-400 mt-1">
              Get quick access from your home screen — no App Store needed
            </div>
            <button
              onClick={() => setShowIOSGuide(true)}
              className="mt-2 text-xs bg-white text-[#1A1A18] px-3 py-1.5 rounded-lg font-semibold"
            >
              How to install →
            </button>
          </div>
          <button
            onClick={() => setDismissed(true)}
            className="text-gray-500 text-lg flex-shrink-0"
          >
            ✕
          </button>
        </div>

        {/* iOS guide modal */}
        {showIOSGuide && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-end justify-center p-4">
            <div className="bg-white rounded-2xl p-6 w-full max-w-sm">
              <div className="text-lg font-bold mb-4">Install on iPhone</div>
              <div className="space-y-4">
                {[
                  { step: '1', icon: '⬆️', text: 'Tap the Share button at the bottom of your browser' },
                  { step: '2', icon: '📋', text: 'Scroll down and tap "Add to Home Screen"' },
                  { step: '3', icon: '✅', text: 'Tap "Add" — the app icon will appear on your home screen' },
                ].map((s) => (
                  <div key={s.step} className="flex items-start gap-3">
                    <div className="w-7 h-7 rounded-full bg-[#1A1A18] text-white flex items-center justify-center text-xs font-bold flex-shrink-0">
                      {s.step}
                    </div>
                    <div className="text-sm text-gray-700 flex-1">
                      <span className="mr-2">{s.icon}</span>{s.text}
                    </div>
                  </div>
                ))}
              </div>
              <button
                onClick={() => { setShowIOSGuide(false); setDismissed(true) }}
                className="w-full mt-5 bg-[#1A1A18] text-white rounded-xl py-3 font-semibold text-sm"
              >
                Got it
              </button>
            </div>
          </div>
        )}
      </>
    )
  }

  // Android / Chrome — native prompt
  return (
    <div className="bg-[#1A1A18] text-white rounded-xl p-4 mb-4 flex items-start gap-3">
      <span className="text-2xl flex-shrink-0">📲</span>
      <div className="flex-1">
        <div className="font-semibold text-sm">Install BarberApp</div>
        <div className="text-xs text-gray-400 mt-1">
          Add to your home screen for faster access and offline support
        </div>
        <div className="flex gap-2 mt-2">
          <button
            onClick={install}
            className="text-xs bg-white text-[#1A1A18] px-3 py-1.5 rounded-lg font-semibold"
          >
            Install now
          </button>
          <button
            onClick={() => setDismissed(true)}
            className="text-xs text-gray-400 px-3 py-1.5"
          >
            Not now
          </button>
        </div>
      </div>
      <button
        onClick={() => setDismissed(true)}
        className="text-gray-500 text-lg flex-shrink-0"
      >
        ✕
      </button>
    </div>
  )
}
