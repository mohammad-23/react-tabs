import "../styles/App.css";
import React from "react";

import Tabs from "./Tabs";

const App = () => {
  return (
    <div className="App">
      Tabs
      <Tabs>
        <Tabs.TabList>
          <Tabs.Tab isDisabled>First Tab</Tabs.Tab>
          <Tabs.Tab>Second Tab</Tabs.Tab>
          <Tabs.Tab isActive>ThirdTab</Tabs.Tab>
        </Tabs.TabList>
        <Tabs.TabPanels>
          <Tabs.TabPanel>First TabPanel</Tabs.TabPanel>
          <Tabs.TabPanel>Second TabPanel</Tabs.TabPanel>
          <Tabs.TabPanel>Third TabPanel</Tabs.TabPanel>
        </Tabs.TabPanels>
      </Tabs>
    </div>
  );
};

export default App;
