import React from "react";
import ReactDOM from "react-dom";
import Header from "./Header.jsx";
import AllCallsList from "./components/AllCallsList.jsx";
import ArchivedList from "./components/ArchivedList.jsx";
import Details from "./components/Details.jsx";
import Home from "./components/Home.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <div className="container">
      <BrowserRouter>
        <Header />
        <Routes>
        <Route path="/calls/:id" element={<Details />} />
        <Route path="/calls" element={<AllCallsList />} />
        <Route path="/archived" element={<ArchivedList />} />
        <Route path="/" element={<Home />} />
        </Routes>
     </BrowserRouter>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));

export default App;
