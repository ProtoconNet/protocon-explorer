/**
 * Copyright (c) 2022 Protocon Network. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project root for details.
 */

export function parseAmount(_amt, cid) {
  let amt = _amt;

  if (amt.length === 18) {
    amt = `0.${amt}`;
  } else if (amt.length < 18) {
    for (let i = 0; i < 18 - amt.length; i += 1) {
      amt = `0${amt}`;
    }
    amt = `0.${amt}`;
  } else if (amt.length > 18) {
    amt = `${amt.substring(0, amt.length - 18)}.${amt.substring(amt.length - 18)}`;
  }

  let concatIdx = amt.length;
  for (let i = amt.length - 1; i >= 0; i -= 1) {
    if (amt[i] === "0") {
      concatIdx = i;
    } else {
      if (amt[i] === ".") {
        concatIdx += 1;
      }
      break;
    }
  }

  return `${amt.substring(0, concatIdx)} ${cid}`;
}

export function parseFee(_fee, cid) {
  const parseRatio = (ratio) => {
    const r = parseFloat(ratio);
    return `${r * 100} %`;
  };

  if (_fee === "-") {
    return _fee;
  }
  if (_fee === "") {
    return "-";
  }
  if (_fee.charAt(0) === "0" && _fee.charAt(1) === ".") {
    return `${parseRatio(_fee)} %`;
  }
  return parseAmount(_fee, cid);
}
