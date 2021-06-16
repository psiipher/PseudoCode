import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    title: true,
    name: 'Components'
  },
  {
    name: 'Learn',
    url: '/learn',
    icon: 'icon-notebook',
    children: [
      {
        name: 'Data Structures',
        url: '/learn/data-structures',
        icon: 'icon-puzzle'
      },
      {
        name: 'Algorithms',
        url: '/learn/algorithms',
        icon: 'icon-graph'
      }
     
    ]
  },
  {
    name: 'MOOC',
    url: '/mooc',
    icon: 'icon-screen-desktop',
    children: [
      {
        name: 'Udemy',
        url: '/mooc/udemy',
        icon: 'icon-book-open'
      },
      {
        name: 'Coursera',
        url: '/mooc/coursera',
        icon: 'icon-book-open'
      },
      {
        name: 'Verify Certificate',
        url: '/mooc/verify-cert',
        icon: 'icon-badge'
      },    
    ]
  },
  {
    name: 'Code',
    url: '/code',
    icon: 'cil-code',
    children: [
      {
        name: 'Codeforces',
        url: '/code/codeforces',
        icon: 'icon-energy'
      }, 
      {
        name: 'JS-Editor',
        url: '/code/js-editor',
        icon: 'icon-note'
      }, 
    ]
  }
];
