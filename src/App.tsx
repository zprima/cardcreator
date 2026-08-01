import { useEffect, useState } from 'react'
import Card from './components/Card'
import Controls from './components/Controls'
import './App.css'

function App() {
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imageUrl, setImageUrl] = useState<string | null>(null)

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

  return (
    <main className="app">
      <section className="app__preview" aria-label="Card preview">
        <Card imageUrl={imageUrl} />
      </section>
      <section className="app__controls" aria-label="Controls">
        <Controls
          fileName={imageFile?.name ?? null}
          onImageChange={setImageFile}
        />
      </section>
    </main>
  )
}

export default App
