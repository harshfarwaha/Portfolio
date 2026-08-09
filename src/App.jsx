import React, { useState, useEffect, useRef } from 'react';
import { 
  Menu, X, Download, Github, Linkedin, ExternalLink, 
  Mail, Phone, MapPin, Cpu, Code, Shield, Zap, 
  GraduationCap, Award, ChevronRight
} from 'lucide-react';

// --- Custom Hook for Scroll Animations ---
const useIntersectionObserver = (options) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const targetRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsIntersecting(true);
        observer.unobserve(entry.target);
      }
    }, options);

    const currentRef = targetRef.current;
    if (currentRef) observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [options]);

  return [targetRef, isIntersecting];
};

// --- Reusable Animated Section Wrapper ---
const AnimatedSection = ({ children, className = "", delay = 0 }) => {
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.1 });
  
  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle Navbar Background on Scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Education', href: '#education' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 font-sans selection:bg-cyan-500 selection:text-slate-900 scroll-smooth">
      
      {/* --- Background Ambient Glow --- */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-cyan-500/20 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-blue-600/20 rounded-full blur-[120px]"></div>
      </div>

      {/* --- Navigation --- */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-slate-950/80 backdrop-blur-md border-b border-slate-800/50 py-4' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
          <a href="#" className="text-2xl font-bold tracking-tighter text-white flex items-center gap-2">
            <span className="w-8 h-8 rounded bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center text-sm">HF</span>
            Harsh Farwaha
          </a>
          
          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a key={link.name} href={link.href} className="text-sm font-medium text-slate-300 hover:text-cyan-400 transition-colors">
                {link.name}
              </a>
            ))}
            <a 
              href="/canvaresume.pdf" 
              download="Harsh_Farwaha_Resume.pdf" 
              className="px-5 py-2 rounded-full border border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10 transition-all flex items-center gap-2 text-sm font-medium"
            >
              <Download size={16} /> Resume
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button className="md:hidden text-slate-300" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Nav */}
        {isMenuOpen && (
          <div className="absolute top-full left-0 w-full bg-slate-900 border-b border-slate-800 py-4 px-6 flex flex-col space-y-4 md:hidden shadow-xl">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                onClick={() => setIsMenuOpen(false)}
                className="text-slate-300 hover:text-cyan-400 font-medium py-2"
              >
                {link.name}
              </a>
            ))}
            <a 
              href="/canvaresume.pdf" 
              download="Harsh_Farwaha_Resume.pdf"
              className="w-full px-5 py-3 rounded-md bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-medium flex items-center justify-center gap-2 mt-4"
            >
              <Download size={18} /> Download Resume
            </a>
          </div>
        )}
      </nav>

      <main className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 pt-32 pb-24">
        
        {/* --- Hero Section --- */}
        <section id="hero" className="min-h-[80vh] flex flex-col justify-center items-start py-20">
          <AnimatedSection>
            <p className="text-cyan-400 font-medium tracking-wide mb-4 flex items-center gap-2">
              <span className="w-12 h-[2px] bg-cyan-400 inline-block"></span> Hello, I am
            </p>
          </AnimatedSection>
          
          <AnimatedSection delay={100}>
            <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight mb-4">
              Harsh Farwaha.
            </h1>
          </AnimatedSection>
          
          <AnimatedSection delay={200}>
            <h2 className="text-3xl md:text-5xl font-bold text-slate-400 mb-8 max-w-3xl">
              Electronics & Communication Engineer.
            </h2>
          </AnimatedSection>
          
          <AnimatedSection delay={300}>
            <p className="text-lg text-slate-400 max-w-2xl mb-10 leading-relaxed">
              I am an engineering student at Rayat Bahra University with a strong foundation in circuit design, automation, and system integration. I specialize in testing and debugging electronic systems and am passionate about building hardware and software solutions.
            </p>
          </AnimatedSection>
          
          <AnimatedSection delay={400} className="flex flex-wrap gap-4">
            <a href="#projects" className="px-8 py-4 rounded-md bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold hover:opacity-90 transition-opacity flex items-center gap-2">
              View My Work <ChevronRight size={20} />
            </a>
            <a href="https://github.com/harshfarwaha" target="_blank" rel="noreferrer" className="px-8 py-4 rounded-md bg-slate-800 text-white font-semibold hover:bg-slate-700 transition-colors flex items-center gap-2 border border-slate-700">
              <Github size={20} /> GitHub
            </a>
            <a href="https://www.linkedin.com/in/harsh-farwaha-a1b635232?utm_source=share_via&utm_content=profile&utm_medium=member_android" target="_blank" rel="noreferrer" className="px-8 py-4 rounded-md bg-slate-800 text-white font-semibold hover:bg-slate-700 transition-colors flex items-center gap-2 border border-slate-700">
              <Linkedin size={20} /> LinkedIn
            </a>
          </AnimatedSection>
        </section>

        {/* --- About Section --- */}
        <section id="about" className="py-24 border-t border-slate-800/50">
          <AnimatedSection>
            <h3 className="text-3xl font-bold mb-12 flex items-center gap-4">
              <span className="text-cyan-400">01.</span> About Me
              <span className="h-px bg-slate-800 flex-1 ml-4"></span>
            </h3>
          </AnimatedSection>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <AnimatedSection delay={100}>
              <div className="space-y-6 text-slate-400 leading-relaxed text-lg">
                <p>
                  As a fresher with a robust academic background in Electronics and Communication Engineering, I bring strong problem-solving skills, meticulous attention to detail, and a relentless willingness to learn.
                </p>
                <p>
                  My hands-on experience spans across <span className="text-cyan-300 font-medium">circuit design, industrial automation, and embedded systems</span>. I thrive in dynamic environments where I can contribute to testing processes, debug complex electronic systems, and continuously enhance my technical expertise.
                </p>
                <p>
                  Beyond hardware, I have actively expanded my skill set into programming and software development, allowing me to approach problems from a holistic systems perspective.
                </p>
              </div>
            </AnimatedSection>
            
            <AnimatedSection delay={200} className="relative">
              <div className="aspect-square rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center p-8 relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/10 to-blue-600/10 group-hover:opacity-50 transition-opacity duration-500"></div>
                <Cpu size={120} className="text-slate-600 group-hover:text-cyan-400 transition-colors duration-500" strokeWidth={1} />
                
                {/* Decorative tech elements */}
                <div className="absolute top-4 left-4 w-2 h-2 bg-cyan-500 rounded-full animate-ping"></div>
                <div className="absolute bottom-4 right-4 w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* --- Skills Section --- */}
        <section id="skills" className="py-24 border-t border-slate-800/50">
          <AnimatedSection>
            <h3 className="text-3xl font-bold mb-12 flex items-center gap-4">
              <span className="text-cyan-400">02.</span> My Skills
              <span className="h-px bg-slate-800 flex-1 ml-4"></span>
            </h3>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 gap-8">
            <AnimatedSection delay={100} className="bg-slate-900/50 p-8 rounded-2xl border border-slate-800">
              <h4 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                <Code className="text-cyan-400" /> Technical Skills
              </h4>
              <div className="flex flex-wrap gap-3">
                {['Python Programming', 'Basic PLC Circuit', 'Embedded Systems', 'Industrial Automation', 'Circuit Design', 'Testing & Debugging'].map((skill) => (
                  <span key={skill} className="px-4 py-2 bg-slate-800 text-slate-300 rounded-full text-sm font-medium border border-slate-700 hover:border-cyan-500/50 hover:text-cyan-300 transition-colors">
                    {skill}
                  </span>
                ))}
              </div>
            </AnimatedSection>

            <AnimatedSection delay={200} className="bg-slate-900/50 p-8 rounded-2xl border border-slate-800">
              <h4 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                <Zap className="text-cyan-400" /> Professional Skills
              </h4>
              <div className="flex flex-wrap gap-3">
                {['Problem-Solving', 'Time Management', 'Quick Learning Ability', 'Attention to Detail', 'System Integration'].map((skill) => (
                  <span key={skill} className="px-4 py-2 bg-slate-800 text-slate-300 rounded-full text-sm font-medium border border-slate-700 hover:border-cyan-500/50 hover:text-cyan-300 transition-colors">
                    {skill}
                  </span>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* --- Projects Section --- */}
        <section id="projects" className="py-24 border-t border-slate-800/50">
          <AnimatedSection>
            <h3 className="text-3xl font-bold mb-12 flex items-center gap-4">
              <span className="text-cyan-400">03.</span> Featured Projects
              <span className="h-px bg-slate-800 flex-1 ml-4"></span>
            </h3>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Project 1 */}
            <AnimatedSection delay={100}>
              <div className="bg-slate-900 rounded-2xl p-8 border border-slate-800 hover:border-cyan-500/50 transition-all h-full flex flex-col group relative overflow-hidden">
                <div className="absolute top-0 right-0 p-32 bg-cyan-500/5 rounded-full blur-3xl -mr-16 -mt-16 transition-opacity group-hover:bg-cyan-500/10"></div>
                
                <div className="flex justify-between items-start mb-6 relative z-10">
                  <div className="p-3 bg-slate-800 rounded-lg text-cyan-400">
                    <Shield size={28} />
                  </div>
                </div>
                
                <h4 className="text-2xl font-bold text-white mb-3 relative z-10">Smart Coal Mining Helmet</h4>
                <p className="text-slate-400 mb-6 flex-grow relative z-10">
                  Designed an advanced wearable device to improve safety in coal mining environments. The helmet integrates sensors to monitor gas levels, temperature, and miner location, providing real-time alerts to prevent accidents and ensure worker safety.
                </p>
                
                <div className="flex gap-3 mt-auto flex-wrap relative z-10">
                  <span className="text-xs font-mono text-cyan-400 bg-cyan-400/10 px-2 py-1 rounded">Sensors</span>
                  <span className="text-xs font-mono text-cyan-400 bg-cyan-400/10 px-2 py-1 rounded">IoT</span>
                  <span className="text-xs font-mono text-cyan-400 bg-cyan-400/10 px-2 py-1 rounded">Embedded</span>
                </div>
              </div>
            </AnimatedSection>

            {/* Project 2 */}
            <AnimatedSection delay={200}>
              <div className="bg-slate-900 rounded-2xl p-8 border border-slate-800 hover:border-blue-500/50 transition-all h-full flex flex-col group relative overflow-hidden">
                <div className="absolute top-0 right-0 p-32 bg-blue-500/5 rounded-full blur-3xl -mr-16 -mt-16 transition-opacity group-hover:bg-blue-500/10"></div>
                
                <div className="flex justify-between items-start mb-6 relative z-10">
                  <div className="p-3 bg-slate-800 rounded-lg text-blue-400">
                    <Code size={28} />
                  </div>
                  <a href="https://quizmaster-y9zi.onrender.com/" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-white transition-colors">
                    <ExternalLink size={24} />
                  </a>
                </div>
                
                <h4 className="text-2xl font-bold text-white mb-3 relative z-10 hover:text-blue-400 transition-colors">
                  <a href="https://quizmaster-y9zi.onrender.com/" target="_blank" rel="noreferrer">Quizmaster App</a>
                </h4>
                <p className="text-slate-400 mb-6 flex-grow relative z-10">
                  A dynamic and interactive web application designed to host and manage quizzes. Built to showcase software development skills alongside hardware expertise.
                </p>
                
                <div className="flex gap-3 mt-auto flex-wrap relative z-10">
                  <span className="text-xs font-mono text-blue-400 bg-blue-400/10 px-2 py-1 rounded">Web Dev</span>
                  <span className="text-xs font-mono text-blue-400 bg-blue-400/10 px-2 py-1 rounded">Interactive UI</span>
                  <span className="text-xs font-mono text-blue-400 bg-blue-400/10 px-2 py-1 rounded">Deployment</span>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* --- Education & Training --- */}
        <section id="education" className="py-24 border-t border-slate-800/50">
          <AnimatedSection>
            <h3 className="text-3xl font-bold mb-12 flex items-center gap-4">
              <span className="text-cyan-400">04.</span> Education & Training
              <span className="h-px bg-slate-800 flex-1 ml-4"></span>
            </h3>
          </AnimatedSection>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Education Timeline */}
            <div>
              <AnimatedSection delay={100}>
                <h4 className="text-2xl font-semibold mb-8 flex items-center gap-3 text-white">
                  <GraduationCap className="text-cyan-400" /> Education
                </h4>
              </AnimatedSection>
              
              <div className="space-y-8 border-l-2 border-slate-800 ml-3">
                <AnimatedSection delay={200} className="relative pl-8">
                  <span className="absolute w-4 h-4 bg-cyan-500 rounded-full -left-[9px] top-1 border-4 border-slate-950"></span>
                  <h5 className="text-lg font-bold text-white">Bachelor of Technology - ECE</h5>
                  <p className="text-cyan-400 font-medium mb-1">Rayat Bahra University, Mohali</p>
                  <p className="text-slate-500 text-sm mb-2">2023 - 2026 | Score: 75%</p>
                </AnimatedSection>

                <AnimatedSection delay={300} className="relative pl-8">
                  <span className="absolute w-4 h-4 bg-slate-700 rounded-full -left-[9px] top-1 border-4 border-slate-950"></span>
                  <h5 className="text-lg font-bold text-white">Diploma - ECE</h5>
                  <p className="text-slate-300 font-medium mb-1">Govt. Polytechnic College, Hoshiarpur</p>
                  <p className="text-slate-500 text-sm mb-2">Score: 74.99%</p>
                </AnimatedSection>

                <AnimatedSection delay={400} className="relative pl-8">
                  <span className="absolute w-4 h-4 bg-slate-700 rounded-full -left-[9px] top-1 border-4 border-slate-950"></span>
                  <h5 className="text-lg font-bold text-white">Higher Secondary (Non-Medical)</h5>
                  <p className="text-slate-300 font-medium mb-1">Govt. Senior Secondary School</p>
                  <p className="text-slate-500 text-sm mb-2">Score: 85%</p>
                </AnimatedSection>

                <AnimatedSection delay={500} className="relative pl-8">
                  <span className="absolute w-4 h-4 bg-slate-700 rounded-full -left-[9px] top-1 border-4 border-slate-950"></span>
                  <h5 className="text-lg font-bold text-white">Secondary School</h5>
                  <p className="text-slate-300 font-medium mb-1">M.K. Mount Everest High School</p>
                  <p className="text-slate-500 text-sm mb-2">Score: 90%</p>
                </AnimatedSection>
              </div>
            </div>

            {/* Training & Courses */}
            <div>
              <AnimatedSection delay={100}>
                <h4 className="text-2xl font-semibold mb-8 flex items-center gap-3 text-white">
                  <Award className="text-blue-500" /> Training & Certifications
                </h4>
              </AnimatedSection>
              
              <div className="grid gap-4">
                {[
                  { title: "Embedded System", institute: "Tech Point" },
                  { title: "Programmable Logical Controller (PLC)", institute: "Tech Point" },
                  { title: "Python Programming Language", institute: "Novem Controls" },
                  { title: "Industrial Automation", institute: "Novem Controls" }
                ].map((course, idx) => (
                  <AnimatedSection key={idx} delay={200 + (idx * 100)}>
                    <div className="bg-slate-900 p-5 rounded-xl border border-slate-800 flex items-center justify-between group hover:border-blue-500/50 transition-colors">
                      <div>
                        <h5 className="text-white font-medium group-hover:text-blue-400 transition-colors">{course.title}</h5>
                        <p className="text-slate-400 text-sm mt-1">{course.institute}</p>
                      </div>
                      <Award className="text-slate-700 group-hover:text-blue-500/50 transition-colors" size={20} />
                    </div>
                  </AnimatedSection>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* --- Contact Section --- */}
        <section id="contact" className="py-24 border-t border-slate-800/50 text-center max-w-3xl mx-auto">
          <AnimatedSection>
            <h3 className="text-cyan-400 font-medium tracking-wide mb-4">05. What's Next?</h3>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Get In Touch</h2>
            <p className="text-slate-400 text-lg mb-10">
              I am currently looking for new opportunities and my inbox is always open. Whether you have a question, a project, or just want to say hi, I'll try my best to get back to you!
            </p>
          </AnimatedSection>

          <AnimatedSection delay={200} className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-12">
            <a href="mailto:harshfarwaha@gmail.com" className="flex items-center gap-3 text-slate-300 hover:text-cyan-400 transition-colors bg-slate-900 px-6 py-4 rounded-xl border border-slate-800 w-full sm:w-auto justify-center">
              <Mail className="text-cyan-500" /> harshfarwaha@gmail.com
            </a>
            <a href="tel:+917717244050" className="flex items-center gap-3 text-slate-300 hover:text-cyan-400 transition-colors bg-slate-900 px-6 py-4 rounded-xl border border-slate-800 w-full sm:w-auto justify-center">
              <Phone className="text-cyan-500" /> +91 7717244050
            </a>
          </AnimatedSection>

          <AnimatedSection delay={300} className="flex items-center justify-center gap-2 text-slate-400 mb-12 bg-slate-900/50 inline-flex px-6 py-3 rounded-full border border-slate-800/50">
            <MapPin size={18} className="text-slate-500" /> Mohali, Punjab
          </AnimatedSection>
          
          <br/>

          <AnimatedSection delay={400}>
            <a 
              href="/canvaresume.pdf" 
              download="Harsh_Farwaha_Resume.pdf"
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-lg hover:shadow-lg hover:shadow-cyan-500/25 transition-all transform hover:-translate-y-1"
            >
              <Download size={20} /> Download Full Resume
            </a>
          </AnimatedSection>
        </section>

      </main>

      {/* --- Footer --- */}
      <footer className="py-8 text-center border-t border-slate-800/50 bg-slate-950">
        <div className="flex justify-center gap-6 mb-4">
          <a href="https://github.com/harshfarwaha" target="_blank" rel="noreferrer" className="text-slate-500 hover:text-cyan-400 transition-colors">
            <Github size={20} />
          </a>
          <a href="https://www.linkedin.com/in/harsh-farwaha-a1b635232?utm_source=share_via&utm_content=profile&utm_medium=member_android" target="_blank" rel="noreferrer" className="text-slate-500 hover:text-blue-500 transition-colors">
            <Linkedin size={20} />
          </a>
          <a href="https://quizmaster-y9zi.onrender.com/" target="_blank" rel="noreferrer" className="text-slate-500 hover:text-cyan-400 transition-colors">
            <ExternalLink size={20} />
          </a>
        </div>
        <p className="text-slate-600 text-sm font-mono">
          Designed & Built by Harsh Farwaha &copy; {new Date().getFullYear()}
        </p>
      </footer>
    </div>
  );
}