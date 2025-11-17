import Banner from "@/components/shared/Banner";

const Settings = () => {
  return (
    <div className="space-y-6">
      <Banner
        title="Admin Settings"
        subtitle="Configure default preferences before connecting to production services."
      />

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <header className="mb-6">
          <h2 className="text-xl font-semibold text-slate-900">Configuration Areas</h2>
          <p className="text-sm text-slate-600">
            These placeholders mirror the forms that will connect to backend services.
          </p>
        </header>

        <div className="space-y-5 text-sm text-slate-700">
          <section className="rounded-xl border border-slate-100 bg-white p-5">
            <h3 className="text-base font-semibold text-slate-900">Branding</h3>
            <p className="mt-2 text-sm text-slate-600">
              Placeholder form for school logo, primary colors, and contact info.
            </p>
          </section>
          <section className="rounded-xl border border-slate-100 bg-white p-5">
            <h3 className="text-base font-semibold text-slate-900">Notifications</h3>
            <p className="mt-2 text-sm text-slate-600">
              Toggle email/SMS broadcasts once messaging providers are connected.
            </p>
          </section>
          <section className="rounded-xl border border-slate-100 bg-white p-5">
            <h3 className="text-base font-semibold text-slate-900">User Access</h3>
            <p className="mt-2 text-sm text-slate-600">
              Manage admin roles, permissions, and audit logs when backend endpoints exist.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Settings;
