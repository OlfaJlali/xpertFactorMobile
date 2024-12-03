import { useState } from 'react';

export const useTabState = <T extends string>(initialTab: T) => {
  const [selectedTab, setSelectedTab] = useState<T>(initialTab);

  return { selectedTab, setSelectedTab };
};
