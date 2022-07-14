import React from 'react';
import './App.css';
import NavBar from "./components/layout/NavBar";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Main from "./components/layout/Main";
import GroupPage from "./components/groups/GroupPage";
import ProductList from "./components/groups/ProductList";
import {GroupsProvider} from "./providers/GroupsProvider";
import {ModalProvider} from "./providers/ModalProvider";

function App() {
   return (
       <BrowserRouter>
          <GroupsProvider>
             <ModalProvider>
                <NavBar/>
                <Routes>
                   <Route path="/" element={<Main/>}>
                      <Route path="" element={<ProductList/>}/>
                      <Route path="groups/:groupId" element={<GroupPage/>}/>
                   </Route>
                </Routes>
             </ModalProvider>
          </GroupsProvider>
       </BrowserRouter>
   );
}

export default App;
