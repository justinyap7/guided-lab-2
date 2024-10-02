import { useState, useEffect } from 'react'
import './App.css'
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link
} from "react-router-dom";
import Initial from './components/Initial';

function App() {
  const [initial, setInitial] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/characters`);
        if (!response.ok) {
          throw new Error('Data could not be fetched!');
        }
        const json_response = await response.json();
        setInitial(json_response);
      } catch (error) {
        console.error('Error fetching socks:', error);
      }
    };

    fetchData();
  }, [page]);

  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<Initial data={initial} page={page} setPage={setPage} />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
