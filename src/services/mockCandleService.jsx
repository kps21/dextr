export const generateMockCandles = (timeframe) => {
  const now = Date.now();
  let interval;
  let points;

  switch (timeframe) {
    case "1D":
      interval = 5 * 60 * 1000;
      points = 78;
      break;
    case "1W":
      interval = 60 * 60 * 1000;
      points = 50;
      break;
    case "1M":
      interval = 24 * 60 * 60 * 1000;
      points = 30;
      break;
    case "1Y":
      interval = 7 * 24 * 60 * 60 * 1000;
      points = 52;
      break;
    default:
      interval = 60 * 60 * 1000;
      points = 60;
  }

  let last = 150;
  const data = [];

  for (let i = points; i > 0; i--) {
    const open = last;
    const high = open + Math.random() * 5;
    const low = open - Math.random() * 5;
    const close = low + Math.random() * (high - low);

    data.push({
      x: new Date(now - i * interval),
      y: [open, high, low, close],
    });

    last = close;
  }

  return [{ data }];
};
