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
  box-sizing: border-box;

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
  width: 100px;

  @media (max-width: 600px) {
    width: 80px;
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

  @media (max-width: 600px) {
    flex-direction: row;
    align-items: center;
    margin: 10px 0;
    flex-wrap: wrap;
    justify-content: space-between;
  }
`;

const SemesterContainer = styled.div`
  background-color: rgba(255, 255, 255, 0.1);
  padding: 20px;
  border-radius: 10px;
  margin: 10px 0;
  width: 80%;
  max-width: 800px;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 600px) {
    width: 100%;
    padding: 15px;
    margin: 8px 0;
  }
`;

const SemesterTitle = styled.h3`
  font-size: 1.8rem;
  color: white;
  margin-bottom: 20px;

  @media (max-width: 600px) {
    font-size: 1.4rem;
    margin-bottom: 15px;
  }
`;

const ResultsSection = styled.div`
  margin-top: 20px;
  font-size: 1.2rem;
  color: white;

  @media (max-width: 600px) {
    margin-top: 15px;
    font-size: 1rem;
  }
`;

const SGPAResult = styled.div`
  margin-top: 10px;
  font-size: 1.2rem;
  font-weight: bold;
  background: linear-gradient(90deg, #ffeb3b, #fbc02d);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  @media (max-width: 600px) {
    font-size: 1rem;
    margin-top: 8px;
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
  margin-top: 20px;
  font-size: 1.5rem;
  font-weight: bold;
  background: linear-gradient(90deg, #ff5722, #d32f2f);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  @media (max-width: 600px) {
    font-size: 1.2rem;
    margin-top: 15px;
  }
`;

const CumulativeGPA = () => {
  const [numSemesters, setNumSemesters] = useState(0);
  const [semesters, setSemesters] = useState([]);
  const [cgpa, setCgpa] = useState(null);

  const handleNumSemestersChange = (e) => {
    const value = parseInt(e.target.value, 10);
    setNumSemesters(value);
    setSemesters(Array.from({ length: value }, () => ({
      numSubjects: 0,
      subjects: [],
      sgpa: null,
      totalRegisteredCredits: 0,
    })));
  };

  const handleNumSubjectsChange = (semIndex, value) => {
    const newSemesters = [...semesters];
    newSemesters[semIndex].numSubjects = parseInt(value, 10);
    newSemesters[semIndex].subjects = Array.from({ length: value }, () => ({ registeredCredits: "", gainedCredits: "" }));
    setSemesters(newSemesters);
  };

  const handleSubjectChange = (semIndex, subjIndex, field, value) => {
    const newSemesters = [...semesters];
    newSemesters[semIndex].subjects[subjIndex][field] = value;
    setSemesters(newSemesters);
  };

  const calculateCGPA = () => {
    let totalWeightedSGPA = 0;
    let totalCredits = 0;

    semesters.forEach((semester, semIndex) => {
      let totalRegisteredCredits = 0;
      let totalWeightedCredits = 0;

      semester.subjects.forEach((subject) => {
        const registeredCredits = parseFloat(subject.registeredCredits) || 0;
        const gainedCredits = parseFloat(subject.gainedCredits) || 0;
        totalRegisteredCredits += registeredCredits;
        totalWeightedCredits += registeredCredits * gainedCredits;
      });

      const sgpa = totalWeightedCredits / totalRegisteredCredits;
      semesters[semIndex].sgpa = sgpa;
      semesters[semIndex].totalRegisteredCredits = totalRegisteredCredits;

      totalWeightedSGPA += sgpa * totalRegisteredCredits;
      totalCredits += totalRegisteredCredits;
    });

    const calculatedCGPA = totalWeightedSGPA / totalCredits;
    setCgpa(calculatedCGPA.toFixed(2));
  };

  return (
    <CalculatorPage>
      <Title>Calculate Your Cumulative GPA</Title>
      <Row>
        <Label>Number of Semesters:</Label>
        <Input
          type="number"
          min="1"
          value={numSemesters}
          onChange={handleNumSemestersChange}
        />
      </Row>
      {semesters.map((semester, semIndex) => (
        <SemesterContainer key={semIndex}>
          <SemesterTitle>Semester {semIndex + 1}</SemesterTitle>
          <Row>
            <Label>Number of Subjects in Semester {semIndex + 1}:</Label>
            <Input
              type="number"
              min="1"
              value={semester.numSubjects}
              onChange={(e) => handleNumSubjectsChange(semIndex, e.target.value)}
            />
          </Row>
          {semester.subjects.map((subject, subjIndex) => (
            <Row key={subjIndex}>
              <Label>Registered Credits for Subject {subjIndex + 1}:</Label>
              <Input
                type="number"
                min="0"
                value={subject.registeredCredits}
                onChange={(e) =>
                  handleSubjectChange(semIndex, subjIndex, "registeredCredits", e.target.value)
                }
              />
              <Label>Gained Grade:</Label>
              <Input
                type="number"
                min="0"
                value={subject.gainedCredits}
                onChange={(e) =>
                  handleSubjectChange(semIndex, subjIndex, "gainedCredits", e.target.value)
                }
              />
            </Row>
          ))}
          {semester.sgpa !== null && (
            <ResultsSection>
              <SGPAResult>
                SGPA for Semester {semIndex + 1}: <span>{semester.sgpa.toFixed(2)}</span>
              </SGPAResult>
            </ResultsSection>
          )}
        </SemesterContainer>
      ))}
      <CalculateButton
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={calculateCGPA}
      >
        Calculate
      </CalculateButton>
      {cgpa !== null && (
        <Result
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          Your Cumulative GPA is: <span>{cgpa}</span>
        </Result>
      )}
    </CalculatorPage>
  );
};

export default CumulativeGPA;
