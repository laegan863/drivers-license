import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing Plans - Driver's License Services | DrivePass",
  description: "Compare our transparent pricing plans for driver's license services. From $39.99/year. All plans include secure processing, guaranteed delivery, and 24/7 support. 30-day money-back guarantee.",
};

export default function PricingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
