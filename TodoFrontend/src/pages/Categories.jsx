import { useEffect, useState } from "react";
import axios from "axios";
import CategoryList from "../components/Category/CategoryList";

const Categories = () => {
  const handleDeleteCategory = async (categoryName) => {
    const confirm = window.confirm(
      `Are you sure you want to delete ALL todos in category "${categoryName}"?`
    );

    if (!confirm) return;
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("User is not logged in. No token found");
        return;
      }
      const response = await axios.delete(
        `http://localhost:3000/categories/${categoryName}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchCategories();
      console.log(`Category "${categoryName}" deleted.`);
    } catch (err) {
      console.error("Error deleting category:", err);
      alert(`Failed to delete category "${categoryName}".`);
    }
  };

  const handleEditCategory = async (categoryName, newName) => {
    console.log("Editing category:", categoryName, "to", newName);
    const confirm = window.confirm(
      `Are you sure you want to edit ALL todos in category "${categoryName}"?`
    );
    if (!confirm) return;
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("User is not logged in. No token found");
        return;
      }
      const response = await axios.patch(
        `http://localhost:3000/categories/${categoryName}`,
        { newCategory: newName },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchCategories();
      console.log(`Category "${categoryName}" updated.`);
    } catch (err) {
      console.error("Error updating category:", err);
      alert(`Failed to updated category "${categoryName}".`);
    }
  };

  const [categories, setCategories] = useState([]);
  const fetchCategories = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("User is not logged in. No token found");
      return;
    }
    try {
      const response = await axios.get("http://localhost:3000/categories", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <>
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">🗂 Categories</h2>
        <CategoryList
          categories={categories}
          onDelete={handleDeleteCategory}
          onEdit={handleEditCategory}
        />
      </div>
    </>
  );
};

export default Categories;
