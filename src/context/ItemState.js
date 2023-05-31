import React from 'react';
import { useState } from 'react'
import ItemContext from './ItemContext';

const ItemState = (props) => {

    const [items, setItems] = useState([]);
    const [search, setSearch] = useState('');

    return (
        <ItemContext.Provider value={{ items, setItems, search, setSearch }}>
            {props.children}
        </ItemContext.Provider>
    )
}

export default ItemState;