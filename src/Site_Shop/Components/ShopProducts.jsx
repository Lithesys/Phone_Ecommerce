import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import useShop from "hook/useShop";

const ShopProduct = ({ extraProps } = "all") => {
  const location = useLocation();
  const [currentPath, setCurrentPath] = useState("");
  const { getShopdetails } = useShop();

  useEffect(() => {
    const res = getShopdetails();
  }, []);

  useEffect(() => {
    setCurrentPath(location.pathname);
  }, [location]);

  return (
    <div className="shop__container-nav">
      <div className="shop__menu_container">
        <div className="shop__home">
          <ul className="shop__home-list">
            <li className="shop__home-item">
              <Link
                to="/shop/products/list/all"
                className="shop__home-item-link"
                id={
                  currentPath === "/shop/products/list/all"
                    ? "active"
                    : "inactive"
                }>
                Tất Cả sản phẩm
              </Link>
            </li>
            <li className="shop__home-item">
              <Link
                to="/shop/products/list/active"
                className="shop__home-item-link"
                id={
                  currentPath === "/shop/products/list/active" ||
                  extraProps === "active"
                    ? "active"
                    : "inactive"
                }>
                Sản phẩm đang bán
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
export default ShopProduct;
