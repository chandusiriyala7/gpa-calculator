import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import styled from "styled-components";

// Container styling with responsive design
const HomePage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #6e8efb, #a777e3);
  position: relative; /* Added for positioning of the signature */
  overflow: hidden; /* Prevents content overflow */
  scroll-behavior: smooth; /* Ensures smooth scrolling */

  @media (max-width: 768px) {
    padding: 20px; /* Add padding to prevent content from touching the edges */
    height: auto; /* Adjust height for smaller screens */
    background: linear-gradient(135deg, #6e8efb, #a777e3); /* Ensure background covers all space */
  }
`;

const Title = styled.h1`
  font-size: 3rem;
  color: white;
  text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.3);
  text-align: center; /* Center align text */
  margin: 0;
  margin-bottom:10px;

  @media (max-width: 768px) {
    font-size: 2rem; /* Adjust font size for smaller screens */
    margin: 20px 0; /* Add margin for spacing */
  }
`;

const StyledButton = styled(motion.button)`
  padding: 15px 30px;
  font-size: 1.2rem;
  margin: 10px; /* Adjust margin for spacing */
  background: white;
  color: #6e8efb;
  border: none;
  border-radius: 50px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    background: #6e8efb;
    color: white;
  }

  @media (max-width: 768px) {
    font-size: 1rem; /* Adjust font size for smaller screens */
    padding: 12px 24px; /* Adjust padding for smaller screens */
    margin: 10px; /* Adjust margin for spacing */
  }
`;

const Signature = styled(motion.div)`
  position: absolute;
  bottom: 10px;
  right: 10px;
  color: white;
  font-size: 0.8rem;
  font-style: italic;
  text-shadow: 1px 1px 5px rgba(0, 0, 0, 0.5);

  @media (max-width: 768px) {
    font-size: 0.7rem; /* Adjust font size for smaller screens */
    bottom: 5px;
    right: 5px;
  }
`;

const Home = () => {
  return (
    <HomePage>
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2 }}
      >
        <Title>Welcome to the GPA Calculator</Title>
        <Link to="/SGPACalculator">
          <StyledButton
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            Start Calculating SGPA
          </StyledButton>
        </Link>
        <Link to="/CGPACalculator">
          <StyledButton
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            Start Calculating CGPA
          </StyledButton>
        </Link>
      </motion.div>
      <Signature
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        whileHover={{ scale: 1.1, color: "#f0f0f0" }}
        whileTap={{ scale: 0.9 }}
      >
        Built By Chandusiriyala
      </Signature>
    </HomePage>
  );
};

export default Home;
