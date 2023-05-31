import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FoodCard from "../components/FoodCard";
import Layout from "./Layout";
import { HomeMenu, DrinksMenu, IceCreamMenu, FastFoodMenu, CoffeeMenu, SoupMenu } from '../constants/data';
import ItemContext from "../context/ItemContext";

function Category() {
    const [Menu, setMenu] = useState([]);
    const { search } = useContext(ItemContext);
    const { category } = useParams();

    const mergedFoodArray = [...DrinksMenu, ...IceCreamMenu, ...FastFoodMenu, ...CoffeeMenu, ...SoupMenu];

    const menu = () => {
        if (search !== '') {
            const filteredArray = mergedFoodArray.filter((item) => item.name.toLowerCase().includes(search.toLowerCase()));
            setMenu(filteredArray)
        } else {
            if (category === undefined) {
                setMenu(HomeMenu)
            } else if (category === "drinks") {
                setMenu(DrinksMenu)
            } else if (category === "fast-food") {
                setMenu(FastFoodMenu)
            } else if (category === "coffee") {
                setMenu(CoffeeMenu)
            } else if (category === "ice-cream") {
                setMenu(IceCreamMenu)
            } else if (category === "soups") {
                setMenu(SoupMenu)
            }
        }
    }

    useEffect(() => {
        menu()
    }, [category, search])

    return (
        <>
            <Layout>
                <div className="menu row row-cols-4">
                    {Menu.map((item, idx) => {
                        return (
                            <FoodCard key={idx} item={item} />
                        )
                    })}
                </div>
            </Layout>
        </>
    );
}

export default Category;