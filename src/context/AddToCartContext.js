import React, { createContext, useContext, useState, useEffect } from "react";
import apiAddToCart from "api/apiAddToCart";
import apiViewCart from "api/apiViewCart";

const CartContext = createContext();

// Tạo một custom hook để sử dụng context
export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [cartListProduct, setCartListProduct] = useState([]);
  //const [error, setError] = useState(null);

  const addtocart = async (productId, quantity) => {
    try {
      // Gọi hàm addtocart từ api hoặc chỗ nào bạn đã định nghĩa
      const response = await apiAddToCart.add(productId, quantity);
      console.log("in ra productId", productId);

      console.log("response add to cart", response);
      setCart(response.data);

      if (response.status === 200) {
        // Lấy thông tin chi tiết sản phẩm từ dữ liệu phản hồi
        const productDetail = response.data;
        console.log(productDetail);
        alert("Thêm sản phẩm vào giỏ hàng thành công");
        // sau đó, thêm sản phẩm vào giỏ hàng với thông tin chi tiết
        //handleAddToCart(productDetail);
      } else {
        throw new Error("Thêm sản phẩm vào giỏ hàng thất bại");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchCartList = async () => {
    try {
      const response = await apiViewCart.getViewCart();
      setCartListProduct(response.data);
    } catch (error) {
      console.error(
        "Loi khong the hien thi san pham da them vao gio hang: ",
        error
      );
    }
  };
  // console.log('Danh sach san pham da them vao gio hang:', cartListProduct);

  useEffect(() => {
    fetchCartList();
    addtocart();
  }, []);
  // const handleAddToCart = (product) => {
  //     // product được truyền vào hàm addtocart là sản phẩm được call từ api
  //     const exist = cart.find((item) => item.id === product.id);

  //     if (exist) {
  //       // nếu sản phẩm đã tồn tại trong giỏ hàng, tăng số lượng sản phẩm lên 1 và cập nhật lại giỏ hàng
  //       setCart(
  //         cart.map((item) => {
  //           return item.id === product.id ? { ...exist, qty: exist.qty + 1 } : item;
  //         })
  //       );
  //       alert('Sản phẩm này đã được thêm vào giỏ hàng');
  //     } else {
  //       // Nếu sản phẩm chưa tồn tại trong giỏ hàng, thêm sản phẩm mới vào giỏ hàng
  //       setCart([...cart, { ...product, qty: 1 }]);
  //     }
  //   };

  const contextCartData = {
    cart,
    addtocart,
    cartListProduct,
    fetchCartList,
  };

  return (
    <CartContext.Provider value={contextCartData}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
