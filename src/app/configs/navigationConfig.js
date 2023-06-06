import i18next from 'i18next';
import ar from './navigation-i18n/ar';
import en from './navigation-i18n/en';
import tr from './navigation-i18n/tr';

i18next.addResourceBundle('en', 'navigation', en);
i18next.addResourceBundle('tr', 'navigation', tr);
i18next.addResourceBundle('ar', 'navigation', ar);

const navigationConfig = [
  {
    id: 'dashboard',
    title: 'Dashboard',
    translate: 'Dashboard',
    type: 'item',
    icon: 'heroicons-outline:star',
    url: '/dashboard',
  },
  {
    id: 'category',
    title: 'Category',
    translate: 'CATEGORY',
    type: 'item',
    icon: 'heroicons-outline:star',
    url: 'category',
  },
  {
    id: 'products',
    title: 'Products',
    translate: 'PRODUCTS',
    type: 'item',
    icon: 'heroicons-outline:star',
    url: 'products',
  },
];

export default navigationConfig;
