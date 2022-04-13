import { excludeRoutes } from '../../helpers/excludeRoutes';
import { routes as mockedRoutes } from '../test-data/excludeRoutes';

describe('[theme-helpers] excludeRoutes', () => {
  it('excludes paths at root level from large object', () => {
    const testData = mockedRoutes;
    const pathsToExclude = ['Test'];
    const expected = [];
    expect(excludeRoutes(testData, pathsToExclude)).toEqual(expected);
  });
  it('excludes nested routes', () => {
    const testData = [
      {
        name: 'Test',
        path: '/Test',
        component: '...',
        chunkName: '...',
        children: [
          {
            name: 'A',
            path: 'A',
            component: '...',
            chunkName: '...'
          },
          {
            name: 'C',
            path: 'C',
            component: '...',
            chunkName: '...'
          },
          {
            name: 'D',
            path: 'D',
            component: '...',
            chunkName: '...'
          }
        ]
      }
    ];
    const pathsToExclude = ['Test/C', 'Test/D'];
    const expected = [
      {
        name: 'Test',
        path: '/Test',
        component: '...',
        chunkName: '...',
        children: [
          {
            name: 'A',
            path: 'A',
            component: '...',
            chunkName: '...'
          }
        ]
      }
    ];
    expect(excludeRoutes(testData, pathsToExclude)).toEqual(expected);
  });
  it('excludes all nested routes and removes children attribute', () => {
    const testData = [
      {
        name: 'Test',
        path: '/Test',
        component: '...',
        chunkName: '...',
        children: [
          {
            name: 'A',
            path: 'A',
            component: '...',
            chunkName: '...'
          },
          {
            name: 'B',
            path: 'B',
            component: '...',
            chunkName: '...'
          },
          {
            name: 'C',
            path: 'C',
            component: '...',
            chunkName: '...'
          },
          {
            name: 'D',
            path: 'D',
            component: '...',
            chunkName: '...'
          }
        ]
      }
    ];
    const pathsToExclude = ['Test/A', 'Test/B', 'Test/C', 'Test/D'];
    const expected = [
      {
        name: 'Test',
        path: '/Test',
        component: '...',
        chunkName: '...'
      }
    ];
    expect(excludeRoutes(testData, pathsToExclude)).toEqual(expected);
  });
  it('excludes multiply-nested routes', () => {
    const testData = [
      {
        name: 'Test',
        path: '/Test',
        component: '...',
        chunkName: '...',
        children: [
          {
            name: 'A',
            path: 'A',
            component: '...',
            chunkName: '...',
            children: [
              {
                name: 'AA',
                path: 'AA',
                component: '...',
                chunkName: '...'
              },
              {
                name: 'AB',
                path: 'AB',
                component: '...',
                chunkName: '...'
              }
            ]
          },
          {
            name: 'C',
            path: 'C',
            component: '...',
            chunkName: '...'
          }
        ]
      }
    ];
    const pathsToExclude = ['Test/A/AA', 'Test/A/AB'];
    const expected = [
      {
        name: 'Test',
        path: '/Test',
        component: '...',
        chunkName: '...',
        children: [
          {
            name: 'A',
            path: 'A',
            component: '...',
            chunkName: '...'
          },
          {
            name: 'C',
            path: 'C',
            component: '...',
            chunkName: '...'
          }
        ]
      }
    ];
    expect(excludeRoutes(testData, pathsToExclude)).toEqual(expected);
  });
  it('returns the same routes object if root path does not exist', () => {
    const testData = mockedRoutes;
    const pathsToExclude = ['ThisPathDoesNotExist'];
    const expected = mockedRoutes;
    expect(excludeRoutes(testData, pathsToExclude)).toEqual(expected);
  });
  it('returns the same routes object if neither of paths exist', () => {
    const testData = mockedRoutes;
    const pathsToExclude = [
      'ThisPathDoesNotExist',
      'ThisPathDoesNotExist/ThisPathDoesNotExist2/ThisPathDoesNotExist3'
    ];
    const expected = mockedRoutes;
    expect(excludeRoutes(testData, pathsToExclude)).toEqual(expected);
  });
  it('returns the same routes object if all paths exist but the leaf with one nesting', () => {
    const testData = mockedRoutes;
    const pathsToExclude = ['Test/FormerPathsExistButThisOneNot'];
    const expected = mockedRoutes;
    expect(excludeRoutes(testData, pathsToExclude)).toEqual(expected);
  });
  it('returns the same routes object if all paths exist but the leaf with multiple nestings', () => {
    const testData = mockedRoutes;
    const pathsToExclude = ['Test/A/AA/FormerPathsExistButThisOneNot'];
    const expected = mockedRoutes;
    expect(excludeRoutes(testData, pathsToExclude)).toEqual(expected);
  });
});
