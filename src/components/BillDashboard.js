import React, { useContext, useState } from "react";
import ItemContext from "../context/ItemContext";
import { Modal } from 'react-bootstrap';
import PaymentCard from "../payments/PaymentCard";
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const stripe = require('stripe')(process.env.REACT_APP_STRIPE_SECRET_KEY);
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHED_KEY);

function BillDashboard() {
    const { items, setItems } = useContext(ItemContext);
    const [show, setShow] = useState(false);

    const handleShow = async () => {
        setShow(true)

        if (getItemsTotal() > 0) {
            const paymentIntent = await stripe.paymentIntents.create({
                amount: getItemsTotal() * 100,
                currency: 'usd',
                payment_method_types: ['card'],
            });

            sessionStorage.setItem('paymentIntent', paymentIntent.client_secret);
        }

    };

    let client_secret = sessionStorage.getItem('paymentIntent') ?? '';

    const handleHide = () => {
        setShow(false)
        setItems([])
    };

    const orderBtn = items.length === 0 ? 'disabled' : '';

    const getItemsTotal = () => {
        let totalItems = 0;
        items.forEach(item => {
            totalItems += (item.price * item.quantity);
        });
        return totalItems;
    }

    return (
        <>
            <div className="col bg-dark text-light text-center" style={{ height: '100vh' }}>
                <hr className="text-secondary" />
                <h2 className="mt-3 text-warning">Bill Dashboard</h2>
                <hr className="text-secondary" />
                <div className="container">
                    <div className="row text-warning">
                        <div className="col">
                            <h5>Item</h5>
                        </div>
                        <div className="col">
                            <h5>Qty</h5>
                        </div>
                        <div className="col">
                            <h5>Price</h5>
                        </div>
                    </div>
                    <hr className="text-secondary" />
                    {items.map((item, idx) => {
                        return (
                            <div className="row" key={idx}>
                                <div className="col">
                                    <h6>{item.name}</h6>
                                </div>
                                <div className="col">
                                    <h6>{item.quantity}</h6>
                                </div>
                                <div className="col">
                                    <h6>Rs. {item.price * item.quantity}</h6>
                                </div>
                            </div>
                        )
                    })}
                </div>
                <hr className="text-secondary" />
                <div className="footer text-warning">
                    <h5>Total Bill: {getItemsTotal()} Rs</h5>
                </div>
                <hr className="text-secondary" />
                <button className={`btn btn-warning ${orderBtn}`} onClick={handleShow}><b>Place Food Order</b></button>
            </div>

            <Modal show={show} onHide={handleHide}>
                <Modal.Header closeButton onClick={handleHide}>
                    <Modal.Title>Payment Gateway...</Modal.Title>
                </Modal.Header>
                <Elements stripe={stripePromise} options={{ clientSecret: client_secret }}>
                    <PaymentCard amount={getItemsTotal()} />
                </Elements>
            </Modal>
        </>
    );
}

export default BillDashboard;