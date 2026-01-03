import { useState } from 'react'
import { BeamsBackground } from './components/BeamsBackground'
import { Screen1Framing } from './screens/Screen1Framing'
import { Screen2Acknowledgment } from './screens/Screen2Acknowledgment'
import { Screen3Autonomy } from './screens/Screen3Autonomy'
import { Screen4Impact } from './screens/Screen4Impact'
import { Screen5Learnings } from './screens/Screen5Learnings'
import { Screen6Recognition } from './screens/Screen6Recognition'
import { Screen7Release } from './screens/Screen7Release'
import { LettersScreen } from './screens/LettersScreen'

type ScreenType = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 'letters'

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>(1)

  const handleContinue = () => {
    if (currentScreen === 7) {
      setCurrentScreen('letters')
    } else if (currentScreen !== 'letters') {
      setCurrentScreen((prev) => (prev + 1) as ScreenType)
    }
  }

  const handleExit = () => {
    setCurrentScreen(1)
  }

  return (
    <div className="relative w-screen h-screen bg-neutral-950 overflow-hidden">
      <BeamsBackground />

      <div className="relative z-10 w-full h-full">
        {currentScreen === 1 && <Screen1Framing onContinue={handleContinue} />}
        {currentScreen === 2 && <Screen2Acknowledgment onContinue={handleContinue} />}
        {currentScreen === 3 && <Screen3Autonomy onContinue={handleContinue} />}
        {currentScreen === 4 && <Screen4Impact onContinue={handleContinue} />}
        {currentScreen === 5 && <Screen5Learnings onContinue={handleContinue} />}
        {currentScreen === 6 && <Screen6Recognition onContinue={handleContinue} />}
        {currentScreen === 7 && <Screen7Release onContinue={handleContinue} />}
        {currentScreen === 'letters' && <LettersScreen onExit={handleExit} />}
      </div>
    </div>
  )
}
