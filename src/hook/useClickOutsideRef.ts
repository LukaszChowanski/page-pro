import { useEffect } from 'react'

const useClickOutsideRef = (
  ref: React.RefObject<HTMLElement>,
  onClickOutside: () => void
): void => {
  useEffect(() => {
    const listener = (event: MouseEvent): void => {
      if (ref.current && ref.current.contains(event.target as HTMLElement)) {
        return
      }
      onClickOutside()
    }
    document.addEventListener('mousedown', listener)
    return () => document.removeEventListener('mousedown', listener)
  })
}
export default useClickOutsideRef
