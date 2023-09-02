'use client';

import React from 'react'
import Card from './Card'

const LiveAnywhere = () => {
    return (
        <div className="live-anywhere">
            <Card
                src="https://a0.muscache.com/im/pictures/2f13349d-879d-43c6-83e3-8e5679291d53.jpg?im_w=480"
                title="Outdoor getaways"
            />
            <Card
                src="https://a0.muscache.com/im/pictures/36f53e61-db8d-403c-9122-5b761c0e4264.jpg?im_w=480"
                title="Unique stays"
            />
            <Card
                src="https://a0.muscache.com/im/pictures/7d82ca14-56e5-4465-8218-dcfa7d69b6ac.jpg?im_w=480"
                title="Entire homes"
            />
            <Card
                src="https://a0.muscache.com/im/pictures/10a638e1-6aff-4313-8033-1275cec83987.jpg?im_w=480"
                title="Pets allowed"
            />
        </div>
    )
}

export default LiveAnywhere
