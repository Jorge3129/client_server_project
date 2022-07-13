import React from 'react';
import './App.css';
import NavBar from "./components/layout/NavBar";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Main from "./components/layout/Main";
import GroupPage from "./components/groups/GroupPage";
import ProductList from "./components/ProductList";
import {GroupsProvider} from "./providers/GroupsProvider";

function App() {
   return (
       <BrowserRouter>
          <GroupsProvider>
             <NavBar/>
             <Routes>
                <Route path="/" element={<Main/>}>
                   <Route path="" element={<ProductList/>}/>
                   <Route path="groups/:groupId" element={<GroupPage/>}/>
                </Route>
             </Routes>
          </GroupsProvider>
       </BrowserRouter>
   );
}

export default App;
