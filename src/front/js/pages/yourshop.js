import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import blankProfile from "../../img/blankProfile.png"


export const Yourshop = () => {

    const navigate = useNavigate()
    const { store, actions } = useContext(Context)
    const [sellerData, setSellerData] = useState(null);
    const cloudinaryUrl = "https://res.cloudinary.com/dujqhnnvn/image/upload/v1693592186/"

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (!sessionStorage.getItem('token')) {
                    navigate('/login');
                } else {
                    const data = await actions.fetchSellerData();
                    setSellerData(data);

                }
            } catch (error) {
                console.error('Error fetching seller data:', error);
            }
        };

        fetchData();

    }, []);

    return (

        <>
            <div className="user-header-div justify-content-center d-flex mb-3">
                <div className="user-img-div-parent rounded-circle">
                <img className="user-img-div rounded-circle"
                    src={sellerData && sellerData.img ? cloudinaryUrl + sellerData.img : blankProfile}
                    alt="Profile"
                />
                </div>
                <h2 className="ms-2 align-self-center"><i class="fa-solid fa-store"></i>{sellerData?.shop_name}</h2>

            </div >
            <div className="p-3 text-md-center">{sellerData?.description}</div>

            <nav className="navbar navbar-expand-md navbar-light bg-light justify-content-center">
                <div className="d-flex justify-content-center">

                    <ul className="navbar-nav col-sm-12">
                        <li className="nav-item sellers-menu">
                            <a className="nav-link active" aria-current="page" href="#">Selling History</a>
                        </li>
                        <li className="nav-item sellers-menu">
                            <Link className="nav-link active" to="/favorites">Your Favorites</Link>
                        </li>
                        <li className="nav-item sellers-menu">
                            <Link className="nav-link active" to="/productupload">List products</Link>
                        </li>
                        <li className="nav-item sellers-menu">
                            <a className="nav-link active" href="#">Pending Orders</a>
                        </li>
                    </ul>

                </div>

            </nav>

            <h1 className="text-center">Selling</h1>

            <div className="sellers-listing row p-4 gx-0">
                {sellerData?.products.map((product, index) => (
                    <div className="card col-xl-2 col-lg-3 col-md-4 col-12 d-flex mb-3" key={index}>
                        <img className="card-img-top" src={cloudinaryUrl + product.imageset[0].image} alt="Card image cap" />
                        <div className="card-body">
                            <h5 className="card-title">{product.title}</h5>
                            <div className="d-flex justify-content-end mt-2">
                                <a className="btn btn-danger me-1" onClick={() => { actions.addFavorite(product.price) }}>
                                    <i className="fa fa-heart ms-1"></i>
                                </a>
                                <Link to={'/products/' + product.id} className="btn btn-primary">Learn More</Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}