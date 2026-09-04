import React from "react";
import PolicySidebar from "./policy-sidebar";
import Breadcrumb from "@/components/common/breadcrumb";

interface PolicyLayoutProps {
  title: string;
  breadcrumbLabel: string;
  navItems: { id: string; label: string }[];
  children: React.ReactNode;
}

const PolicyLayout: React.FC<PolicyLayoutProps> = ({ 
  title, 
  breadcrumbLabel, 
  navItems, 
  children 
}) => {
  return (
    <>
      <Breadcrumb items={[{ label: breadcrumbLabel }]} />
      <section className="pb-[70px]">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-3">
              <PolicySidebar navItems={navItems} />
            </div>
            <div className="lg:col-span-9">
              <div className="essential-page-content">
                <section id="overview">
                  <h1>{title}</h1>
                  {children}
                </section>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default PolicyLayout;
