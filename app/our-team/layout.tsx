import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Team",
};

export default function OurTeamLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
