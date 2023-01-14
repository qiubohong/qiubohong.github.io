(function (window, document) {
    const root = document.documentElement;
    const dpr = window.devicePixelRatio;

    /**
     * 计算根元素节点fontSize
     */
    function setRootFontSize() {
        const rem = root.clientWidth / 10;
        root.style.fontSize = `${rem}px`;
    }
    setRootFontSize();

    // 监听页面尺寸变化
    window.addEventListener('resize', setRootFontSize);
    // 当一条会话历史记录被执行的时候将会触发页面显示 (pageshow) 事件
    window.addEventListener('pageshow', function (e) {
        // pageshow 事件类似于 load 事件，load 事件在页面第一次加载时触发， pageshow 事件在每次加载页面时触发，即 load 事件在页面从浏览器缓存中读取时不触发。
        // 一般情况下，移动端浏览器会将当前已访问页面存入缓存中，缓存中保存着页面数据，DOM和js的状态，前进和后退操作时直接从浏览器缓存中读取页面内容，而不进行页面刷新，所以监听前进和后退操作时可用pageshow事件。
        // 触发时间：load先触发，pageshow后触发。
        if (e.persisted) {
            setRootFontSize();
        }
    })
})(window, document);