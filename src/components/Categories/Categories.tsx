import React, { FC, MouseEvent, ChangeEvent, Dispatch, SetStateAction } from 'react';

interface ICategory {
	id: number;
	name: string;
}

interface CategoriesProps {
  activeCategory: string;
  setActiveCategory: (category: string) => void;
  onClickCategory: (
    e: MouseEvent<HTMLButtonElement | HTMLLabelElement>,
    category: string
  ) => void;
  filterProducts: (category: string) => void;
}

const categories: ICategory[] = [
  { id: 1, name: "Show All" },
  { id: 2, name: "Design" },
  { id: 3, name: "Branding" },
  { id: 4, name: "Illustration" },
  { id: 5, name: "Motion" },
];

const Categories: FC<CategoriesProps> = ({activeCategory,onClickCategory,setActiveCategory,filterProducts,}): JSX.Element => {

  const onChangeCategory = (e: ChangeEvent<HTMLSelectElement>) => {
    filterProducts(e.target.value);
    setActiveCategory(e.target.value);
  };

  return (
    <div>
      <select onChange={(e) => onChangeCategory(e)}className="categories--mobile">
        {categories.map((category) => (
          <option key={category.id} value={category.name}>
            {category.name}
          </option>
        ))}
      </select>
      <ul className="categories">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={(e) => onClickCategory(e, category.name)}
            className={category.name === activeCategory? "category category--active": "category"}>
            {category.name}
          </button>
        ))}
      </ul>
    </div>
  );
};

export default Categories;