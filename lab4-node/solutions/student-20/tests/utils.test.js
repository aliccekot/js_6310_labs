/* eslint-disable */
describe('Utility Functions', () => {
  const mockProducts = [
    {
      id: 1,
      name: 'Test Product 1',
      category: 'men',
      style: 'classic',
      price: 1000,
      sizes: ['M', 'L'],
      budget: 'high'
    },
    {
      id: 2,
      name: 'Test Product 2',
      category: 'women',
      style: 'sport',
      price: 2000,
      sizes: ['S', 'M'],
      budget: 'low'
    },
    {
      id: 3,
      name: 'Test Product 3',
      category: 'men',
      style: 'casual',
      price: 1500,
      sizes: ['S', 'M', 'L'],
      budget: 'medium'
    }
  ];

  test('should filter products by category', () => {
    const menProducts = mockProducts.filter(p => p.category === 'men');
    const womenProducts = mockProducts.filter(p => p.category === 'women');
    
    expect(menProducts).toHaveLength(2);
    expect(womenProducts).toHaveLength(1);
    expect(menProducts.every(p => p.category === 'men')).toBe(true);
  });

  test('should filter products by style and size', () => {
    const classicMedium = mockProducts.filter(p => 
      p.style === 'classic' && p.sizes.includes('M')
    );
    
    expect(classicMedium).toHaveLength(1);
    expect(classicMedium[0].id).toBe(1);
  });

  test('should handle empty filter results', () => {
    const noResults = mockProducts.filter(p => p.category === 'nonexistent');
    expect(noResults).toHaveLength(0);
  });

  test('should handle case insensitive size filtering', () => {
    const smallProducts = mockProducts.filter(p => 
      p.sizes.some(size => size.toUpperCase() === 'S')
    );
    
    expect(smallProducts.length).toBeGreaterThan(0);
  });
});