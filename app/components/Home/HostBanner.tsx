'use client';

import { Button } from '@material-ui/core'
import React from 'react'

const HostBanner = () => {
    return (
        <div className="hostBanner">
            <div className="hostBanner__img">
                <img src="https://a0.muscache.com/im/pictures/2595054e-d1d9-4fde-8046-58d51fcb3164.jpg?im_w=1200" alt="host banner"/>
            </div>

            <div className="hostBanner__info">
                <h1>Become a Host</h1>
                <h3>
                    Earn extra income and unlock new opportunities by sharing your space.
                </h3>
                <Button 
                    variant='contained'>Learn More
                </Button>
            </div>
        </div>
    )
}

export default HostBanner
