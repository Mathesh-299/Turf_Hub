import React from 'react'
import CallToActionSection from '../card/CallToActionSection'
import FinalHeroSection from '../card/FinalHeroSection'
import HeroSection from '../card/HeroSection'
import KeyFeaturesSection from '../card/KeyFeaturesSection'
import WhyChooseSection from '../card/WhyChooseSection'
import Navbar from '../component/Navbar'

const Home = () => {
  return (
    <>
    <Navbar/>
      <HeroSection />
      <WhyChooseSection />
      <KeyFeaturesSection />
      <CallToActionSection />
      <FinalHeroSection />
    </>
  )
}

export default Home