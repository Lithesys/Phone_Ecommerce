import React from 'react'
import { Link } from 'react-router-dom';
import { BsCart2 } from 'react-icons/bs';
import './nav.css';
//import {BsEye} from 'react-icons/bs';

const CartList = ({ cart }) => {
    return (
        <>
            <div className="header__cart">
                <div className="header__cart-wrap">
                    <Link to="../Cart">
                        <i className="header__cart-icon">
                            <BsCart2 />
                        </i>
                        <span className="header__cart-notice">
                            {cart?.length === 0 ? "" : cart?.length}
                        </span>
                    </Link>

                    {/* <!-- No cart: header__cart-list--no-cart --> */}
                    <div className="header__cart-list ">
                        <img
                            src="./img/no_cart.png"
                            alt=""
                            className="header__cart-no-cart-img"></img>
                        <span className="header__cart-list-no-cart-msg">
                            Chưa có sản phẩm
                        </span>

                        <h4 className="header__cart-heading">Sản phẩm đã thêm</h4>
                        <ul className="header__cart-list-item">
                            {
                                Array.isArray(cart) ?
                                    cart.map((curElm) => {
                                        return (
                                            <li className="header__cart-item" key={curElm.id}  >
                                                <img src={`http://0.tcp.ap.ngrok.io:19912/${curElm.image}`} alt={curElm.name} className="header__cart-img"></img>
                                                <div className="header__cart-item-info">
                                                    <div className="header__cart-item-head">
                                                        <h5 className="header__cart-item-name">{curElm.name}</h5>
                                                        <div className="header__cart-item-price-wrap">
                                                            <span className="header__cart-item-price">{curElm.price} đ</span>
                                                            {/* <span className="header__cart-item-multiply">x</span> */}
                                                            {/* <span className="header__cart-item-quantity">{qty}</span> */}
                                                        </div>
                                                    </div>
                                                    <div className="header__cart-item-body">
                                                        <span className="header__cart-item-description">{curElm.brand}</span>
                                                        {/* <span className="header__cart-item-remove"><button onClick={() => removeproduct(curElm)}>Xóa</button></span> */}
                                                    </div>
                                                </div>
                                            </li>
                                        )
                                    })
                                    :
                                    <>
                                        <p>Không có sản phẩm nào</p>
                                    </>
                            }
                        </ul>

                        <Link to="../Cart" className="header__cart-view-cart btn btn--primary">Xem giỏ hàng</Link>
                    </div>
                </div>
            </div>
            <Link
                to="../Cart"
                className="header__cart-view-cart btn btn--primary">
                Xem giỏ hàng
            </Link>
        </>
    );
};
export default CartList;
