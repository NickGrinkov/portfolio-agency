import React, { useState, useEffect, KeyboardEvent, MouseEvent, ChangeEvent } from 'react';
import img from "../../../public/image1.png";
import "./Main.scss";

interface IProduct {
  id: number;
  name: string;
  category: string;
  img: string;
}

const categories = [
  { id: 1, name: "Show All" },
  { id: 2, name: "Design" },
  { id: 3, name: "Branding" },
  { id: 4, name: "Illustration" },
  { id: 5, name: "Motion" },
];

const Main = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [isFetching, setIsFetching] = useState<Boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [activeCategory, setActiveCategory] = useState<string | null>("Show All");
  const [activeProduct, setActiveProduct] = useState<IProduct | null>(null);

  useEffect(() => {
      fetch(
        `http://localhost:3001/products?_limit=9&_page=1`
      )
        .then((response) => response.json())
        .then((data) => {
          setProducts(data);
        })
        .finally(() => setIsFetching(false));
  }, []);


  const getMoreProducts = () => {
    fetch(`http://localhost:3001/products?_limit=9&_page=${currentPage + 1}`)
      .then(response => response.json())
      .then(data => {
        setCurrentPage(prev => prev + 1);
        setProducts([...products, ...data])
      })
  }

  const filterProducts = (category: string) => {
    setProducts(prev => prev.filter(product => product.category === category))
  }

  const onClickCategory = (e: MouseEvent<HTMLButtonElement | HTMLLabelElement>, category: string) => {
    setActiveCategory(e.currentTarget.innerText);
  };

  const onChangeCategory = (e: ChangeEvent<HTMLSelectElement>) => {
    filterProducts(e.target.value);
  }


  const onClickProduct = (e: MouseEvent<HTMLLIElement>, product: IProduct) => {
    product.id === activeProduct?.id ? setActiveProduct(null) : setActiveProduct(product);
  }

  const deleteProduct = (e: KeyboardEvent<HTMLLIElement>, productId: number) => {
      if (e.code == "Delete" && activeProduct) {
        fetch(`http://localhost:3001/products/${productId}`, {
          method: "DELETE"
        })
        setProducts([...products].filter(product => product.id !== productId))
      }
  }


  return (
    <main className="main">
      <select onChange={(e) => onChangeCategory(e)} className="categories--mobile">
        {categories.map((category) => (
          <option key={category.id} value={category.name}>{category.name}</option>
        ))}
      </select>
      <ul className="categories">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={(e) => onClickCategory(e, category.name)}
            className={
              category.name === activeCategory
                ? "category category--active"
                : "category"
            }
          >
            {category.name}
          </button>
        ))}
      </ul>
      <ul className="products">
        {isFetching ? (
          <span style={{ fontSize: "50px" }}>Идет загрузка ...</span>
        ) : (
          products &&
          products.map((product) => (
            <li
              onClick={(e) => onClickProduct(e, product)}
              onKeyDown={(e) => deleteProduct(e, product.id)}
              tabIndex={0}
              key={product.id}
              style={{ background: `no-repeat url(${product.img})` }}
              className={
                product.id == activeProduct?.id
                  ? "product product--active"
                  : "product"
              }
            >
              <label
                onClick={(e) => onClickCategory(e, product.category)}
                className="product__category"
              >
                {product.category}
              </label>
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