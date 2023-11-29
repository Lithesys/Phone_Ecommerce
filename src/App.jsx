

import React, { useState } from "react";
import {
    Route,
    createBrowserRouter,
    createRoutesFromElements,
    RouterProvider,
} from "react-router-dom";

//page import
import Layout from "./components/Layout/Layout.jsx";
import SiteUser from "./Site_User/SiteUser.jsx";
import SiteLogin from "./Site_User/Login";
import SiteSignup from "./Site_User/Signup.jsx";
import SiteReset from "./Site_User/Reset.js";
import Product from "./components/NewProduct/product";
import Home from "./components/Home/home";
import ErrorPage from "./ErrorPage.jsx";
import AdminNav from "./components/Header/adminNav.jsx";
import AdminProduct from "./Site_Admin/AdminProduct.jsx";
import AdminUser from "./Site_Admin/AdminUser.jsx";
import AdminShop from "./Site_Admin/AdminShop.jsx";

import Oldphone from "components/OldPhone/oldphone.jsx";
import Cart from "components/Cart/cart.jsx";
import Viewdetails from "components/Viewdetail/viewDetails.jsx";
import Search from "components/Search/Search.jsx";
import apiAddToCart from 'api/apiAddToCart';
//import { useParams } from 'react-router-dom';


//auth
import RequireAuth from "./components/AuthForm/requireAuth.jsx";

// const router = createBrowserRouter(
//     createRoutesFromElements(
//         <Route>
//             <Route path="login" element={<SiteLogin />}></Route>
//             <Route path="signup" element={<SiteSignup />}></Route>
//             <Route path="reset" element={<SiteReset />}></Route>
//             <Route path="/" element={<Layout />}>
//                 <Route index element={<Home />} />
//                 <Route path="/product" element={<Product />} />
//                 <Route path="/oldphone" element={<Oldphone />}></Route>
//                 <Route path="/cart" element={<Cart />}></Route>
//                 <Route path="/Viewdetail/:id" element={<Viewdetails />}></Route>
//                 <Route path="/Search/:search" element={<Search />}></Route>
//                 <Route path="/CheckouPage"></Route>
//                 <Route path="/user" element={<RequireAuth />}>
//                     <Route
//                         path="/user/account/profile"
//                         element={<SiteUser extraProps="profile" />}
//                     />
//                     <Route
//                         path="/user/account/address"
//                         element={<SiteUser extraProps="address" />}
//                     />
//                     <Route
//                         path="/user/account/change-password"
//                         element={<SiteUser extraProps="change-pass" />}
//                     />
//                 </Route>
//             </Route>
//             <Route element={<RequireAuth />}>
//                 <Route path="/admin" element={<AdminNav />}>
//                     <Route path="/admin/product" element={<AdminProduct />} />
//                     {/* <Route path="/admin/account" element={<AdminUser />} /> */}
//                     <Route path="/admin/shop" element={<AdminShop />} />
//                 </Route>
//             </Route>
//             {/* 404 page */}
//             <Route path="*" element={<ErrorPage />} />
//         </Route>
//     )
// );

