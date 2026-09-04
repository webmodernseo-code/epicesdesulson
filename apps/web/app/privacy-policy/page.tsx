import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Sellzy - Multivendor eCommerce Template",
  description: "Read our privacy policy to understand how we collect, use, and protect your personal data on our marketplace.",
  openGraph: {
    title: "Privacy Policy | Sellzy - Multivendor eCommerce Template",
    description: "Read our privacy policy to understand how we collect, use, and protect your personal data on our marketplace.",
  },
};

import PolicyLayout from "@/components/policy/policy-layout";

export default function PrivacyPolicyPage() {
  const navItems = [
    { id: "overview", label: "Overview" },
    { id: "information-we-collect", label: "Information We Collect" },
    { id: "payment-security", label: "Payment Security" },
    { id: "cookies-tracking", label: "Cookies & Tracking" },
    { id: "data-sharing", label: "Data Sharing" },
    { id: "data-security", label: "Data Security" },
    { id: "your-rights", label: "Your Rights" },
    { id: "policy-updates", label: "Policy Updates" },
    { id: "contact-us", label: "Contact Us" },
  ];

  return (
    <PolicyLayout 
      title="Privacy Policy" 
      breadcrumbLabel="Privacy and Policy" 
      navItems={navItems}
    >
      <p>
        At Sellzy, we value your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, store, and protect your data when you use our website, mobile applications, and services.
      </p>

      <section id="information-we-collect">
        <h2>1. Information We Collect</h2>
        <p>We may collect the following types of information:</p>
        <ul>
          <li>Personal details such as name, email address, phone number, and shipping address</li>
          <li>Billing and payment information</li>
          <li>Account login credentials</li>
          <li>Order history and purchase preferences</li>
          <li>Device, browser, and IP address information</li>
          <li>Cookies and usage analytics data</li>
        </ul>
      </section>

      <section id="how-we-use-your-information">
        <h2>2. How We Use Your Information</h2>
        <p>Your information may be used to:</p>
        <ul>
          <li>Process and fulfill orders</li>
          <li>Provide customer support</li>
          <li>Improve website performance and user experience</li>
          <li>Personalize product recommendations</li>
          <li>Send order updates and promotional communications</li>
          <li>Prevent fraud and unauthorized activity</li>
        </ul>
      </section>

      <section id="payment-security">
        <h2>3. Payment Information</h2>
        <p>
          All payment transactions are securely processed through trusted third-party payment gateways.
          <br />
          Sellzy does not store full card numbers, CVV codes, or sensitive payment credentials on our servers.
        </p>
      </section>

      <section id="cookies-tracking">
        <h2>4. Cookies & Tracking Technologies</h2>
        <p>We use cookies and similar technologies to:</p>
        <ul>
          <li>Remember login sessions</li>
          <li>Save cart and wishlist items</li>
          <li>Analyze traffic and performance</li>
          <li>Improve personalization</li>
        </ul>
        <p>
          You may disable cookies through your browser settings, although some features may not function properly.
        </p>
      </section>

      <section id="data-sharing">
        <h2>5. Data Sharing</h2>
        <p>
          We do not sell your personal information.
          <br />
          Your data may be shared only with trusted service providers such as:
        </p>
        <ul>
          <li>Payment gateways</li>
          <li>Delivery and logistics partners</li>
          <li>Analytics providers</li>
          <li>Customer support tools</li>
        </ul>
      </section>

      <section id="data-security">
        <h2>6. Data Security</h2>
        <p>
          We implement industry-standard technical and organizational security measures to protect your data from unauthorized access, misuse, or disclosure.
        </p>
      </section>

      <section id="your-rights">
        <h2>7. Your Rights</h2>
        <p>You may request to:</p>
        <ul>
          <li>Access your personal data</li>
          <li>Update or correct inaccurate information</li>
          <li>Delete your account</li>
          <li>Opt out of marketing communications</li>
        </ul>
      </section>

      <section id="policy-updates">
        <h2>8. Policy Updates</h2>
        <p>
          We may update this Privacy Policy from time to time. Any changes will be published on this page with the updated effective date.
        </p>
      </section>

      <section id="contact-us">
        <h2>9. Contact Us</h2>
        <p>
          For privacy-related questions, please contact our support team.
        </p>
      </section>
    </PolicyLayout>
  );
}
