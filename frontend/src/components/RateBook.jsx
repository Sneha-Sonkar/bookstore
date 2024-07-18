import React, { useState } from 'react';
import StarRating from './StarRating';

const RateBook = ({ bookId }) => {
    const [rating, setRating] = useState(0); // Initialize rating state as a number

    const submitRating = async () => {
        if (isNaN(rating) || rating <= 0 || rating > 5) {
            alert('Rating must be a number between 1 and 5');
            return;
        }

        const response = await fetch(`/api/books/${bookId}/rate`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ rating }),
        });

        const result = await response.json();
        if (response.ok) {
            alert('Rating submitted successfully');
        } else {
            alert(result.message);
        }
    };

    return (
        <div>
            <h3>Rate this Book</h3>
            <StarRating rating={rating} setRating={setRating} />
            <button onClick={submitRating}>Submit Rating</button>
        </div>
    );
};

export default RateBook;
