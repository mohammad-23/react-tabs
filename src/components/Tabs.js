import "../styles/TabsStyles.css";
import React, { useState, useEffect, useContext } from "react";

import TabsContext from "../contexts/TabsContext";

const Tab = props => {
  const { activeTab, setActiveTab } = useContext(TabsContext);

  const className = `tab ${
    props.isDisabled
      ? "disabled inactive"
      : activeTab === props.index
      ? "active"
      : ""
  }`;

  return (
    <div
      className={className}
      onClick={() => {
        if (!props.isDisabled) {
          console.log("dsd", props);
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
    return React.cloneElement(child, {
      index
    });
  });

  useEffect(() => {
    const activatedTab = children.find(item => item.props.isActive);
    if (activatedTab) {
      setActiveTab(activatedTab.props.index);
    } else {
      const firstTabNotDisabled = children.find(item => !item.props.isDisabled);
      setActiveTab(firstTabNotDisabled.props.index);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div className="tabs-list">{children}</div>;
};

const TabPanel = props => {
  return <div>{props.children}</div>;
};

const TabPanels = props => {
  const { activeTab } = useContext(TabsContext);

  const children = React.Children.map(props.children, (child, index) => {
    return React.cloneElement(child, {
      index
    });
  });

  return <div>{children[activeTab]}</div>;
};

const Tabs = props => {
  const [activeTab, setActiveTab] = useState(0);

  const disabledTabs = props.children[0].props.children.map(
    item => item.props.isDisabled
  );

  const children = React.Children.map(props.children, (child, index) => {
    if (child.type.name === "TabPanels") {
      return React.cloneElement(child, {
        disabledTabs
      });
    }

    return child;
  });

  return (
    <TabsContext.Provider
      value={{
        activeTab,
        setActiveTab
      }}
    >
      {children}
    </TabsContext.Provider>
  );
};

Tabs.Tab = Tab;
Tabs.TabList = TabList;
Tabs.TabPanel = TabPanel;
Tabs.TabPanels = TabPanels;

export default Tabs;
