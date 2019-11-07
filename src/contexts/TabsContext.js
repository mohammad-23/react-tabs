import React from "react";

const TabsContext = React.createContext({
  activeTab: null,
  onTabChange: () => {},
});

export default TabsContext;
