import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Intro() {
  const VIDEO_KEY = 'hasPlayedIntro'
  const navigate = useNavigate()
  const videoRef = useRef(null)
  const [visible, setVisible] = useState(() => {
    try {
      return sessionStorage.getItem(VIDEO_KEY) !== 'true'
    } catch (e) {
      return true
    }
  })

  // mounted -> tracks mount state for opacity transitions
  const [mounted, setMounted] = useState(true) // Start mounted to avoid flash of content
  const [fadingOut, setFadingOut] = useState(false)

  useEffect(() => {
    if (!visible) return
    const v = videoRef.current
    if (!v) return

    const setRate = () => {
      try { v.playbackRate = 1.5 } catch (e) {}
    }

    v.addEventListener('loadedmetadata', setRate)
    v.play().catch(() => {})

    // No delay needed - already mounted
    return () => {
      v.removeEventListener('loadedmetadata', setRate)
    }
  }, [visible])

  const finish = () => {
    try { sessionStorage.setItem(VIDEO_KEY, 'true') } catch (e) {}
    // start fade-out then navigate after transition
    setFadingOut(true)
    setTimeout(() => {
      setVisible(false)
      navigate('/home')
    }, 700)
  }

  const handleEnded = () => {
    if (fadingOut) return
    finish()
  }

  if (!visible) return null

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-black transition-opacity duration-700 ${mounted && !fadingOut ? 'opacity-100' : 'opacity-0'}`}
    >
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        src="/videos/Simplistic_futuristic_website.mp4"
        autoPlay
        muted
        playsInline
        onEnded={handleEnded}
      />

      <button
        onClick={finish}
        className="absolute top-4 right-4 z-[10000] rounded bg-white/20 px-4 py-2 text-white backdrop-blur-sm hover:bg-white/30"
      >
        Skip
      </button>
    </div>
  )
}
