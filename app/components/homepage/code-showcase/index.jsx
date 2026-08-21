"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { FiTerminal, FiCode, FiLayers, FiGitBranch } from "react-icons/fi";
import Reveal from "../../reveal";

const techShowcase = [
  {
    icon: FiCode,
    title: "Frontend Architecture",
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
  },
  {
    icon: FiTerminal,
    title: "Backend API Design",
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
  },
  {
    icon: FiLayers,
    title: "Database Optimization",
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
  },
  {
    icon: FiGitBranch,
    title: "Production Deployment",
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
  },
];

function CodeShowcase() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section className="py-24 border-t border-line bg-gradient-to-b from-bg-soft to-white overflow-hidden relative">
      <div className="wrap">
        <Reveal direction="up" delay={0.1}>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-tint border border-accent-border text-accent text-xs font-bold uppercase tracking-wider mb-6">
              <FiCode size={14} />
              <span>How I Actually Code</span>
            </div>
            <h2 className="sec-title mb-4">
              Production-grade code.<br />Not tutorials.
            </h2>
            <p className="sec-subtitle">
              Here&apos;s what separates professional engineering from amateur work. This is the standard I hold myself to on every project.
            </p>
          </div>
        </Reveal>

        <div className="max-w-6xl mx-auto">
          {/* Tab buttons */}
          <Reveal direction="up" delay={0.2}>
            <div className="flex flex-wrap gap-3 mb-8 justify-center">
              {techShowcase.map((item, idx) => {
                const Icon = item.icon;
                const isActive = activeTab === idx;
                return (
                  <button
                    key={idx}
                    onClick={() => setActiveTab(idx)}
                    className={`relative flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm cursor-pointer transition-all duration-300 ${
                      isActive
                        ? "bg-accent text-white shadow-xl shadow-accent/40"
                        : "bg-white border-2 border-line text-ink hover:border-accent/50 hover:shadow-lg hover:-translate-y-0.5"
                    }`}
                  >
                    <Icon size={18} />
                    <span>{item.title}</span>
                  </button>
                );
              })}
            </div>
          </Reveal>

          {/* Code display */}
          <Reveal direction="up" delay={0.3}>
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="glass-card border border-line rounded-2xl overflow-hidden shadow-xl"
            >
              {/* Code editor header */}
              <div className="bg-gradient-to-r from-ink to-ink-light px-6 py-4 flex items-center justify-between border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-400"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                    <div className="w-3 h-3 rounded-full bg-green-400"></div>
                  </div>
                  <span className="text-white/60 text-sm font-mono">
                    {techShowcase[activeTab].title.toLowerCase().replace(/\s+/g, "-")}.{activeTab === 3 ? "yml" : activeTab === 2 ? "js" : "tsx"}
                  </span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-green-600 shadow-lg">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                  <span className="text-xs text-white font-bold">Production Quality</span>
                </div>
              </div>

              {/* Code content */}
              <div className="bg-[#0D1117] p-6 overflow-x-auto">
                <pre className="text-sm text-white/90 font-mono leading-relaxed">
                  <code>{techShowcase[activeTab].code}</code>
                </pre>
              </div>

              {/* Highlight badge */}
              <div className="bg-accent/10 border-t border-accent/20 px-6 py-4">
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-8 h-8 rounded-lg bg-accent/20 text-accent flex items-center justify-center shrink-0">
                    ✓
                  </div>
                  <div>
                    <div className="font-bold text-ink text-xs uppercase tracking-wider mb-1">
                      What Makes This Professional
                    </div>
                    <div className="text-muted font-medium">
                      {techShowcase[activeTab].highlight}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </Reveal>

          {/* Key principles */}
          <Reveal direction="up" delay={0.4}>
            <div className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                { label: "Type Safety", icon: "🔒" },
                { label: "Error Handling", icon: "🛡️" },
                { label: "Performance", icon: "⚡" },
                { label: "Maintainability", icon: "📚" },
              ].map((principle, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * idx }}
                  whileHover={{ y: -4, scale: 1.02 }}
                  className="glass-card border border-line rounded-xl p-5 text-center cursor-pointer group"
                >
                  <motion.div
                    whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                    transition={{ duration: 0.5 }}
                    className="text-3xl mb-3"
                  >
                    {principle.icon}
                  </motion.div>
                  <div className="font-bold text-ink text-sm group-hover:text-accent transition-colors">
                    {principle.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export default CodeShowcase;
