import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { publicRoutes, adminRoutes } from './routes';
import { useContext } from 'react';
import { InfoUserContext } from './Context/InfoUserContext';
function App() {
  const { infoUser } = useContext(InfoUserContext);
  function renderRoutesBasedOnRole(role_id) {
    let routes;
    switch (role_id) {
      case 1:
        routes = adminRoutes;
        break;
      default:
        routes = publicRoutes;
    }

    return routes.map((route, index) => {
      const Page = route.component;
      return <Route key={index} path={route.path} element={<Page />} />;
    });
  }
  return (
    <Router>
      <div className="App">
        <Routes>{renderRoutesBasedOnRole(infoUser?.role_id)}</Routes>
      </div>
    </Router>
  );
}

export default App;
