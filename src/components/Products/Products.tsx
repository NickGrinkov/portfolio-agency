import React, { FC, useState, useEffect, MouseEvent,  KeyboardEvent, Dispatch, SetStateAction} from "react";
import ProductItem from "./ProductItem";
import { IProduct } from "../Main/Main";

interface ProductsProps {
  filteredProducts: IProduct[];
  setProducts: Dispatch<SetStateAction<IProduct[]>>;
  setFilteredProducts: (data: IProduct[]) => void;
  onClickCategory: (e: MouseEvent<HTMLButtonElement | HTMLLabelElement>, category: string) => void;
}

const Products: FC<ProductsProps> = ({filteredProducts, setProducts,setFilteredProducts,onClickCategory}) => {

  const [isFetching, setIsFetching] = useState<Boolean>(true);

  useEffect(() => {
    fetch(`http://localhost:3001/products?_limit=9&_page=1`)
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        setFilteredProducts(data);
      }).finally(() => setIsFetching(false));
  }, []);

  return (
    <ul className="products">
      {isFetching 
      ? <span style={{ fontSize: "50px" }}>Идет загрузка ...</span>
      : filteredProducts &&
        filteredProducts.map((product) => (
          <ProductItem
            key={product.id}
            product={product}
            setFilteredProducts={setFilteredProducts}
            filteredProducts={filteredProducts}
            onClickCategory={onClickCategory}/>)
      )}
    </ul>
  );
};

export default Products;
