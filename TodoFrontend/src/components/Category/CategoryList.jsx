import CategoryItem from "./CategoryItem";

const CategoryList = ({ categories, onDelete, onEdit }) => {
  return (
    categories.length? (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {categories.map((category) => (
        <CategoryItem
          key={category.name}
          category={category}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
    ) : 
    <p className="text-center text-gray-500 italic">No categories found. Add Todos to see categories</p>
  );
};

export default CategoryList;
