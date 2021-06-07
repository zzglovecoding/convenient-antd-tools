import lazyload from 'Components/lazyload/Lazyload';
const Mine = lazyload(() => import('Pages/mine/Mine.jsx'));
const Feedback = lazyload(() => import('Pages/feedback/Feedback.jsx'));
const SystemSetting = lazyload(() => import('Pages/systemSetting/SystemSetting.jsx'));

export default [
    {
        path: 'mine',
        component: Mine
    },
    {
        path: 'feedback',
        component: Feedback
    },
    {
        path: 'systemSetting',
        component: SystemSetting
    }
];