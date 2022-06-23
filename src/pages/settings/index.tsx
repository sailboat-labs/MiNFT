import { useRouter } from "next/router";
import React, { ReactElement, useState } from "react";

import SettingsLayout from "@/components/layout/Settings";
// store
// components
import BasicSettings from "@/components/pages/settings/BasicSettings";
import CollectionSettings from "@/components/pages/settings/Collection";
import CommissionSettings from "@/components/pages/settings/Commission";

const SettingsPage = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<string>("settings");

  return (
    <section className="flex-1 overflow-y-auto bg-gray-100">
      <div className="container mx-auto max-w-2xl divide-y divide-gray-200 py-10">
        <BasicSettings />
        <CollectionSettings />
        <CommissionSettings />
      </div>
    </section>
  );
};

SettingsPage.getLayout = function getLayout(page: ReactElement) {
  return <SettingsLayout>{page}</SettingsLayout>;
};

export default SettingsPage;
