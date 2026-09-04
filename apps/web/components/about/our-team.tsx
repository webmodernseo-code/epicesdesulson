"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const TEAM_MEMBERS = [
  {
    image: "/images/about/team-person-1.png",
    name: "Jenny Wilson",
    role: "Managing Director",
    socialLinks: {
      linkedin: "#",
      facebook: "#",
      instagram: "#",
      twitter: "#",
    },
  },
  {
    image: "/images/about/team-person-2.png",
    name: "Jenny Wilson",
    role: "Managing Director",
    socialLinks: {
      linkedin: "#",
      facebook: "#",
      instagram: "#",
      twitter: "#",
    },
  },
  {
    image: "/images/about/team-person-3.png",
    name: "Jenny Wilson",
    role: "Managing Director",
    socialLinks: {
      linkedin: "#",
      facebook: "#",
      instagram: "#",
      twitter: "#",
    },
  },
  {
    image: "/images/about/team-person-4.png",
    name: "Jenny Wilson",
    role: "Managing Director",
    socialLinks: {
      linkedin: "#",
      facebook: "#",
      instagram: "#",
      twitter: "#",
    },
  },
];

export default function OurTeam() {
  return (
    <section className="pb-[70px]">
      <div className="container">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="pb-10 text-center"
        >
          <h3 className="pb-3">Meet Our Team</h3>
          <p>Join thousands of happy customers from around the globe.</p>
        </motion.div>
        <div className="grid grid-cols-12 gap-x-[25px] gap-y-[25px]">
          {TEAM_MEMBERS.map((member, index) => (
            <motion.div
              key={index}
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              className="xl:col-span-3 md:col-span-6 col-span-12 px-[21px] pt-[21px] pb-[27px] border border-gray-300 rounded-3xl"
            >
              <motion.div 
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="relative min-h-[394px] mb-6 overflow-hidden rounded-2xl bg-gray-100 flex items-center justify-center pt-5"
              >
                <Image
                  src={member.image}
                  alt={member.name}
                  width={340}
                  height={400}
                  className="object-contain"
                />
              </motion.div>
              <div className="text-center pb-4">
                <h4 className="pb-2 font-semibold text-black leading-8">
                  {member.name}
                </h4>
                <p className="font-medium text-[18px] leading-7 text-light-secondary-text font-urbanist">
                  {member.role}
                </p>
              </div>
              <div className="flex gap-x-6 justify-center">
                <a
                  href={member.socialLinks.linkedin}
                  className="inline-flex items-center justify-center size-12 bg-primary hover:bg-primary-darker transition-all duration-300 rounded-full"
                >
                  <i className="hgi hgi-stroke hgi-linkedin-01 text-2xl text-white" />
                </a>
                <a
                  href={member.socialLinks.facebook}
                  className="inline-flex items-center justify-center size-12 bg-primary hover:bg-primary-darker transition-all duration-300 rounded-full"
                >
                  <i className="hgi hgi-stroke hgi-facebook-01 text-2xl text-white" />
                </a>
                <a
                  href={member.socialLinks.instagram}
                  className="inline-flex items-center justify-center size-12 bg-primary hover:bg-primary-darker transition-all duration-300 rounded-full"
                >
                  <i className="hgi hgi-stroke hgi-instagram text-2xl text-white" />
                </a>
                <a
                  href={member.socialLinks.twitter}
                  className="inline-flex items-center justify-center size-12 bg-primary hover:bg-primary-darker transition-all duration-300 rounded-full"
                >
                  <i className="hgi hgi-stroke hgi-twitter text-2xl text-white" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
