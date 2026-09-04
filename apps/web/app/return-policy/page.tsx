import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Return Policy | Sellzy - Multivendor eCommerce Template",
  description: "Review our return and refund policy. Learn about eligibility, timelines, and the step-by-step return process.",
  openGraph: {
    title: "Return Policy | Sellzy - Multivendor eCommerce Template",
    description: "Review our return and refund policy. Learn about eligibility, timelines, and the step-by-step return process.",
  },
};

import PolicyLayout from "@/components/policy/policy-layout";

export default function ReturnPolicyPage() {
  const navItems = [
    { id: "overview", label: "Return Policy" },
    { id: "refund-policy", label: "Refund Policy" },
    { id: "exchange-policy", label: "Exchange Policy" },
    { id: "non-returnable-items", label: "Non-Returnable Items" },
    { id: "damaged-wrong-items", label: "Damaged / Wrong Items" },
    { id: "support", label: "Support" },
  ];

  return (
    <PolicyLayout 
      title="Return & Refund Policy" 
      breadcrumbLabel="Privacy and Policy" 
      navItems={navItems}
    >
      <p>
        At Sellzy, we are committed to providing a smooth and reliable shopping experience. If you are not fully satisfied with your purchase, we&apos;re here to help with a transparent and fair return process. This Return &amp; Refund Policy explains your rights and the conditions under which returns, exchanges, and refunds are accepted.
      </p>

      <section id="return-eligibility">
        <h2>1. Return Eligibility</h2>
        <p>
          We accept return requests within 7 days from the date of delivery. After this period, we are unable to offer a return or refund.
          <br />
          To qualify for a return, the product must meet the following conditions:
        </p>
        <ul>
          <li>The item must be unused, unworn, and in original condition</li>
          <li>The product must be returned in its original packaging</li>
          <li>All labels, tags, manuals, and accessories must be included</li>
          <li>Proof of purchase (order ID or invoice) is required</li>
        </ul>
        <p>Please ensure the item is securely packed to avoid damage during return shipping.</p>
      </section>

      <section id="non-returnable-items">
        <h2>2. Items Not Eligible for Return</h2>
        <p>
          Certain product types are non-returnable due to hygiene, safety, or customization reasons. These include:
        </p>
        <ul>
          <li>Perishable goods (food, flowers, etc.)</li>
          <li>Personal care and hygiene products</li>
          <li>Custom-made or personalized items</li>
          <li>Digital products or downloadable software</li>
          <li>Gift cards or promotional vouchers</li>
          <li>Items marked as &quot;Final Sale&quot; or &quot;Non-Returnable&quot;</li>
        </ul>
        <p>We recommend reviewing product details carefully before placing an order.</p>
      </section>

      <section id="damaged-wrong-items">
        <h2>3. Damaged, Defective, or Wrong Items</h2>
        <p>
          We sincerely apologize if you receive a damaged, defective, or incorrect item. In such cases, please contact our support team within 48 hours of delivery.
          <br />
          To help us resolve the issue quickly, please provide:
        </p>
        <ul>
          <li>Order number or invoice ID</li>
          <li>Clear photos or videos of the product</li>
          <li>A short description of the issue</li>
        </ul>
        <p>Once verified, we will offer either:</p>
        <ul>
          <li>A replacement of the product, or</li>
          <li>A full refund to your original payment method</li>
        </ul>
        <p>Sellzy ensures strict quality control, but if an error occurs, we take full responsibility to resolve it.</p>
      </section>

      <section id="refund-policy">
        <h2>4. Refund Policy</h2>
        <p>
          After we receive and inspect your returned item, we will notify you about the approval status of your refund.
          <br />
          If approved, your refund will be processed within 5-7 business days. The refund will be issued to your original payment method.
          <br />
          Please note:
        </p>
        <ul>
          <li>Bank processing times may vary</li>
          <li>Some payment providers may take additional days to reflect the amount in your account</li>
          <li>Shipping fees are generally non-refundable unless the return is due to our error</li>
        </ul>
      </section>

      <section id="exchange-policy">
        <h2>5. Exchange Policy</h2>
        <p>We currently offer exchanges only for the following reasons:</p>
        <ul>
          <li>Product is defective or damaged</li>
          <li>Incorrect item received</li>
          <li>Size or variant mismatch (if applicable and available in stock)</li>
        </ul>
        <p>If the requested replacement is unavailable, a refund will be provided instead.</p>
      </section>

      <section id="return-shipping">
        <h2>6. Return Shipping</h2>
        <p>Return shipping costs may be the responsibility of the customer unless the return is due to:</p>
        <ul>
          <li>Our shipping mistake</li>
          <li>Damaged or defective product</li>
          <li>Incorrect item sent</li>
        </ul>
        <p>We recommend using a trackable shipping service, as we cannot guarantee receipt of returned items without tracking.</p>
      </section>

      <section id="refund-approval">
        <h2>7. Refund Approval &amp; Processing Time</h2>
        <p>Once your return is received, our team will inspect the product carefully. After approval:</p>
        <ul>
          <li>Refunds are initiated within 5-7 business days</li>
          <li>You will receive a confirmation email once the refund is processed</li>
          <li>Depending on your bank or payment gateway, additional processing time may apply</li>
        </ul>
      </section>

      <section id="support">
        <h2>8. Customer Support</h2>
        <p>If you have any questions regarding returns, refunds, or exchanges, our support team is always ready to assist you.</p>
        <p>
          ✉️ Email: support@sellzy.com
          <br />
          📞 Phone: +880 1234 567890
          <br />⏱ Support Hours: 10:00 AM - 6:00 PM (GMT +6)
        </p>
      </section>
    </PolicyLayout>
  );
}
