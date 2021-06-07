import { createContext } from 'react';

const FrameContext = createContext({
    userInfo: null
});

FrameContext.displayName = 'userInfo';

export default FrameContext;