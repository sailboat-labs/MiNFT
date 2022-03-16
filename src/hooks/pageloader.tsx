import { useEffect, useState } from "react";

import PageLoader from "@/components/shared/PageLoader";

export function usePageLoader(defaultValue?: boolean) {
  const [state, setState] = useState<boolean>(defaultValue ?? false);

  useEffect(() => {
    setState(state);
  }, [state]);

  function Loader() {
    return <>{state ? <PageLoader/> : <></>}</>;
  }

  return { Loader, state, setState };
}
