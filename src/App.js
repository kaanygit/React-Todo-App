import {Route, Routes} from 'react-router-dom';
import Todo from './components/todo/todo.components';
import Home from './routes/home/home.component';
import './App.css';
import Navigation from './routes/navigation/navigation.routes';
import PrivateRoute from './routes/privateRoute/private-route.routes';
import Dashboard from './routes/dashboard/dashboard.routes'
import DashboardRoute from './routes/dashboard/dashboard.routes';
import { Fragment } from 'react';

function App() {
  return (
    <Routes>
      <Fragment>
        <Route path="/" exact element={<Navigation />}>
          <Route path="/" exact element={<Home />} />
          <Route path='/' exact element={<PrivateRoute/>}>
            <Route exact path='/todo' element={<Todo/>}/>
          </Route> 
          <Route path='/' element={<PrivateRoute />}>
            <Route exact path='/dashboard' element={<Dashboard/>}/>
          </Route>
        </Route>
      </Fragment>
    </Routes>
  );
}

export default App;


