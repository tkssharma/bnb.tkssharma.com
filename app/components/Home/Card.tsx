'use client';

import React from 'react'


const Card = ({ src, title, description, price }: any) => {
    return (
        <div className="card">
            <img src={src} alt={title} />
            <div className="card__info">
                <h2>{title}</h2>
                <h4>{description}</h4>
                <h3>{price}</h3>
            </div>
        </div>
    )
}

export default Card
