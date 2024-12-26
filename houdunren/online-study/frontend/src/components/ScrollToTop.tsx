import { useLocation } from '@tanstack/react-router'
import React, { useEffect } from 'react'

type Props = {
  children: React.ReactNode
}

export const ScrollToTop: React.FC<Props> = ({ children }) => {
  const location = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [location.pathname])

  return <>{children}</>
}
