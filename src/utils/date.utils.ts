export const formatDate = (date: string): string =>
  new Date(date).toLocaleDateString();

export const formatDateTime = (date: string): string =>
  new Date(date).toLocaleString();

export const formatPassedTime = (date: string): string => {
  const time = new Date(date).getTime();
  const now = Date.now();

  if (time + 1000 * 60 > now) {
    return "剛剛";
  }

  if (time + 1000 * 60 * 60 > now) {
    return `${Math.floor((now - time) / 1000 / 60)}分鐘前`;
  }

  if (time + 1000 * 60 * 60 * 24 > now) {
    return `${Math.floor((now - time) / 1000 / 60 / 60)}小時前`;
  }

  if (time + 1000 * 60 * 60 * 24 * 7 > now) {
    return `${Math.floor((now - time) / 1000 / 60 / 60 / 24)}天前`;
  }

  if (time + 1000 * 60 * 60 * 24 * 365 > now) {
    return `${Math.floor((now - time) / 1000 / 60 / 60 / 24 / 30)}月前`;
  }

  return `${Math.floor((now - time) / 1000 / 60 / 60 / 24 / 365)}年前`;
};
