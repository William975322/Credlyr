import { Switch, Route, Router as WouterRouter, Link } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Clock, Calendar, MessageSquare, CheckCircle2, BarChart, Shield, Zap, ChevronRight, Menu, X, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

const queryClient = new QueryClient();

// Animation variants
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-background/90 backdrop-blur-md border-b border-border shadow-sm py-4" : "bg-transparent py-6"}`}
      data-testid="navigation"
    >
      <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
        <Link href="/" className="text-2xl font-serif font-bold tracking-tight text-primary flex items-center gap-2" data-testid="link-logo">
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
            <div className="w-3 h-3 rounded-full bg-background" />
          </div>
          Credlyr
        </Link>
        
        <div className="hidden md:flex items-center gap-8">
          <a href="#platform" className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors">Platform</a>
          <a href="#solutions" className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors">Solutions</a>
          <a href="#about" className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors">About</a>
          <Button className="rounded-full px-6 bg-primary text-primary-foreground hover:bg-primary/90" data-testid="button-nav-cta">
            Book a Demo
          </Button>
        </div>

        <button 
          className="md:hidden text-foreground"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          data-testid="button-mobile-menu"
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-background border-b border-border p-6 flex flex-col gap-4 shadow-lg">
          <a href="#platform" className="text-lg font-medium text-foreground">Platform</a>
          <a href="#solutions" className="text-lg font-medium text-foreground">Solutions</a>
          <a href="#about" className="text-lg font-medium text-foreground">About</a>
          <Button className="w-full rounded-full mt-4 bg-primary text-primary-foreground">
            Book a Demo
          </Button>
        </div>
      )}
    </nav>
  );
}

