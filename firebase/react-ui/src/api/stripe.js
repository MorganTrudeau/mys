import { deleteRequest, getRequest, postRequest } from "../api";

export async function createCustomer(params, userId) {
  return await postRequest("/stripe/create_customer", {
    params,
    userId
  });
}

export async function fetchCustomer(customerId) {
  return await getRequest("/stripe/get_customer", { customerId });
}

export async function updateCustomer(updates, customerId) {
  return await postRequest("/stripe/update_customer", {
    updates,
    customerId
  });
}

export async function deleteSource(source, customerId) {
  return await getRequest("/stripe/delete_source", { source, customerId });
}

export async function addSource(source, customerId) {
  return await postRequest("/stripe/add_source", { source, customerId });
}

export async function fetchSavedSources(customerId) {
  return await getRequest("/stripe/list_sources", { customerId });
}

export async function chargeSource(customer, source, amount, currency) {
  return await postRequest("/stripe/create_charge", {
    customer,
    amount,
    source,
    currency
  });
}
