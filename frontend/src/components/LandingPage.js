import React from 'react';
import { Box } from '@chakra-ui/react';
import Navbar from './Navbar';
import AboutSection from './AboutSection';
import FeaturesSection from './FeaturesSection';
import UpcomingEventsSection from './UpcomingEventsSection';
import Footer from './Footer';

function LandingPage() {
  return (
    <Box>
      <Navbar />


      {/* About Section */}
      <Box id="about" minH="100vh" bg="white">
        <AboutSection />
      </Box>

      {/* Features Section */}
      <Box id="features" minH="100vh" bg="gray.50">
        <FeaturesSection />
      </Box>

      {/* Events Section */}
      <Box id="events" minH="100vh" bg="white">
        <UpcomingEventsSection />
      </Box>

      {/* Footer */}
      <Footer />

    
    </Box>
  );
}

export default LandingPage;
