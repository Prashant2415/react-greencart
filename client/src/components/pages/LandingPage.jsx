import PlantCard from "../common/card/PlantCard";
import Notification from "../common/Notification/Notification";
import "../styles/landingpage.css"
import LoaderImage from "/loadertwo.webp"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import { addItem } from "../../redux/slice/addToCartSlice";
const LandingPage = () => {

    const [notification, setNotification] = useState(false);
    const navigate = useNavigate();
    const plantData = useSelector((state)=> state?.shopReducer?.products);

    const forCatalog = plantData?.slice(0, 8);
    const dispatch = useDispatch();
    const handleAddToCart = (item) => {
        dispatch(addItem(item));

        // Get current cart from localStorage or start with empty array
        const existingCart = JSON.parse(localStorage.getItem("addtocart")) || [];

        // Check if product already exists in localStorage cart
        const index = existingCart.findIndex((p) => p.id === item.id);

        if (index !== -1) {
            // Increase quantity if item exists
            existingCart[index].quantity += 1;
        } else {
            // Add new item with quantity = 1
            existingCart.push({ ...item, quantity: 1 });
        }
        setNotification(true)
        // Save updated cart back to localStorage
        localStorage.setItem("addtocart", JSON.stringify(existingCart));
    };

    const imageContent = <img className='slider-image' src={LoaderImage} alt="Image" />
    const slider = [
        { id: 1, content: imageContent },
        { id: 2, content: imageContent },
        { id: 3, content: imageContent },
        { id: 4, content: imageContent },
        { id: 5, content: imageContent },
        { id: 6, content: imageContent },
        { id: 7, content: imageContent },
        { id: 8, content: imageContent },
        { id: 9, content: imageContent },
        { id: 10, content: imageContent },
        { id: 11, content: imageContent },
        { id: 12, content: imageContent },
        { id: 13, content: imageContent },
        { id: 14, content: imageContent },
        { id: 15, content: imageContent },
        { id: 16, content: imageContent },
    ]


    useEffect(() => {
        setTimeout(() => {
            setNotification(false)
        }, 1000)
    }, [notification])

    return (
        <div className='container'>
            {notification && (
                <Notification type="success" text="Value added to the cart" />
            )}
            <div className="section first">
                <div className="content-container">
                    <div className="content">
                        <h2 className='heading'>PLANT STORE</h2>
                        <p className='text'>Order a plant and get a checklist with a detailed description of the rules of plant care</p>
                    </div>
                    <div className="image-container">
                        <img className='image spin' src={LoaderImage} alt="Plants" />
                        <button className='primary-button one' onClick={() => { navigate("/shop") }}>Go to the catalog
                            &nbsp;&nbsp;&nbsp;<svg xmlns="http://www.w3.org/2000/svg" width="30" height="20" fill="currentColor" class="bi bi-arrow-up-right" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M14 2.5a.5.5 0 0 0-.5-.5h-6a.5.5 0 0 0 0 1h4.793L2.146 13.146a.5.5 0 0 0 .708.708L13 3.707V8.5a.5.5 0 0 0 1 0z" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
            {/* <div className="section slider-div">
                <div className="slider">
                    <div className="slider-container">
                    {slider.map((s) => (
                        <div key={s.id} className='slide'>
                            {s.content}
                        </div>
                    ))}
                </div>
                </div>
            </div> */}
            <div className="section">
                <h2 className='section-heading'>Catalog</h2>
                <div className="catalog-container">
                    <PlantCard data={forCatalog} addToCart={handleAddToCart} />
                </div>
            </div>

        </div>
    )
}

export default LandingPage
