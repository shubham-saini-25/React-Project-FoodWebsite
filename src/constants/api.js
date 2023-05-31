import { useEffect, useState } from 'react';

export default function Api() {
    const [data, setData] = useState([]);

    const fetchData = async () => {
        return fetch("https://api.sampleapis.com/coffee/hot")
            .then((response) => response.json())
            .then((data) => setData(data));
    }

    useEffect(() => {
        fetchData();
    }, [])

    return (
        data
    )
}