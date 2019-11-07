import "../styles/TabsStyles.css";
import React, { useState, useContext } from "react";

import TabsContext from "../contexts/TabsContext";

const Tab = props => {
  const { activeTab, setActiveTab } = useContext(TabsContext);

  if (props.isActive) {
    setActiveTab(props.index);
  }

  const className = `tab ${
    props.isDisabled ? "disabled" : activeTab === props.index ? "active" : null
  }`;

  return (
    <div
      className={className}
      onClick={() => {
        if (!props.isDisabled) {
          setActiveTab(props.index);
        }
      }}
    >
      {props.children}
    </div>
  );
};

const TabList = props => {
  const { setActiveTab } = useContext(TabsContext);

  const children = React.Children.map(props.children, (child, index) => {
    if (child.props.isDisabled && index === 0) {
      setActiveTab(index++);
    }

    return React.cloneElement(child, {
      index
    });
  });

  return <div className="tabs-list">{children}</div>;
};

const TabPanel = props => {
  const { activeTab } = useContext(TabsContext);

  return <div>{props.index === activeTab ? props.children : null}</div>;
};

const TabPanels = props => {
  const children = React.Children.map(props.children, (child, index) => {
    return React.cloneElement(child, {
      index
    });
  });

  return <div>{children}</div>;
};

const Tabs = props => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <TabsContext.Provider
      value={{
        activeTab,
        setActiveTab
      }}
    >
      {props.children}
    </TabsContext.Provider>
  );
};

Tabs.Tab = Tab;
Tabs.TabList = TabList;
Tabs.TabPanel = TabPanel;
Tabs.TabPanels = TabPanels;

export default Tabs;
