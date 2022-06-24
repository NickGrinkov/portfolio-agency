import React, {
  FC,
  useState,
  MouseEvent,
  KeyboardEvent,
  Dispatch,
  SetStateAction,
} from "react";
import { IProduct } from '../Main/Main';

interface ProductItemProps {
  product: IProduct;
  filteredProducts: IProduct[];
  setFilteredProducts: Dispatch<SetStateAction<IProduct[]>>;
  onClickCategory: (e: MouseEvent<HTMLButtonElement | HTMLLabelElement>, category: string) => void;
}

const ProductItem: FC<ProductItemProps> = ({product,setFilteredProducts,filteredProducts,onClickCategory,}) => {

  const [activeProduct, setActiveProduct] = useState<IProduct | null>(null);

  const { id, img, category, name } = product;

  const onClickProduct = (e: MouseEvent<HTMLLIElement>, product: IProduct) => {
    product.id === activeProduct?.id
      ? setActiveProduct(null)
      : setActiveProduct(product);
  };

  const deleteProduct = (e: KeyboardEvent<HTMLLIElement>,productId: number) => {
    if (e.code == "Delete" && activeProduct) {
      fetch(`http://localhost:3001/products/${productId}`, {
        method: "DELETE",
      });
      setFilteredProducts([...filteredProducts].filter((product) => product.id !== productId));
    }
  };
  return (
    <li
      onClick={(e) => onClickProduct(e, product)}
      onKeyDown={(e) => deleteProduct(e, id)}
      tabIndex={0}
      style={{ background: `no-repeat url(${img})` }}
      className={product.id == activeProduct?.id ? "product product--active" : "product"}>
      <label onClick={(e) => onClickCategory(e, category)}className="product__category">
        {product.category}
      </label>
      <span className="product__name">{name}</span>
    </li>
  );
};

export default ProductItem;