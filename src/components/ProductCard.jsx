import { useDispatch } from "react-redux";
import { addCart } from "../redux/action";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import "../assets/product.css";

const ProductCard = ({ product, variants = [], inStock = true }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAddToCart = () => {
    dispatch(addCart(product));
    toast.success("Added to cart");
  };

  const handleBuyNow = () => {
    dispatch(addCart(product));
    navigate(`/product/${product.id}`);
  };

  return (
    <div className="card h-100 border-0 shadow-sm product-card">
      {/* Image */}
      <img
        src={product.image}
        alt={product.title}
        className="card-img-top p-3"
        style={{ height: "250px", objectFit: "contain" }}
      />

      {/* Card body */}
      <div className="card-body d-flex flex-column">
        <h5 className="card-title text-truncate">{product.title}</h5>
        <p className="fw-bold text-primary mb-2">${product.price.toFixed(2)}</p>

        {/* Variants dropdown */}
        {variants.length > 0 && (
          <select className="form-select mb-3">
            {variants.map((v, i) => (
              <option key={i} value={v}>
                {v}
              </option>
            ))}
          </select>
        )}

        {/* Buttons */}
        {inStock ? (
          <div className="d-flex gap-2 mt-auto">
            <button
              onClick={handleAddToCart}
              className="btn btn-dark flex-fill"
            >
              Add to Cart
            </button>
            <button
              onClick={handleBuyNow}
              className="btn btn-primary flex-fill"
            >
              Buy Now
            </button>
          </div>
        ) : (
          <button className="btn btn-secondary mt-auto" disabled>
            Out of Stock
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
