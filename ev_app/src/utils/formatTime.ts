export const formatTime = (timeInSeconds: number) => {
  if(timeInSeconds) {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const secs = timeInSeconds % 60;
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;}
    else {
      return "00:00:00"}
  };

export function formatTimeDate(date: Date | string): string {
  if (typeof date === 'string') {
    date = new Date(date);
  }
  if (!(date instanceof Date) || isNaN(date.getTime())) {
    return `00:00:00`;
  }

  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const seconds = date.getSeconds().toString().padStart(2, '0');
  
  return `${hours}:${minutes}:${seconds}`;
}

export function calculateDurationInSeconds(start: Date | string, end: Date | string): number {
  if (typeof start === 'string') {
    start = new Date(start);
  }
  if (typeof end === 'string') {
    end = new Date(end);
  }
  if (!(start instanceof Date) || isNaN(start.getTime()) || !(end instanceof Date) || isNaN(end.getTime())) {
    throw new Error('Invalid date object');
  }

  const durationInMilliseconds = end.getTime() - start.getTime();
  const durationInSeconds = Math.floor(durationInMilliseconds / 1000);
  
  return durationInSeconds;
}