import re

with open('d:/Projects/Portfolio/frontend/src/pages/Projects.tsx', 'r') as f:
    content = f.read()

# We need to replace from:
#   idle: { y: 20, opacity: 0 },
# down to:
#   document.body
#   )}

pattern = re.compile(r'idle: \{ y: 20, opacity: 0 \},.*?document\.body\s*\)', re.DOTALL)

replacement = r'''idle: { y: 20, opacity: 0 },
                hover: { y: 0, opacity: 1 }
              }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="absolute inset-0 p-4 md:p-6 bg-black text-white flex flex-col justify-center"
            >
              <h4 className="text-sm font-bold uppercase mb-2 text-white/50">{project.title}</h4>
              <p className="text-sm font-organic-mono leading-relaxed">
                {project.description}
              </p>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export function Projects() {
  const container = useRef(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [majorProjects, setMajorProjects] = useState<any[]>(MAJOR_PROJECTS);
  
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end']
  });

  useEffect(() => {
    fetch(`${ENV.API_URL}/api/projects`)
      .then(res => res.json())
      .then(data => {
        if (data && data.data && data.data.length > 0) {
          setMajorProjects(data.data);
        }
      })
      .catch(err => {
        console.error('Failed to fetch projects', err);
      });
  }, []);

  return (
    <PageTransition>
      <div className="w-full bg-[#f4f4f4] min-h-screen text-black selection:bg-black selection:text-white">
        
        {/* Modal Portal */}
        {createPortal(
          <AnimatePresence>
            {selectedImage && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 cursor-zoom-out"
                onClick={() => setSelectedImage(null)}
              >
                <motion.img
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  src={selectedImage}
                  alt="Enlarged project"
                  className="max-w-[95vw] max-h-[95vh] object-contain border-4 border-white"
                />
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )'''

if pattern.search(content):
    new_content = pattern.sub(replacement, content)
    with open('d:/Projects/Portfolio/frontend/src/pages/Projects.tsx', 'w') as f:
        f.write(new_content)
    print("Fixed!")
else:
    print("Pattern not found!")
