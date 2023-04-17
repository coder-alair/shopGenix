import React from 'react';
import { useState } from 'react';
const Counter = () => {
    const [count, setCount] = useState(1);
    const incre = () => {
        setCount(count + 1);
    }

    const decre = () => {
        setCount(count - 1);
    }
    return (
        <div>
            <p><button className="btn btn-primary btn-sm" style={{ border: "none" }} onClick={decre}>-</button> {count} <button className="btn btn-primary btn-sm" onClick={incre} style={{ border: "none" }}>+</button></p>

        </div>
    );
}

export default Counter;