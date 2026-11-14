import { useCallback, useEffect, useState } from 'react'

const STORAGE_KEY = 'xang-course-progress-v1'

export type Progress = {
  completed: string[]
  currentId: string
}

const emptyProgress: Progress = { completed: [], currentId: 'L01' }

export function loadProgress(): Progress {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return emptyProgress
    const parsed: unknown = JSON.parse(raw)
    if (!parsed || typeof parsed !== 'object') return emptyProgress
    const record = parsed as Partial<Progress>
    const completed = Array.isArray(record.completed)
      ? record.completed.filter((id): id is string => typeof id === 'string')
      : []
    const currentId = typeof record.currentId === 'string' ? record.currentId : 'L01'
    return { completed, currentId }
  } catch {
    return emptyProgress
  }
}

export function useProgress() {
  const [progress, setProgress] = useState<Progress>(loadProgress)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress))
  }, [progress])

  const markCurrent = useCallback((id: string) => {
    setProgress((prev) => (prev.currentId === id ? prev : { ...prev, currentId: id }))
  }, [])

  const markCompleted = useCallback((id: string) => {
    setProgress((prev) => {
      if (prev.completed.includes(id)) return { ...prev, currentId: id }
      return { ...prev, currentId: id, completed: [...prev.completed, id] }
    })
  }, [])

  return { progress, markCurrent, markCompleted }
}
