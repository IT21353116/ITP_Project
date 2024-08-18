import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import List from "./pages/list/List";
import Single from "./pages/single/Single";
import New from "./pages/new/New";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import {  userInputs, vehicleInputs } from "./formSource";
import "./style/dark.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import { AuthContext } from "./context/AuthContext";
import NewVehicle from "./pages/newVehicle/NewVehicle";
import Payments from "./pages/payments/Payments"
import Reservations from "./pages/reservations/Reservations"

function App() {
  const { darkMode } = useContext(DarkModeContext);

  const ProtectedRoute = ({children}) => {
    const {user} = useContext(AuthContext)

    if(!user){
      return <Navigate to="/login"/>
    }
    return children;
  }

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
            <Route path="login" element={<Login />} />
          <Route path="/">
            <Route index 
            element=
            {<ProtectedRoute>
              <Home />
              </ProtectedRoute>
            }
            />
            <Route path="vehicles">
              <Route index element={<List />} />
              <Route path=":vehicleId" element={<Single inputs={vehicleInputs} title="View Vehicle"/>} />
              <Route
                path="new"
                element={<NewVehicle inputs={vehicleInputs} title="Add New Vehicle" />}
              />
            </Route>
            <Route path="products">
              <Route index element={<List />} />
              <Route path=":productId" element={<Single />} />
              <Route
                path="new"
                element={<New title="Add New Product" />}
              />
            </Route>
            <Route path="payments">
              <Route index element={<Payments />} />
            </Route>
          </Route>
          <Route path="vehicleReservations">
              <Route index element={<Reservations />} />
            </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
