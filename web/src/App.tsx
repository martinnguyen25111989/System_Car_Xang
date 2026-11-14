import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { LearningMap } from './pages/LearningMap.tsx'
import { LessonPage } from './pages/LessonPage.tsx'

const basename = import.meta.env.BASE_URL.replace(/\/$/, '')

export default function App() {
  return (
    <BrowserRouter basename={basename}>
      <Routes>
        <Route path="/" element={<LearningMap />} />
        <Route path="/lesson/:id" element={<LessonPage />} />
      </Routes>
    </BrowserRouter>
  )
}
