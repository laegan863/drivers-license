import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Apply for Driver's License - Application Form | DrivePass",
  description: "Complete your driver's license application online. Fast, secure, and easy process. Get your license delivered to your door. Apply now!",
};

export default function ApplicationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
