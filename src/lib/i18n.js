import { register, init, getLocaleFromNavigator } from 'svelte-i18n';

register('en', () => import('../locales/en.json'));
register('ar', () => import('../locales/ar.json'));

const initialLocale = typeof localStorage !== 'undefined' && localStorage.getItem('locale') || 'ar';

init({
  fallbackLocale: 'en',
  initialLocale: initialLocale,
});
