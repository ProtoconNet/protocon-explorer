import createAccounts from "./createAccounts";
import transfers from "./transfers";
import documents from "./documents";
import unknown from "./unknown";

const CREATE_ACCOUNT = "mitum-currency-create-accounts-single-amount";
const CREATE_ACCOUNTS = "mitum-currency-create-accounts-multi-amounts";
const TRANSFERS = "mitum-currency-transfers-single-amount";
const TRANSFER = "mitum-currency-transfers-multi-amounts";
const CREATE_DOCUMENTS = "mitum-create-documents-item";
const UPDATE_DOCUMENTS = "mitum-update-documents-item";
const SIGN_DOCUMENTS = "mitum-blocksign-sign-item-single-document";

function data(type) {
  switch (type) {
    case CREATE_ACCOUNT:
    case CREATE_ACCOUNTS:
      return createAccounts();
    case TRANSFER:
    case TRANSFERS:
      return transfers();
    case CREATE_DOCUMENTS:
    case UPDATE_DOCUMENTS:
    case SIGN_DOCUMENTS:
      return documents();
    default:
      return unknown();
  }
}

export default data;
