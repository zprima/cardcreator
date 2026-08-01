import { useEffect, useMemo, useState } from 'react'
import Card from './components/Card'
import Controls from './components/Controls'
import {
  formatCardDate,
  getSeasonFromDate,
  parseDateInput,
} from './seasons'
import './App.css'

function App() {
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const [birthDate, setBirthDate] = useState('')

  useEffect(() => {
    if (!imageFile) {
      setImageUrl(null)
      return
    }

    const url = URL.createObjectURL(imageFile)
    setImageUrl(url)

    return () => {
      URL.revokeObjectURL(url)
    }
  }, [imageFile])

  const parsedBirthDate = useMemo(
    () => parseDateInput(birthDate),
    [birthDate],
  )

  const season = useMemo(
    () => (parsedBirthDate ? getSeasonFromDate(parsedBirthDate) : null),
    [parsedBirthDate],
  )

  const birthDateLabel = useMemo(
    () => (parsedBirthDate ? formatCardDate(parsedBirthDate) : null),
    [parsedBirthDate],
  )

  return (
    <main className="app">
      <section className="app__preview" aria-label="Card preview">
        <Card
          imageUrl={imageUrl}
          birthDateLabel={birthDateLabel}
          season={season}
        />
      </section>
      <section className="app__controls" aria-label="Controls">
        <Controls
          fileName={imageFile?.name ?? null}
          onImageChange={setImageFile}
          birthDate={birthDate}
          onBirthDateChange={setBirthDate}
          season={season}
        />
      </section>
    </main>
  )
}

export default App
