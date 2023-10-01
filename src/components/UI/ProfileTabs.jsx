import React, { useState } from "react";
import { Tab } from "@headlessui/react";
import DeckPreviewManage from "./DeckPreviewManage";
import classCondition from "../../utils/classCondition";

const ProfileTabs = ({ decks, scores }) => {
  const [activeTab, setActiveTab] = useState(1);

  const tabs = ["Decks", "Scores"];

  return (
    <Tab.Group>
      <Tab.List className="flex space-x-1 rounded-xl">
        {tabs.map((tab, index) => {
          return (
            <Tab
              key={tab}
              className={classCondition(
                "w-40 py-2.5 text-sm font-medium leading-5 text-slate-800",
                activeTab === index+1
                  ? "bg-white border-b-2 border-primary"
                  : "bg-slate-50"
              )}
              onClick={() => setActiveTab(index + 1)}
            >
              {tab}
            </Tab>
          );
        })}
      </Tab.List>
      <Tab.Panels className="bg-white p-4 rounded">
        <Tab.Panel>
          <div>
            {decks.map((deck) => {
              return (
                <DeckPreviewManage
                  name={deck.name}
                  id={deck._id}
                  description={deck.description}
                  user={null}
                  cardCount={deck.cardCount}
                  edit={true}
                />
              );
            })}
          </div>
        </Tab.Panel>
        <Tab.Panel>Content 2</Tab.Panel>
      </Tab.Panels>
    </Tab.Group>
  );
};

export default ProfileTabs;
