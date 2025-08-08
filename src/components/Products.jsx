import { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import ProductCard from "../components/ProductCard";

const Products = () => {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      const response = await fetch("https://fakestoreapi.com/products/");
      const products = await response.json();
      setData(products);
      setFilter(products);
      setLoading(false);
    };
    getProducts();
  }, []);

  const Loading = () => (
    <>
      {[...Array(6)].map((_, i) => (
        <div key={i} className="col-md-4 col-sm-6 col-12 mb-4">
          <Skeleton height={400} />
        </div>
      ))}
    </>
  );

  const filterProduct = (cat) => {
    setFilter(cat ? data.filter((item) => item.category === cat) : data);
  };

  return (
    <div className="container my-3 py-3">
      <div className="row">
        <div className="col-12">
          <h2 className="display-5 text-center">Latest Products</h2>
          <hr />
        </div>
      </div>

      {/* Filter buttons */}
      <div className="buttons text-center py-4">
        <button
          className="btn btn-outline-dark m-2"
          onClick={() => filterProduct()}
        >
          All
        </button>
        <button
          className="btn btn-outline-dark m-2"
          onClick={() => filterProduct("men's clothing")}
        >
          Men's Clothing
        </button>
        <button
          className="btn btn-outline-dark m-2"
          onClick={() => filterProduct("women's clothing")}
        >
          Women's Clothing
        </button>
        <button
          className="btn btn-outline-dark m-2"
          onClick={() => filterProduct("jewelery")}
        >
          Jewelery
        </button>
        <button
          className="btn btn-outline-dark m-2"
          onClick={() => filterProduct("electronics")}
        >
          Electronics
        </button>
      </div>

      {/* Product cards */}
      <div className="row justify-content-center">
        {loading ? (
          <Loading />
        ) : (
          filter.map((product) => (
            <div key={product.id} className="col-md-4 col-sm-6 col-12 mb-4">
              <ProductCard
                product={product}
                variants={["Small", "Medium", "Large"]}
                inStock={Math.random() > 0.2} // 20% chance to be out of stock
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Products;
