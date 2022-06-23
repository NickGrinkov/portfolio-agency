import React, { FC } from "react";
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";

import "./App.scss";

const App: FC = (): JSX.Element => {
  return (
    <div className="app">
      <Header />
      <Main />
    </div>
  );
};

export default App;
