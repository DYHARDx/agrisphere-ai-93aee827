import { motion } from "framer-motion";
import { Sprout, Brain, MapPin, TrendingUp, Users, Shield, ArrowRight, Satellite, Cloud, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ThemeToggle } from "@/components/ThemeToggle";

const Index = () => {
  const features = [
    {
      icon: Brain,
      title: "AI Crop Diagnosis",
      description: "Advanced ML models detect diseases, pests, and nutrient deficiencies in real-time",
      gradient: "from-primary to-primary-glow",
    },
    {
      icon: MapPin,
      title: "GIS Field Mapping",
      description: "Digital twin technology with polygon field mapping and multi-layer visualization",
      gradient: "from-accent to-accent-glow",
    },
    {
      icon: TrendingUp,
      title: "Yield Prediction",
      description: "Data-driven forecasting helps optimize production and maximize profitability",
      gradient: "from-secondary to-secondary-glow",
    },
    {
      icon: Satellite,
      title: "IoT Sensors",
      description: "Real-time monitoring of soil moisture, pH, temperature, and environmental factors",
      gradient: "from-primary to-accent",
    },
    {
      icon: Cloud,
      title: "Weather Intelligence",
      description: "Hyperlocal weather forecasts and climate risk alerts for informed decisions",
      gradient: "from-accent to-secondary",
    },
    {
      icon: Zap,
      title: "Smart Recommendations",
      description: "Precision irrigation, fertilizer optimization, and automated scheduling",
      gradient: "from-secondary to-primary",
    },
  ];

  const stats = [
    { value: "500K+", label: "Active Farmers" },
    { value: "98%", label: "Accuracy Rate" },
    { value: "2M+", label: "Fields Mapped" },
    { value: "40%", label: "Yield Increase" },
  ];

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Animated Background Mesh */}
      <div className="fixed inset-0 bg-gradient-mesh opacity-50 animate-glow-pulse pointer-events-none" />
      
      {/* Floating Orbs */}
      <div className="fixed top-20 left-10 w-72 h-72 bg-primary/30 rounded-full blur-[100px] animate-float" />
      <div className="fixed bottom-20 right-10 w-96 h-96 bg-accent/20 rounded-full blur-[120px] animate-float" style={{ animationDelay: "2s" }} />
      <div className="fixed top-1/2 left-1/2 w-80 h-80 bg-secondary/20 rounded-full blur-[100px] animate-float" style={{ animationDelay: "4s" }} />

      {/* Header */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 border-b border-border/50 bg-background/80 backdrop-blur-xl"
      >
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <motion.div
            className="flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center shadow-glow-primary">
              <Sprout className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-2xl font-bold gradient-text">AgriSphere AI</span>
          </motion.div>
          
          <nav className="hidden md:flex items-center gap-6">
            {["Features", "Solutions", "Marketplace", "Community"].map((item, i) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-foreground/80 hover:text-foreground transition-colors relative group"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-primary group-hover:w-full transition-all duration-300" />
              </motion.a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Button variant="outline" className="hidden md:inline-flex">
              Login
            </Button>
            <Button className="bg-gradient-primary hover:shadow-glow-primary transition-all duration-300">
              Get Started
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
        </div>
      </motion.header>

      {/* Hero Section */}
      <section className="relative z-10 container mx-auto px-4 py-20 md:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-block mb-4 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-sm font-medium text-primary"
            >
              <span className="animate-pulse mr-2">●</span>
              AI-Powered Smart Agriculture
            </motion.div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              <span className="block">Transform Your</span>
              <span className="block gradient-text">Farm with AI</span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Harness the power of Artificial Intelligence and GIS technology to maximize yields, 
              reduce costs, and make data-driven decisions for sustainable farming.
            </p>

            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="bg-gradient-primary hover:shadow-glow-primary transition-all duration-300 group">
                Start Free Trial
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button size="lg" variant="outline" className="border-2 hover:shadow-glow-accent transition-all duration-300">
                Watch Demo
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + i * 0.1 }}
                  className="text-center"
                >
                  <div className="text-3xl font-bold gradient-text mb-1">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Hero Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative w-full aspect-square">
              {/* Central Core */}
              <motion.div
                className="absolute inset-0 m-auto w-48 h-48 bg-gradient-primary rounded-full shadow-glow-primary"
                animate={{
                  scale: [1, 1.1, 1],
                  rotate: [0, 180, 360],
                }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />

              {/* Orbiting Icons */}
              {[Brain, MapPin, Satellite, TrendingUp, Cloud, Zap].map((Icon, i) => (
                <motion.div
                  key={i}
                  className="absolute inset-0 m-auto w-full h-full"
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                    delay: i * 0.5,
                  }}
                >
                  <motion.div
                    className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 bg-card border-2 border-primary/30 rounded-2xl flex items-center justify-center shadow-glow-primary"
                    whileHover={{ scale: 1.2 }}
                    animate={{ y: [0, -10, 0] }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      delay: i * 0.3,
                    }}
                  >
                    <Icon className="w-8 h-8 text-primary" />
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="relative z-10 container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Intelligent Features for
            <span className="block gradient-text">Modern Farming</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Cutting-edge technology designed to revolutionize every aspect of your agricultural operations
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
            >
              <Card className="group relative overflow-hidden border-2 border-border/50 hover:border-primary/50 bg-card/50 backdrop-blur-sm p-6 transition-all duration-300 hover:shadow-glow-primary">
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                
                <motion.div
                  className="relative"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-4 shadow-lg`}>
                    <feature.icon className="w-7 h-7 text-white" />
                  </div>
                  
                  <h3 className="text-xl font-bold mb-2 group-hover:gradient-text transition-all duration-300">
                    {feature.title}
                  </h3>
                  
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>

                <motion.div
                  className="mt-4 flex items-center text-primary font-medium opacity-0 group-hover:opacity-100 transition-all duration-300"
                  initial={{ x: -10 }}
                  whileHover={{ x: 0 }}
                >
                  Learn more <ArrowRight className="ml-2 w-4 h-4" />
                </motion.div>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Card className="relative overflow-hidden border-2 border-primary/30 bg-gradient-to-br from-primary/10 via-accent/5 to-secondary/10 backdrop-blur-sm p-12 md:p-16 text-center shadow-glow-primary">
            <div className="absolute inset-0 bg-gradient-mesh opacity-30" />
            
            <motion.div
              className="relative z-10"
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Ready to Transform Your
                <span className="block gradient-text">Agricultural Business?</span>
              </h2>
              
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Join thousands of farmers who are already using AgriSphere AI to increase yields and reduce costs
              </p>

              <div className="flex flex-wrap gap-4 justify-center">
                <Button size="lg" className="bg-gradient-primary hover:shadow-glow-primary transition-all duration-300 text-lg px-8">
                  Start Your Free Trial
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                <Button size="lg" variant="outline" className="border-2 text-lg px-8">
                  Schedule a Demo
                </Button>
              </div>
            </motion.div>
          </Card>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-border/50 bg-card/30 backdrop-blur-xl mt-20">
        <div className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                  <Sprout className="w-5 h-5 text-primary-foreground" />
                </div>
                <span className="text-xl font-bold gradient-text">AgriSphere AI</span>
              </div>
              <p className="text-muted-foreground text-sm">
                Empowering farmers with AI and GIS technology for sustainable, profitable agriculture.
              </p>
            </div>

            {[
              { title: "Product", links: ["Features", "Pricing", "Demo", "Documentation"] },
              { title: "Company", links: ["About", "Blog", "Careers", "Contact"] },
              { title: "Support", links: ["Help Center", "Community", "Status", "Terms"] },
            ].map((column) => (
              <div key={column.title}>
                <h4 className="font-bold mb-4">{column.title}</h4>
                <ul className="space-y-2">
                  {column.links.map((link) => (
                    <li key={link}>
                      <a href="#" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="border-t border-border/50 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-muted-foreground text-sm">
              © 2025 AgriSphere AI. All rights reserved.
            </p>
            <div className="flex gap-4">
              {[Users, Shield, Brain].map((Icon, i) => (
                <motion.a
                  key={i}
                  href="#"
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="w-10 h-10 rounded-full bg-muted hover:bg-primary/20 flex items-center justify-center transition-colors"
                >
                  <Icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