function Hero() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, 200]);

  return (
    <section className="relative min-h-[90vh] flex items-center pt-32 pb-20 overflow-hidden" data-testid="section-hero">
      {/* Background Image & Overlay */}
      <motion.div style={{ y: y1 }} className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-background/80 md:bg-background/60 md:bg-gradient-to-r md:from-background md:via-background/90 md:to-transparent z-10" />
        <img 
          src="/credlyr-hero.png" 
          alt="Premium aesthetic landscape" 
          className="w-full h-full object-cover object-center"
        />
      </motion.div>

      <div className="container mx-auto px-6 md:px-12 relative z-20">
        <div className="max-w-3xl">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-sm font-medium mb-6">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              The Conversion Partner for Service Businesses
            </motion.div>
            
            <motion.h1 variants={fadeUp} className="text-5xl md:text-7xl font-serif font-bold text-foreground leading-[1.1] mb-6">
              Turn online attention into <span className="text-accent italic">booked appointments.</span>
            </motion.h1>
            
            <motion.p variants={fadeUp} className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl leading-relaxed">
              Modern buyers don't wait. We build systems that capture leads, respond instantly, and schedule appointments automatically—so you can focus on delivering exceptional service.
            </motion.p>
            
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="rounded-full px-8 h-14 text-base bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all" data-testid="button-hero-cta">
                Start Converting Today <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button size="lg" variant="outline" className="rounded-full px-8 h-14 text-base border-border bg-background/50 backdrop-blur-sm hover:bg-background" data-testid="button-hero-secondary">
                View Our Process
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Stats() {
  return (
    <section className="py-12 bg-primary text-primary-foreground relative z-30" data-testid="section-stats">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 divide-x divide-primary-foreground/10">
          {[
            { label: "Average Response Time", value: "< 2 mins" },
            { label: "Increase in Bookings", value: "+40%" },
            { label: "Service Businesses", value: "250+" },
            { label: "Revenue Generated", value: "$12M+" }
          ].map((stat, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className={`flex flex-col ${i !== 0 ? "pl-8 md:pl-12" : ""}`}
            >
              <span className="text-3xl md:text-5xl font-serif font-bold mb-2">{stat.value}</span>
              <span className="text-sm md:text-base text-primary-foreground/70">{stat.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TheProblem() {
  return (
    <section className="py-32 bg-background" data-testid="section-problem">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row gap-16 items-center">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="md:w-1/2"
          >
            <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-6 leading-tight">
              The 5-Minute Rule: Why most service businesses <span className="text-muted-foreground line-through">lose</span> leads.
            </motion.h2>
            <motion.p variants={fadeUp} className="text-lg text-muted-foreground mb-6 leading-relaxed">
              Buyer behavior has fundamentally shifted. When someone needs a dentist, an insurance broker, or a home service professional, they contact three places and go with the first one to respond.
            </motion.p>
            <motion.p variants={fadeUp} className="text-lg text-muted-foreground mb-8 leading-relaxed">
              If you don't respond within 5 minutes, your chance of converting that lead drops by 400%. Your beautiful website doesn't matter if your response time is slow.
            </motion.p>
            
            <motion.div variants={fadeUp} className="bg-secondary/50 p-6 rounded-2xl border border-secondary-border">
              <div className="flex gap-4">
                <Clock className="w-8 h-8 text-accent shrink-0" />
                <div>
                  <h3 className="font-bold text-foreground mb-2">Credlyr changes the math.</h3>
                  <p className="text-muted-foreground">We implement systems that guarantee an instant, personalized response to every inquiry, 24/7.</p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="md:w-1/2 relative"
          >
            <div className="aspect-square rounded-[2rem] bg-gradient-to-br from-primary/5 to-accent/5 border border-border p-8 flex flex-col justify-center items-center relative overflow-hidden">
              
              <div className="w-full max-w-sm bg-card rounded-2xl shadow-xl p-6 relative z-10 border border-card-border transform -rotate-2">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                    <span className="text-muted-foreground font-medium">JD</span>
                  </div>
                  <div>
                    <div className="font-medium text-foreground">John Doe</div>
                    <div className="text-xs text-muted-foreground">Just now via Website</div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="bg-muted p-4 rounded-2xl rounded-tl-sm text-sm text-foreground">
                    Hi, I need to schedule a consultation for next week.
                  </div>
                  <div className="bg-primary text-primary-foreground p-4 rounded-2xl rounded-tr-sm text-sm ml-8 shadow-md">
                    Hello John! We'd be happy to help. I can schedule that for you right now. Does Tuesday at 10 AM or Wednesday at 2 PM work better?
                  </div>
                  <div className="text-xs text-center text-muted-foreground flex items-center justify-center gap-1 mt-2">
                    <Zap className="w-3 h-3 text-accent" /> Responded instantly by Credlyr
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Funnel() {
  const steps = [
    { icon: <ArrowRight />, title: "Traffic", desc: "Targeted visitors land on your site" },
    { icon: <MessageSquare />, title: "Capture", desc: "Optimized forms & chat secure the lead" },
    { icon: <Zap />, title: "Response", desc: "Instant automated outreach within seconds" },
    { icon: <CheckCircle2 />, title: "Qualify", desc: "Smart filtering ensures high-quality prospects" },
    { icon: <Calendar />, title: "Book", desc: "Direct calendar integration secures the meeting" },
    { icon: <BarChart />, title: "Revenue", desc: "Closed deals and ongoing automated follow-ups" }
  ];

  return (
    <section className="py-24 bg-muted/30 border-y border-border" data-testid="section-funnel">
      <div className="container mx-auto px-6 md:px-12">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">The Conversion Architecture</h2>
          <p className="text-muted-foreground text-lg">We don't just build websites. We build end-to-end machines designed to turn attention into revenue.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 relative">
          {steps.map((step, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="bg-card border border-card-border rounded-xl p-6 text-center shadow-sm relative z-10 hover:shadow-md transition-shadow"
            >
              <div className="w-12 h-12 mx-auto rounded-full bg-secondary flex items-center justify-center text-primary mb-4">
                {step.icon}
              </div>
              <h3 className="font-bold text-foreground mb-2 text-sm">{step.title}</h3>
              <p className="text-xs text-muted-foreground">{step.desc}</p>
              
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 text-muted-foreground z-0">
                  <ChevronRight className="w-6 h-6" />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Features() {
  return (
    <section id="platform" className="py-32 bg-background overflow-hidden" data-testid="section-features">
      <div className="container mx-auto px-6 md:px-12">
        
        {/* Feature 1 */}
        <div className="flex flex-col md:flex-row items-center gap-16 mb-32">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="md:w-1/2"
          >
            <div className="text-accent font-medium mb-4 flex items-center gap-2">
              <span className="w-8 h-px bg-accent"></span> Instant Response
            </div>
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-foreground mb-6">Never miss a lead while you're working.</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Our AI-driven messaging infrastructure greets prospects the second they reach out, answering basic questions and moving them to the next step, day or night.
            </p>
            <ul className="space-y-4">
              {["Omnichannel inbox (SMS, Web, Social)", "Intelligent auto-replies", "Seamless human handoff"].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-foreground font-medium">
                  <CheckCircle2 className="w-5 h-5 text-primary" /> {item}
                </li>
              ))}
            </ul>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="md:w-1/2 relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-border">
              <img src="/mockup-chat.png" alt="Chat interface mockup" className="w-full h-auto object-cover" />
            </div>
            {/* Decorative element */}
            <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-accent/10 rounded-full blur-2xl -z-10"></div>
          </motion.div>
        </div>

        {/* Feature 2 */}
        <div className="flex flex-col md:flex-row-reverse items-center gap-16 mb-32">
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="md:w-1/2"
          >
            <div className="text-accent font-medium mb-4 flex items-center gap-2">
              <span className="w-8 h-px bg-accent"></span> Frictionless Booking
            </div>
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-foreground mb-6">Turn interest into commitments on the spot.</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Eliminate the back-and-forth emails. We integrate high-converting scheduling directly into your workflow, allowing qualified leads to book immediately.
            </p>
            <ul className="space-y-4">
              {["Two-way calendar sync", "Automated reminders & confirmations", "Pre-appointment qualification forms"].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-foreground font-medium">
                  <CheckCircle2 className="w-5 h-5 text-primary" /> {item}
                </li>
              ))}
            </ul>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="md:w-1/2 relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-border">
              <img src="/mockup-calendar.png" alt="Calendar interface mockup" className="w-full h-auto object-cover" />
            </div>
            {/* Decorative element */}
            <div className="absolute -top-6 -right-6 w-32 h-32 bg-primary/10 rounded-full blur-3xl -z-10"></div>
          </motion.div>
        </div>

        {/* Feature 3 */}
        <div className="flex flex-col md:flex-row items-center gap-16">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="md:w-1/2"
          >
            <div className="text-accent font-medium mb-4 flex items-center gap-2">
              <span className="w-8 h-px bg-accent"></span> Automated Follow-up
            </div>
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-foreground mb-6">Keep leads warm until they are ready.</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Not everyone is ready to buy on day one. Our CRM automatically nurtures pipeline prospects with targeted communication sequences that build trust.
            </p>
            <ul className="space-y-4">
              {["Visual pipeline management", "Smart sequence automation", "Revenue attribution tracking"].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-foreground font-medium">
                  <CheckCircle2 className="w-5 h-5 text-primary" /> {item}
                </li>
              ))}
            </ul>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="md:w-1/2 relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-border">
              <img src="/mockup-crm.png" alt="CRM pipeline mockup" className="w-full h-auto object-cover" />
            </div>
            <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-secondary/20 rounded-full blur-2xl -z-10"></div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}

function TrustedBy() {
  const logos = [
    { name: "Lumina Dental", icon: <Shield /> },
    { name: "Aegis Insurance", icon: <Shield /> },
    { name: "Elevate Real Estate", icon: <Shield /> },
    { name: "Nova MedSpa", icon: <Shield /> },
    { name: "Apex Home Services", icon: <Shield /> }
  ];

  return (
    <section className="py-20 border-y border-border bg-card" data-testid="section-trusted-by">
      <div className="container mx-auto px-6 md:px-12 text-center">
        <p className="text-sm font-medium text-muted-foreground mb-10 tracking-widest uppercase">Trusted by premium service providers</p>
        <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
          {logos.map((logo, i) => (
            <div key={i} className="flex items-center gap-2 text-foreground font-serif text-xl font-bold">
              <div className="w-8 h-8 flex items-center justify-center rounded-md bg-muted/50 text-foreground">
                {logo.icon}
              </div>
              {logo.name}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Offer() {
  return (
    <section className="py-32 bg-background relative overflow-hidden" data-testid="section-offer">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-secondary/30 rounded-l-[100px] -z-10 transform translate-x-1/4"></div>
      
      <div className="container mx-auto px-6 md:px-12">
        <div className="max-w-4xl mx-auto bg-card rounded-[2.5rem] border border-card-border p-8 md:p-16 shadow-xl relative overflow-hidden">
          
          <div className="flex flex-col md:flex-row gap-12 relative z-10">
            <div className="md:w-3/5">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">The Complete Conversion System</h2>
              <p className="text-muted-foreground mb-8">One comprehensive partnership. We build, manage, and optimize your entire digital lead-to-booking pipeline.</p>
              
              <ul className="space-y-4 mb-8">
                {[
                  "High-converting landing pages",
                  "Omnichannel unified inbox",
                  "AI instant response automation",
                  "Automated qualification routing",
                  "Integrated booking calendar",
                  "No-show reduction sequences"
                ].map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                    <span className="text-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="md:w-2/5 flex flex-col justify-center">
              <div className="bg-primary rounded-3xl p-8 text-primary-foreground text-center shadow-lg transform md:scale-110">
                <div className="flex justify-center gap-1 mb-4 text-yellow-400">
                  <Star className="w-5 h-5 fill-current" />
                  <Star className="w-5 h-5 fill-current" />
                  <Star className="w-5 h-5 fill-current" />
                  <Star className="w-5 h-5 fill-current" />
                  <Star className="w-5 h-5 fill-current" />
                </div>
                <h3 className="text-2xl font-bold mb-2">Stop losing leads</h3>
                <p className="text-primary-foreground/80 mb-8 text-sm">Join 250+ service businesses dominating their local markets.</p>
                <Button size="lg" className="w-full bg-background text-foreground hover:bg-background/90 rounded-full h-14 text-base font-bold shadow-sm" data-testid="button-offer-cta">
                  Book a Strategy Call
                </Button>
                <p className="text-xs text-primary-foreground/60 mt-4">15 min call. No pressure.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-foreground text-background py-16" data-testid="footer">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="text-2xl font-serif font-bold tracking-tight text-background flex items-center gap-2 mb-6">
              <div className="w-8 h-8 rounded-full bg-background flex items-center justify-center">
                <div className="w-3 h-3 rounded-full bg-foreground" />
              </div>
              Credlyr
            </Link>
            <p className="text-background/60 max-w-sm mb-8">
              The premium conversion partner for service businesses. We build systems that turn online attention into booked appointments.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold text-lg mb-6">Platform</h4>
            <ul className="space-y-4">
              <li><a href="#" className="text-background/60 hover:text-background transition-colors">Instant Response</a></li>
              <li><a href="#" className="text-background/60 hover:text-background transition-colors">Smart Qualification</a></li>
              <li><a href="#" className="text-background/60 hover:text-background transition-colors">Automated Booking</a></li>
              <li><a href="#" className="text-background/60 hover:text-background transition-colors">CRM Integration</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-lg mb-6">Company</h4>
            <ul className="space-y-4">
              <li><a href="#" className="text-background/60 hover:text-background transition-colors">About Us</a></li>
              <li><a href="#" className="text-background/60 hover:text-background transition-colors">Case Studies</a></li>
              <li><a href="#" className="text-background/60 hover:text-background transition-colors">Contact</a></li>
              <li><a href="#" className="text-background/60 hover:text-background transition-colors">Privacy Policy</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-background/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-background/40">
          <p>© {new Date().getFullYear()} Credlyr. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-background transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-background transition-colors">Privacy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function Home() {
  return (
    <div className="min-h-screen w-full bg-background font-sans selection:bg-accent selection:text-white">
      <Navigation />
      <main>
        <Hero />
        <Stats />
        <TheProblem />
        <Funnel />
        <Features />
        <TrustedBy />
        <Offer />
      </main>
      <Footer />
    </div>
  );
}

function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="text-lg text-muted-foreground mb-8">Page not found</p>
        <Link href="/">
          <Button>Return Home</Button>
        </Link>
      </div>
    </div>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
