// Helper code e.g. for validation, randomiser, formatter...

// display when post was created
const timeAgo = (date: number) => {
  let theDate = new Date();
  let seconds = Math.floor((theDate.getTime() - date) / 1000);
  let interval = seconds / 31536000;

  interval = seconds / 86400;
  if (interval > 1) {
    return Math.floor(interval) + ' d';
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return Math.floor(interval) + ' h';
  }
  interval = seconds / 60;
  if (interval > 1) {
    return Math.floor(interval) + ' m';
  }
  return Math.floor(seconds) + ' s';
};

function makeReadable(num: string | number, singular: string) {
  return num > 0
    ? num + (num === 1 ? ` ${singular}, ` : ` ${singular}s, `)
    : '';
}

function toDaysHoursMins(totalSeconds: number) {
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
  const days = Math.floor(totalSeconds % (3600 * 24));

  const minStr = makeReadable(minutes, 'minute');
  const hrStr = makeReadable(hours, 'hour');
  const dayStr = makeReadable(days, 'day');

  return `${dayStr}${hrStr}${minStr}`.replace(/,\s*$/, '');
}

export {timeAgo, toDaysHoursMins};
