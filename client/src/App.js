import { useState } from "react";
import { BrowserRouter, Switch, Route} from "react-router-dom";
import './App.css';
import Chat from "./components/chat/Chat";
import Home from "./components/home/Home";
import { UserContext } from "./UserContext";

function App() {
  const [user, setUser] = useState(null)
  return (
    <BrowserRouter>
    <div className="App">
    <UserContext.Provider value={{user, setUser }} >
    <Switch>
    <Route exact path="/chat"  component={Chat} />
      <Route path="/" component={Home } />
    </Switch>
    </UserContext.Provider>
    </div>
    </BrowserRouter>
  );
}

export default App;
