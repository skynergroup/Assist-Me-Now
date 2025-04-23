import { NextRequest, NextResponse } from 'next/server';

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

// GET a specific hamper by ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const hamper = hampers.find((h) => h.id === id);

    if (!hamper) {
      return NextResponse.json(
        { error: 'Hamper not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(hamper, { status: 200 });
  } catch (error) {
    console.error('Error fetching hamper:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// PUT (update) a specific hamper by ID
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const body = await request.json();
    
    // Find the hamper index
    const hamperIndex = hampers.findIndex((h) => h.id === id);

    if (hamperIndex === -1) {
      return NextResponse.json(
        { error: 'Hamper not found' },
        { status: 404 }
      );
    }

    // Update the hamper
    const updatedHamper = {
      ...hampers[hamperIndex],
      name: body.name || hampers[hamperIndex].name,
      description: body.description !== undefined ? body.description : hampers[hamperIndex].description,
      contents: body.contents || hampers[hamperIndex].contents,
      updatedAt: new Date().toISOString(),
    };

    hampers[hamperIndex] = updatedHamper;

    return NextResponse.json(updatedHamper, { status: 200 });
  } catch (error) {
    console.error('Error updating hamper:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// DELETE a specific hamper by ID
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    
    // Find the hamper index
    const hamperIndex = hampers.findIndex((h) => h.id === id);

    if (hamperIndex === -1) {
      return NextResponse.json(
        { error: 'Hamper not found' },
        { status: 404 }
      );
    }

    // Remove the hamper
    hampers.splice(hamperIndex, 1);

    return NextResponse.json(
      { message: 'Hamper deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting hamper:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
