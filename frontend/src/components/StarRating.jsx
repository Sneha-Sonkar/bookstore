import React from 'react';
import ReactStars from 'react-rating-stars-component';

const StarRating = ({ rating, setRating, editable = true }) => {
    const handleRatingChange = (newRating) => {
        if (editable) {
            setRating(newRating);
        }
    };

    return (
        <ReactStars
            count={5}
            value={rating}
            onChange={handleRatingChange}
            size={24}
            activeColor="#ffd700"
            edit={editable}
        />
    );
};

export default StarRating;
