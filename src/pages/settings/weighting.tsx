import React, { ReactElement } from "react";

import SettingsLayout from "@/components/layout/Settings";

const WeightingSettingsPage = () => {
  return (
    <section className="flex-1 overflow-y-auto bg-gray-100">
      <div className="container mx-auto max-w-2xl flex-1 divide-y divide-gray-200 bg-gray-100 py-10">
        Weighting Settings
      </div>
    </section>
  );
};

WeightingSettingsPage.getLayout = function getLayout(page: ReactElement) {
  return <SettingsLayout>{page}</SettingsLayout>;
};

export default WeightingSettingsPage;
