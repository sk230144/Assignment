import AddItemComponent from "./component/Api";
import CountsComponent from "./component/Show";
import UpdateItemComponent from "./component/Update";
import './App.css'

function App() {
  return (
    <div className="App">
       <AddItemComponent/>
       <UpdateItemComponent/>
       <CountsComponent/>
    </div>
  );
}

export default App;
