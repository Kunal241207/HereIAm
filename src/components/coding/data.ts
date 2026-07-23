import { SiLeetcode, SiCodeforces, SiCodechef } from "react-icons/si"

export const ossContributions = [
  {
    repo: "SugarLabs",
    desc: "Contributed to core features and fixed UI bugs in the open-source learning platform.",
    prs: [
      { title: "Add install button for PWA using deferredPrompt", url: "https://github.com/sugarlabs/musicblocks/pull/5406" },
      { title: "Fix maximize handler affecting only last status header column", url: "https://github.com/sugarlabs/musicblocks/pull/5796" },
    ],
  },
  {
    repo: "OWASP BLT",
    desc: "Implemented security features and improved the user experience for the bug logging tool.",
    prs: [
      { title: "Fix route shadowing by sorting routes by specificity", url: "https://github.com/OWASP-BLT/BLT-API/pull/16" },
      { title: "Fix repository page XSS via AI summary and HTML sanitization", url: "https://github.com/OWASP-BLT/BLT/pull/5701" },
    ],
  },
  {
    repo: "OpenFoodFacts",
    desc: "Expanded food product taxonomy and refined contributor documentation hygiene.",
    prs: [
      { title: "Add Dal Baati Churma to food categories", url: "https://github.com/openfoodfacts/openfoodfacts-server/pull/13085" },
      { title: "Clean up wording and fix grammar/typos", url: "https://github.com/openfoodfacts/openfoodfacts-server/pull/12997" },
    ],
  },
  {
    repo: "M-Lab",
    desc: "Contributed to network measurement tools and improved data parsing for the open-source internet measurement platform.",
    prs: [
      { title: "Correct ndt7 upload throughput parsing and add coverage", url: "https://github.com/m-lab/murakami/pull/123" },
      { title: "Fix README links and WebThings typo", url: "https://github.com/m-lab/murakami/pull/122" },
    ],
  },
]

export const cpProfiles = [
  {
    platform: "LeetCode",
    stat: "500+",
    statLabel: "Problems Solved",
    url: "https://leetcode.com/u/kr4tigya_0G-/",
    icon: SiLeetcode,
    tilt: "-rotate-2 md:-translate-y-4",
    color: "#B7FF2A",
  },
  {
    platform: "Codeforces",
    stat: "Specialist",
    statLabel: "Rating Title",
    url: "https://codeforces.com/profile/Kunal_G127",
    icon: SiCodeforces,
    tilt: "rotate-2 md:-translate-y-8",
    color: "#B7FF2A",
  },
  {
    platform: "CodeChef",
    stat: "3 ★",
    statLabel: "Star Rating",
    url: "https://www.codechef.com/users/cry_braid_06",
    icon: SiCodechef,
    tilt: "-rotate-3 md:-translate-y-2",
    color: "#B7FF2A",
  },
]
