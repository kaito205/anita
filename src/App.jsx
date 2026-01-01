import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import confetti from 'canvas-confetti'
import { Heart, Gift, Cake, Sparkles, Star, Music, Volume2, VolumeX, Camera } from 'lucide-react'
import './App.css'

function App() {
  const [isOpen, setIsOpen] = useState(false)
  const [isBlown, setIsBlown] = useState(false)
  const [showMain, setShowMain] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef(null)

  const toggleMusic = () => {
    if (isPlaying) {
      audioRef.current.pause()
    } else {
      audioRef.current.play()
    }
    setIsPlaying(!isPlaying)
  }

  const handleStart = () => {
    setShowMain(true)
    // Start music on user interaction
    if (audioRef.current) {
      audioRef.current.play().then(() => {
        setIsPlaying(true)
      }).catch(err => console.log("Audio play failed:", err))
    }
  }

  const handleOpenGift = () => {
    setIsOpen(true)
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#ff69b4', '#ff85a1', '#fbb1bd', '#f9bec7', '#ffdae0']
    })
  }

  const handleBlowCandle = () => {
    setIsBlown(true)
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.8 },
      colors: ['#ffd700', '#ffec8b', '#fff68f']
    })
  }

  return (
    <div className="birthday-container">
      <AnimatePresence>
        {!showMain ? (
          <motion.div 
            key="intro"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="intro-screen"
          >
            <motion.h1 
              initial={{ y: 20 }}
              animate={{ y: 0 }}
              transition={{ repeat: Infinity, duration: 2, repeatType: "reverse" }}
            >
              Ada kejutan buat kamu! ✨
            </motion.h1>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleStart}
              className="start-button"
            >
              Klik di sini 🌸
            </motion.button>
          </motion.div>
        ) : (
          <motion.main
            key="main"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="main-content"
          >
            {/* Music Control */}
            <div className="music-control">
              <button onClick={toggleMusic} className="control-btn">
                {isPlaying ? <Volume2 /> : <VolumeX />}
              </button>
              <audio 
                ref={audioRef} 
                src="./asset/music.mp3" 
                loop 
              />
            </div>
            {/* Background Decorations */}
            <div className="decorations">
              {[...Array(10)].map((_, i) => (
                <motion.div
                  key={i}
                  className="balloon"
                  initial={{ 
                    y: '100vh', 
                    x: Math.random() * 100 + 'vw', 
                    backgroundColor: ['#ffc0cb', '#ffb6c1', '#ff69b4', '#da70d6'][i % 4] 
                  }}
                  animate={{ y: '-20vh' }}
                  transition={{ 
                    duration: 10 + Math.random() * 10, 
                    repeat: Infinity, 
                    delay: Math.random() * 5 
                  }}
                />
              ))}
            </div>

            <header className="header">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
              >
                <Sparkles className="icon-sparkle pink" />
              </motion.div>
              <motion.h1 className="title">
                Happy Birthday, <br />
                <span className="name">Adik Tersayang! 🎂</span>
              </motion.h1>
              <p className="subtitle">Semoga hari-harimu penuh warna dan kebahagiaan!</p>
            </header>

            <section className="interactive-grid">
              {/* Photo Frame */}
              <motion.div 
                className="card photo-card"
                initial={{ rotate: -2 }}
                whileHover={{ rotate: 0, scale: 1.05 }}
              >
                <div className="polaroid">
                  <img src="/photo.png" alt="Birthday Sibling" className="birthday-photo" />
                  <div className="polaroid-caption">Best Sibling Ever! ✨</div>
                </div>
              </motion.div>

              <div className="right-column">
                {/* Gift Box */}
                <motion.div className="card gift-card small-card">
                  <h3>Buka Kadonya! 🎁</h3>
                  <AnimatePresence mode="wait">
                    {!isOpen ? (
                      <motion.div
                        key="closed"
                        whileHover={{ rotate: [0, -5, 5, -5, 5, 0] }}
                        onClick={handleOpenGift}
                        className="gift-box"
                      >
                        <Gift size={60} color="#ff69b4" />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="opened"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="gift-reveal"
                      >
                        <Heart size={50} color="#ff1493" fill="#ff1493" />
                        <p>Love ya!</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>

                {/* Cake */}
                <motion.div className="card cake-card small-card">
                  <h3>Tiup Lilin! 🕯️</h3>
                  <div className="cake-container" onClick={handleBlowCandle}>
                    <div className={`candle-flame ${isBlown ? 'blown' : ''}`} />
                    <Cake size={60} color="#ff85a1" />
                  </div>
                  {isBlown && (
                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="wish-text">
                      Make a wish! ✨
                    </motion.p>
                  )}
                </motion.div>
              </div>
            </section>

            <section className="message-section">
              <motion.div 
                className="message-bubble"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
              >
                <p>"Selamat ulang tahun ya! Tetap jadi adik yang ceria, pintar, dan membanggakan. Kakak selalu sayang kamu! ❤️"</p>
              </motion.div>
            </section>

            <footer className="footer">
              <p>Dibuat dengan ❤️ oleh Kakakmu</p>
              <div className="stars">
                <Star className="star-icon" />
                <Star className="star-icon" />
                <Star className="star-icon" />
              </div>
            </footer>
          </motion.main>
        )}
      </AnimatePresence>
    </div>
  )
}

export default App
