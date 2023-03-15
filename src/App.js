import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ListScreen from "./screens/ListScreen";
import ShowDetails from "./screens/ShowDetails";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ListScreen />} />
        <Route path="/showdetails/:id" element={<ShowDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
