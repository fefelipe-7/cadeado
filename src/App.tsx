import { useState, useEffect } from 'react'
import { supabase } from './lib/supabase'
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
  const [sessionId, setSessionId] = useState<string | null>(null)
  const [sessionLoading, setSessionLoading] = useState(true)

  useEffect(() => {
    initializeSession()
  }, [])

  const initializeSession = async () => {
    try {
      const { data, error } = await supabase
        .from('sessions')
        .insert({ completed: false })
        .select()
        .single()

      if (error) throw error
      setSessionId(data.id)
    } catch (err) {
      console.error('Erro ao criar sessão:', err)
      setSessionId(null)
    } finally {
      setSessionLoading(false)
    }
  }

  const handleContinue = () => {
    if (currentScreen === 7) {
      setCurrentScreen('letters')
    } else if (currentScreen !== 'letters') {
      setCurrentScreen((prev) => ((prev as number) + 1) as ScreenType)
    }
  }

  const handleExit = async () => {
    if (sessionId) {
      try {
        await supabase
          .from('sessions')
          .update({ completed: true })
          .eq('id', sessionId)
      } catch (err) {
        console.error('Erro ao completar sessão:', err)
      }
    }
    setCurrentScreen(1)
  }

  if (sessionLoading) {
    return (
      <div className="relative w-screen h-screen bg-neutral-950 overflow-hidden flex items-center justify-center">
        <BeamsBackground />
        <div className="relative z-10 text-white/50 font-light">
          Inicializando...
        </div>
      </div>
    )
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
        {currentScreen === 'letters' && <LettersScreen onExit={handleExit} sessionId={sessionId || undefined} />}
      </div>
    </div>
  )
}
