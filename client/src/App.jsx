import Main from './views/Main';
import Details from './views/Details';
import './bootstrap.min.css';
import { Routes, Route } from 'react-router-dom';
import AuthorForm from './components/AuthorForm';
import AuthorUpdate from './components/AuthorUpdate';
import { Container } from 'react-bootstrap';
import Header from './components/Header';
import { useState } from 'react';

function App() {
  const [loaded, setLoaded] = useState(false);
  return (
    <>
      <Container className="mt-3">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Header />
                <Main />
              </>
            }
          />
          <Route
            path="/new"
            element={
              <>
                <Header />
                <AuthorForm setLoaded={setLoaded} />
              </>
            }
          />
          <Route
            path="/:id"
            element={
              <>
                <Header />
                <Details />
              </>
            }
          />
          <Route
            path="/edit/:id"
            element={
              <>
                <Header />
                <AuthorUpdate />
              </>
            }
          />
        </Routes>
      </Container>
    </>
  );
}
export default App;
