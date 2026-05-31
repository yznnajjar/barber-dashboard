import { useEffect, useState } from 'react'

/**
 * SSR-safe media-query hook. Returns false on the server and first paint,
 * then resolves to the real match after mount (avoids hydration mismatch).
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    const mql = window.matchMedia(query)
    const onChange = () => setMatches(mql.matches)
    onChange()
    mql.addEventListener('change', onChange)
    return () => mql.removeEventListener('change', onChange)
  }, [query])

  return matches
}

/** Single breakpoint source for the desktop ⇄ mweb split. */
export const MOBILE_MAX_WIDTH = 768
export const useIsMobile = () => useMediaQuery(`(max-width: ${MOBILE_MAX_WIDTH}px)`)
