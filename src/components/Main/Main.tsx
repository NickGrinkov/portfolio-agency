import React, { useState, MouseEvent, SetStateAction } from "react";
import Categories from '../Categories/Categories';
import Products from '../Products/Products';
import "./Main.scss";

export interface IProduct {
  id: number;
  name: string;
  category: string;
  img: string;
}

const Main = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<IProduct[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [activeCategory, setActiveCategory] = useState<string>("Show All");
  const [totalCount, setTotalCount] = useState<number | string | null>();


  const getMoreProducts = () => {
    fetch(`http://localhost:3001/products?_limit=9&_page=${currentPage + 1}`)
      .then(response => {
        setTotalCount(response.headers.get("x-total-count"))
        return response.json()
      }).then(data => {
        setCurrentPage(prev => prev + 1);
        setActiveCategory("Show All")
        setProducts([...products, ...data]);
        setFilteredProducts([...products, ...data]);
      })
  }

  const filterProducts = (category: string) => {
    setFilteredProducts(products);
    setFilteredProducts((prev) =>
        category === "Show All"
        ? products
        : prev.filter((product) => product.category === category)
    );
  }

  const onClickCategory = (e: MouseEvent<HTMLButtonElement | HTMLLabelElement>, category: string) => {
    filterProducts(category)
    setActiveCategory(category);
  };


  return (
    <main className="main">
      <Categories
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        onClickCategory={onClickCategory}
        filterProducts={filterProducts}
      />
      <Products
        filteredProducts={filteredProducts}
        setProducts={setProducts}
        setFilteredProducts={setFilteredProducts}
        onClickCategory={onClickCategory}
      />
      {totalCount && filteredProducts.length < totalCount ||
      totalCount === undefined ? (
        <button onClick={getMoreProducts} className="main__button button">
          LOAD MORE
        </button>
      ) : null}
    </main>
  );
}

export default Main;