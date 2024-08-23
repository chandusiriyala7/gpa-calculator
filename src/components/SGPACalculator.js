import React, { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

const CalculatorPage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #a777e3, #6e8efb);
  padding: 20px;

  @media (max-width: 600px) {
    padding: 10px;
  }
`;

const Title = styled.h2`
  font-size: 2.5rem;
  color: white;
  margin-bottom: 20px;

  @media (max-width: 600px) {
    font-size: 1.8rem;
    margin-bottom: 15px;
  }
`;

const Input = styled.input`
  padding: 10px;
  font-size: 1rem;
  margin: 5px;
  border-radius: 8px;
  border: 2px solid white;
  outline: none;
  width: 120px;

  @media (max-width: 600px) {
    width: 90px;
    font-size: 0.9rem;
    padding: 8px;
  }
`;

const Label = styled.label`
  color: white;
  margin-right: 10px;

  @media (max-width: 600px) {
    font-size: 0.9rem;
    margin-right: 5px;
  }
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  margin: 10px 0;
  flex-wrap: wrap;
  gap: 10px;

  @media (max-width: 600px) {
    flex-direction: row;
    gap: 5px;
    align-items: baseline; /* Align items to the baseline to improve alignment */
  }
`;

const CalculateButton = styled(motion.button)`
  padding: 10px 20px;
  font-size: 1.2rem;
  margin-top: 20px;
  background: white;
  color: #a777e3;
  border: none;
  border-radius: 50px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  cursor: pointer;

  &:hover {
    transform: translateY(-5px);
    background: #a777e3;
    color: white;
  }

  @media (max-width: 600px) {
    padding: 8px 16px;
    font-size: 1rem;
    margin-top: 15px;
  }
`;

const Result = styled(motion.div)`
  margin-top: 30px;
  font-size: 1.5rem;
  color: white;
  margin-bottom: 20vh;

  @media (max-width: 600px) {
    font-size: 1.2rem;
    margin-top: 20px;
  }
`;

const SGPACalculator = () => {
  const [numSubjects, setNumSubjects] = useState(0);
  const [subjects, setSubjects] = useState([]);
  const [gpa, setGpa] = useState(null);

  const handleNumSubjectsChange = (e) => {
    const value = parseInt(e.target.value, 10);
    setNumSubjects(value);
    setSubjects(Array.from({ length: value }, () => ({ registeredCredits: "", gainedCredits: "" })));
  };

  const handleInputChange = (index, field, value) => {
    const newSubjects = [...subjects];
    newSubjects[index][field] = value;
    setSubjects(newSubjects);
  };

  const calculateGPA = () => {
    let totalRegisteredCredits = 0;
    let totalWeightedCredits = 0;

    subjects.forEach((subject) => {
      const registeredCredits = parseFloat(subject.registeredCredits) || 0;
      const gainedCredits = parseFloat(subject.gainedCredits) || 0;
      totalRegisteredCredits += registeredCredits;
      totalWeightedCredits += registeredCredits * gainedCredits;
    });

    const calculatedGPA = totalWeightedCredits / totalRegisteredCredits;
    setGpa(calculatedGPA.toFixed(2));
  };

  return (
    <CalculatorPage>
      <Title>Calculate Your Semester GPA</Title>
      <Row>
        <Label>Number of Subjects:</Label>
        <Input
          type="number"
          min="1"
          value={numSubjects}
          onChange={handleNumSubjectsChange}
        />
      </Row>
      {subjects.map((subject, index) => (
        <Row key={index}>
          <Label>Registered Credits for Subject {index + 1}:</Label>
          <Input
            type="number"
            min="0"
            value={subject.registeredCredits}
            onChange={(e) =>
              handleInputChange(index, "registeredCredits", e.target.value)
            }
          />
          <Label>Gained Grade:</Label>
          <Input
            type="number"
            min="0"
            value={subject.gainedCredits}
            onChange={(e) =>
              handleInputChange(index, "gainedCredits", e.target.value)
            }
          />
        </Row>
      ))}
      <CalculateButton
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={calculateGPA}
      >
        Calculate
      </CalculateButton>
      {gpa !== null && (
        <Result
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          Your Semester GPA is: <b>{gpa}</b>
        </Result>
      )}
    </CalculatorPage>
  );
};

export default SGPACalculator;
