import Layout from './components/Layout/Layout';
import Home from './components/Pages/Home/Home';
import classes from './components/Layout/Layout.module.css';
import { Route } from 'react-router-dom';
import Usecase1 from './containers/Usecases/Usecase1';
import Usecase2 from './containers/Usecases/Usecase2';
import Endpoints from './containers/Endpoints/Endpoints';
import Login from './containers/Login/Login';
import Logout from './containers/Login/Logout';

import About from './components/Pages/About/About';
function App() {
  return (
    <div>
      <Layout classname={classes.Layout}>
        {/* edw anemesa kanoume render tis selides */}
        {/* <Route path="/" exact component={Home} /> */}
        <Route path="/" exact component={Home} />
        <Route path="/endpoints" exact component={Endpoints} />
        <Route path="/usecase1" exact component={Usecase1} />
        <Route path="/usecase2" exact component={Usecase2} />
        <Route path="/login" exact component={Login} />
        <Route path="/about" exact component={About} />
        <Route path="/logout" exact component={Logout} />

        {/* <Route path="/logout" component={Logout} /> */}

        {/* <Home /> edw anemesa kanoume render tis selides */}
      </Layout>
    </div>
  );
}

export default App;
