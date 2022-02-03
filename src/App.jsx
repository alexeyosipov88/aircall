import React from "react";
import ReactDOM from "react-dom";
import Header from "./Header.jsx";
import AllCallsList from "./components/AllCallsList.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <div className="container">
      <BrowserRouter>
        <Header />
        <Routes>
        <Route path="/calls" element={<AllCallsList />} />
        {/* <Route path="/archived" element={<AllCallsList />} /> */}
        </Routes>
        <div className="container-view">Some activities should be here</div>
     </BrowserRouter>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));

export default App;
