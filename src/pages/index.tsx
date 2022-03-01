import * as React from 'react';

import ExploreCategories from '@/components/pages/landing/categories';
import Header from '@/components/pages/landing/header';
import Seo from '@/components/Seo';
import LaunchingSoon from '@/components/pages/landing/launchingsoon';

// !STARTERCONF -> Select !STARTERCONF and CMD + SHIFT + F
// Before you begin editing, follow all comments with `STARTERCONF`,
// to customize the default configuration.

export default function HomePage() {
  return (
    <div className='pb-20'>
      {/* <Seo templateTitle='Home' /> */}
      <Seo />

      <main>
        <Header />
        <ExploreCategories/>
        <LaunchingSoon/>
        {/* <FeaturedCollections/> */}
      </main>
    </div>
  );
}
