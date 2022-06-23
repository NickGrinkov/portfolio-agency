import React, { useState, useEffect } from 'react';
import "./Main.scss";

interface IProducts {
  id: number;
  name: string;
  category: string;
  img: string;
}

const categories = ["Show All", "Design", "Branding", "Illustration", "Motion"];

const Main = () => {
  const [products, setProducts] = useState<IProducts[]>([]);
  const [isFetching, setIsFetching] = useState<Boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(2);
  const [activeCategory, setActiveCategory] = useState<string>("Show All");

  useEffect(() => {
      fetch(`http://localhost:3000/products?_limit=9&_page=1`)
        .then((response) => response.json())
        .then((data) => {
          setProducts(data);
        })
        .finally(() => setIsFetching(false))
  }, []);


  const getMoreProducts = () => {
    fetch(`http://localhost:3000/products?_limit=9&_page=${currentPage}`)
      .then(response => response.json())
      .then(data => {
        setCurrentPage(prev => prev + 1);
        setProducts([...products, ...data])
      })
  }

  const onClickCategory = (e: any) => {
    setActiveCategory(e.target.innerText)
  }

  return (
    <main className="main">
      <select className="categories--mobile" name="" id="">
        <option value="">Show All</option>
        <option value="">Design</option>
        <option value="">Branding</option>
        <option value="">Illustration</option>
        <option value="">Motion</option>
      </select>
      <ul className="categories">
        {categories.map((category) => (
          <button
            onClick={onClickCategory}
            className={
              category === activeCategory
                ? "category category--active"
                : "category"
            }
          >
            {category}
          </button>
        ))}
      </ul>
      <ul className="products">
        {isFetching ? (
          <span style={{ fontSize: "50px" }}>Идет загрузка ...</span>
        ) : (
          products &&
          products.map((product) => (
            <li key={product.id} className="product">
              <span className="product__category">{product.category}</span>
              <span className="product__name">{product.name}</span>
            </li>
          ))
        )}
      </ul>
      <button onClick={getMoreProducts} className="main__button button">
        LOAD MORE
      </button>
    </main>
  );
}

export default Main