'use client'

import React from 'react'
import Banner from '../components/Home/Banner'
import NearBy from '../components/Home/NearBy'
import LiveAnywhere from '../components/Home/LiveAnywhere'
import DiscoverPlaces from '../components/Home/DiscoverPlaces'
import HostBanner from '../components/Home/HostBanner'
import Footer from "../components/Home/Footer"

const Home = () => {
    return (
        <div className="home">
            <Banner />

            <div className="home__nearby">
                <h1>Explore Nearby</h1>
                <NearBy />
            </div>

            <div className="home__anywhere">
                <h1>Live Anywhere</h1>
                <LiveAnywhere />
            </div>

            <div className="home__host">
                <HostBanner />
            </div>
            <div className="home__discover">
                <h1>Discover Places </h1>
                <DiscoverPlaces />
            </div>
            <div>
              <Footer />
            </div>
        </div>
    )
}

export default Home
