import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import ItemContext from "../context/ItemContext";

function FoodCard(props) {
    const { id, name, price, image, link } = props.item;
    const { items, setItems } = useContext(ItemContext);
    const navigate = useNavigate();

    var itemCount = 0;
    items.forEach((item) => {
        if (item.id === id) {
            itemCount = item.quantity;
        }
    });

    const handleAddToItems = (food) => {
        const isExist = items.find((item) => item.id === food.id);
        if (isExist) {
            setItems(items.map((item) => item.id === food.id ? { ...item, quantity: item.quantity + 1 } : item));
        } else {
            setItems([...items, { ...food, quantity: 1 }]);
        }

    };

    const handleRemoveFromItems = (food) => {
        const isExist = items.find((item) => item.id === food.id);
        if (isExist.quantity === 1) {
            setItems(items.filter((item) => item.id !== food.id));
        } else {
            setItems(items.map((item) => item.id === food.id ? { ...item, quantity: item.quantity - 1 } : item));
        }
    };

    const handleGetTotalPrice = () => {
        let total = items.filter((item) => item.id === id);
        let totalPrice = 0;
        total.forEach((item) => {
            totalPrice = item.price * item.quantity;
        })
        return totalPrice;
    };

    let displayNone = name === 'Home' ? 'd-none' : '';

    return (
        <div className={`row ${displayNone}`}>
            <div className="col">
                <div className="card border border-dark text-center mt-4">
                    <div className="card-header bg-light">
                        <img className="card-img-top border border-dark" src={image} alt="foods" style={{ width: '100%', height: link !== undefined ? '10rem' : '12rem' }} />
                    </div>
                    <div className="card-body">
                        <h5 className="card-title">{name}</h5>
                        <p className="card-subtitle">{price !== undefined ? (`Price : ${price} Rs`) : ''}</p>
                    </div>
                    <div className="card-footer">
                        {link !== undefined ?
                            <button className='btn btn-primary ' onClick={() => { navigate(`/category/${link}`) }}>Order</button>
                            : <>
                                <div className="row">   
                                    <div className="col mx-auto">
                                        <div className="input-group">
                                            <button type="button" className="btn btn-secondary btn-number" data-type="minus" data-field="quantity" onClick={() => handleRemoveFromItems(props.item)}>
                                                <span className="fa fa-minus"></span>
                                            </button>
                                            <input type="text" name="quantity" className="form-control text-center" value={itemCount} min="1" max="10" readOnly />
                                            <button type="button" className="btn btn-secondary btn-number" data-type="plus" data-field="quantity" onClick={() => handleAddToItems(props.item)}>
                                                <span className="fa fa-plus"></span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <br />
                                <b>Total Price: {handleGetTotalPrice(props.item.id)}</b>
                            </>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}
export default FoodCard;