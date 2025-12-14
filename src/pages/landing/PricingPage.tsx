import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import type { Plan } from "@/types";
import { Link } from "react-router-dom";

const PricingPage = () => {
  const plans: Plan[] = [
    {
      id: "free",
      name: "Free Sync",
      price: "₱0",
      period: "/month",
      description: "Perfect for small schools getting started",
      subtitle: "Good for Junior and Senior High Schools",
      students: "Up to 800 Users.",
      features: [
        { text: "Basic", isHeader: true },
        { text: "Attendance Tracking", isBullet: true },
        { text: "Grade Tracking", isBullet: true },
        { text: "Schedule Tracking", isBullet: true },
        { text: "Payment Tracking", isBullet: true },
        { text: "Document Tracking", isBullet: true },
        { text: "Email Support" },
        { text: "Web App Only" },
      ],
    },
    {
      id: "pro",
      name: "Pro Sync",
      price: "₱25,000",
      period: "/Semi-Annually",
      description: "For growing schools with advanced needs",
      subtitle: "Good for Small College Institutions",
      students: "Up to 1500 Users.",
      features: [
        { text: "Everything in Free Sync" },
        { text: "Mobile App Access" },
        { text: "Parent / Teacher Chat Access" },
        { text: "Document Storing" },
      ],
      popular: true,
    },
    {
      id: "true",
      name: "True Sync",
      price: "Contact Us",
      period: "",
      description: "Enterprise solution for large institutions",
      subtitle: "Universities / Large Chains",
      students: "1500+ Users.",
      features: [
        { text: "Everything in Pro Sync" },
        { text: "Online Tuition Payments" },
        { text: "24/7 Contact Support" },
        { text: "Advanced Security Features" },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-primary mb-4">Choose Your Plan</h1>
            <p className="text-xl text-muted">Flexible pricing for schools of all sizes</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className={`bg-white rounded-2xl p-8 shadow-sm ${plan.popular ? "border-2 border-primary relative" : "border border-gray-200"}`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-white px-6 py-1 rounded-full text-sm font-semibold">
                    Most Popular
                  </div>
                )}
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-text mb-2">{plan.name}</h3>
                  <div className="mb-4">
                    <span className="text-5xl font-bold text-primary">{plan.price}</span>
                    {plan.period && <span className="text-muted">{plan.period}</span>}
                  </div>
                  <p className="text-muted text-sm mb-1">{plan.description}</p>
                  {plan.subtitle && <p className="text-sm font-semibold text-text mb-2">{plan.subtitle}</p>}
                  <p className="text-sm font-semibold text-text">{plan.students}</p>
                </div>
                <ul className="mb-8 space-y-3">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className={`flex items-start gap-2 text-sm text-muted ${feature.isBullet ? 'ml-4' : ''}`}>
                      {!feature.isHeader && <span className="text-green-500 flex-shrink-0">✓</span>}
                      <span className={feature.isHeader ? 'font-semibold text-text' : ''}>
                        {feature.isBullet ? `- ${feature.text}` : feature.text}
                      </span>
                    </li>
                  ))}
                </ul>
                <Link
                  to="/register-form"
                  className={`block text-center px-6 py-4 rounded-lg font-semibold transition-all ${plan.popular ? "bg-primary text-white hover:bg-primary-dark" : "bg-gray-100 text-text hover:bg-gray-200"}`}
                >
                  Get Started
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default PricingPage;
