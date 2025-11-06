import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "What is IDP? - International Driving Permit | DrivePass",
  description: "Learn about the International Driving Permit (IDP). Accepted in 150+ countries, the IDP translates your license following the 1949 Geneva Convention. Apply online in under a minute.",
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
