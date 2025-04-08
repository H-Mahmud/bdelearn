import { CONFIG } from "src/config-global";

import { BlankView } from "src/sections/blank/view";

export const metadata = { title: `Dashboard - ${CONFIG.site.name}` };

export default function AnalyticsPage() {
  return <BlankView title="Analytics Page" />;
}
