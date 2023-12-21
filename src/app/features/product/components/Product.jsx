import { ArrowUturnLeftIcon } from "@heroicons/react/24/solid";
import { Container } from "../../../components";
import useProduct from "../contexts/ProductContext";
import ProductItem from "./ProductItem";
import { useNavigate } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";

import { PROJECT_CATEGORY_MAP } from "../../../constants";
import Filter from "./Filter";

function Product() {
  const { products } = useProduct();
  const [filters, setFilters] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [searchTxt, setSearchTxt] = useState("");

  const navigate = useNavigate();

  const createFilterObject = useCallback(() => {
    const filterObj = { name: "Category", options: [] };
    const temp = {};
    products.forEach(({ category }) => {
      if (!temp[category]) {
        temp[category] = true;
        const option = {
          value: category,
          label: PROJECT_CATEGORY_MAP[category],
          isSelected: false,
        };
        filterObj.options.push(option);
      }
    });

    setFilters([filterObj]);
    setAllProducts(products);
  }, [products]);

  useEffect(() => {
    createFilterObject();
  }, [createFilterObject]);

  useEffect(() => {
    // console.log(filters);
    let filteredProducts = [...products];

    filters.forEach((filter) => {
      if (filter.options) {
        filter.options.forEach((option) => {
          if (option.isSelected) {
            filteredProducts = filteredProducts.filter(
              (product) => product.category === option.value
            );
          }
        });
      }
    });

    if (searchTxt) {
      filteredProducts = filteredProducts.filter((product) =>
        product.productName.toLowerCase().includes(searchTxt.toLowerCase())
      );
    }

    setAllProducts(filteredProducts);
  }, [filters, products, searchTxt]);

  return (
    <Container>
      <ArrowUturnLeftIcon
        onClick={() => navigate("/home")}
        className="h-12 w-12 p-3 font-bold bg-white border rounded-full shadow-xl hover:shadow-md hover:bg-gray-400"
      />
      {filters.length > 0 && (
        <Filter
          filters={filters}
          setFilters={setFilters}
          searchTxt={searchTxt}
          setSearchTxt={setSearchTxt}
        />
      )}
      <div className="mx-auto grid w-full max-w-7xl items-center space-y-4 px-2 py-10 md:grid-cols-2 md:gap-6 md:space-y-0 lg:grid-cols-4">
        {allProducts.map((product) => (
          <ProductItem key={product.id} productInfo={product} />
        ))}
      </div>
    </Container>
  );
}

export default Product;
