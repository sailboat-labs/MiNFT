import * as React from 'react';

import ExploreCategories from '@/components/pages/landing/categories';
import Header from '@/components/pages/landing/header';
import Seo from '@/components/Seo';
import LaunchingSoon from '@/components/pages/landing/launchingsoon';
import NewlyAdded from '@/components/pages/landing/newlyadded';

// !STARTERCONF -> Select !STARTERCONF and CMD + SHIFT + F
// Before you begin editing, follow all comments with `STARTERCONF`,
// to customize the default configuration.

export default function HomePage() {
  return (
    <div className='pb-20'>
      <Seo />

      <main>
        <Header />
        <ExploreCategories/>
        <LaunchingSoon/>
        <NewlyAdded/>
      </main>
    </div>
  );
}
