import { useEffect, useState } from "react";
import Item from "./Item";

const API_URI = `http://${import.meta.env.VITE_API_URI}/doors`;

const ItemList = () => {
    const [items, setItems] = useState([]);
    const [error, setError] = useState(null);


    useEffect(() => {
        fetch(API_URI)
            .then((response) => response.json())
            .then((data) => setItems(data))
            .catch((error) => {
                console.error("Error fetching items:", error);
                setError("Failed to fetch items");
            });
    }, []);


    const handleDelete = async (id) => {
        try {
            const response = await fetch(`${API_URI}/${id}`, {
                method: "DELETE",
            });

            if (!response.ok) {
                throw new Error("Failed to delete item");
            }

            setItems(items.filter((item) => item.id !== id));
        } catch (error) {
            console.error("Error deleting item:", error);
            setError("Failed to delete item");
        }
    };

    if (error) return <p>{error}</p>;
    if (!items.length) return <p>Loading...</p>;

    return (
        <div style={{ textAlign: "center", padding: "20px", fontFamily: "Arial, sans-serif" }}>
            <h2 style={{ color: "#333", marginBottom: "10px" }}>Item List</h2>
            <ul style={{ listStyleType: "none", padding: "0" }}>
                {items.map((item) => (
                    <Item 
                        key={item.id} 
                        item={item} 
                        onDelete={handleDelete} 
                        style={{
                            padding: "10px",
                            borderBottom: "1px solid #ddd",
                            textAlign: "left"
                        }}
                    />
                ))}
            </ul>
        </div>
    );
    
};

export default ItemList;
