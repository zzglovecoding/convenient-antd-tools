import './style.css';
import React, { lazy, Suspense } from 'react';
import { Spin } from 'antd';
import ErrorBoundary from '@/components/errorBoundary';

const defaultDelay = 300;
const defaultTimeout = 1000 * 30;

/**
 * @typedef {Object} Params
 * @property {function} loader - 函数，返回的是import()函数动态加载的内容
 * @property {number} delay - 防止页面闪烁的最小加载延迟
 * @property {number} timeout - 页面加载最长时间，若超过此时间则报错。注意该时间需要大于delay
 * 
 * 由于react loadable更新迟缓且使用过时的componentwillmount，会引起浏览器警告，所以全部改用react源生API实现代码分割和懒加载
 *
 * @export
 * @param {Params} { loader, delay = defaultDelay, timeout = defaultTimeout } 参数等同于原始的react loadable传参
 * @returns
 */
export default function LoadableWrap({ loader, delay = defaultDelay, timeout = defaultTimeout }) {
    let clear = (...ids) => ids.forEach(i => clearTimeout(i));

    let WaitingComponent = lazy(() => {
        let timeoutId = null;
        let delayId = null;

        return Promise.race([
            new Promise((_resolve, reject) => {
                timeoutId = setTimeout(() => {
                    clear(timeoutId, delayId);
                    reject('timeout');
                }, timeout);
            }),
            new Promise(resolve => {
                delayId = setTimeout(() => {
                    clear(timeoutId, delayId);
                    resolve(loader);
                }, delay);
            })
        ]).then(loader => loader()).catch(err => {
            return Promise.reject(new Error(err));
        });
    });

    function WaitingComponentWrap(props) {
        return (
            <ErrorBoundary>
                <Suspense fallback={<Spin size="large" tip="页面加载中..." className="loadable-wrap-delay-spin" />}>
                    <WaitingComponent {...props} />
                </Suspense>
            </ErrorBoundary>
        );
    }

    return WaitingComponentWrap;