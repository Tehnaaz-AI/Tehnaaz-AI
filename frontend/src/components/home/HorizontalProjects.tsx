import { ENV } from '../../config/env';

const PROJECTS = [
  {
    id: 1,
    title: 'ProLearn',
    description: 'Full-stack MERN e-learning platform with authentication, course management, quizzes, and leaderboards.',
    tags: ['React', 'Node.js', 'MongoDB'],
    link: 'https://prolearn-sepia.vercel.app/',
    github: ENV.GITHUB_URL
  },
  {
    id: 2,
    title: 'AULoop',
    description: 'An exclusive campus marketplace for students to securely trade textbooks, electronics, and lab gear. Features verified users, integrated chat, video reels, and a secure handover OTP system to prevent scams.',
    tags: ['Next.js', 'React', 'Tailwind'],
    link: 'https://au-loop.vercel.app/',
    github: ENV.GITHUB_URL
  },
  {
    id: 3,
    title: 'Paper-Pulse',
    description: 'AI-powered paper trading simulator with virtual money, market data, and portfolio tracking.',
    tags: ['Python', 'AI', 'Finance'],
    link: 'https://paper-pulse-trade.vercel.app/',
    github: ENV.GITHUB_URL
  },
  {
    id: 4,
    title: 'NLP Hate Speech Detection',
    description: 'NLP-based machine learning project for classifying text and identifying potentially hateful content.',
    tags: ['Python', 'NLP', 'Machine Learning'],
    link: null,
    github: ENV.GITHUB_URL
  },
  {
    id: 5,
    title: 'Smart Waste AI',
    description: 'Computer-vision/deep-learning project that classifies waste from images to support automated categorization.',
    tags: ['CV', 'Deep Learning', 'AI'],
    link: null,
    github: ENV.GITHUB_URL
  }
];

const LOOPING_PROJECTS = [...PROJECTS, ...PROJECTS];

export function HorizontalProjects() {
  return (
    <section className="relative py-8 w-full z-20 flex flex-col justify-center overflow-hidden bg-transparent">

      <style>{`
        @keyframes custom-marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-custom-marquee {
          animation: custom-marquee 15s linear infinite;
        }
        .animate-custom-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>

      <div className="w-full flex items-center overflow-hidden">

        {/* Intro text for the section */}
        <div className="absolute left-4 sm:left-12 md:left-24 top-0 pointer-events-none z-30">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-organic-sans font-black tracking-tighter uppercase text-black">
            Projects
          </h2>
          <div className="w-8 h-1 bg-black mt-1 md:mt-2"></div>
        </div>

        <div className="flex gap-6 sm:gap-8 px-4 sm:px-12 pt-10 shrink-0 w-max animate-custom-marquee">
          {LOOPING_PROJECTS.map((project, index) => (
            <div
              key={`${project.id}-${index}`}
              className="w-[82vw] sm:w-[320px] md:w-[340px] min-h-[290px] bg-white border-2 md:border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] md:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col justify-between p-5 shrink-0 group relative overflow-hidden"
            >
              {/* Background texture / detail */}
              <div className="absolute -right-12 -top-12 opacity-5 pointer-events-none transition-transform duration-700 group-hover:scale-110 group-hover:rotate-12">
                <svg width="200" height="200" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" />
                  <rect x="25" y="25" width="50" height="50" fill="none" stroke="currentColor" strokeWidth="1" />
                </svg>
              </div>

              <div>
                <span className="font-organic-mono text-[10px] sm:text-xs font-bold tracking-widest text-black/50 uppercase">
                  Project 0{index + 1}
                </span>
                <h3 className="text-xl sm:text-2xl md:text-3xl font-organic-sans font-black tracking-tighter text-black uppercase mt-1 mb-2 leading-tight line-clamp-1">
                  {project.title}
                </h3>
                <p className="font-organic-mono text-xs sm:text-sm text-black/80 max-w-md line-clamp-4 leading-relaxed">
                  {project.description}
                </p>
              </div>

              <div className="flex flex-col justify-end gap-3 mt-4">
                <div className="flex flex-wrap gap-2">
                  {project.tags.slice(0, 2).map(tag => (
                    <span key={tag} className="px-2.5 py-1 bg-black text-white font-organic-mono text-[9px] sm:text-[10px] font-bold uppercase tracking-widest">
                      {tag}
                    </span>
                  ))}
                  {project.tags.length > 2 && (
                    <span className="px-2.5 py-1 bg-black text-white font-organic-mono text-[9px] sm:text-[10px] font-bold uppercase tracking-widest">
                      +{project.tags.length - 2}
                    </span>
                  )}
                </div>

                {project.link || project.github ? (
                  <a
                    href={project.link || project.github}
                    target="_blank"
                    rel="noreferrer"
                    className="font-organic-mono text-xs font-bold tracking-widest border-b-2 border-black pb-0.5 hover:text-black/50 hover:border-black/50 transition-colors uppercase w-max"
                  >
                    {project.link ? 'View Project →' : 'View Code (GitHub) →'}
                  </a>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
