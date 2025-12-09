import Signup from "./Signup"
import "bootstrap/dist/css/bootstrap.min.css"
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Login from "./Login"
import Dashboard from "./Dashboard";

function App() {
  

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/register" element={<Signup/>}>
          </Route>
          <Route path="/login" element={<Login/>}>
          </Route>
          <Route path="/dashboard" element={<Dashboard/>}>
          </Route>

        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
