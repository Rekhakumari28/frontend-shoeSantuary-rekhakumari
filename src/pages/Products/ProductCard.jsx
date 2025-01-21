import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const ProductCard = ({ product, wishlist }) => {
  const [active, setActive] = useState(false);
  const [current, setCurrent] = useState(false)

  const { images, title, rating, price } = product;
  const navigate = useNavigate()
 

  const handleReload= ()=>{
    window.location.reload()
  }

  //add to wishlist
  const handleAddToWishlist = async (object) => {    
    try {
      const response = await fetch(
        `https://backend-shoesanctuary-major-project.vercel.app/api/wishlists`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(object),
        }
      );
      if (!response.ok) {
        throw "Failed to add product.";
      }
      const data = await response.json();
      if (data) {       
        toast.success("Product is added to the wishlist.");  
            }
    } catch (error) {
      toast.error("Error occured while adding product to wishlist. ");
    }
  };

  //remove product from cart
  const removeProductFromWishlist = async (productId) => {
       
    try {
      const response = await fetch(
        `https://backend-shoesanctuary-major-project.vercel.app/api/wishlists/${productId._id}`,
        { method: "DELETE" }
      );
      if (!response.ok) {
        throw "Failed to remove product from wishlist.";
      }
      const data = await response.json();
      if (data) {
        toast.success("Product removed from wishlist Successfully.");
        window.location.reload()
      }
    } catch (error) {
      toast.error("An error occured while fetching wishlist products.", error);
    }
  };

  //add to cart
  const handleAddToCart = async (object) => {
    const value = object;
    try {
      const response = await fetch(
        `https://backend-shoesanctuary-major-project.vercel.app/api/orderItems`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ product: value }),
        }
      );
      if (!response.ok) {
        throw "Failed to add product to cart.";
      }
      const data = await response.json();
      if (data) {
        toast.success("Product is added to the cart");
        setTimeout(handleReload, 7000);
      }
    } catch (error) {
      toast.error("Error: ", error);
    }
  };

  return (
    <div className="col-md-3 my-2 p-2">
      <div>

        <div
          style={{ height: "260px", width: "230px" }}
          className="card bg-white border border-0 shadow mt-3"
        >
          <Link to={`/productDetails/${product._id}`} >
            {" "}
            <div className="text-center ">


              <img
                style={{ height: "150px", width: "150px" }}
                className="img-fluid rounded  mt-1"
                src={images}
                alt={title}
              />


              <div className="card-img-overlay ">
                <div className="row">
                  {" "}
                  <div className="col-auto bg-light rounded-circle  ">
                               {/* <Heart
                    isActive={active}
                    onClick={() => {
                      setActive(!active); { !active ?  handleAddToWishlist(product) : removeProductFromWishlist(product)  }
                      ;
                    }}
                    animationScale={1.25}
                  /> */}
                <span className="mt-2">{rating}{" "}</span>
                 <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-star-fill text-warning mb-1" viewBox="0 0 16 16">
                 
  <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
</svg>
                            </div>
                </div>
              </div>

            </div>
          </Link>
          <div className="card-body ">
            <span >
              {" "}
              <strong >{title.substring(0, 25)}</strong>{" "}
            </span>
            <br />
            <span >
              <strong  >Price:</strong> ${price}
            </span>{" "}
            <br />
            

          </div>

        </div>

        <div className="d-grid gap-2" style={{ width: "230px" }}>

          <button
            className="btn btn-primary"
            onClick={() => {
              setCurrent(!current) ; {!current ? handleAddToCart(product) :   navigate("/cart")}
            }}
          >{!current ? "Add to Cart" : "Go To Cart"}
           
          </button>{" "}
          <button isActive={active}
            onClick={() => {
              setActive(!active); { !active ? handleAddToWishlist(product) : removeProductFromWishlist(product) }
              ;
            }}
            className="btn btn-outline-primary"
          >{!active ? "Add To Wishlist" : "Remove From Wishlist"}</button>

        </div>
      </div>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};

export default ProductCard;
