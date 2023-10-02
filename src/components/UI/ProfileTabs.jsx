import React, { useState } from "react";
import { Tab } from "@headlessui/react";
import DeckPreviewManage from "./DeckPreviewManage";
import classCondition from "../../utils/classCondition";
import DeckTable from "./DeckTable";
import ScoreReports from "./ScoreReports";

const ProfileTabs = ({ decks, scoreReports, username }) => {
  const [activeTab, setActiveTab] = useState(1);

  const tabs = ["Decks", "Scores"];
  const tabContent = [
    <DeckTable decks={decks}/>,
    <ScoreReports scoreReports={scoreReports} username={username}/>,
  ];

  return (
    <Tab.Group>
      <Tab.List className="flex space-x-3 rounded-xl">
        {tabs.map((tab, index) => {
          return (
            <Tab
              key={tab}
              className={classCondition(
                "w-40 py-2.5 text-sm font-medium leading-5 text-slate-800",
                activeTab === index + 1
                  ? "bg-white border-b-2 border-primary focus:outline-none"
                  : "bg-slate-50"
              )}
              onClick={() => setActiveTab(index + 1)}
            >
              {tab}
            </Tab>
          );
        })}
      </Tab.List>
      <Tab.Panels className="bg-white p-8 rounded">
        {tabContent.map((content, index) => (
          <Tab.Panel key={index}>{content}</Tab.Panel>
        ))}
      </Tab.Panels>
    </Tab.Group>
  );
};

export default ProfileTabs;
