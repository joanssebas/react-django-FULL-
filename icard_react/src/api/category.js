import {BASE_API} from "../utils/constants";

export async function getCategoriesApi() {
  try {
    const url = `${BASE_API}/api/categories/`;
    const response = await fetch(url);
    const result = response.json();
    return result;
  } catch (error) {
    throw error;
  }
}

export async function addCategoryApi(data, token) {
  try {
    const formData = new FormData();
    formData.append("image", data.image);
    formData.append("title", data.title);

    const url = `${BASE_API}/api/categories/`;
    const params = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    };

    const response = await fetch(url, params);
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
}
