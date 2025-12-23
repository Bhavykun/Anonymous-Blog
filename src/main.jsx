import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BlogList from './Components/BlogList';
import ModifyPost from './Components/ModifyPost';
import "./assets/main.css";

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Router future={{ v7_relativeSplatPath: true }}>
    <Routes>
      <Route path="/" element={<BlogList />} />
      <Route path="/new" element={<ModifyPost />} />
      <Route path="/edit/:id" element={<ModifyPost />} />
    </Routes>
  </Router>
);
