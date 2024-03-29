import React from "react";
import ReactDOM from "react-dom";
// import "/.index.css"; 
import App from "./App";
import {Provider} from "react-redux"; // orovider para que redux reconozca lo que tenemos dentro 
import {store} from "./redux/store/index"
 
ReactDOM.render(
   <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>,
   </Provider>,
  
  document.getElementById('root')
);



