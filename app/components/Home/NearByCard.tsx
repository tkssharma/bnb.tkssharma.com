'use client';

import React from 'react'

const NearByCard = ({ img, name, distHr }: any) => {
    return (
        <div className="nearby-card">
            <img src={img} alt={name}/>
            <div className="nearby-card__info">
                <h3>{name}</h3>
                <p>{distHr}-hour drive</p>
            </div>
        </div>
    )
}

export default NearByCard
