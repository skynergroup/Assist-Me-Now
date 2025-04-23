import { NextRequest, NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';

// Mock hamper data for local development
let hampers = [
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
];

// GET all hampers
export async function GET(request: NextRequest) {
  try {
    return NextResponse.json(hampers, { status: 200 });
  } catch (error) {
    console.error('Error fetching hampers:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST a new hamper
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate input
    if (!body.name || !body.contents || !Array.isArray(body.contents)) {
      return NextResponse.json(
        { error: 'Name and contents array are required' },
        { status: 400 }
      );
    }

    // Create a new hamper
    const newHamper = {
      id: uuidv4(),
      name: body.name,
      description: body.description || '',
      contents: body.contents,
      createdBy: '1', // In a real app, this would be the authenticated user's ID
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // Add to the hampers array
    hampers.push(newHamper);

    return NextResponse.json(newHamper, { status: 201 });
  } catch (error) {
    console.error('Error creating hamper:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
