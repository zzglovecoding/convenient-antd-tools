import React, { Suspense } from 'react';
import Loading from 'Components/loading/Loading';
import ErrorBoundary from 'Components/errorBoundary/ErrorBoundary';

export default function Lazyload(loader, options = {}) {
    let { 
        loading: Spin = Loading,
        error: Error = ErrorBoundary, 
        delay = 300, 
        timeout = 1000 * 30 
    } = options;
    
    let clear = (...ids) => ids.forEach(i => clearTimeout(i));

    let LazyComponent = React.lazy(() => {
        let timeoutId = null;
        let delayId = null;

        return Promise.race([
            // timeout是超时时间，如果到了还能进去执行，说明超时，就需要reject
            new Promise((_resolve, reject) => {
                timeoutId = setTimeout(() => {
                    clear(timeoutId, delayId);
                    reject('timeout');
                }, timeout);
            }),
            // 延迟一点时间去加载
            new Promise(resolve => {
                delayId = setTimeout(() => {
                    clear(timeoutId, delayId);
                    resolve(loader);
                }, delay);
            })
        ]).then(loader => loader()).catch(err => Promise.reject(new Error(err)));
    });

    return function WrappedComponent(props) {
        return (
            <Error>
                <Suspense fallback={<Spin />}>
                    <LazyComponent {...props} />
                </Suspense>
            </Error>
        );
    };
}
