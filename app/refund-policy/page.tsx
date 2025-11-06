export default function ReturnPolicyPage() {
return (
<> <div className="max-w-4xl mx-auto px-6 py-12 text-gray-800 leading-relaxed pt-32 pb-16"> 
    <h1 className="text-3xl font-bold mb-6 text-center uppercase">
        Return Policy 
    </h1>

    <p className="mb-6">
      If, for any reason, you decide that the International Driver’s Permit is no longer required or you are not fully satisfied with our services, you may return the document within <strong>7 days of purchase</strong> for a refund. Please note that <strong>shipping fees and urgent processing fees are non-refundable</strong>.
    </p>

    <p className="mb-6">
      To process your return, a <strong>receipt or proof of purchase</strong> is required.
    </p>

    <section className="mb-8">
      <h2 className="text-xl font-semibold mb-3">Partial Refunds</h2>
      <p>Partial refunds may be granted under the following circumstances:</p>
      <ul className="list-disc list-inside mt-3 space-y-2">
        <li>Any item that is not in its original condition, is damaged, or has missing parts not due to our error.</li>
        <li>Any item returned more than 7 days after delivery.</li>
      </ul>
    </section>

    <section className="mb-8">
      <h2 className="text-xl font-semibold mb-3">Refunds</h2>
      <p>
        Once we receive and inspect your return, we will send you an email notification confirming receipt. We will also inform you whether your refund has been approved or denied.
      </p>
      <p className="mt-3">
        If approved, your refund will be processed and applied automatically to your credit card or original payment method. Please note that it may take additional time before the refund is reflected in your account.
      </p>
      <p className="mt-3">
        If you have not received your refund after this period, please contact us at{" "}
        <a href="mailto:support@international-drivers.com" className="text-blue-600 underline">
          support@international-drivers.com
        </a>.
      </p>
    </section>

    <section className="mb-8">
      <h2 className="text-xl font-semibold mb-3">Exchanges</h2>
      <p>
        We only replace items if they are defective or damaged. To request an exchange for the same item, email us at{" "}
        <a href="mailto:support@international-drivers.com" className="text-blue-600 underline">
          support@international-drivers.com
        </a>{" "}
        and send your item to:
      </p>
      <address className="mt-3 not-italic">
        <strong>International Drivers</strong>
        <br />
        800 Bonaventure Way, STE 146
        <br />
        Sugar Land, TX 77479
      </address>
    </section>

    <section>
      <h2 className="text-xl font-semibold mb-3">Shipping</h2>
      <p>
        To return your product, mail it to:
      </p>
      <address className="mt-3 not-italic">
        <strong>International Drivers</strong>
        <br />
        800 Bonaventure Way, STE 146
        <br />
        Sugar Land, TX 77479
      </address>

      <p className="mt-3">
        Customers are responsible for paying their own shipping costs for returns. Shipping costs are non-refundable. If you receive a refund, the return shipping cost will be deducted from your total refund.
      </p>
      <p className="mt-3">
        Delivery times for exchanged products may vary depending on your location.
      </p>
      <p className="mt-3">
        For items valued over $75, we recommend using a trackable shipping service or purchasing shipping insurance. We cannot guarantee that we will receive your returned item without proof of delivery.
      </p>
    </section>

    <p className="mt-10 text-start">
      Thank you for choosing <strong>International Drivers</strong>. For further assistance, please contact us.
    </p>
  </div>
</>
);
}
