export const formatTimeAgo = (timestamp: string): string => {
  const milliseconds = Date.now() - new Date(timestamp).getTime();
  const seconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);

  if (weeks >= 1) {
    return `${weeks}w ago`;
  } else if (days >= 1) {
    return `${days}d ago`;
  } else if (hours >= 1) {
    return `${hours}h ago`;
  } else if (minutes >= 1) {
    return `${minutes}m ago`;
  } else if (seconds >= 1) {
    return `${seconds}s ago`;
  }

  return "Just now";
};
