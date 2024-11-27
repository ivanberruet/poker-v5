export default function timeDiff(start, end) {
  // Parse the start and end times into Date objects
  const [startHours, startMinutes, startSeconds] = start.split(':').map(Number);
  const [endHours, endMinutes, endSeconds] = end.split(':').map(Number);

  // Create start and end dates using today's date as a baseline
  const today = new Date();
  const startTime = new Date(today.setHours(startHours, startMinutes, startSeconds));
  const endTime = new Date(today.setHours(endHours, endMinutes, endSeconds));

  // If end time is earlier than start, adjust end time to next day
  if (endTime < startTime) {
      endTime.setDate(endTime.getDate() + 1);
  }

  // Calculate the difference in milliseconds
  const diffMilliseconds = endTime - startTime;

  // Convert the difference to hours, minutes, and seconds
  const diffHours = Math.floor((diffMilliseconds / (1000 * 60 * 60)) % 24);
  const diffMinutes = Math.floor((diffMilliseconds / (1000 * 60)) % 60);
  const diffSeconds = Math.floor((diffMilliseconds / 1000) % 60);

  // Format the result to HH:MM:SS
  return `${String(diffHours).padStart(2, '0')}:${String(diffMinutes).padStart(2, '0')}:${String(diffSeconds).padStart(2, '0')}`;
}
