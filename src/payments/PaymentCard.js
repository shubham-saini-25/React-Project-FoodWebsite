import React from 'react'
import { Form, Modal } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import 'react-credit-cards/es/styles-compiled.css';
import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';

const PaymentCard = (props) => {
    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Stripe.js has not yet loaded.
        if (!stripe || !elements) {
            return;
        }

        // confirm the payment
        const result = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: "http://localhost:3000/",
            },
        });

        if (result.error) {
            console.log('Error => ', result.error.message);
        } else {
            // console.log('Success => ', result.success.message);
            // Your customer will be redirected to your `return_url`. For some payment
            // methods like iDEAL, your customer will be redirected to an intermediate
            // site first to authorize the payment, then redirected to the `return_url`.
        }
    };

    return (
        <>
            <Modal.Body className='border border-2 border-dark'>
                <Form autoComplete="off" onSubmit={handleSubmit}>

                    <PaymentElement className='mt-4' />

                    <Button type='submit' disabled={!stripe} className='btn btn-dark w-100 mt-3'><b>Make Payment (Rs. {props.amount})</b></Button>
                </Form>
            </Modal.Body>
        </>
    )
}

export default PaymentCard