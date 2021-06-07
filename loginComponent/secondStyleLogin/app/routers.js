// 
import LoadableWrap from '@/components/loadableWrap';


import home from '@/containers/newHome/router';
import user from '@/containers/user';
import detail from '@/containers/detail/router';
import notFound from '@/containers/notFound/router';

export default [
    ...(home(LoadableWrap)),
    ...(user(LoadableWrap)),
    ...(detail(LoadableWrap)),
    ...(notFound(LoadableWrap))
];