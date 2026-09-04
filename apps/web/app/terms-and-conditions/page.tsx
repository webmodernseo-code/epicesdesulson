import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions | Sellzy - Multivendor eCommerce Template",
  description: "Review the terms and conditions governing your use of the Sellzy marketplace platform and its services.",
  openGraph: {
    title: "Terms & Conditions | Sellzy - Multivendor eCommerce Template",
    description: "Review the terms and conditions governing your use of the Sellzy marketplace platform and its services.",
  },
};

import PolicyLayout from "@/components/policy/policy-layout";

export default function TermsAndConditionsPage() {
  const navItems = [
    { id: "overview", label: "Overview" },
    { id: "acceptance-of-terms", label: "Acceptance of Terms" },
    { id: "account-registration", label: "Account Registration" },
    { id: "products-pricing", label: "Products & Pricing" },
    { id: "orders-payments", label: "Orders & Payments" },
    { id: "shipping-delivery", label: "Shipping & Delivery" },
    { id: "returns-refunds", label: "Returns & Refunds" },
    { id: "user-conduct", label: "User Conduct" },
    { id: "intellectual-property", label: "Intellectual Property" },
    { id: "limitation-of-liability", label: "Limitation of Liability" },
    { id: "changes-to-terms", label: "Changes to Terms" },
    { id: "contact-information", label: "Contact Information" },
  ];

  return (
    <PolicyLayout 
      title="Terms of Service" 
      breadcrumbLabel="Terms and Conditions" 
      navItems={navItems}
    >
      <p>
        Welcome to Sellzy. These Terms of Service (&quot;Terms&quot;) govern your access to and use of our website, mobile applications, products, and related services. By accessing, browsing, or placing an order through Sellzy, you agree to be bound by these Terms. If you do not agree with any part of these Terms, please discontinue use of our services.
      </p>

      <section id="acceptance-of-terms">
        <h2>1. Acceptance of Terms</h2>
        <p>
          By using Sellzy, you confirm that you are at least 18 years old or are using the platform under the supervision of a parent or legal guardian. Your continued use of the platform indicates your acceptance of these Terms, our Privacy Policy, and any additional policies referenced herein.
        </p>
      </section>

      <section id="account-registration">
        <h2>2. Account Registration</h2>
        <p>
          To access certain features, including order history, wishlist, and faster checkout, you may be required to create an account.
          <br />
          You agree to:
        </p>
        <ul>
          <li>Provide accurate and complete information during registration</li>
          <li>Keep your account credentials secure and confidential</li>
          <li>Notify us immediately of any unauthorized access or suspicious activity</li>
          <li>Accept responsibility for all activities under your account</li>
        </ul>
        <p>Sellzy reserves the right to suspend or terminate accounts that contain false information or violate our policies.</p>
      </section>

      <section id="products-pricing">
        <h2>3. Products, Descriptions &amp; Pricing</h2>
        <p>
          We aim to ensure all product details, images, descriptions, stock availability, and pricing are accurate and up to date.
          <br />
          However:
        </p>
        <ul>
          <li>Product colors may vary slightly depending on screen settings</li>
          <li>Prices may change without prior notice</li>
          <li>Some items may become unavailable after an order is placed</li>
          <li>Promotional pricing may be time-limited</li>
        </ul>
        <p>In case of pricing errors, we reserve the right to cancel or update the affected order after informing the customer.</p>
      </section>

      <section id="orders-payments">
        <h2>4. Orders and Payments</h2>
        <p>
          By placing an order, you agree that all information provided is accurate and complete.
          <br />
          Orders are subject to:
        </p>
        <ul>
          <li>Product availability</li>
          <li>Payment verification</li>
          <li>Fraud prevention checks</li>
          <li>Shipping address validation</li>
        </ul>
        <p>
          Accepted payment methods may include credit/debit cards, mobile wallets, and other approved gateways.
          <br />
          Orders will only be confirmed after successful payment authorization.
        </p>
      </section>

      <section id="shipping-delivery">
        <h2>5. Shipping and Delivery</h2>
        <p>
          Estimated delivery timelines are provided for convenience and may vary depending on your location, courier availability, weather conditions, or operational delays.
          <br />
          Please note:
        </p>
        <ul>
          <li>Delivery dates are estimates, not guarantees</li>
          <li>Delays caused by third-party logistics providers are beyond our control</li>
          <li>Customers are responsible for providing accurate shipping details</li>
        </ul>
        <p>Additional shipping charges may apply based on region or delivery speed selected.</p>
      </section>

      <section id="returns-refunds">
        <h2>6. Returns and Refunds</h2>
        <p>
          Customers may request returns, exchanges, or refunds in accordance with our Return Policy.
          <br />
          To qualify:
        </p>
        <ul>
          <li>Products must be unused and in original condition</li>
          <li>Original packaging, tags, and invoice may be required</li>
          <li>Requests must be made within the stated return window</li>
        </ul>
        <p>Refund processing times may vary depending on the payment provider. Certain items such as sale products, intimate wear, or customized items may be non-refundable.</p>
      </section>

      <section id="user-conduct">
        <h2>7. User Conduct</h2>
        <p>You agree not to:</p>
        <ul>
          <li>Use the platform for unlawful activities</li>
          <li>Attempt unauthorized access to our systems</li>
          <li>Upload harmful code, malware, or malicious scripts</li>
          <li>Misrepresent personal or payment information</li>
          <li>Abuse promotional offers or discount codes</li>
        </ul>
        <p>Violation of these rules may result in account suspension or legal action.</p>
      </section>

      <section id="intellectual-property">
        <h2>8. Intellectual Property</h2>
        <p>
          All content on Sellzy, including logos, brand assets, product photos, UI design, text content, graphics, and software, is owned by Sellzy and protected by intellectual property laws.
          <br />
          No content may be copied, reproduced, distributed, or used commercially without prior written consent.
        </p>
      </section>

      <section id="limitation-of-liability">
        <h2>9. Limitation of Liability</h2>
        <p>Sellzy shall not be liable for indirect, incidental, special, or consequential damages arising from:</p>
        <ul>
          <li>Delayed deliveries</li>
          <li>Product unavailability</li>
          <li>Platform downtime</li>
          <li>Third-party service failures</li>
          <li>Unauthorized access beyond our reasonable control</li>
        </ul>
        <p>Our maximum liability shall not exceed the amount paid for the affected order.</p>
      </section>

      <section id="changes-to-terms">
        <h2>10. Changes to Terms</h2>
        <p>
          We may revise these Terms at any time to reflect updates in our services, legal requirements, or operational policies.
          <br />
          Updated versions will be posted on this page with a revised effective date.
          <br />
          Continued use of the platform after changes means you accept the updated Terms.
        </p>
      </section>

      <section id="contact-information">
        <h2>11. Contact Information</h2>
        <p>
          If you have any questions regarding these Terms of Service, please contact our customer support team through our official contact channels.
        </p>
      </section>
    </PolicyLayout>
  );
}
