import {useState} from "react";
import {getCategoriesApi, addCategoryApi} from "../api/category";
import {useAuth} from "./";

export function useCategory() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [categories, setCategories] = useState(null);
  const {auth} = useAuth();

  const getCategories = async () => {
    try {
      setLoading(true);
      const response = await getCategoriesApi();
      setLoading(false);
      setCategories(response);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  const addCategory = async (data) => {
    try {
      setLoading(true);
      await addCategoryApi(data, auth.token);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  return {
    loading,
    error,
    categories,
    getCategories,
    addCategory,
  };
}
