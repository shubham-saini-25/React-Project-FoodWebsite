import React, { useContext } from "react";
import { useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import { HomeMenu } from '../constants/data';
import HomeNavImg from "../food_images/home_icon.png";
import ItemContext from "../context/ItemContext";

function FoodNavbar() {
    const { search, setSearch } = useContext(ItemContext);
    const navigate = useNavigate();

    const onSubmit = (e) => {
        e.preventDefault();
        if (search === '') {
            alert("Please enter something!");
        } else {
            // setSearch('');
            setSearch(e.target.value);
        }
    };

    const onChange = (e) => setSearch(e.target.value);

    return (
        <>
            <Navbar bg="dark" variant="dark" style={{ height: '4rem', width: '100%' }}>
                <Container style={{ marginLeft: '5rem' }}>
                    <Navbar.Brand>
                        <img src={HomeNavImg} width='50px' height='50px' alt="Home" />
                    </Navbar.Brand>
                    <Nav className="me-auto" style={{ marginLeft: '2rem' }}>
                        {HomeMenu.map((item, idx) => (
                            <Nav.Link className={`${item.name !== 'Home' ? 'selectNav' : 'activeNav'}`} key={idx} style={{ color: "white", fontWeight: '500', fontSize: '18px' }}
                                onClick={() => {
                                    item.name !== 'Home' ? navigate(`/category/${item.link}`) : navigate(`/`)
                                }} >{item.name}
                            </Nav.Link>
                        ))}
                    </Nav>
                    <Form className="d-flex" onSubmit={onSubmit}>
                        <Form.Control type="search" placeholder="Search" className="me-2" onChange={onChange} />
                        <Button type="submit" variant="primary">Search</Button>
                    </Form>
                </Container>
            </Navbar>
        </>
    );
}

export default FoodNavbar;