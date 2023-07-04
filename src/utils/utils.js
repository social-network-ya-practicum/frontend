import { calendar } from './settings';

export const setCookie = (name, value, options = {}) => {
  const optionsObj = {
    path: '/',
    ...options,
  };

  if (options.expires instanceof Date) {
    optionsObj.expires = options.expires.toUTCString();
  }

  let updatedCookie = `${encodeURIComponent(name)}=${encodeURIComponent(
    value
  )}`;

  Object.entries(optionsObj).forEach(([k, v]) => {
    updatedCookie += `; ${k}`;
    if (v !== true) {
      updatedCookie += `=${v}`;
    }
  });

  document.cookie = updatedCookie;
};

export const getCookie = (name) => {
  const matches = document.cookie.match(
    new RegExp(
      `(?:^|; )${name.replace(/([.$?*|{}()[\]\\/+^])/g, '\\$1')}=([^;]*)`
    )
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
};

export const deleteCookie = (...args) => {
  args.forEach((i) =>
    setCookie(i, '', {
      'max-age': -1,
    })
  );
};

export const debounce = (callee, timeoutMs) => {
  let previousCall;
  let lastCall;
  let lastCallTimer;
  return (...args) => {
    if (lastCall) previousCall = lastCall;
    lastCall = Date.now();
    if (previousCall && lastCall - previousCall <= timeoutMs) {
      clearTimeout(lastCallTimer);
    }
    lastCallTimer = setTimeout(() => callee(...args), timeoutMs);
  };
};

export const getDatesList = (month) => {
  const maxValue = Object.values(calendar).find((i) => i.month === month).max;
  const list = Array.from({ length: maxValue }, (_, ind) => String(ind + 1));
  return list;
};

export const getMonthNumber = (month) => {
  const monthNum = Object.entries(calendar).find(
    ([, val]) => val.month === month
  )[0];
  return +monthNum;
};
