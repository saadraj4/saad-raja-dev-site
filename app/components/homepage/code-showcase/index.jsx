"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { FiTerminal, FiCode, FiLayers, FiGitBranch, FiCheck, FiCopy } from "react-icons/fi";
import Reveal from "../../reveal";

const techShowcase = [
  {
    icon: FiCode,
    title: "Frontend Architecture",
    category: "React/TypeScript",
    color: "from-blue-500 to-cyan-500",
    bgColor: "bg-blue-500/10",
    borderColor: "border-blue-500/30",
    code: `// Clean, type-safe React components
interface ProductCardProps {
  product: Product;
  onAddToCart: (id: string) => void;
}

export const ProductCard = ({ 
  product, 
  onAddToCart 
}: ProductCardProps) => {
  return (
    <Card onClick={() => onAddToCart(product.id)}>
      <Image src={product.image} alt={product.name} />
      <Price>{product.price}</Price>
    </Card>
  );
};`,
    highlight: "Type-safe, maintainable components",
    features: ["Type Safety", "Component Reusability", "Clean Props"],
  },
  {
    icon: FiTerminal,
    title: "Backend API Design",
    category: "Node.js/Express",
    color: "from-green-500 to-emerald-500",
    bgColor: "bg-green-500/10",
    borderColor: "border-green-500/30",
    code: `// RESTful API with validation
app.post('/api/orders', 
  authenticate,
  validateOrder,
  async (req, res) => {
    try {
      const order = await Order.create({
        userId: req.user.id,
        items: req.body.items,
        total: calculateTotal(req.body.items)
      });
      
      await processPayment(order);
      await sendConfirmationEmail(order);
      
      res.json({ success: true, order });
    } catch (error) {
      logger.error('Order failed:', error);
      res.status(500).json({ error: error.message });
    }
  }
);`,
    highlight: "Error handling, validation, security",
    features: ["Middleware Chain", "Error Handling", "Security First"],
  },
  {
    icon: FiLayers,
    title: "Database Optimization",
    category: "MongoDB/SQL",
    color: "from-purple-500 to-pink-500",
    bgColor: "bg-purple-500/10",
    borderColor: "border-purple-500/30",
    code: `// Efficient queries with indexing
const getActiveOrders = async (userId) => {
  return await Order.aggregate([
    { $match: { 
      userId: ObjectId(userId),
      status: { $in: ['pending', 'processing'] }
    }},
    { $lookup: {
      from: 'products',
      localField: 'items.productId',
      foreignField: '_id',
      as: 'productDetails'
    }},
    { $sort: { createdAt: -1 } },
    { $limit: 50 }
  ]);
};

// Index for performance
db.orders.createIndex({ userId: 1, status: 1, createdAt: -1 });`,
    highlight: "Optimized queries, proper indexing",
    features: ["Query Optimization", "Strategic Indexing", "Data Relations"],
  },
  {
    icon: FiGitBranch,
    title: "Production Deployment",
    category: "CI/CD Pipeline",
    color: "from-orange-500 to-red-500",
    bgColor: "bg-orange-500/10",
    borderColor: "border-orange-500/30",
    code: `# Automated CI/CD pipeline
name: Deploy Production

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Run tests
        run: npm test
        
      - name: Build application
        run: npm run build
        
      - name: Deploy to production
        env:
          DEPLOY_KEY: \${{ secrets.DEPLOY_KEY }}
        run: |
          npm run deploy
          npm run migrate
          npm run notify-team`,
    highlight: "Automated testing, zero-downtime deploys",
    features: ["Automated Testing", "Zero Downtime", "Version Control"],
  },
];

