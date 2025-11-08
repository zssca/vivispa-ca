/**
 * Team member interface defining the structure of a team member
 */
export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  shortBio?: string;
  imageUrl: string;
  specialties?: string[];
  certifications?: string[];
  locationIds?: string[];
  socialMedia?: {
    instagram?: string;
    facebook?: string;
    linkedin?: string;
    twitter?: string;
  };
  isActive: boolean;
}

/**
 * Team roles for filtering and categorization
 */
export enum TeamRole {
  AESTHETICIAN = "Aesthetician",
  MEDICAL_DIRECTOR = "Medical Director",
  NURSE = "Registered Nurse",
  RECEPTIONIST = "Receptionist",
  MANAGER = "Manager",
  OWNER = "Owner",
}

/**
 * All team members at Vivi Aesthetics & Spa
 */
export const teamMembers: TeamMember[] = [
  {
    id: "vivian-li",
    name: "Vivian Li",
    role: TeamRole.OWNER,
    bio: "Vivian Li is the founder and lead aesthetician at Vivi Aesthetics & Spa. With over 10 years of experience in the beauty industry, Vivian has developed extensive expertise in advanced facial treatments, laser therapy, and holistic skin care approaches. Her passion for beauty and wellness stems from her belief that feeling good in your skin is essential to overall well-being. Vivian is certified in numerous cutting-edge treatments including IPL therapy, microneedling, and advanced laser techniques. She regularly attends international beauty conferences to stay at the forefront of aesthetic innovation. When not helping clients achieve their beauty goals, Vivian enjoys yoga and developing natural skincare formulations.",
    shortBio: "Founder and lead aesthetician with over 10 years of experience specializing in advanced facial treatments and laser therapy.",
    imageUrl: "/images/team/vivian-li.jpg",
    specialties: ["Advanced Facial Treatments", "Laser Therapy", "Skin Analysis", "Microneedling", "Chemical Peels"],
    certifications: ["Certified Medical Aesthetician", "Laser Safety Certification", "Advanced IPL Therapy", "Microneedling Specialist"],
    locationIds: ["downtown", "edmonton-trail"],
    socialMedia: {
      instagram: "@vivispa.ca",
      facebook: "vivispa.ca",
    },
    isActive: true,
  },
  {
    id: "dr-sarah-chen",
    name: "Dr. Sarah Chen",
    role: TeamRole.MEDICAL_DIRECTOR,
    bio: "Dr. Sarah Chen serves as the Medical Director at Vivi Aesthetics & Spa, bringing her extensive background in dermatology and cosmetic medicine. With over 15 years of clinical experience, Dr. Chen oversees all medical treatments and ensures the highest standards of safety and efficacy. She completed her medical training at the University of Alberta followed by a specialization in dermatology. Her expertise in skin health, facial anatomy, and non-invasive rejuvenation techniques makes her an invaluable member of our team. Dr. Chen is passionate about combining evidence-based treatments with artistic principles to achieve natural-looking results for all clients.",
    shortBio: "Medical Director with over 15 years of clinical experience specializing in dermatology and cosmetic medicine.",
    imageUrl: "/images/team/dr-sarah-chen.jpg",
    specialties: ["Cosmetic Dermatology", "Injectables", "Laser Treatments", "Medical-Grade Skin Care"],
    certifications: ["Board Certified Dermatologist", "Fellowship in Cosmetic Dermatology", "Advanced Botox and Filler Certification"],
    locationIds: ["downtown"],
    socialMedia: {
      linkedin: "dr-sarah-chen",
    },
    isActive: true,
  },
  {
    id: "emma-wong",
    name: "Emma Wong",
    role: TeamRole.AESTHETICIAN,
    bio: "Emma Wong is a Senior Aesthetician at Vivi Aesthetics & Spa with specialized training in Asian beauty techniques and traditions. Emma brings a unique perspective to her treatments, combining Western clinical approaches with Eastern philosophy. Her gentle touch and attention to detail have earned her a loyal client following. Emma specializes in customized facial treatments, brow artistry, and non-invasive skin tightening procedures. She is particularly known for her expertise in treating hyperpigmentation and sensitive skin conditions. Emma continually enhances her skills through advanced coursework and is certified in both traditional and cutting-edge aesthetic techniques.",
    shortBio: "Senior Aesthetician specializing in customized facial treatments and Asian beauty techniques.",
    imageUrl: "/images/team/emma-wong.jpg",
    specialties: ["Customized Facials", "Brow Artistry", "Skin Tightening", "Hyperpigmentation Treatments"],
    certifications: ["Licensed Aesthetician", "Advanced Facial Specialist", "Certified in Asian Beauty Techniques"],
    locationIds: ["downtown", "edmonton-trail"],
    socialMedia: {
      instagram: "@vivispa.ca",
    },
    isActive: true,
  },
  {
    id: "jennifer-patel",
    name: "Jennifer Patel",
    role: TeamRole.NURSE,
    bio: "Jennifer Patel is our Registered Nurse specializing in advanced injectable treatments and medical-grade procedures. With a background in surgical nursing and 8 years of experience in aesthetic medicine, Jennifer brings exceptional precision and a gentle approach to all her treatments. She is highly skilled in assessing facial anatomy and tailoring treatments to enhance each client's natural beauty. Jennifer has advanced training in Botox, dermal fillers, and PDO threads. She is committed to ongoing education and regularly attends master classes with world-renowned injectors to perfect her techniques. Her calm demeanor and educational approach help clients feel comfortable throughout their treatment journey.",
    shortBio: "Registered Nurse with 8 years of experience specializing in injectables and medical-grade aesthetic procedures.",
    imageUrl: "/images/team/jennifer-patel.jpg",
    specialties: ["Injectable Treatments", "PDO Threads", "Laser Procedures", "Medical-Grade Facials"],
    certifications: ["Registered Nurse", "Certified in Injectable Aesthetics", "Advanced Laser Certification"],
    locationIds: ["downtown"],
    socialMedia: {
      instagram: "@vivispa.ca",
    },
    isActive: true,
  },
  {
    id: "michael-johnson",
    name: "Michael Johnson",
    role: TeamRole.MANAGER,
    bio: "Michael Johnson is the Operations Manager at Vivi Aesthetics & Spa, ensuring that all aspects of your visit exceed expectations. With a background in luxury hospitality and spa management, Michael has developed a keen eye for creating exceptional client experiences. He oversees staff training, client relations, and daily operations across our locations. Michael is dedicated to maintaining the highest standards of service and creating a welcoming environment for all clients. His innovative approach to spa management has helped establish Vivi Aesthetics & Spa as a premier destination for beauty and wellness treatments in Calgary.",
    shortBio: "Operations Manager with a background in luxury hospitality focused on creating exceptional client experiences.",
    imageUrl: "/images/team/michael-johnson.jpg",
    locationIds: ["downtown", "edmonton-trail"],
    socialMedia: {
      linkedin: "michael-johnson-spa",
    },
    isActive: true,
  },
];

/**
 * Featured team members to highlight on the homepage or about page
 */
export const featuredTeamMembers = teamMembers.filter(member => 
  ["vivian-li", "dr-sarah-chen", "emma-wong"].includes(member.id)
);

/**
 * Get team members by location ID
 * 
 * @param locationId - The ID of the location to filter by
 * @returns An array of team members at the specified location
 */
export function getTeamMembersByLocation(locationId: string): TeamMember[] {
  return teamMembers.filter(
    member => member.isActive && member.locationIds?.includes(locationId)
  );
}

/**
 * Get team members by role
 * 
 * @param role - The role to filter by
 * @returns An array of team members with the specified role
 */
export function getTeamMembersByRole(role: TeamRole): TeamMember[] {
  return teamMembers.filter(
    member => member.isActive && member.role === role
  );
}

/**
 * Get a team member by ID
 * 
 * @param id - The ID of the team member to retrieve
 * @returns The team member with the specified ID, or undefined if not found
 */
export function getTeamMemberById(id: string): TeamMember | undefined {
  return teamMembers.find(member => member.id === id);
} 