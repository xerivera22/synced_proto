import { Link } from "react-router-dom";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import type { Plan } from "@/types";

const PricingPage = () => {
  const plans: Plan[] = [
    {
      id: "free",
      name: "Free Sync",
      price: "₱0",
      period: "/month",
      description: "Perfect for small schools getting started",
      students: "Up to 50 students",
      features: [
        "Basic attendance tracking",
        "Grade management",
        "Parent portal access",
        "Email support",
        "Mobile app access",
      ],
    },
    {
      id: "true",
      name: "True Sync",
      price: "₱15,000",
      period: "/month",
      description: "For growing schools with advanced needs",
      students: "Up to 200 students",
      features: [
        "Everything in Free Sync",
        "Payment processing",
        "Advanced reporting",
        "Priority support",
        "Custom branding",
        "API access",
      ],
      popular: true,
    },
    {
      id: "pro",
      name: "Pro Sync",
      price: "₱35,000",
      period: "/month",
      description: "Enterprise solution for large institutions",
      students: "Unlimited students",
      features: [
        "Everything in True Sync",
        "Dedicated account manager",
        "24/7 phone support",
        "Custom integrations",
        "Advanced security features",
        "On-site training",
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
                    <span className="text-muted">{plan.period}</span>
                  </div>
                  <p className="text-muted text-sm mb-2">{plan.description}</p>
                  <p className="text-sm font-semibold text-text">{plan.students}</p>
                </div>
                <ul className="mb-8 space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm text-muted">
                      <span className="text-green-500 flex-shrink-0">✓</span>
                      <span>{feature}</span>
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
