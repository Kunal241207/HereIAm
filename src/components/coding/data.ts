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
    repo: "OWASP",
    desc: "Improved security tooling, strengthened documentation, and enhanced validation across OWASP projects.",
    prs: [
      { title: "Harden OSV response handling to prevent false-negative scans", url: "https://github.com/OWASP/cve-lite-cli/pull/985" },
      { title: "Optimize CI validation and fix data-quality checks", url: "https://github.com/OWASP/www-community/pull/1312" },
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
  {
    repo: "freeCodeCamp",
    desc: "Improved the learning curriculum through clearer explanations, accurate examples, and more accessible lesson markup.",
    prs: [
      { title: "Improve Flexbox curriculum content and examples", url: "https://github.com/freeCodeCamp/freeCodeCamp/pull/69265" },
      { title: "Add semantic keyboard markup to database lessons", url: "https://github.com/freeCodeCamp/freeCodeCamp/pull/69730" },
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
    url: "https://www.codechef.com/users/fave_salt_95",
    icon: SiCodechef,
    tilt: "-rotate-3 md:-translate-y-2",
    color: "#B7FF2A",
  },
]
