/**
 * Copyright (c) 2022 Protocon Network. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project root for details.
 */

// Data
import createAccounts from "./createAccounts";
import transfers from "./transfers";
import documents from "./documents";
import unknown from "./unknown";

function data(type, content) {
  switch (type) {
    case process.env.REACT_APP_ITEM_CREATE_ACCOUNT:
    case process.env.REACT_APP_ITEM_CREATE_ACCOUNTS:
      return createAccounts(content);
    case process.env.REACT_APP_ITEM_TRANSFER:
    case process.env.REACT_APP_ITEM_TRANSFERS:
      return transfers(content);
    case process.env.REACT_APP_ITEM_CREATE_DOCUMENTS:
    case process.env.REACT_APP_ITEM_UPDATE_DOCUMENTS:
    case process.env.REACT_APP_ITEM_SIGN_DOCUMENTS:
      return documents(content);
    default:
      return unknown(content);
  }
}

export default data;
