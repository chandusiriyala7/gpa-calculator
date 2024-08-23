import React from "react";
import { BrowserRouter ,Routes, Route} from "react-router-dom";
import Home from './components/Home';
import SGPACalculator from "./components/SGPACalculator";
import CGPACalculator from './components/CGPACalculator'

const App = () => {
  return (
    <div>
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home/>} />
        <Route path="/SGPACalculator" element={<SGPACalculator />} />
        <Route path="/CGPACalculator" element={<CGPACalculator />} />
      </Routes>
    </BrowserRouter>
    </div>
  );
};

export default App;

