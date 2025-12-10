import heroBg from "@/assets/re_herobg.png";
import AIChatIcon from "@/components/AI/AIChatIcon";
import AIWindow from "@/components/AI/AIWindow";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import type { FAQ, Feature } from "@/types";
import {
    ArrowUp,
    BarChart3,
    Bell,
    Building,
    Calendar,
    Check,
    ClipboardList,
    CreditCard,
    DollarSign,
    GraduationCap,
    Lock,
    School,
    Smartphone,
    UserCircle,
    Users,
    Zap,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const LandingPage = () => {
  const { hash, pathname } = useLocation();
  const [activeQuestion, setActiveQuestion] = useState<number | null>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [contactSubmitted, setContactSubmitted] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Smooth-scroll to a section when landing on /#hash or when hash changes on /
  useEffect(() => {
    if (pathname === "/" && hash) {
      const id = hash.slice(1);
      const el = document.getElementById(id);
      if (el) {
        // Slight delay to ensure layout is ready
        setTimeout(
          () => el.scrollIntoView({ behavior: "smooth", block: "start" }),
          0
        );
      }
    }
  }, [hash, pathname]);

  const features: Feature[] = [
    {
      icon: <BarChart3 className="text-primary" size={48} />,
      title: "Attendance Tracking",
      description:
        "Real-time attendance monitoring with automated reports and notifications.",
    },
    {
      icon: <ClipboardList className="text-primary" size={48} />,
      title: "Grade Management",
      description:
        "Comprehensive grade tracking and performance analytics for students.",
    },
    {
      icon: <CreditCard className="text-primary" size={48} />,
      title: "Payment Processing",
      description: "Secure online payment system for tuition and school fees.",
    },
    {
      icon: <Calendar className="text-primary" size={48} />,
      title: "Schedule Management",
      description:
        "Easy-to-use class scheduling and calendar management tools.",
    },
    {
      icon: <Smartphone className="text-primary" size={48} />,
      title: "Mobile Access",
      description:
        "Access your dashboard anywhere with our mobile-friendly platform.",
    },
    {
      icon: <Bell className="text-primary" size={48} />,
      title: "Notifications",
      description:
        "Stay updated with instant notifications for important events.",
    },
  ];

  const faqs: FAQ[] = [
    {
      question: "What is SyncED?",
      answer:
        "SyncED is a comprehensive school management platform designed to streamline administrative tasks, improve communication, and enhance the learning experience for schools, teachers, students, and parents.",
    },
    {
      question: "How much does SyncED cost?",
      answer:
        "We offer three pricing tiers: Free Sync (₱0/month for up to 50 students), True Sync (₱15,000/month for up to 200 students), and Pro Sync (₱35,000/month for unlimited students). Visit our pricing page for more details.",
    },
    {
      question: "Is my data secure?",
      answer:
        "Yes! We use industry-standard encryption and security measures to protect your data. All information is stored securely and backed up regularly.",
    },
    {
      question: "Can I try SyncED before purchasing?",
      answer:
        "Absolutely! We offer a free tier that allows you to manage up to 50 students. You can upgrade to a paid plan at any time.",
    },
    {
      question: "What kind of support do you offer?",
      answer:
        "We provide email support for all users, priority support for True Sync customers, and 24/7 dedicated support for Pro Sync subscribers.",
    },
  ];

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Contact form submitted:", contactForm);
    setContactSubmitted(true);
    setContactForm({ name: "", email: "", message: "" });
    setTimeout(() => setContactSubmitted(false), 3000);
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <header className="relative px-8 py-24 lg:py-32 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src={heroBg}
            alt="Background"
            className="w-full h-full object-cover object-center"
          />
          {/* Overlay for better text readability */}
          <div className="absolute inset-0 bg-black/40" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium text-white border border-white/20 mx-auto">
            <School size={20} />
            <span>Trusted by 500+ Schools</span>
          </div>

          <h1 className="text-5xl lg:text-7xl font-extrabold leading-tight text-white tracking-tight">
            Smart Campus Management Made Simple
          </h1>

          <p className="text-xl text-gray-100 leading-relaxed max-w-2xl mx-auto">
            Transform your school administration with SyncED. Streamline
            operations, enhance communication, and focus on what matters
            most—education.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center pt-4">
            <Link
              to="/register"
              className="bg-primary text-white px-9 py-4 rounded-xl font-semibold text-lg shadow-lg hover:bg-primary-dark hover:-translate-y-1 transition-all"
            >
              Get Started Free
            </Link>
            <Link
              to="/pricing"
              className="bg-transparent text-white border-2 border-white px-9 py-4 rounded-xl font-semibold text-lg hover:bg-white/10 hover:-translate-y-1 transition-all"
            >
              View Pricing
            </Link>
          </div>

          <div className="flex flex-col sm:flex-row gap-8 pt-6 text-sm text-gray-200 justify-center">
            <div className="flex items-center gap-2">
              <Check className="text-green-400" size={16} />
              <span>No credit card required</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="text-green-400" size={16} />
              <span>Free tier available</span>
            </div>
          </div>
        </div>
      </header>

      {/* Why Use Section */}
      <section id="why" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-primary mb-4">
              Why Choose SyncED?
            </h2>
            <p className="text-xl text-muted max-w-3xl mx-auto">
              We understand the challenges of managing a school. SyncED
              simplifies everything from attendance to payments.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-shadow text-center">
              <div className="mb-4 flex justify-center">
                <Zap className="text-primary" size={48} />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-text">
                Lightning Fast
              </h3>
              <p className="text-muted leading-relaxed">
                Access your dashboard instantly with our optimized platform
                built for speed and efficiency.
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-shadow text-center">
              <div className="mb-4 flex justify-center">
                <Lock className="text-primary" size={48} />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-text">
                Secure & Reliable
              </h3>
              <p className="text-muted leading-relaxed">
                Your data is protected with bank-level encryption and regular
                security audits.
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-shadow text-center">
              <div className="mb-4 flex justify-center">
                <DollarSign className="text-primary" size={48} />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-text">
                Cost-Effective
              </h3>
              <p className="text-muted leading-relaxed">
                Start free and scale as you grow. Only pay for what you need.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Who Can Use Section */}
      <section id="who" className="py-20">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-primary mb-4">
              Who Can Use SyncED?
            </h2>
            <p className="text-xl text-muted max-w-3xl mx-auto">
              Built for everyone in the education ecosystem
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-soft p-6 rounded-2xl text-center hover:shadow-md transition-shadow">
              <div className="mb-4 flex justify-center">
                <Building className="text-primary" size={48} />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-text">
                Administrators
              </h3>
              <p className="text-muted text-sm">
                Manage operations, finances, and reports
              </p>
            </div>
            <div className="bg-soft p-6 rounded-2xl text-center hover:shadow-md transition-shadow">
              <div className="mb-4 flex justify-center">
                <UserCircle className="text-primary" size={48} />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-text">Teachers</h3>
              <p className="text-muted text-sm">
                Track attendance, grades, and assignments
              </p>
            </div>
            <div className="bg-soft p-6 rounded-2xl text-center hover:shadow-md transition-shadow">
              <div className="mb-4 flex justify-center">
                <GraduationCap className="text-primary" size={48} />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-text">Students</h3>
              <p className="text-muted text-sm">
                View grades, schedules, and assignments
              </p>
            </div>
            <div className="bg-soft p-6 rounded-2xl text-center hover:shadow-md transition-shadow">
              <div className="mb-4 flex justify-center">
                <Users className="text-primary" size={48} />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-text">Parents</h3>
              <p className="text-muted text-sm">
                Monitor progress and communicate
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="services" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-primary mb-4">
              Powerful Features
            </h2>
            <p className="text-xl text-muted max-w-3xl mx-auto">
              Everything you need to run a modern school
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-all hover:-translate-y-1 text-center"
              >
                <div className="mb-4 flex justify-center">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-3 text-text">
                  {feature.title}
                </h3>
                <p className="text-muted leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how" className="py-20">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-primary mb-4">
              How It Works
            </h2>
            <p className="text-xl text-muted max-w-3xl mx-auto">
              Get started in three simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                1
              </div>
              <h3 className="text-2xl font-bold mb-3 text-text">Sign Up</h3>
              <p className="text-muted">
                Create your account and choose a plan that fits your needs
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                2
              </div>
              <h3 className="text-2xl font-bold mb-3 text-text">Set Up</h3>
              <p className="text-muted">
                Add your school data, teachers, and students in minutes
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                3
              </div>
              <h3 className="text-2xl font-bold mb-3 text-text">Get Started</h3>
              <p className="text-muted">
                Start managing your school efficiently from day one
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-primary mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-muted">
              Got questions? We've got answers
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={faq.question}
                className="bg-white rounded-xl overflow-hidden shadow-sm"
              >
                <button
                  type="button"
                  onClick={() =>
                    setActiveQuestion(activeQuestion === index ? null : index)
                  }
                  className="w-full px-8 py-6 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                >
                  <span className="font-semibold text-lg text-text pr-8">
                    {faq.question}
                  </span>
                  <span className="text-2xl text-primary flex-shrink-0">
                    {activeQuestion === index ? "−" : "+"}
                  </span>
                </button>
                {activeQuestion === index && (
                  <div className="px-8 pb-6 text-muted leading-relaxed">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20">
        <div className="max-w-4xl mx-auto px-8">
          <div className="text-center mb-12">
            <h2 className="text-5xl font-bold text-primary mb-4">
              Get In Touch
            </h2>
            <p className="text-xl text-muted">
              Have questions? We'd love to hear from you
            </p>
          </div>

          <form
            onSubmit={handleContactSubmit}
            className="bg-white p-8 rounded-2xl shadow-lg"
          >
            {contactSubmitted && (
              <div className="mb-6 p-4 bg-green-50 text-green-700 rounded-lg">
                Thank you! Your message has been sent successfully.
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-semibold text-text mb-2"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={contactForm.name}
                  onChange={(e) =>
                    setContactForm({ ...contactForm, name: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold text-text mb-2"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={contactForm.email}
                  onChange={(e) =>
                    setContactForm({ ...contactForm, email: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>
            </div>

            <div className="mb-6">
              <label
                htmlFor="message"
                className="block text-sm font-semibold text-text mb-2"
              >
                Message
              </label>
              <textarea
                id="message"
                value={contactForm.message}
                onChange={(e) =>
                  setContactForm({ ...contactForm, message: e.target.value })
                }
                rows={6}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                required
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-primary text-white py-4 rounded-lg font-semibold text-lg hover:bg-primary-dark transition-colors"
            >
              Send Message
            </button>
          </form>
        </div>
      </section>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          type="button"
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 w-12 h-12 bg-primary text-white rounded-full shadow-lg hover:bg-primary-dark transition-all flex items-center justify-center text-xl z-50"
          aria-label="Scroll to top"
        >
          <ArrowUp size={20} />
        </button>
      )}

      <Footer />
      <AIChatIcon onClick={() => setIsChatOpen(true)} />
      <AIWindow isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </div>
  );
};

export default LandingPage;
