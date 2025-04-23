import { NextRequest, NextResponse } from 'next/server';

// Mock hamper data for local development
const hampers = [
  {
    id: '1',
    name: 'Basic Food Hamper',
    description: 'Basic food supplies for a family of 4',
    contents: [
      { name: 'Rice', quantity: 2, category: 'Grains' },
      { name: 'Beans', quantity: 3, category: 'Protein' },
      { name: 'Canned Vegetables', quantity: 5, category: 'Vegetables' },
      { name: 'Cooking Oil', quantity: 1, category: 'Oils' },
    ],
    createdBy: '1',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'Hygiene Hamper',
    description: 'Basic hygiene supplies',
    contents: [
      { name: 'Soap', quantity: 3, category: 'Hygiene' },
      { name: 'Toothpaste', quantity: 2, category: 'Hygiene' },
      { name: 'Toothbrushes', quantity: 4, category: 'Hygiene' },
      { name: 'Shampoo', quantity: 1, category: 'Hygiene' },
    ],
    createdBy: '1',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '3',
    name: 'Baby Hamper',
    description: 'Supplies for infants',
    contents: [
      { name: 'Diapers', quantity: 20, category: 'Baby' },
      { name: 'Baby Wipes', quantity: 2, category: 'Baby' },
      { name: 'Baby Formula', quantity: 1, category: 'Baby' },
      { name: 'Baby Food', quantity: 5, category: 'Baby' },
    ],
    createdBy: '1',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '4',
    name: 'School Supplies Hamper',
    description: 'Basic school supplies for children',
    contents: [
      { name: 'Notebooks', quantity: 5, category: 'School' },
      { name: 'Pencils', quantity: 10, category: 'School' },
      { name: 'Pens', quantity: 5, category: 'School' },
      { name: 'Erasers', quantity: 2, category: 'School' },
      { name: 'Rulers', quantity: 1, category: 'School' },
    ],
    createdBy: '1',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '5',
    name: 'Winter Hamper',
    description: 'Supplies for cold weather',
    contents: [
      { name: 'Blankets', quantity: 2, category: 'Clothing' },
      { name: 'Socks', quantity: 5, category: 'Clothing' },
      { name: 'Gloves', quantity: 2, category: 'Clothing' },
      { name: 'Scarves', quantity: 2, category: 'Clothing' },
      { name: 'Hot Chocolate', quantity: 1, category: 'Food' },
    ],
    createdBy: '1',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

// GET hamper report
export async function GET(request: NextRequest) {
  try {
    // Count total hampers
    const totalHampers = hampers.length;

    // Group hampers by category
    const hampersByCategory: Record<string, number> = {};
    
    hampers.forEach(hamper => {
      // Extract categories from hamper contents
      const categories = new Set(hamper.contents.map(item => item.category));
      
      categories.forEach(category => {
        if (category) {
          hampersByCategory[category] = (hampersByCategory[category] || 0) + 1;
        }
      });
    });

    // Create the report
    const report = {
      totalHampers,
      hampersByCategory,
    };

    return NextResponse.json(report, { status: 200 });
  } catch (error) {
    console.error('Error generating hamper report:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
