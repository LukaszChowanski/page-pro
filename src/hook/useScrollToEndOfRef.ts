import { useEffect, useRef } from 'react'
import { Data } from '../utils/declarations'

const shouldScroll = (
  prevData: React.MutableRefObject<Data[] | undefined>,
  currentData: Data[]
): boolean => {
  if (prevData.current !== undefined && prevData.current.length !== 0) {
    return prevData.current.length < currentData.length
  }
  return false
}
// scroll to last element of ref after data change
const useScrollToEndOfRef = (
  ref: React.RefObject<HTMLElement>,
  data: Data[]
): void => {
  const previousData = useRef<Data[]>()

  useEffect(() => {
    if (ref.current !== null && shouldScroll(previousData, data)) {
      ref.current.scrollIntoView({ behavior: 'smooth', block: 'end' })
    }
    previousData.current = data
  }, [ref, data])
}

export default useScrollToEndOfRef
