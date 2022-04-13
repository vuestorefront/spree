import { NuxtRouteConfig } from '@nuxt/types/config/router';

export const routes: NuxtRouteConfig[] = [
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
      },
      {
        name: 'D',
        path: 'D',
        component: '...',
        chunkName: '...'
      },
      {
        name: 'E',
        path: 'E',
        component: '...',
        chunkName: '...'
      }
    ]
  }
];
