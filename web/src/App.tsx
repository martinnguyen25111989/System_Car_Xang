import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { LearningMap } from './pages/LearningMap.tsx'
import { LessonPage } from './pages/LessonPage.tsx'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LearningMap />} />
        <Route path="/lesson/:id" element={<LessonPage />} />
      </Routes>
    </BrowserRouter>
  )
}
