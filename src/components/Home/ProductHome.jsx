import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { BsEye } from 'react-icons/bs';
import './home.css';
import apiProductHome from 'api/apiProductHome';
// import apiAddToCart from 'api/apiAddToCart';
// import { useParams } from 'react-router-dom';
//import { toast } from 'react-toastify';



const ProductHome = ({ view, addtocart }) => {
    const { loginWithRedirect} = useAuth0();
    const isAuth = true;


  const [productList, setProductList] = useState([]);
  const [error, setError] = useState(null);

    // const [cartHome, setCartHome] = useState([]);
    // const {id} = useParams();

    useEffect(() => {
        const fetchProductHome = async () => {
            try {
                const response = await apiProductHome.getAll();
                setProductList(response.data)
    
            } catch (error) {
                setError(error);
                //toast.error(error?.message);
            }
        }
        fetchProductHome();
    }, []);
    console.log(productList)

  if (error) {
    return <p>Error: {error.message}</p>;
  }

    
    // // call api addtocart
    // const addtocart = async (productId) => {
    //     try {
    //         const response = await apiAddToCart.add(id);
    //         //setCartHome(response.productId, response.data)

    //         if(response.statusCode === 200) {
    //             // Lấy thông tin chi tiết sản phẩm từ dữ liệu phản hồi
    //             const productDetail = response.data;

    //             // sau đó, thêm sản phẩm vào giỏ hàng với thông tin chi tiết
    //             handleAddToCart(productDetail);
    //         }
    //         else {
    //             throw new Error('Thêm sản phẩm vào giỏ hàng thất bại')
    //         }
    //     }
    //     catch (error) {
    //         setError(error);
    //     }
    // };
    
    // // Hàm xử lý thêm sản phẩm vào giỏ hàng
    // const handleAddToCart = (productList) => {
    //     const exist = cartHome.find((item) => item.id === productList.id);
        
    //     if(exist) {
    //         // nếu sản phẩm đã tồn tại trong giỏ hàng, tăng số lượng sản phẩm lên 1 và cập nhật lại giỏ hàng
    //         setCartHome(
    //             cartHome.map((item) => {
    //                 return item.id === productList.id ? {...exist, qty: exist.qty + 1} : item;
    //             })
    //         );
    //         alert('Sản phẩm này đã được thêm vào giỏ hàng')
    //     }
    //     else {
    //         // Nếu sản phẩm chưa tồn tại trong giỏ hàng, thêm sản phẩm mới vào giỏ hàng
    //         setCartHome([...cartHome], {...productList, qty: 1});
    //     }
    // }

    return (
        <div className='container'>
            {/* <p >{productList}</p> */}
            {
                productList && productList.length > 0 ?
                // Array.isArray(productList) ? or productList && productList.lenght > 0 ? đều kiểm tra xem có phải dữ liệu từ api là mảng hay ko.
                    productList.map((curElm) => {
                        return (
                            <div className='box' key={curElm.id}>
                                <div className='img_box'>
                                    {/* {`http://localhost:8000${curElm.image}`} */}
                                    <img className='product-main__item' src={`http://0.tcp.ap.ngrok.io:19912/${curElm.image}`} alt={curElm.name}></img>
                                    <div className='icon'>
                                        {
                                            isAuth ?
                                                <li onClick={() => addtocart(curElm.id)}><AiOutlineShoppingCart /></li>
                                                :
                                                <li onClick={() => loginWithRedirect()}><AiOutlineShoppingCart/></li>
                                        }
                                        <li className='icon__link' onClick={() => view(curElm.id)}><Link to={`../Viewdetail/${curElm.id}`}><BsEye /></Link></li>
                                    </div>
                                </div>
                                <div className='detail'>
                                    <h4 className="home-product-item__name">
                                        {curElm.name}
                                    </h4>
                                    <div className="home-product-item__description">
                                        {curElm.detail}
                                    </div>
                                    <div className="home-product-item__price">
                                        <span className="home-product-item__price-old"></span>
                                        <span className="home-product-item__price-current">{curElm.price} đ</span>
                                    </div>

                                    <div className="home-product-item__origin">
                                        <span className="home-product-item__brand">{curElm.shopName}</span>
                                        <span className="home-product-item__origin-name"></span>
                                    </div>
                                    {/* {
                                        shop &&
                                        <div className="home-product-item__origin">
                                            <span className="home-product-item__brand">{shop.shopName}</span>
                                            <span className="home-product-item__origin-name">{shop.shopAddress}</span>
                                        </div>
                                    } */}
                                </div>
                            </div>
                        )
                    })
                    :
                    <>
                        <p>Không có sản phẩm nào</p>
                        <p >{productList}</p>
                    </>
            }
        </div>
    )
}
export default ProductHome;
