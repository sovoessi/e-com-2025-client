import React from 'react'

const PrivacyPolicy = () => {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10 text-gray-800">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
      <p className="mb-4">
        <strong>Effective Date:</strong> June 6, 2025
      </p>
      <p className="mb-4">
        This Privacy Policy describes how E-Com 2025 ("we", "us", or "our") collects, uses, and protects your personal information when you use our website and services. We are committed to complying with the General Data Protection Regulation (GDPR) for European users and the California Consumer Privacy Act (CCPA) and other applicable US privacy laws for US users.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-2">1. Information We Collect</h2>
      <ul className="list-disc ml-6 mb-4">
        <li><strong>Personal Information:</strong> Name, email address, shipping address, billing address, phone number, payment information.</li>
        <li><strong>Usage Data:</strong> Pages visited, time spent, clicks, referring URLs, IP address, browser type, device information.</li>
        <li><strong>Cookies & Tracking:</strong> We use cookies and similar technologies for analytics, personalization, and advertising.</li>
      </ul>

      <h2 className="text-xl font-semibold mt-8 mb-2">2. How We Use Your Information</h2>
      <ul className="list-disc ml-6 mb-4">
        <li>To process and fulfill your orders.</li>
        <li>To communicate with you about your account or orders.</li>
        <li>To improve our website and services.</li>
        <li>To comply with legal obligations.</li>
        <li>For marketing, with your consent where required.</li>
      </ul>

      <h2 className="text-xl font-semibold mt-8 mb-2">3. Legal Basis for Processing (EU Users)</h2>
      <ul className="list-disc ml-6 mb-4">
        <li>Performance of a contract (processing orders).</li>
        <li>Compliance with legal obligations.</li>
        <li>Legitimate interests (improving services, fraud prevention).</li>
        <li>Consent (for marketing and cookies, where required).</li>
      </ul>

      <h2 className="text-xl font-semibold mt-8 mb-2">4. Your Rights</h2>
      <ul className="list-disc ml-6 mb-4">
        <li><strong>EU Users (GDPR):</strong> Right to access, rectify, erase, restrict, object, and data portability. Right to withdraw consent at any time.</li>
        <li><strong>US Users (CCPA):</strong> Right to know, delete, and opt-out of the sale of personal information. Right to non-discrimination for exercising your rights.</li>
      </ul>

      <h2 className="text-xl font-semibold mt-8 mb-2">5. Data Sharing & Transfers</h2>
      <ul className="list-disc ml-6 mb-4">
        <li>We share data with service providers (payment processors, shipping, analytics) only as necessary.</li>
        <li>We do not sell your personal information.</li>
        <li>Data may be transferred outside your country. We ensure appropriate safeguards for international transfers.</li>
      </ul>

      <h2 className="text-xl font-semibold mt-8 mb-2">6. Data Security & Retention</h2>
      <ul className="list-disc ml-6 mb-4">
        <li>We use industry-standard security measures to protect your data.</li>
        <li>We retain your data only as long as necessary for the purposes described.</li>
      </ul>

      <h2 className="text-xl font-semibold mt-8 mb-2">7. Children's Privacy</h2>
      <p className="mb-4">
        Our services are not directed to children under 16. We do not knowingly collect personal information from children.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-2">8. Changes to This Policy</h2>
      <p className="mb-4">
        We may update this Privacy Policy from time to time. We will notify you of significant changes by posting the new policy on this page.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-2">9. Contact Us</h2>
      <p>
        If you have any questions or wish to exercise your privacy rights, please contact us at: <a href="mailto:privacy@ecom2025.com" className="text-blue-600 underline">privacy@ecom2025.com</a>
      </p>
    </div>
  )
}

export default PrivacyPolicy