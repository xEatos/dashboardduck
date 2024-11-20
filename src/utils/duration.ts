
export const convertDuration = (duration: number): string => {
  const totalSeconds = Math.ceil(duration) 
  const hours = totalSeconds >= 3600 ? totalSeconds / 3600 : 0
  const minutes = totalSeconds >= 60 ? (totalSeconds - hours * 3600 - (totalSeconds % 60)) / 60 : 0
  const seconds = totalSeconds - (hours * 3600 + minutes * 60) 

  return `${hours === 0 ? "" : `:${hours}`}${minutes === 0 ? "" : minutes}:${seconds < 10 ? `0${seconds}` : seconds }`
}