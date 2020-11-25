import { Route, Switch } from 'react-router-dom';
import PtHome from './pages/PtHome';
import ProfileHome from './pages/ProfileHome';
import Cart from './pages/user/Cart';
import MyPage from './pages/user/OrderPage';
import OrderPage from './pages/user/OrderPage';
import Account from './pages/user/Account';
import Header from './components/Header';
import Footer from './components/Footer';
import Shop from './pages/pt_list/Shop';
import List from './pages/pt_list/List';
import Admin from './pages/Admin';
import Card from './pages/board/CardForm';
import PtRegister from './pages/board/PtRegister';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { login } from './store';
import Exboard2 from './pages/ExList/Exboard2';
import Diet from './pages/ExList/Diet';
import StdShop from './pages/pt_list/StdShop';






function App() {

  const dispatch = useDispatch();
  useEffect(() => {
    if(localStorage.getItem("Authorization")!= null){
      dispatch(login());
    }
    },[]);

  
  return (
   <div>
    <div className="header">
     <Header/>
    </div>
     <Switch>        
        <Route path="/" exact={true} component={PtHome}/>
        <Route path="/ptList" exact={true} component={List}/>
        <Route path="/profilehome" exact={true} component={ProfileHome}/>
        <Route path="/orderPage" exact={true} component={OrderPage}/>
        <Route path="/cart" exact={true} component={Cart}/>
        <Route path="/card" exact={true} component={Card}/>
        <Route path="/ptRegister" exact={true} component={PtRegister}/>
        <Route path="/shop/:id" exact={true} component={Shop} />
        <Route path="/stshop/:id" exact={true} component={StdShop}/>
        <Route path="/admin" exact={true} component={Admin} />
        <Route path="/exboard" exact={true} component={Diet} />
     </Switch>
    
   </div>
  );
}

export default App;