const App = () => {
    // add to cart
    const [cart, setCart] = useState([]);
    //product Detail
    const [close, setClose] = useState(false);
    const [detail, setDetail] = useState([]);
    //filter product
    //const [oldData, setOldproduct] = useState(OldphoneData)
    //const [product, setProduct] = useState([]);
    // const searchbtn = (product) =>
    // {
    //     const change = Productdetail.filter((x) =>
    //     {
    //         return x.Cat === product
    //     })
    //     setProduct(change)
    // }


    //product detail
    const view = (productId) => {
        // Cập nhật trạng thái detail với đối tượng sản phẩm để hiển thị chi tiết sản phẩm bằng cách truyền id của sản phẩm đó vào
        setDetail(productId);
        // Đặt trạng thái close thành true để đóng hộp thoại chi tiết sản phẩm
        setClose(true)
    }


    // call api addtocart
    const addtocart = async (productId) => {
        try {
            console.log(productId);
            const response = await apiAddToCart.add(productId);
            setCart(response.productId, response.data)

            if (response.statusCode === 200) {
                // Lấy thông tin chi tiết sản phẩm từ dữ liệu phản hồi
                const productDetail = response.data;

                // sau đó, thêm sản phẩm vào giỏ hàng với thông tin chi tiết
                handleAddToCart(productDetail);
            }
            else {
                throw new Error('Thêm sản phẩm vào giỏ hàng thất bại')
                && alert('Thêm sản phẩm vào giỏ hàng thất bại')
            }
        }
        catch (error) {
            console.error('Lỗi không thể thêm sản phẩm vào giỏ hàng: ', error);
        }
    };

    // Hàm xử lý thêm sản phẩm vào giỏ hàng
    const handleAddToCart = (product) => {
        // product được truyền vào hàm addtocart là sản phẩm được call từ api
        const exist = cart.find((item) => item.id === product.id);

        if (exist) {
            // nếu sản phẩm đã tồn tại trong giỏ hàng, tăng số lượng sản phẩm lên 1 và cập nhật lại giỏ hàng
            setCart(
                cart.map((item) => {
                    return item.id === product.id ? { ...exist, qty: exist.qty + 1 } : item;
                })
            );
            alert('Sản phẩm này đã được thêm vào giỏ hàng')
        }
        else {
            // Nếu sản phẩm chưa tồn tại trong giỏ hàng, thêm sản phẩm mới vào giỏ hàng
            setCart([...cart], { ...product, qty: 1 });
        }
    }

    // add to cart
    // const addtocart = (product) => {
    //     // Tìm kiếm sản phẩm trong giỏ hàng bằng cách sử dụng hàm find
    //     // x === item
    //     const exsit = cart.find((item) => { return item.id === product.id });

    //     // Nếu sản phẩm đã tồn tại trong giỏ hàng, tăng số lượng lên 1 và cập nhật giỏ hàng
    //     if (exsit) {
    //         setCart(cart.map((item) => (item.id === product.id ? { ...exsit, qty: exsit.qty + 1 } : item)))
    //             && alert("Sản phẩm này đã được thêm vào giỏ hàng")
    //     }

    //     // Nếu sản phẩm chưa tồn tại trong giỏ hàng, thêm sản phẩm vào giỏ hàng với số lượng bằng 1
    //     else {
    //         setCart([...cart, { ...product, qty: 1 }])
    //     }
    // }

    //auth
    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route>
                <Route path="login" element={<SiteLogin />}></Route>
                <Route path="signup" element={<SiteSignup />}></Route>
                <Route path="reset" element={<SiteReset />}></Route>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home view={view} addtocart={addtocart} close={close} setClose={setClose} />} />
                    <Route path='/product' element={<Product view={view} addtocart={addtocart} />}></Route>
                    <Route path='/oldphone' element={<Oldphone view={view} addtocart={addtocart} close={close} setClose={setClose} />}></Route>
                    <Route path='/cart' element={<Cart />}></Route>
                    <Route path='/Viewdetail/:id' element={<Viewdetails close={close} addtocart={addtocart} setClose={setClose} />} ></Route>
                    <Route path='/CheckoutPage'></Route>
                    <Route path='/Search/:search' element={<Search view={view} addtocart={addtocart}></Search>}></Route>
                    <Route path="/user">
                        <Route
                            path="/user/account/profile"
                            element={<SiteUser extraProps="profile" />}
                        />
                        <Route
                            path="/user/account/address"
                            element={<SiteUser extraProps="address" />}
                        />
                        <Route
                            path="/user/account/change-password"
                            element={<SiteUser extraProps="change-pass" />}
                        />
                    </Route>
                </Route>
                <Route element={<RequireAuth />}>
                    <Route path="/admin" element={<AdminNav />}>
                        <Route path="/admin/product" element={<AdminProduct />} />
                        {/* <Route path="/admin/account" element={<AdminUser />} /> */}
                        <Route path="/admin/shop" element={<AdminShop />} />
                    </Route>
                </Route>
                {/* 404 page */}
                <Route path="*" element={<ErrorPage />} />
            </Route>
        )
    );



    return (
        <>
            <RouterProvider router={router} />
        </>
    );
};

export default App;