import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import { Users } from "./containers/Users/Users";
import { Layout } from './containers/Layout/Layout';

function App() {
  return (
    <Layout>
      <Users />
    </Layout>
  );
}

export default App;
