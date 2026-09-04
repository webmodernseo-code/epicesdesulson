import React from "react";

const DashboardTab = () => {
  return (
    <div className="menu-tab-pane">
      <h3 className="mb-6">Dashboard</h3>
      <p>
        From your account dashboard. you can easily check &amp; view your{" "}
        <a className="text-primary hover:underline" href="#">
          recent orders
        </a>
        ,
        <br />
        manage your{" "}
        <a className="text-primary hover:underline" href="#">
          shipping and billing addresses
        </a>{" "}
        and{" "}
        <a className="text-primary hover:underline" href="#">
          edit your password and account details.
        </a>
      </p>
    </div>
  );
};

export default DashboardTab;
