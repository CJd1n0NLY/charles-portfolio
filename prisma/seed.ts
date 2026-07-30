import { prisma } from '../src/lib/prisma';

async function main() {
  await prisma.workExperience.update({
    where: { 
      id: 'cmreq0gl20001scvdno1pajcn' 
    },
    data: {
      slug: 'ccci-internship',
      company: 'Centralized Cloud Computing International Inc. (CCCI)',
      role: 'IT Intern / OJT Practicumer',
      location: 'Bonifacio Global City, Taguig, Philippines',
      startDate: new Date('2025-03-13T00:00:00Z'),
      endDate: new Date('2025-07-04T00:00:00Z'),
      supervisorName: 'Raphael Dacara',
      tagline: 'Fourteen weeks moving from onboarding exercises to shipping real fixes on two live client products used by universities.',
      context: 'CCCI builds enterprise digital infrastructure for institutional clients — government agencies, banks, and universities — including HRIS, LMS, and payroll systems delivered as part of their Digital ERP product line. As an IT intern, I moved from structured onboarding tasks into real ticket work on two of their live products: an HRIS platform (web and mobile) and an LMS platform (web and mobile), both used by university clients.',
      roleProgression: 'The internship had a clear arc rather than staying at one skill level throughout. Onboarding started with frontend fundamentals (a login form in Nuxt with Ant Design Vue), then moved into backend exploration by cloning and reading an existing Node.js codebase to understand real project structure and database models. From there I built a full CRUD project connecting a Nuxt frontend to a Node.js backend — first wiring the two together my own way, then rebuilding the integration using the company\'s actual standard (nuxt.config.ts configuration with Axios) once I\'d seen how the team did it, which mattered more for understanding professional workflow than the CRUD app itself. After an e-commerce project (admin dashboard, user dashboard, landing page) and a brief pivot toward Flutter when a planned facial recognition project was cancelled, I was onboarded onto the team\'s actual tools — Taiga for ticket tracking, GitLab for repositories — and started taking real tickets across the HRIS and LMS codebases, following the team\'s branch → commit → merge request → QA review cycle.',
      outcome: 'Received a perfect internal OJT evaluation (100/100 across all rated categories — IT knowledge, work quality, work quantity, dependability, attendance, personality, cooperation). Went from onboarding exercises to independently owning and closing real tickets on two live, in-production university software products, working within the company\'s actual ticketing (Taiga) and version control (GitLab) workflow — including cross-team debugging with other developers on a multi-part production bug.',
      evaluationScore: 100,
      evaluationQuote: '"The intern is always hands-on with their tasks, showing initiative and a strong sense of responsibility. He is a dependable team member who can be trusted to deliver quality work."',
      order: 1,
      contributions: {
        create: [
          {
            title: 'Cross-team leave rescheduling fix (HRIS Web, tickets #576/#581)',
            description: 'Leave reschedule requests weren\'t correctly updating a student or employee\'s Daily Time Record (DTR). Working jointly with two other developers, I traced the root cause: the approve function only updated DailyTimeRecords for regular leave requests, not rescheduled ones. Fixed by checking a separate LeaveAdjustmentsTable, retrieving the corrected dates, and updating the DTR status for the correct date range.',
            order: 1
          },
          {
            title: 'Debugging a silent data issue in the LMS (ticket #544)',
            description: 'Students weren\'t appearing as expected in a listing. Rather than guessing at a fix, I reproduced the steps to isolate the actual cause before touching code.',
            order: 2
          },
          {
            title: 'Decrypting and tracing an opaque API response (LMS Web, Instructors module)',
            description: 'Investigated a case with no data returning, which required decrypting an encrypted network response and working through multiple API calls to determine which ones were actually relevant to the bug.',
            order: 3
          },
          {
            title: 'Flutter layout fix (HRIS Mobile, ticket #578)',
            description: 'Template names were overflowing in the "Update Official Time" screen. Fixed using Expanded to allocate space properly, TextOverflow.ellipsis, a line limit, and adjusted spacing.',
            order: 4
          }
        ]
      }
    }
  });

  console.log('WorkExperience row successfully updated with CCCI data.');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());