// @flow
import got from 'got';

function sleep(miliseconds: number = 1000) {
  return new Promise(resolve => setTimeout(() => resolve(), miliseconds));
}

async function isChromeRunning(url: string, opt: Object = {
  retries: 0, timeout: 10,
}): Promise<any> {
  let running = false;

  try {
    await got(`${url}/json`, opt);
    running = true;
  } catch (error) {
    running = false;
  }

  return running;
}

export {
  sleep,
  isChromeRunning,
};
