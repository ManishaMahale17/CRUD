import {BrowserRouter,Routes,Route} from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import Home from './pages/Home';
import AddEdit from './pages/AddEdit';
import ViewDetails from './pages/ViewDetails';



function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <ToastContainer position='top-center'/>
      <Routes>
        <Route exact path="/" Component={Home} />
        <Route exact path="/addContact" Component={AddEdit} />
        <Route exact path="/update/:id" Component={AddEdit} />
        <Route exact path="/view/:id" Component={ViewDetails} />

      </Routes>
      </div>
    </BrowserRouter>
      
  );
}

export default App;
