import { prisma } from '../src/lib/prisma';

async function main() {
  // 1. Chapters
  const chapters = [
    { chapter: 'ACADEMIC', heading: 'Foundations', narrative: 'Early coursework and foundational systems architecture.' },
    { chapter: 'INTERNSHIP', heading: 'In the Trenches', narrative: 'Adapting to production environments.' },
    { chapter: 'CAPSTONE', heading: 'The Culmination', narrative: 'Solving real problems at scale.' },
    { chapter: 'PERSONAL', heading: 'Self-Directed', narrative: 'Building beyond the curriculum.' },
  ];
  for (const c of chapters) {
    await prisma.chapterIntro.upsert({ where: { chapter: c.chapter }, update: {}, create: c });
  }

  // 2. Education
  await prisma.education.create({
    data: {
      school: 'University of Caloocan City',
      degree: 'Bachelor of Science in Information Technology',
      section: '4A',
      honors: 'Cum Laude',
      startYear: 2022,
      endYear: 2026
    }
  });

  // 3. Internship
  await prisma.workExperience.create({
    data: {
      company: "Centralized Cloud Computing Int'l Inc. (CCCI)",
      role: 'Technology Intern',
      location: 'Makati, Philippines',
      startDate: new Date('2025-03-01'),
      endDate: new Date('2025-06-30'),
      responsibilities: JSON.stringify([
        "Diagnosed and resolved critical system bugs across the technology stack, improving overall application stability and load times.",
        "Collaborated with the core development team in an Agile environment to maintain system functionality and deploy feature updates.",
        "Participated in application performance monitoring, ensuring optimal code quality before production release."
      ]),
      order: 1
    }
  });

  // 4. Skills
  const skills = [
    { name: 'React', category: 'FRAMEWORK' }, { name: 'Next.js', category: 'FRAMEWORK' }, { name: 'Laravel', category: 'FRAMEWORK' },
    { name: 'PHP', category: 'LANGUAGE' }, { name: 'Java', category: 'LANGUAGE' }, 
    { name: 'MySQL', category: 'DATABASE' }, 
    { name: 'YOLOv8', category: 'TOOL' }, { name: 'Gemini API', category: 'TOOL' }, { name: 'Librosa', category: 'TOOL' },
    { name: 'Manual QA Testing', category: 'METHODOLOGY' }, { name: 'Agile', category: 'METHODOLOGY' }
  ];
  for (const skill of skills) {
    await prisma.skill.create({ data: skill });
  }

  // 5. Projects
  const projects = [
    { slug: 'ec-clean-water', chapter: 'ACADEMIC', title: 'EC-Clean Water Services', tagline: 'A centralized booking system.', status: 'DRAFT', order: 1 },
    { slug: 'sparkfund', chapter: 'ACADEMIC', title: 'SparkFund', tagline: 'Crowdfunding and donation management system.', status: 'DRAFT', order: 2 },
    { slug: 'ucc-borrowing', chapter: 'ACADEMIC', title: 'UCC Borrowing System', tagline: 'Resources management system.', status: 'DRAFT', order: 3 },
    { slug: 'pasabuy', chapter: 'PERSONAL', title: 'PasaBuy', tagline: 'A community-driven group buying platform.', status: 'PUBLISHED', order: 1 },
    { slug: 'studypal', chapter: 'PERSONAL', title: 'StudyPal', tagline: 'Collaborative academic workspace for students utilizing Gemini API.', status: 'PUBLISHED', order: 2 },
    { slug: 'intelligent-qa', chapter: 'PERSONAL', title: 'Intelligent QA Tracker', tagline: 'Automated testing and bug reporting logic.', status: 'DRAFT', order: 3 },
    { slug: 'midnight-archive', chapter: 'PERSONAL', title: 'MidnightArchive / The Blinking Reflection', tagline: 'Short-form media architecture.', status: 'DRAFT', order: 4 },
  ];
  for (const p of projects) {
    await prisma.project.upsert({ where: { slug: p.slug }, update: {}, create: p });
  }

  console.log('Database seeded with highly specific logbook entries.');
}
main().catch(console.error).finally(() => prisma.$disconnect());