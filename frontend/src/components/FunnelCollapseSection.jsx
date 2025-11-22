import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  MessageCircle, Search, Globe, Eye, Scale, ShoppingCart,
  BrainCircuit, Check, Megaphone, Zap, ArrowDown 
} from 'lucide-react';

// Individual funnel step node component
const FunnelStepNode = ({ step, index, total, isAI, isCollapsed, tooltip }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  
  // Calculate position on circle (clock positions) - start at top and go clockwise
  const angle = (index / total) * 2 * Math.PI - Math.PI / 2;
  const radius = isAI ? 120 : 130;
  const x = Math.cos(angle) * radius;
  const y = Math.sin(angle) * radius;
  
  // Determine opacity for traditional funnel in collapsed state
  const getOpacity = () => {
    if (!isCollapsed || isAI) return 1;
    // Dim the middle steps (Search, Read, Compare) in traditional funnel
    if (index === 1 || index === 3 || index === 4) return 0.3;
    return 0.6;
  };
  
  const getScale = () => {
    if (!isCollapsed || isAI) return 1;
    if (index === 1 || index === 3 || index === 4) return 0.8;
    return 1;
  };

  const centerOffset = 150; // Half of container size (300px / 2)
  
  return (
    <motion.div
      className="absolute"
      style={{
        left: `${centerOffset + x}px`,
        top: `${centerOffset + y}px`,
        transform: 'translate(-50%, -50%)',
      }}
      animate={{
        opacity: getOpacity(),
        scale: getScale(),
      }}
      transition={{ duration: 0.6, ease: 'easeInOut' }}
      onHoverStart={() => setShowTooltip(true)}
      onHoverEnd={() => setShowTooltip(false)}
      onFocus={() => setShowTooltip(true)}
      onBlur={() => setShowTooltip(false)}
      tabIndex={0}
      role="button"
      aria-label={`${isAI ? 'AI' : 'Traditional'} step: ${step.label}`}
    >
      <motion.div
        className={`relative ${
          isAI
            ? 'w-20 h-20 bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-500 rounded-full shadow-lg'
            : 'w-16 h-16 bg-slate-700 rounded-full shadow-md'
        } flex items-center justify-center cursor-pointer`}
        whileHover={{ scale: 1.15, rotate: 5 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: 'spring', stiffness: 300 }}
      >
        <step.icon className={`${isAI ? 'w-9 h-9 text-white' : 'w-7 h-7 text-slate-300'}`} />
        
        {/* Glow effect for AI nodes */}
        {isAI && (
          <motion.div
            className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-400 to-cyan-400 opacity-50 blur-xl"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
        )}
      </motion.div>
      
      {/* Label */}
      <div className={`absolute top-full mt-2 left-1/2 -translate-x-1/2 whitespace-nowrap text-center ${
        isAI ? 'text-white font-bold' : 'text-slate-400'
      }`}>
        <div className="text-xs font-mono">{step.label}</div>
      </div>
      
      {/* Tooltip */}
      <AnimatePresence>
        {showTooltip && tooltip && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute bottom-full mb-4 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-xs px-3 py-2 rounded-lg shadow-xl whitespace-nowrap z-50"
          >
            {tooltip}
            <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-slate-900" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// Circular connection arcs
const FunnelArcs = ({ steps, isAI, isCollapsed }) => {
  const radius = isAI ? 120 : 130;
  const total = steps.length;
  const centerX = 150;
  const centerY = 150;
  
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 300 300" style={{ overflow: 'visible' }}>
      <defs>
        {isAI && (
          <linearGradient id="aiGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#a855f7" />
            <stop offset="50%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#06b6d4" />
          </linearGradient>
        )}
      </defs>
      
      {steps.map((_, index) => {
        const nextIndex = (index + 1) % total;
        const angle1 = (index / total) * 2 * Math.PI - Math.PI / 2;
        const angle2 = (nextIndex / total) * 2 * Math.PI - Math.PI / 2;
        
        const x1 = Math.cos(angle1) * radius + centerX;
        const y1 = Math.sin(angle1) * radius + centerY;
        const x2 = Math.cos(angle2) * radius + centerX;
        const y2 = Math.sin(angle2) * radius + centerY;
        
        // Calculate arc control point
        const midAngle = (angle1 + angle2) / 2;
        const arcRadius = radius * 1.1;
        const cx = Math.cos(midAngle) * arcRadius + centerX;
        const cy = Math.sin(midAngle) * arcRadius + centerY;
        
        const opacity = isCollapsed && !isAI ? 0.3 : isAI ? 0.8 : 0.5;
        
        return (
          <motion.path
            key={`arc-${index}`}
            d={`M ${x1} ${y1} Q ${cx} ${cy} ${x2} ${y2}`}
            fill="none"
            stroke={isAI ? 'url(#aiGradient)' : '#64748b'}
            strokeWidth={isAI ? 3 : 2}
            opacity={opacity}
            strokeLinecap="round"
            animate={{
              opacity: opacity,
              strokeWidth: isAI && !isCollapsed ? [3, 4, 3] : isAI ? 3 : 2,
            }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
        );
      })}
      
      {/* Outer ring */}
      <motion.circle
        cx={centerX}
        cy={centerY}
        r={radius}
        fill="none"
        stroke={isAI ? 'url(#aiGradient)' : '#475569'}
        strokeWidth={isAI ? 2 : 3}
        opacity={isAI ? 0.6 : 0.3}
        animate={{
          rotate: isAI ? (isCollapsed ? 15 : 360) : 0,
          scale: isAI && isCollapsed ? 1.1 : 1,
        }}
        transition={{
          rotate: { duration: isAI ? 20 : 0, repeat: Infinity, ease: 'linear' },
          scale: { duration: 0.6, ease: 'easeInOut' },
        }}
        style={{ transformOrigin: `${centerX}px ${centerY}px` }}
      />
    </svg>
  );
};

// Main Funnel Circle Component
const FunnelCircle = ({ isAI, isCollapsed }) => {
  const traditionalSteps = [
    { label: 'Awareness', icon: Megaphone, tooltip: 'Brand awareness through ads and content' },
    { label: 'Search', icon: Search, tooltip: 'Users search for solutions on Google' },
    { label: 'Visit', icon: Globe, tooltip: 'Visit multiple websites to research' },
    { label: 'Read', icon: Eye, tooltip: 'Read reviews, blogs, and comparisons' },
    { label: 'Compare', icon: Scale, tooltip: 'Compare features and pricing manually' },
    { label: 'Buy', icon: ShoppingCart, tooltip: 'Finally make a purchase decision' },
  ];
  
  const aiSteps = [
    { label: 'Prompt', icon: MessageCircle, tooltip: 'User asks AI a single question' },
    { label: 'AI Processes', icon: BrainCircuit, tooltip: 'AI analyzes and recommends instantly' },
    { label: 'Purchase', icon: Check, tooltip: 'Direct action taken immediately' },
  ];
  
  const steps = isAI ? aiSteps : traditionalSteps;
  
  return (
    <motion.div
      className="relative w-[300px] h-[300px]"
      animate={{
        x: isCollapsed && !isAI ? 20 : 0,
        rotate: isCollapsed && !isAI ? -5 : 0,
      }}
      transition={{ duration: 0.8, ease: 'easeInOut' }}
    >
      {/* Background glow for AI funnel */}
      {isAI && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-purple-500/20 via-blue-500/20 to-cyan-500/20 rounded-full blur-3xl"
          animate={{
            scale: isCollapsed ? [1, 1.2, 1] : [1, 1.1, 1],
            opacity: isCollapsed ? [0.5, 0.7, 0.5] : [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        />
      )}
      
      {/* Arcs and ring */}
      <FunnelArcs steps={steps} isAI={isAI} isCollapsed={isCollapsed} />
      
      {/* Nodes */}
      {steps.map((step, index) => (
        <FunnelStepNode
          key={index}
          step={step}
          index={index}
          total={steps.length}
          isAI={isAI}
          isCollapsed={isCollapsed}
          tooltip={step.tooltip}
        />
      ))}
      
      {/* Center icon */}
      <motion.div
        className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 ${
          isAI ? 'w-16 h-16' : 'w-12 h-12'
        } flex items-center justify-center`}
        animate={{
          rotate: isAI ? (isCollapsed ? [0, 360] : 0) : 0,
          scale: isAI && isCollapsed ? 1.2 : 1,
        }}
        transition={{
          rotate: { duration: 2, ease: 'easeInOut' },
          scale: { duration: 0.6, ease: 'easeInOut' },
        }}
      >
        {isAI ? (
          <motion.div
            animate={{ scale: isCollapsed ? [1, 1.1, 1] : 1 }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            <Zap className="w-12 h-12 text-cyan-400" />
          </motion.div>
        ) : (
          <div className="w-8 h-8 border-2 border-slate-600 rounded-full" />
        )}
      </motion.div>
    </motion.div>
  );
};

// Status Badge Component
const StatusBadge = ({ isAI, isCollapsed }) => {
  return (
    <motion.div
      className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${
        isAI
          ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white'
          : 'bg-slate-700 text-slate-300'
      } font-mono text-sm font-bold shadow-lg`}
      animate={{
        scale: isAI && isCollapsed ? [1, 1.05, 1] : 1,
        opacity: !isAI && isCollapsed ? 0.5 : 1,
      }}
      transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
    >
      <span className="text-lg">{isAI ? '✅' : '🛑'}</span>
      <span>{isAI ? 'Fast, Direct, Now' : 'Obsolete & Fading'}</span>
    </motion.div>
  );
};

// Main Funnel Collapse Section
export default function FunnelCollapseSection() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  
  return (
    <div 
      className="py-16 mb-12 border-b border-slate-200"
      aria-label="AI funnel comparison"
    >
      <div className="max-w-6xl mx-auto md:px-16">
        {/* Heading */}
        <h2 className="font-open-sans font-thin text-3xl md:text-5xl md:leading-[1.3] text-slate-950 mb-8 text-center">
          Discovery, Decision & Action Now Begin Inside AI.
        </h2>
        <p className="font-open-sans text-xl text-center text-slate-700 mb-12 max-w-3xl mx-auto">
          Consumers no longer start with Google. They begin by asking AI:
        </p>
        
        {/* AI Query Examples */}
        <div className="grid md:grid-cols-2 gap-4 mb-16 max-w-4xl mx-auto">
          {[
            "What's the best solution for my team?",
            "Which product is most reliable?",
            "Plan my trip - and book the best options.",
            "Find the top software for small businesses."
          ].map((query, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-300 rounded-2xl p-5 shadow-sm"
            >
              <div className="flex items-start gap-3">
                <MessageCircle className="w-6 h-6 text-blue-700 flex-shrink-0 mt-1" />
                <p className="font-open-sans text-base text-slate-950 italic">"{query}"</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Main Funnel Visualization */}
        <div className="my-16 p-8 md:p-12 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-2xl shadow-2xl relative overflow-hidden">
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
              backgroundSize: '40px 40px'
            }} />
          </div>
          
          <div className="relative z-10">
            <h3 className="font-space-mono font-bold text-2xl md:text-3xl text-center text-white mb-4">
              The Funnel Collapses
            </h3>
            <p className="text-center text-slate-300 mb-12 text-lg">
              <span className="text-red-400 font-bold">6 Steps</span> → <span className="text-cyan-400 font-bold">3 Steps</span>
            </p>
            
            {/* Dual Funnels */}
            <div className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-24 mb-12">
              {/* Traditional Funnel */}
              <div className="flex flex-col items-center">
                <StatusBadge isAI={false} isCollapsed={isCollapsed} />
                <div className="mt-6 mb-4">
                  <h4 className="font-space-mono font-bold text-lg text-slate-300 uppercase text-center">
                    Traditional Web Funnel
                  </h4>
                </div>
                <FunnelCircle isAI={false} isCollapsed={isCollapsed} />
              </div>
              
              {/* AI Funnel */}
              <div className="flex flex-col items-center">
                <StatusBadge isAI={true} isCollapsed={isCollapsed} />
                <div className="mt-6 mb-4">
                  <h4 className="font-space-mono font-bold text-lg text-white uppercase text-center">
                    AI-Powered Funnel
                  </h4>
                </div>
                <FunnelCircle isAI={true} isCollapsed={isCollapsed} />
              </div>
            </div>
            
            {/* Collapse CTA */}
            <div className="text-center">
              <motion.button
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="group relative px-8 py-4 bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-500 text-white font-bold text-lg rounded-full shadow-xl overflow-hidden"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label={isCollapsed ? "Expand funnel view" : "Collapse funnel to show AI transformation"}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600"
                  initial={{ x: '100%' }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
                <span className="relative z-10 flex items-center gap-2">
                  <Zap className="w-5 h-5" />
                  {isCollapsed ? 'Reset View' : 'See the Future'}
                </span>
              </motion.button>
              <p className="text-slate-400 text-sm mt-4 italic">
                {isCollapsed ? 'Click to reset the comparison' : 'Click to see how AI collapses the traditional funnel'}
              </p>
            </div>
          </div>
        </div>

        {/* What Disappears */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-slate-50 border-2 border-slate-300 p-6 md:p-8 rounded-lg mb-12"
        >
          <h4 className="font-space-mono font-bold text-xl text-slate-950 mb-6 text-center">
            What Disappears in the AI Era:
          </h4>
          <div className="grid md:grid-cols-4 gap-4 text-center">
            {['Pageviews', 'Landing Pages', 'Scroll Depth', 'Retargeting'].map((item, i) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white border border-slate-300 rounded-lg p-4"
              >
                <div className="text-slate-950 text-3xl mb-2">✕</div>
                <p className="font-open-sans font-semibold text-slate-950">{item}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
