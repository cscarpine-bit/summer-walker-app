const { FigmaClient } = require('../src/lib/figma.ts');
const fs = require('fs');
const path = require('path');

// To use this script, you'll need to provide your Figma personal access token
// Get it from: https://www.figma.com/settings under "Personal access tokens"
const FIGMA_TOKEN = process.env.FIGMA_TOKEN || 'YOUR_FIGMA_TOKEN_HERE';

async function analyzeFigmaDesign() {
  try {
    console.log('🎨 Analyzing Summer Walker App Figma design...');
    
    const figma = new FigmaClient(FIGMA_TOKEN);
    
    // Fetch the file
    console.log('📥 Fetching Figma file...');
    const file = await figma.getFile();
    
    // Extract design tokens
    console.log('🔍 Extracting design tokens...');
    const tokens = figma.extractDesignTokens(file);
    
    // Generate Tailwind config
    console.log('⚙️ Generating Tailwind configuration...');
    const tailwindTokens = figma.generateTailwindConfig(tokens);
    
    // Save results
    const outputDir = path.join(__dirname, '../figma-analysis');
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    
    // Save design tokens
    fs.writeFileSync(
      path.join(outputDir, 'design-tokens.json'),
      JSON.stringify({
        colors: Object.fromEntries(tokens.colors),
        typography: Object.fromEntries(tokens.typography),
        components: Array.from(tokens.components.keys()),
      }, null, 2)
    );
    
    // Save Tailwind config extension
    fs.writeFileSync(
      path.join(outputDir, 'tailwind-extension.js'),
      `// Tailwind CSS configuration extension from Figma design
module.exports = {
  theme: {
    extend: {
      colors: ${JSON.stringify(tailwindTokens.colors, null, 6)},
      fontFamily: ${JSON.stringify(tailwindTokens.fontFamily, null, 6)},
      fontSize: ${JSON.stringify(tailwindTokens.fontSize, null, 6)},
    }
  }
};`
    );
    
    // Save component structure
    const componentStructure = analyzeComponentStructure(file.document);
    fs.writeFileSync(
      path.join(outputDir, 'component-structure.json'),
      JSON.stringify(componentStructure, null, 2)
    );
    
    console.log('✅ Analysis complete! Check the figma-analysis folder for results.');
    console.log('📊 Found:');
    console.log(`   - ${tokens.colors.size} colors`);
    console.log(`   - ${tokens.typography.size} typography styles`);
    console.log(`   - ${tokens.components.size} components`);
    
  } catch (error) {
    console.error('❌ Error analyzing Figma design:', error.message);
    if (error.response?.status === 403) {
      console.log('🔑 Make sure to set your FIGMA_TOKEN environment variable');
      console.log('   Get your token from: https://www.figma.com/settings');
    }
  }
}

function analyzeComponentStructure(node, depth = 0) {
  const structure = {
    name: node.name,
    type: node.type,
    id: node.id,
    depth,
    children: []
  };
  
  if (node.children) {
    structure.children = node.children.map(child => 
      analyzeComponentStructure(child, depth + 1)
    );
  }
  
  return structure;
}

// Run the analysis
analyzeFigmaDesign();