function CodeShowcase() {
  const [activeTab, setActiveTab] = useState(0);
  const [copied, setCopied] = useState(false);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);
  const scrollContainerRef = useRef(null);

  const checkScroll = () => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const { scrollLeft, scrollWidth, clientWidth } = container;
    const canScroll = scrollWidth > clientWidth;
    
    setShowLeftArrow(canScroll && scrollLeft > 10);
    setShowRightArrow(canScroll && scrollLeft < scrollWidth - clientWidth - 10);
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, []);

  const handleCopy = async () => {
    try {
      // Modern clipboard API (HTTPS/localhost only)
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(techShowcase[activeTab].code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } else {
        // Fallback for older browsers or non-secure contexts
        const textArea = document.createElement("textarea");
        textArea.value = techShowcase[activeTab].code;
        textArea.style.position = "fixed";
        textArea.style.left = "-999999px";
        textArea.style.top = "-999999px";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        
        try {
          document.execCommand('copy');
          textArea.remove();
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        } catch (err) {
          console.error('Fallback: Could not copy text: ', err);
          textArea.remove();
        }
      }
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <section className="py-12 relative overflow-hidden">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 opacity-40"></div>
      <div className="absolute inset-0 bg-grid-pattern opacity-30"></div>
      
      {/* Floating orbs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>

      <div className="wrap relative z-10">
        <Reveal direction="up" delay={0.1}>
          <div className="text-center max-w-3xl mx-auto mb-12 md:mb-20 px-2">
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xs font-bold uppercase tracking-wider mb-6 shadow-lg shadow-blue-500/30"
            >
              <FiCode size={16} className="animate-pulse" />
              <span>How I Actually Code</span>
            </motion.div>
            <h2 className="sec-title mb-5 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 bg-clip-text text-transparent">
              Production-Grade Code.<br />
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Not Tutorials.
              </span>
            </h2>
            <p className="sec-subtitle text-base">
              Here&apos;s what separates professional engineering from amateur work. This is the standard I hold myself to on every project.
            </p>
          </div>
        </Reveal>

        <div className="max-w-7xl mx-auto">
          {/* Navigation Tabs - Tab-like Structure with Scroll Indicators */}
          <Reveal direction="up" delay={0.2}>
            <div className="relative mb-6 md:mb-8">
              {/* Left gradient fade indicator */}
              {showLeftArrow && (
                <div className="absolute left-0 top-0 bottom-2 w-12 bg-gradient-to-r from-white via-white/90 to-transparent z-10 pointer-events-none md:hidden"></div>
              )}

              {/* Right gradient fade indicator */}
              {showRightArrow && (
                <div className="absolute right-0 top-0 bottom-2 w-12 bg-gradient-to-l from-white via-white/90 to-transparent z-10 pointer-events-none md:hidden"></div>
              )}

              {/* Tab container */}
              <div 
                ref={scrollContainerRef}
                onScroll={checkScroll}
                className="flex gap-2 md:gap-3 overflow-x-auto md:flex-wrap md:justify-center scrollbar-hide pb-2 snap-x snap-mandatory scroll-smooth"
              >
                {techShowcase.map((item, idx) => {
                  const Icon = item.icon;
                  const isActive = activeTab === idx;
                  return (
                    <motion.button
                      key={idx}
                      onClick={() => setActiveTab(idx)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`relative flex items-center gap-2 px-4 py-2.5 md:px-5 md:py-3 rounded-t-xl transition-all duration-300 whitespace-nowrap shrink-0 snap-start border-b-2 ${
                        isActive
                          ? `bg-gradient-to-br ${item.color} shadow-lg text-white border-transparent`
                          : "bg-white border-x border-t border-slate-300 hover:border-slate-400 hover:bg-slate-50 text-slate-700 border-b-transparent"
                      }`}
                    >
                      <Icon 
                        size={18} 
                        className={`shrink-0 ${isActive ? "text-white" : "text-slate-600"}`}
                      />
                      <span className={`font-semibold text-sm ${
                        isActive ? "text-white" : "text-slate-900"
                      }`}>
                        {item.title}
                      </span>
                      
                      {/* Active tab indicator line at bottom */}
                      {isActive && (
                        <motion.div
                          layoutId="tabIndicator"
                          className="absolute -bottom-0.5 left-0 right-0 h-0.5 bg-white"
                          initial={false}
                          transition={{ type: "spring", stiffness: 500, damping: 30 }}
                        />
                      )}
                    </motion.button>
                  );
                })}
              </div>
              
              {/* Tab bottom border line */}
              <div className="h-0.5 bg-slate-300 -mt-0.5 md:hidden"></div>
            </div>
          </Reveal>

          {/* Code Display Area */}
          <Reveal direction="up" delay={0.3}>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -30, scale: 0.95 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="relative"
              >
                {/* Main code card */}
                <div className={`relative rounded-3xl overflow-hidden shadow-2xl border-2 ${techShowcase[activeTab].borderColor} bg-gradient-to-br from-slate-900 to-slate-800`}>
                  {/* Terminal header */}
                  <div className="relative bg-slate-800/80 backdrop-blur-sm px-5 py-4 border-b border-slate-700/50">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                      </div>
                      <motion.button
                        onClick={handleCopy}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-700 hover:bg-slate-600 border border-slate-600 text-white text-xs font-medium transition-all"
                      >
                        {copied ? (
                          <>
                            <FiCheck size={14} className="text-green-400" />
                            <span>Copied!</span>
                          </>
                        ) : (
                          <>
                            <FiCopy size={14} />
                            <span>Copy Code</span>
                          </>
                        )}
                      </motion.button>
                    </div>
                  </div>

                  {/* Code content with syntax highlighting */}
                  <div className="relative bg-[#0d1117] p-6 md:p-8 overflow-x-auto">
                    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>
                    <pre className="text-sm md:text-base text-slate-100 font-mono leading-relaxed">
                      <code className="language-typescript">{techShowcase[activeTab].code}</code>
                    </pre>
                  </div>

                  {/* Highlight section with integrated features */}
                  <div className={`relative bg-gradient-to-r ${techShowcase[activeTab].color} px-6 py-5`}>
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center shrink-0">
                          <FiCheck size={20} className="text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="font-bold text-white text-sm uppercase tracking-wider mb-1.5">
                            What Makes This Professional
                          </div>
                          <div className="text-white/90 font-medium">
                            {techShowcase[activeTab].highlight}
                          </div>
                        </div>
                      </div>
                      
                      {/* Compact feature badges */}
                      <div className="flex flex-wrap gap-2 md:shrink-0">
                        {techShowcase[activeTab].features.map((feature, idx) => (
                          <motion.div
                            key={idx}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.2 + idx * 0.1 }}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/20 backdrop-blur-sm border border-white/30 text-white text-xs font-semibold"
                          >
                            <span className="text-[10px]">✓</span>
                            {feature}
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </Reveal>

          {/* Code Quality Metrics - Compact Design */}
          <Reveal direction="up" delay={0.4}>
            <div className="mt-10 md:mt-12 bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl p-6 md:p-8 border border-slate-200">
              <div className="text-center mb-6">
                <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-2">
                  My Code Standards
                </h3>
                <p className="text-sm text-slate-600">
                  Every line I write meets these quality benchmarks
                </p>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                {[
                  { label: "Type Safe", icon: "✓", color: "from-blue-500 to-blue-600" },
                  { label: "Error Handled", icon: "✓", color: "from-green-500 to-green-600" },
                  { label: "Optimized", icon: "✓", color: "from-purple-500 to-purple-600" },
                  { label: "Well Documented", icon: "✓", color: "from-orange-500 to-orange-600" },
                ].map((metric, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 * idx }}
                    className="bg-white rounded-xl p-4 border border-slate-200 text-center shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className={`inline-flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br ${metric.color} text-white font-bold text-lg mb-2 shadow-lg`}>
                      {metric.icon}
                    </div>
                    <div className="font-semibold text-xs md:text-sm text-slate-900">
                      {metric.label}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export default CodeShowcase;