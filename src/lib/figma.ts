import axios from 'axios';

// Figma API configuration
const FIGMA_API_BASE = 'https://api.figma.com/v1';
const FIGMA_FILE_KEY = 'zAPFTVAhTAJS3Y37HpzjJX'; // Extracted from your URL

// Types for Figma API responses
interface FigmaNode {
  id: string;
  name: string;
  type: string;
  children?: FigmaNode[];
  fills?: any[];
  strokes?: any[];
  effects?: any[];
  constraints?: any;
  absoluteBoundingBox?: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  characters?: string;
  style?: {
    fontFamily?: string;
    fontSize?: number;
    fontWeight?: number;
    textAlignHorizontal?: string;
    textAlignVertical?: string;
  };
}

interface FigmaFile {
  document: FigmaNode;
  components: Record<string, any>;
  styles: Record<string, any>;
}

interface FigmaImage {
  images: Record<string, string>;
}

class FigmaClient {
  private token: string;

  constructor(token: string) {
    this.token = token;
  }

  private get headers() {
    return {
      'X-Figma-Token': this.token,
      'Content-Type': 'application/json',
    };
  }

  async getFile(): Promise<FigmaFile> {
    try {
      const response = await axios.get(
        `${FIGMA_API_BASE}/files/${FIGMA_FILE_KEY}`,
        { headers: this.headers }
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching Figma file:', error);
      throw error;
    }
  }

  async getImages(nodeIds: string[]): Promise<FigmaImage> {
    try {
      const response = await axios.get(
        `${FIGMA_API_BASE}/images/${FIGMA_FILE_KEY}`,
        {
          headers: this.headers,
          params: {
            ids: nodeIds.join(','),
            format: 'png',
            scale: 2,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching Figma images:', error);
      throw error;
    }
  }

  // Extract design tokens from the file
  extractDesignTokens(file: FigmaFile) {
    const tokens = {
      colors: new Map<string, string>(),
      typography: new Map<string, any>(),
      spacing: new Map<string, number>(),
      components: new Map<string, FigmaNode>(),
    };

    // Recursively traverse nodes to extract design tokens
    const traverseNode = (node: FigmaNode) => {
      // Extract colors from fills
      if (node.fills) {
        node.fills.forEach((fill, index) => {
          if (fill.type === 'SOLID' && fill.color) {
            const colorName = `${node.name}-fill-${index}`;
            const { r, g, b, a = 1 } = fill.color;
            const hex = this.rgbaToHex(r * 255, g * 255, b * 255, a);
            tokens.colors.set(colorName, hex);
          }
        });
      }

      // Extract typography
      if (node.type === 'TEXT' && node.style) {
        tokens.typography.set(node.name, {
          fontFamily: node.style.fontFamily,
          fontSize: node.style.fontSize,
          fontWeight: node.style.fontWeight,
          textAlign: node.style.textAlignHorizontal,
        });
      }

      // Extract components
      if (node.type === 'COMPONENT') {
        tokens.components.set(node.name, node);
      }

      // Continue traversing children
      if (node.children) {
        node.children.forEach(traverseNode);
      }
    };

    traverseNode(file.document);
    return tokens;
  }

  // Helper function to convert RGBA to hex
  private rgbaToHex(r: number, g: number, b: number, a: number): string {
    const toHex = (n: number) => Math.round(n).toString(16).padStart(2, '0');
    if (a === 1) {
      return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
    }
    return `#${toHex(r)}${toHex(g)}${toHex(b)}${toHex(a * 255)}`;
  }

  // Generate Tailwind CSS from design tokens
  generateTailwindConfig(tokens: ReturnType<typeof this.extractDesignTokens>) {
    const colors: Record<string, string> = {};
    const fontFamily: Record<string, string[]> = {};
    const fontSize: Record<string, [string, { lineHeight?: string }]> = {};

    // Convert colors
    tokens.colors.forEach((value, key) => {
      const cleanKey = key.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase();
      colors[cleanKey] = value;
    });

    // Convert typography
    tokens.typography.forEach((value, key) => {
      if (value.fontFamily) {
        const cleanKey = key.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase();
        fontFamily[cleanKey] = [value.fontFamily, 'sans-serif'];
      }
      if (value.fontSize) {
        const cleanKey = key.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase();
        fontSize[cleanKey] = [`${value.fontSize}px`, { lineHeight: '1.2' }];
      }
    });

    return {
      colors,
      fontFamily,
      fontSize,
    };
  }
}

export { FigmaClient };
export type { FigmaNode, FigmaFile };
