(function () {
    gsap.registerPlugin(ScrollTrigger);

    const __vdKv = '.vd-qled-kv';
    const __vdSmart = '.vd-qled-smart';
    const __vdQuality = '.vd-qled-quality';
    const __vdSound = '.vd-qled-sound';
    const __vdDesign = '.vd-qled-design';
    const __vdAcc = '.vd-qled-acc';
    const __vdOutro = '.vd-qled-outro';

    //vd common function
    const VD_COMMON = {
        ELEM: {
            __LOAD: false,
            __DELAY: 500,
            __TIMER: null,
            __EXCEPTION_TIMER: null,
            __LOAD_SCROLL_TOP: window.scrollY || window.pageYOffset,
            __LOAD_CHECK: false,
            __LAST_KNOWN_SCROLL_POSITION: 0,
            __TICKING: false,
            __WINDOW_WIDTH: window.innerWidth,
            __WINDOW_HEIGHT: window.innerHeight,
            __AFTER_RESIZE_TYPE: window.innerWidth > 767 ? 2 : 1,
            __BEFORE_RESIZE_TYPE: null,
            __FLOATING_NAV: document.querySelector('.floating-navigation')
        },
        SET: {
            VH: function () {
                document.documentElement.style.setProperty('--vh', `${window.innerHeight}px`);
            },
            ON_SCROLL: function (__scrollTop = window.scrollY || window.pageYOffset) {
                const __floatingNav = VD_COMMON.ELEM.__FLOATING_NAV;
                const __floatingNavHeight = __floatingNav.className.indexOf('--fixed') > 0 ? __floatingNav.offsetHeight : 0;

                if (__floatingNavHeight > 0) document.querySelector('.vd-qled-kv').classList.add('kv-sticky-top');
                if (__floatingNavHeight === 0) document.querySelector('.vd-qled-kv').classList.remove('kv-sticky-top');
            },
            IE_SCROLL: function (__scrollTop = window.scrollY || window.pageYOffset) {
                stickybits('.vd-sticky-in', {
                    stickyBitStickyOffset: VD_COMMON.ELEM.__FLOATING_NAV.offsetHeight
                });
            },
            LOW: function (__time) {
                console.log('low time : ', __time);
                if (__time > 8) {
                    document.getElementsByTagName('html')[0].classList.add('vd-low');
                    [].forEach.call(document.querySelectorAll('.vd-qled-kv video'), (__kvVideoEl) => {
                        __kvVideoEl.pause();
                    });
                }
            }
        },
        SCALE: {
            Y: function (__progress) {
                const __windowHeight = window.innerHeight;
                let __size = __windowHeight * __progress;
                let __calc = __windowHeight / __size;

                return __calc;
            }
        },
        VIDEO: {
            PLAY: function (__el, __target, __time) {
                if (document.getElementsByTagName('html')[0].className.indexOf('vd-low') > -1) return false;

                const __videoAllEl = __el.querySelectorAll(`${__target}`);
                [].forEach.call(__videoAllEl, (__video) => {
                    if (__video.paused) {
                        __video.currentTime = __time;
                        __video.play();

                        [].forEach.call(__el.querySelectorAll('.vd-btn-control'), (__videoBtn) => {
                            if (__video.getAttribute('id').indexOf(__videoBtn.getAttribute('data-role-video')) > -1) {
                                __videoBtn.classList.remove('vd-btn-play');
                                __videoBtn.classList.add('vd-btn-pause');
                                __videoBtn.children[0].innerText = 'Pause';
                            }
                        });
                    }
                });
                
            },
            PAUSE: function (__el, __target, __time) {
                if (document.getElementsByTagName('html')[0].className.indexOf('vd-low') > -1) return false;

                const __videoAllEl = __el.querySelectorAll(`${__target}`);
                [].forEach.call(__videoAllEl, (__video) => {
                    if (!__video.paused) {
                        __video.play().then(function () {
                            __video.currentTime = __time;
                            __video.pause();
                        });

                        [].forEach.call(__el.querySelectorAll('.vd-btn-control'), (__videoBtn) => {
                            if (__video.getAttribute('id').indexOf(__videoBtn.getAttribute('data-role-video')) > -1) {
                                __videoBtn.classList.remove('vd-btn-pause');
                                __videoBtn.classList.add('vd-btn-play');
                                __videoBtn.children[0].innerText = 'Play';
                            }
                        });
                    }
                });
                
            },
            EVENT: function () {
                const __vdVideoPlayBtn = document.querySelectorAll('.vd-btn-control');

                [].forEach.call(__vdVideoPlayBtn, (__btnEl) => {
                    __btnEl.addEventListener('click', function (e) {
                        const __mode = VD_COMMON.ELEM.__WINDOW_WIDTH > 767 ? 'pc' : 'mo';
                        const __el = e.target;
                        const __role = __el.getAttribute('data-role-video');
                        const __target = document.getElementById((`${__role}-${__mode}`));

                        if (__el.className.indexOf('vd-btn-pause') > -1) {
                            __el.classList.remove('vd-btn-pause');
                            __el.classList.add('vd-btn-play');
                            __el.children[0].innerText = 'Play';
                            __target.pause();
                        } else {
                            __el.classList.remove('vd-btn-play');
                            __el.classList.add('vd-btn-pause');
                            __el.children[0].innerText = 'Pause';
                            __target.play();
                        }
                    });
                });
            }
        },
        ROUND_TWO: function (__num) {
            return +(Math.round(__num + "e+2")  + "e-2");
        },
    };

    //vd smart function
    const VD_SMART = {
        ELEM: {
            __WRAP: document.querySelector('.vd-qled-smart'),
        },
        CIRCLE: function (__n, __e) {
            const __floatingNav = VD_COMMON.ELEM.__FLOATING_NAV;
            const __sceneTargetArray = ['.smart-circle01', '.smart-circle02', '.smart-circle03', '.smart-circle04'];
            const __thisHalf = __e.trigger.offsetWidth / 2;
            const __sizeType = window.innerWidth > 767 ? 'pc' : 'mobile';
            let __circleObj = {
                'pc': [
                    {
                        x: 0,
                        y: 0,
                        sequence: 2
                    },
                    {
                        x: 0,
                        y: 0,
                        sequence: 1
                    },
                    {
                        x: 0,
                        y: 0,
                        sequence: 3
                    },
                    {
                        x: 0,
                        y: 0,
                        sequence: 4
                    }
                ],
                'mobile': [
                    {
                        x: 0,
                        y: 0,
                        sequence: 3
                    },
                    {
                        x: 0,
                        y: 0,
                        sequence: 4
                    },
                    {
                        x: 0,
                        y: 0,
                        sequence: 1
                    },
                    {
                        x: 0,
                        y: 0,
                        sequence: 2
                    }
                ]
            };

            //circle 중간값 계산
            __sceneTargetArray.forEach((__el, __i) => {
                const __sceneTarget = document.querySelector(`${__el}`);
                const __sceneTargetWidth = __sceneTarget.offsetWidth;
                const __top = parseInt(window.getComputedStyle(__sceneTarget).getPropertyValue('top'));
                const __left = parseInt(window.getComputedStyle(__sceneTarget).getPropertyValue('left'));
                const __center = window.innerWidth > 767 ? (__thisHalf - __sceneTargetWidth) - __left : (__thisHalf - (__sceneTargetWidth / 2)) - __left;
                
                __circleObj[__sizeType][__i].x = __center;
                if (__sizeType === 'pc') __circleObj['pc'][__i].y = ((window.innerHeight - __floatingNav.offsetHeight) + __sceneTarget.offsetHeight) - __top;
                if (__sizeType === 'mobile') __circleObj['mobile'][__i].y = (window.innerHeight - __floatingNav.offsetHeight) - __sceneTarget.offsetHeight - __top;
            });
            
            return __circleObj[__sizeType][__n];
        },
        ACCESSIBILITY: function () {
            const __endStory = VD_SMART.ELEM.__WRAP.querySelector('.vd-qled-smart-story-end');
            const __endStoryBtn = __endStory.querySelector('.vd-btn-link a');

            __endStoryBtn.addEventListener('focusin', function (e) {
                const __vdQualityWrap = document.querySelector('.vd-qled-quality');
                window.scrollTo(0, __vdQualityWrap.offsetTop - VD_COMMON.ELEM.__WINDOW_HEIGHT);
            });
        }
    };

    //vd quality function
    const VD_QUALITY = {
        ELEM: {
            __WRAP: document.querySelector('.vd-qled-quality'),
            __AFTER: document.querySelector('.vd-qled-quality .vd-qled-quality-story02 .vd-quality-chip-after'),
            __FRAME_CLIP: null,
            __FRAME_CLIP_ARRAY: [],
            __DIRECTION: 1
        },
        VIDEO: {
            PLAY: function (__el, __currentTime) {
                const __vdQualityWrap = document.querySelector(__vdQuality);
                VD_COMMON.VIDEO.PLAY(__vdQualityWrap, __el, __currentTime);
            },
            PAUSE: function (__el, __currentTime) {
                const __vdQualityWrap = document.querySelector(__vdQuality);
                VD_COMMON.VIDEO.PAUSE(__vdQualityWrap, __el, __currentTime);
            },
            DIR: function (__el, __currentTime) {
                VD_QUALITY.ELEM.__DIRECTION === 1 ?
                VD_QUALITY.VIDEO.PAUSE(__el, __currentTime) :
                VD_QUALITY.VIDEO.PLAY(__el, __currentTime);
            }
        },
        CLIP: function (__progress) {
            const __vdQualityFrameImgSize = [VD_QUALITY.ELEM.__AFTER.offsetWidth, VD_QUALITY.ELEM.__AFTER.offsetHeight];
            const __vdQualitySizeArray = [];

            if (VD_QUALITY.ELEM.__FRAME_CLIP === null) {
                VD_QUALITY.ELEM.__FRAME_CLIP = window.getComputedStyle(VD_QUALITY.ELEM.__AFTER).getPropertyValue('clip').match(/\(.*\)/gi)
                VD_QUALITY.ELEM.__FRAME_CLIP_ARRAY = VD_QUALITY.ELEM.__FRAME_CLIP[0].split(',');
                VD_QUALITY.ELEM.__FRAME_CLIP_ARRAY.forEach((__value, __i) => {
                    VD_QUALITY.ELEM.__FRAME_CLIP_ARRAY[__i] = Number(__value.replace(/[^0-9]/g, ''));
                });
            }

            //clip 계산
            __vdQualitySizeArray[0] = VD_QUALITY.ELEM.__FRAME_CLIP_ARRAY[0] - (VD_QUALITY.ELEM.__FRAME_CLIP_ARRAY[0] * __progress);
            __vdQualitySizeArray[1] = VD_QUALITY.ELEM.__FRAME_CLIP_ARRAY[1] + ((__vdQualityFrameImgSize[0] -VD_QUALITY.ELEM.__FRAME_CLIP_ARRAY[1]) * __progress);
            __vdQualitySizeArray[2] = VD_QUALITY.ELEM.__FRAME_CLIP_ARRAY[2] + ((__vdQualityFrameImgSize[1] -VD_QUALITY.ELEM.__FRAME_CLIP_ARRAY[2]) * __progress);
            __vdQualitySizeArray[3] = VD_QUALITY.ELEM.__FRAME_CLIP_ARRAY[3] - (VD_QUALITY.ELEM.__FRAME_CLIP_ARRAY[3] * __progress);
            
            return `rect(${__vdQualitySizeArray[0]}px, ${__vdQualitySizeArray[1]}px, ${__vdQualitySizeArray[2]}px, ${__vdQualitySizeArray[3]}px)`;
        },
        IMG_CHANGE: {
            ELEM: {
                __IMG_BOX: document.querySelectorAll(`${__vdQuality} .vd-quality-img [class*="vd-quality-img0"]`)
            },
            RESET: function () {
                const __imgBox = VD_QUALITY.IMG_CHANGE.ELEM.__IMG_BOX;
                [].forEach.call(__imgBox, (__el) => {
                    let __imgElAll = __el.querySelectorAll('img');
                    [].forEach.call(__imgElAll, (__imgEl, __i) => {
                        __imgEl.removeAttribute('style');
                    });
                });
            },
            MOTION: function () {
                const __imgBox = VD_QUALITY.IMG_CHANGE.ELEM.__IMG_BOX;
                [].forEach.call(__imgBox, (__el) => {
                    let __imgElAll = __el.querySelectorAll('img');
                    [].forEach.call(__imgElAll, (__imgEl, __i) => {
                        if (__i !== 0) {
                            __imgEl.style.zIndex = __i + 1;
                            __imgEl.style.transform = 'scale(1)';
                            __imgEl.style.transitionDelay = `${__i * 0.15}s`;
                        }
                    });
                });
            }
        }
    };

    //vd design function
    const VD_DESIGN = {
        ELEM: {
            __WRAP: document.querySelector('.vd-qled-design'),
            __STORY_WRAP: document.querySelector('.vd-qled-design .vd-qled-design-story01'),
            __SCROLL_WRAP: document.querySelector('.vd-qled-design .vd-design-scroll-wrap'),
            __OUTER: document.querySelector('.vd-qled-design .vd-design-scroll-outer'),
            __INNER: document.querySelector('.vd-qled-design .vd-design-scroll-inner'),
            __DESIGN_SCREEN: document.querySelector('.vd-qled-design .vd-design-screen'),
            __BEFORE: document.querySelector('.vd-qled-design .vd-cont-screen .vd-design-before'),
            __AFTER: document.querySelector('.vd-qled-design .vd-cont-screen .vd-design-after'),
            __ITEM_LIST: document.querySelector('.vd-qled-design .vd-design-item-list'),
            __DIRECTION: 1,
            __FRAME_CLIP: null,
            __FRAME_CLIP_ARRAY: [],
            __BEFORE_TOP: 0,
            __RATING_ARRAY: []
        },
        SET: function() {
            if (window.innerWidth <= 767) {
                VD_DESIGN.ELEM.__INNER.removeAttribute('style');
                return;
            }
            const __vdDesignItem01 = VD_DESIGN.ELEM.__INNER.querySelector('.vd-design-item01 .item-inner');
            const __left = (VD_DESIGN.ELEM.__OUTER.offsetWidth / 2) - (__vdDesignItem01.offsetWidth / 2);

            VD_DESIGN.ELEM.__INNER.style.marginLeft = `${__left}px`;
        },
        CALC: {
            INNER_X: function (__this, __type) {
                const __vdDesignItemAllEl = VD_DESIGN.ELEM.__ITEM_LIST.querySelectorAll('[class*="vd-design-item0"]');
                let __vdDesignInnerWidth = VD_COMMON.ELEM.__WINDOW_WIDTH > 767 ? VD_DESIGN.ELEM.__INNER.offsetWidth / 2 : VD_COMMON.ELEM.__WINDOW_WIDTH / 2;
                let __vdDesignInnerMarginLeft = VD_DESIGN.ELEM.__ITEM_LIST.currentStyle || window.getComputedStyle(VD_DESIGN.ELEM.__ITEM_LIST);
                let __vdDesignXstyle = null;
                let __vdDesignX = 0;
                let __index = 0;

                //rating reset
                VD_DESIGN.ELEM.__RATING_ARRAY = [];

                if (__this !== 'set') {
                    __vdDesignXstyle = VD_DESIGN.ELEM.__ITEM_LIST.getAttribute('style').match(/\(.*\)/gi)[0].split(',');
                    __vdDesignXstyle.forEach((__value, __i) => {
                        if (__i === 0) __vdDesignX = Number(__value.replace(/[^0-9^.]/g, ''));
                    });
                }
                
                [].forEach.call(__vdDesignItemAllEl, (__el, __i) => {
                    let __elLeft = __el.offsetLeft;
                    let __elImgSize = __el.querySelector('img').offsetWidth / 2;
                    
                    VD_DESIGN.ELEM.__RATING_ARRAY.push(
                        __i === 0 ? 0 : (__elLeft - __vdDesignInnerWidth) + __elImgSize
                    )

                    if (__type === 'leave') __el.querySelector('.item-inner').classList.add('vd-scale');
                    if (__type === 'leaveBack') __el.querySelector('.item-inner').classList.remove('vd-scale');
                });
                
                __vdDesignInnerMarginLeft = parseInt(__vdDesignInnerMarginLeft.getPropertyValue('margin-left'));
                
                VD_DESIGN.ELEM.__RATING_ARRAY.forEach((__rating, __i) => {
                    if (__rating - 100 <= __vdDesignX && __rating + 100 >= __vdDesignX) {
                        __index = __i;
                    }
                });

                if (__type === 'update') {
                    if (VD_DESIGN.ELEM.__DIRECTION === 1) __vdDesignItemAllEl[__index].querySelector('.item-inner').classList.add('vd-scale');
                    if (VD_DESIGN.ELEM.__DIRECTION === -1) __vdDesignItemAllEl[__index].querySelector('.item-inner').classList.remove('vd-scale');
                }

                if (__type === 'enter') {
                    VD_DESIGN.ELEM.__RATING_ARRAY.forEach((__rating, __i) => {
                        if (__rating <= -(__vdDesignX)) {
                            __vdDesignItemAllEl[__i].querySelector('.item-inner').classList.add('vd-scale');
                        } else {
                            __vdDesignItemAllEl[__i].querySelector('.item-inner').classList.remove('vd-scale');
                        }
                    });
                }
            },
            X: function () {
                const __vdDesignItemAllEl = VD_DESIGN.ELEM.__ITEM_LIST.querySelectorAll('[class*="vd-design-item0"]');
                let __vdDesignItemWidth = 0;
                let __vdDesignBottom = 0;
                let __vdDesignX = 0;

                if (VD_COMMON.ELEM.__WINDOW_WIDTH > 767) {
                    [].forEach.call(__vdDesignItemAllEl, (__el, __i) => {
                        let __elStyle = __el.currentStyle || window.getComputedStyle(__el);
                        __vdDesignItemWidth += __i === 0 ? __el.offsetWidth + parseFloat(__elStyle.marginRight) : __el.offsetWidth + parseFloat(__elStyle.marginRight) + parseFloat(__elStyle.marginLeft);
                        if (__vdDesignItemAllEl.length -1 === __i) __vdDesignBottom = __vdDesignItemWidth - (__el.offsetWidth - 13);
                    });
    
                    __vdDesignX = -(((__vdDesignBottom * 1) * 1e3) / 1e3);
                } else {
                    VD_DESIGN.CALC.INNER_X('set');
                    __vdDesignX = -(VD_DESIGN.ELEM.__RATING_ARRAY[VD_DESIGN.ELEM.__RATING_ARRAY.length - 1]);
                    // console.log('VD_DESIGN.ELEM.__RATING_ARRAY : ', VD_DESIGN.ELEM.__RATING_ARRAY);
                    // console.log('__vdDesignX : ', __vdDesignX);
                }
                
                return __vdDesignX;
            },
        },
        VIDEO: function () {
            VD_DESIGN.ELEM.__DIRECTION === -1 ?
            VD_COMMON.VIDEO.PLAY(document.querySelector(__vdDesign), `${__vdDesign} .vd-video-box .vd-video-cont`, 0) : 
            VD_COMMON.VIDEO.PAUSE(document.querySelector(__vdDesign), `${__vdDesign} .vd-video-box .vd-video-cont`, 0)
        }
    };
    
    //vd acc function
    const VD_ACC = {
        ELEM: {
            __FRONT_LARGE: document.querySelector(`${__vdAcc} .vd-qled-acc-start .vd-remote-box .large-img`),
            __FRONT_AFTER: document.querySelector(`${__vdAcc} .vd-qled-acc-start .vd-remote-box .original-img`),
            __STORY01_REMOTE: document.querySelector(`${__vdAcc} .vd-qled-acc-story01 .vd-remote-box`),
            __ACC_SCROLL_WRAP: document.querySelector(`${__vdAcc} .vd-acc-scroll`),
            __ACC_SCROLL_ITEM_LIST: document.querySelector(`${__vdAcc} .vd-acc-scroll .vd-acc-item-list`)
        },
        REMOTE: {
            LARGE_IMG_SIZE:() => {
                return VD_ACC.ELEM.__FRONT_LARGE.offsetWidth;
            },
            SIZE:() => {
                const __size = VD_COMMON.ELEM.__WINDOW_WIDTH > 767 ? VD_ACC.ELEM.__FRONT_AFTER.naturalWidth : 105;

                return __size;
            },
            START_TOP:(__n) => {
                const __screenHeight = (VD_COMMON.ELEM.__WINDOW_HEIGHT - VD_COMMON.ELEM.__FLOATING_NAV.offsetHeight) / 2;
                const __remoteHeight = VD_ACC.ELEM.__FRONT_AFTER.naturalHeight / 2;
                const __resultTop = VD_COMMON.ELEM.__WINDOW_WIDTH > 767 ? VD_COMMON.ROUND_TWO(__screenHeight - __remoteHeight) + __n : VD_ACC.ELEM.__STORY01_REMOTE.getBoundingClientRect().top - VD_COMMON.ELEM.__FLOATING_NAV.offsetHeight;

                return __resultTop;
            },
            STORY01_BOTTOM:() => {
                const __bottom = parseInt(window.getComputedStyle(VD_ACC.ELEM.__STORY01_REMOTE).getPropertyValue('bottom'));
                const __n = VD_COMMON.ELEM.__WINDOW_WIDTH > 767 ? 75 : 25;

                return __bottom + __n;
            },
            LEAVE:() => {
                if (document.querySelector(`${__vdAcc} .vd-qled-acc-story01`).className.indexOf('vd-action') === -1) {
                    document.querySelector(`${__vdAcc} .vd-qled-acc-start .vd-remote-box`).classList.remove('vd-hide');
                    document.querySelector(`${__vdAcc} .vd-qled-acc-story01`).removeAttribute('style');
                    document.querySelector(`${__vdAcc} .vd-qled-acc-story01`).classList.remove('vd-hide');
                    document.querySelector(`${__vdAcc} .vd-qled-acc-story01 .vd-remote-box`).classList.remove('vd-show');
                }
            },
            SCREEN_CHANGE:() => {
                document.querySelector(`${__vdAcc} .vd-qled-acc-story01`).style.zIndex = 5;
                document.querySelector(`${__vdAcc} .vd-qled-acc-story02`).removeAttribute('style');
            }
        },
        INNER_X:() => {
            const __itemAll = VD_ACC.ELEM.__ACC_SCROLL_ITEM_LIST.querySelectorAll('[class*="vd-acc-item0"]');
            let __x = 0;

            [].forEach.call(__itemAll, (__el, __i) => {
                if (__i === __itemAll.length - 1) __x = __el.offsetLeft;
            })

            return -(__x);
        }
    };
    
    const VD_SCROLL_TRIGGER = {
        VD_KV_SCROLL: function () {
            if (!document.querySelector(__vdKv)) return;

            gsap.to(`${__vdKv} .vd-txt-box01`, {
                scrollTrigger: {
                    trigger: __vdKv,
                    //markers: true,
                    start: 'top top',
                    end: '800px center',
                    scrub: 0.5,
                    onLeaveBack:() => {
                        //???
                        setTimeout(() => {
                            document.querySelector('.vd-qled-smart-story04 .vd-qled-smart-story-end').style.visibility = 'inherit';
                            document.querySelector('.vd-qled-smart-story04 .vd-qled-smart-story-end .vd-txt-wrap').style.visibility = 'inherit';
                        }, 500);
                    }
                },
                y: -60,
                autoAlpha: 0
            });

            gsap.fromTo(`${__vdKv} .vd-txt-box02`,
                {
                    y: 60,
                    autoAlpha: 0
                },
                {
                    scrollTrigger: {
                        trigger: __vdKv,
                        //markers: true,
                        start: '100px top',
                        end: '1000px center',
                        scrub: 0.5,
                    },
                    y: 0,
                    autoAlpha: 1
                }
            );
        },
        VD_SMART_SCROLL: function () {
            if (!document.querySelector(__vdSmart)) return;

            //vd-qled-smart
            ScrollTrigger.create({
                trigger: `${__vdSmart} .vd-sticky-wrap`,
                start: 'top top',
                end: 'bottom bottom',
                onEnter:(__e) => {
                    
                    const __vdSmartTimeline = gsap.timeline({
                        scrollTrigger: {
                            trigger: __e.trigger,
                            //markers: true,
                            start: "top top", // when the top of the trigger hits the top of the viewport
                            end: "bottom 100%", // end after scrolling 500px beyond the start
                            scrub: 0.5,
                            invalidateOnRefresh: true,
                        }
                    });

                    __vdSmartTimeline.to(`${__vdSmart} .smart-circle0${VD_SMART.CIRCLE(0, __e).sequence}`, {
                        ease: Back.easeInOut.config(2.5),
                        x: VD_SMART.CIRCLE(VD_SMART.CIRCLE(0, __e).sequence - 1, __e).x,
                        y: VD_SMART.CIRCLE(0, __e).y,
                        duration: 1.2,
                        scale: 0,
                        autoAlpha: 0
                    }, '-=0.5').to(`${__vdSmart} .smart-circle0${VD_SMART.CIRCLE(1, __e).sequence}`, {
                        ease: Back.easeInOut.config(2.5),
                        x: VD_SMART.CIRCLE(VD_SMART.CIRCLE(1, __e).sequence - 1, __e).x,
                        y: VD_SMART.CIRCLE(VD_SMART.CIRCLE(1, __e).sequence - 1, __e).y,
                        duration: 1.2,
                        scale: 0,
                        autoAlpha: 0
                    }, '-=1').to(`${__vdSmart} .smart-circle0${VD_SMART.CIRCLE(2, __e).sequence}`, {
                        ease: Back.easeInOut.config(2.5),
                        x: VD_SMART.CIRCLE(VD_SMART.CIRCLE(2, __e).sequence - 1, __e).x,
                        y: VD_SMART.CIRCLE(VD_SMART.CIRCLE(2, __e).sequence - 1, __e).y,
                        duration: 1.2,
                        scale: 0,
                        autoAlpha: 0
                    }, '-=1.1').to(`${__vdSmart} .smart-circle0${VD_SMART.CIRCLE(3, __e).sequence}`, {
                        ease: Back.easeInOut.config(2.5),
                        x: VD_SMART.CIRCLE(VD_SMART.CIRCLE(3, __e).sequence - 1, __e).x,
                        y: VD_SMART.CIRCLE(VD_SMART.CIRCLE(3, __e).sequence - 1, __e).y,
                        duration: 1.2,
                        scale: 0,
                        autoAlpha: 0
                    }, '-=1').to([`${__vdSmart} .vd-qled-smart-monitor .vd-img-before .vd-img-inner`, `${__vdSmart} .vd-qled-smart-monitor .vd-img-after .vd-img-inner`], {
                        delay: 0.1,
                        y: 0,
                        scale: 1
                    }, '-=0.95').to(`${__vdSmart} .vd-qled-smart-monitor .vd-img-after`, {
                        autoAlpha: 1
                    }, '-=0.6').to(['.vd-qled-smart-story01', '.vd-qled-smart-story01 .story-inner'],{
                        onEnter: function() {
                            if (VD_COMMON.ELEM.__LOAD_SCROLL_TOP !== 0 && VD_COMMON.ELEM.__LOAD_CHECK) {
                                VD_COMMON.ELEM.__LOAD_CHECK = false;
                                window.scrollTo(0, window.pageYOffset - 2);
                            }
                        },
                        onLeave: function() {
                            this.vars.onUpdate(1);
                        },
                        // onLeaveBack: function () {
                        //     this.vars.onUpdate(0);
                        // },
                        onUpdate: function(__progress) {
                            const __story01Element = __e.trigger.querySelector('.vd-qled-smart-story01');
                            const __story01InnerElement = __story01Element.querySelector('.story-inner');
                            const __r = typeof this.progress !== 'undefined' ? this.progress() : __progress;

                            __story01Element.style.transform = `scaleY(${__r})`;
                            __story01InnerElement.style.transform = `scaleY(${VD_COMMON.SCALE.Y(__r)})`;
                        }
                    }).to('.vd-qled-smart-story01 .vd-story-q', {
                        autoAlpha: 1
                    }).to('.vd-qled-smart-story01 .vd-story-a', {
                        autoAlpha: 1
                    }).to(['.vd-qled-smart-story02', '.vd-qled-smart-story02 .story-inner'],{
                        onEnter: function() {
                            if (VD_COMMON.ELEM.__LOAD_SCROLL_TOP !== 0 && VD_COMMON.ELEM.__LOAD_CHECK) {
                                VD_COMMON.ELEM.__LOAD_CHECK = false;
                                window.scrollTo(0, window.pageYOffset - 2);
                            }
                        },
                        onLeave: function() {
                            this.vars.onUpdate(1);
                        },
                        // onLeaveBack: function () {
                        //     this.vars.onUpdate(0);
                        // },
                        onUpdate: function(__progress) {
                            const __story02Element = __e.trigger.querySelector('.vd-qled-smart-story02');
                            const __story02InnerElement = __story02Element.querySelector('.story-inner');
                            const __r = typeof this.progress !== 'undefined' ? this.progress() : __progress;

                            __story02Element.style.transform = `scaleY(${__r})`;
                            __story02InnerElement.style.transform = `scaleY(${VD_COMMON.SCALE.Y(__r)})`;
                        }
                    }).to('.vd-qled-smart-story02 .vd-story-q', {
                        autoAlpha: 1
                    }).to('.vd-qled-smart-story02 .vd-story-a', {
                        autoAlpha: 1
                    }).to(['.vd-qled-smart-story03', '.vd-qled-smart-story03 .story-inner'],{
                        onEnter: function() {
                            if (VD_COMMON.ELEM.__LOAD_SCROLL_TOP !== 0 && VD_COMMON.ELEM.__LOAD_CHECK) {
                                VD_COMMON.ELEM.__LOAD_CHECK = false;
                                window.scrollTo(0, window.pageYOffset - 2);
                            }
                        },
                        onLeave: function() {
                            this.vars.onUpdate(1);
                        },
                        // onLeaveBack: function () {
                        //     this.vars.onUpdate(0);
                        // },
                        onUpdate: function(__progress) {
                            const __story03Element = __e.trigger.querySelector('.vd-qled-smart-story03');
                            const __story03InnerElement = __story03Element.querySelector('.story-inner');
                            const __r = typeof this.progress !== 'undefined' ? this.progress() : __progress;

                            __story03Element.style.transform = `scaleY(${__r})`;
                            __story03InnerElement.style.transform = `scaleY(${VD_COMMON.SCALE.Y(__r)})`;
                        }
                    }).to('.vd-qled-smart-story03 .vd-story-q', {
                        autoAlpha: 1
                    }).to('.vd-qled-smart-story03 .vd-story-a', {
                        autoAlpha: 1
                    }).to(['.vd-qled-smart-story04', '.vd-qled-smart-story04 .story-inner'],{
                        onEnter: function() {
                            if (VD_COMMON.ELEM.__LOAD_SCROLL_TOP !== 0 && VD_COMMON.ELEM.__LOAD_CHECK) {
                                VD_COMMON.ELEM.__LOAD_CHECK = false;
                                window.scrollTo(0, window.pageYOffset - 2);
                            }
                        },
                        onLeave: function() {
                            this.vars.onUpdate(1);
                        },
                        // onLeaveBack: function () {
                        //     this.vars.onUpdate(0);
                        // },
                        onUpdate: function(__progress) {
                            const __story04Element = __e.trigger.querySelector('.vd-qled-smart-story04');
                            const __story04InnerElement = __story04Element.querySelector('.story-inner');
                            const __r = typeof this.progress !== 'undefined' ? this.progress() : __progress;

                            __story04Element.style.transform = `scaleY(${__r})`;
                            __story04InnerElement.style.transform = `scaleY(${VD_COMMON.SCALE.Y(__r)})`;
                        }
                    }).to('.vd-qled-smart-story04 .vd-story-q', {
                        autoAlpha: 1
                    }).to('.vd-qled-smart-story04 .vd-story-a', {
                        autoAlpha: 1
                    }).to('.vd-qled-smart-story04 .vd-qled-smart-story-end', {
                        autoAlpha: 1
                    }).fromTo('.vd-qled-smart-story04 .vd-qled-smart-story-end .vd-txt-wrap',
                        {
                            y: 60,
                            autoAlpha: 0
                        },
                        {
                            y: 0,
                            autoAlpha: 1
                        }
                    );

                    gsap.to('.vd-qled-smart-story04 .story-inner > .vd-txt-wrap', {
                        scrollTrigger: {
                            trigger: __e.trigger,
                            //markers: true,
                            start: '78% top',
                            end: 'bottom bottom',
                            scrub: 0.5,
                            // invalidateOnRefresh: true
                        },
                        autoAlpha: 0
                    });
                },
                onLeave:() => console.log('end')
            });
        },
        VD_QUALITY_SCROLL: function () {
            if (!document.querySelector(__vdQuality)) return;

            let __vdQualityline = gsap.timeline({
                scrollTrigger: {
                    trigger: __vdQuality,
                    //markers: true,
                    start: "top top", // when the top of the trigger hits the top of the viewport
                    end: "bottom 225%", // end after scrolling 500px beyond the start
                    scrub: 0.5,
                    invalidateOnRefresh: true,
                    onUpdate:(__this) => {
                        VD_QUALITY.ELEM.__DIRECTION = __this.direction;
                    },
                    onLeaveBack:() => {
                        VD_QUALITY.VIDEO.PAUSE(`${__vdQuality} .vd-qled-quality-start .vd-video-box .vd-video-cont`, 0);
                    }
                }
            });
        
            __vdQualityline.to(`${__vdQuality} .vd-qled-quality-start .vd-video-box .vd-video-cont`, {
                onStart:() => {
                    VD_QUALITY.VIDEO.PLAY(`${__vdQuality} .vd-qled-quality-start .vd-video-box .vd-video-cont`, 0);
                    //document.querySelector(`${__vdQuality} .vd-txt-wrap.vd-header`).style.opacity = 1;
                }
            }).fromTo(`${__vdQuality} .vd-txt-wrap.vd-header`,
                {
                    autoAlpha: 0
                },
                {
                    autoAlpha: 1
                }
            ).call(
                VD_QUALITY.VIDEO.DIR, [`${__vdQuality} .vd-qled-quality-start .vd-video-box .vd-video-cont`, 0]
            ).to([`${__vdQuality} .vd-qled-quality-start .vd-video-box .vd-video-cont`, `${__vdQuality} .vd-qled-quality-start .vd-video-btn`], {
                autoAlpha: 0
            }).to(`${__vdQuality} .vd-qled-quality-story01`, {
                duration: 2,
                scale: 0
            }).to(`${__vdQuality} .vd-qled-quality-story01`, {
                autoAlpha: 0
            }, '-=0.5').to(`${__vdQuality} .vd-txt-wrap.vd-header`, {
                autoAlpha: 0
            }, '-=2').to(`${__vdQuality} .vd-qled-quality-story01`, {
                autoAlpha: 0
            }).to(`${__vdQuality} .vd-qled-quality-story02 .vd-quality-chip .vd-quality-chip-after`, {
                duration: 2,
                autoAlpha: 1,
                'clip': VD_QUALITY.CLIP(1)
            }).call(
                VD_QUALITY.IMG_CHANGE.RESET
            ).to(`${__vdQuality} .vd-qled-quality-story02 .vd-quality-img01`, {
                autoAlpha: 1
            }, '-=0.1').to(`${__vdQuality} .vd-qled-quality-story02 .vd-quality-img04`, {
                autoAlpha: 1
            }, '-=0.25').to(`${__vdQuality} .vd-qled-quality-story02 .vd-quality-img03`, {
                autoAlpha: 1
            }, '-=0.25').to(`${__vdQuality} .vd-qled-quality-story02 .vd-quality-img02`, {
                autoAlpha: 1
            }, '-=0.25').to(`${__vdQuality} .vd-qled-quality-story02 .vd-quality-img05`, {
                autoAlpha: 1
            }, '-=0.25').to(`${__vdQuality} .vd-qled-quality-story02 .vd-quality-img06`, {
                autoAlpha: 1
            }, '-=0.25').call(
                VD_QUALITY.IMG_CHANGE.MOTION
            ).to(`${__vdQuality} .vd-qled-quality-story03 .vd-video-cont`, {
                onStart:() => {
                    document.querySelector(`${__vdQuality} .vd-qled-quality-story03`).style.zIndex = 4;
                    VD_QUALITY.VIDEO.PAUSE(`${__vdQuality} .vd-qled-quality-story03 .vd-video-cont`, 0);
                },
                onComplete:() => {
                    VD_QUALITY.VIDEO.PLAY(`${__vdQuality} .vd-qled-quality-story03 .vd-video-cont`, 0);
                },
                onUpdate:() => {
                    const __vdBox = document.querySelectorAll('.vd-qled-quality-story03 .vd-video-box');
                    [].forEach.call(__vdBox, (__videoBoxEl) => {
                        if (!__videoBoxEl.children[0].paused) {
                            VD_QUALITY.VIDEO.PAUSE(`${__vdQuality} .vd-qled-quality-story03 .vd-video-cont`, 0);
                        }
                    });
                },
                duration:2,
                scale: 1
            }, '+=1.5').fromTo(`${__vdQuality} .vd-qled-quality-story03 .vd-video-btn`,
                {
                    autoAlpha: 0
                },
                {
                    autoAlpha: 1
                }
            );

            ScrollTrigger.matchMedia({
                "(min-width: 768px)": function() {
                    gsap.to(`${__vdQuality} .vd-qled-quality-end .vd-desc span`, {
                        scrollTrigger: {
                            trigger: __vdQuality,
                            //markers: true,
                            start: '75% top',
                            end: '95% center',
                            scrub: 0.5,
                            onEnter:(__this) => VD_COMMON.VIDEO.PAUSE(__this.trigger, `${__vdQuality} .vd-qled-quality-story03 .vd-video-cont`, 0),
                            onLeaveBack:(__this) => VD_COMMON.VIDEO.PLAY(__this.trigger, `${__vdQuality} .vd-qled-quality-story03 .vd-video-cont`, 0)
                        },
                        autoAlpha: 1
                    });
                },
                "(max-width: 767px)": function() {
                    gsap.to(`${__vdQuality} .vd-qled-quality-end .vd-desc span`, {
                        scrollTrigger: {
                            trigger: __vdQuality,
                            //markers: true,
                            start: '80% top',
                            end: 'bottom bottom',
                            scrub: 0.5,
                            onEnter:(__this) => VD_COMMON.VIDEO.PAUSE(__this.trigger, `${__vdQuality} .vd-qled-quality-story03 .vd-video-cont`, 0),
                            onLeaveBack:(__this) => VD_COMMON.VIDEO.PLAY(__this.trigger, `${__vdQuality} .vd-qled-quality-story03 .vd-video-cont`, 0)
                        },
                        autoAlpha: 1
                    });
                }
            });
        },
        VD_SOUND_SCROLL: function () {
            if (!document.querySelector(__vdSound)) return;

            gsap.to(`${__vdSound} .vd-qled-sound-video01`, {
                scrollTrigger: {
                    trigger: __vdSound,
                    //markers: true,
                    start: 'top top',
                    end: 'center center',
                    scrub: 0.5,
                    onEnter:(__this) => {
                        VD_COMMON.VIDEO.PLAY(__this.trigger, `${__vdSound} .vd-qled-sound-video01 .vd-video-box .vd-video-cont`, 0)
                        VD_COMMON.VIDEO.PAUSE(__this.trigger, `${__vdSound} .vd-qled-sound-video02 .vd-video-box .vd-video-cont`, 0);
                    },
                    onEnterBack:(__this) => VD_COMMON.VIDEO.PLAY(__this.trigger, `${__vdSound} .vd-qled-sound-video01 .vd-video-box .vd-video-cont`, 0),
                    onLeave:(__this) => VD_COMMON.VIDEO.PAUSE(__this.trigger, `${__vdSound} .vd-qled-sound-video01 .vd-video-box .vd-video-cont`, 0),
                    onLeaveBack:(__this) => VD_COMMON.VIDEO.PAUSE(__this.trigger, `${__vdSound} .vd-qled-sound-video01 .vd-video-box .vd-video-cont`, 0)
                }
            });
    
            gsap.to([`${__vdSound} .vd-qled-sound-video01`, `${__vdSound} .vd-qled-sound-video01 .vd-video-btn`], {
                scrollTrigger: {
                    trigger: __vdSound,
                    //markers: true,
                    start: 'top -50%',
                    end: 'center center',
                    scrub: 0.5,
                    onEnter:(__this) => {
                        VD_COMMON.VIDEO.PAUSE(__this.trigger, `${__vdSound} .vd-qled-sound-video01 .vd-video-box .vd-video-cont`, 0);
                    },
                    onLeave:(__this) => VD_COMMON.VIDEO.PLAY(__this.trigger, `${__vdSound} .vd-qled-sound-video02 .vd-video-box .vd-video-cont`, 0)
                },
                autoAlpha: 0
            });
    
            gsap.to(`${__vdSound} .vd-qled-sound-end span`, {
                scrollTrigger: {
                    trigger: __vdSound,
                    //markers: true,
                    start: '60% top',
                    end: '85% center',
                    scrub: 0.5,
                    onEnter:(__this) => VD_COMMON.VIDEO.PAUSE(__this.trigger, `${__vdSound} .vd-qled-sound-video02 .vd-video-cont`, 0),
                    onLeaveBack:(__this) => VD_COMMON.VIDEO.PLAY(__this.trigger, `${__vdSound} .vd-qled-sound-video02 .vd-video-cont`, 0)
                },
                autoAlpha: 1
            });
        },
        VD_DESIGN_SCROLL: function () {
            if (!document.querySelector(__vdDesign)) return;

            const __vdDesignTimeline = gsap.timeline({
                scrollTrigger: {
                    id: 'qled-design',
                    trigger: __vdDesign,
                    //markers: true,
                    start: "top top", // when the top of the trigger hits the top of the viewport
                    end: "bottom 200%", // end after scrolling 500px beyond the start
                    scrub: 0.5,
                    invalidateOnRefresh: true,
                    onUpdate:(__this) => {
                        VD_DESIGN.ELEM.__DIRECTION = __this.direction;
                    },
                    onLeaveBack:() => {
                        VD_COMMON.VIDEO.PAUSE(document.querySelector(__vdDesign), `${__vdDesign} .vd-video-box .vd-video-cont`, 0);
                    }
                }
            });
            
            __vdDesignTimeline.to(`${__vdDesign} .vd-video-box .vd-video-cont`, {
                onStart:(__this) => {
                    VD_COMMON.VIDEO.PLAY(document.querySelector(__vdDesign), `${__vdDesign} .vd-video-box .vd-video-cont`, 0);
                },
                duration: 2,
                top: 0
            }).call(
                VD_DESIGN.VIDEO
            ).fromTo([`${__vdDesign} .vd-video-box .vd-video-cont`, `${__vdDesign} .vd-video-btn`],
                {
                    autoAlpha: 1
                },
                {
                    onStart:() => {
                        VD_COMMON.VIDEO.PAUSE(document.querySelector(__vdDesign), `${__vdDesign} .vd-video-box .vd-video-cont`, 0);
                    },
                    autoAlpha: 0
                }, '-=1'
            ).fromTo(`${__vdDesign} .vd-qled-design-story01 .vd-header`,
                {
                    y: 30,
                    autoAlpha: 0
                },
                {
                    y: 0,
                    autoAlpha: 1
                }
            ).fromTo([`${__vdDesign} .vd-qled-design-story01 .vd-header .vd-eyebrow`, `${__vdDesign} .vd-qled-design-story01 .vd-header .vd-tit`],
                {
                    y: 0,
                    autoAlpha: 1
                },    
                {
                    y: -30,
                    autoAlpha: 0
                }
            ).to(`${__vdDesign} .vd-qled-design-story01 .vd-design-item-list`, {
                onStart:(__this) => VD_DESIGN.CALC.INNER_X('set', 'enter'),
                onComplete:(__this) => VD_DESIGN.CALC.INNER_X('set', 'leave'),
                onUpdate:(__this) => VD_DESIGN.CALC.INNER_X(__this, 'update'),
                duration: 5,
                x: VD_DESIGN.CALC.X()
            });

            gsap.to(`${__vdDesign} .vd-qled-design-end .vd-desc span`, {
                scrollTrigger: {
                    trigger: `${__vdDesign}`,
                    //markers: true,
                    start: "80% top", // when the top of the trigger hits the top of the viewport
                    end: "95% center", // end after scrolling 500px beyond the start
                    scrub: 0.5,
                    invalidateOnRefresh: true,
                },
                autoAlpha: 1
            });
        },
        VD_ACC_SCROLL: {
            STORY: function () {
                gsap.to(`${__vdAcc} .vd-qled-acc-start .vd-txt-wrap.vd-header`, {
                    scrollTrigger: {
                        trigger: __vdAcc,
                        //markers: true,
                        start: 'top top',
                        end: '800px center',
                        scrub: 0.5,
                    },
                    color: 'white'
                });
    
                let __vdAccTimeline = gsap.timeline({
                    scrollTrigger: {
                        id: 'vd-acc-remote',
                        trigger: `${__vdAcc} .vd-remote`,
                        //markers: true,
                        start: "100px top", // when the top of the trigger hits the top of the viewport
                        end: "bottom 125%", // end after scrolling 500px beyond the start
                        scrub: 0.5,
                        invalidateOnRefresh: true,
                    }
                });
    
                __vdAccTimeline.to(`${__vdAcc} .vd-qled-acc-start .vd-remote-box`, {
                    duration: 2,
                    top: 0
                }).fromTo(`${__vdAcc} .vd-qled-acc-start .vd-remote-box .vd-remote-img`,
                    {
                        id: 'remote-box1',
                        width: VD_ACC.REMOTE.LARGE_IMG_SIZE(),
                        top: 0
                    },
                    {
                        id: 'remote-box2',
                        onUpdate:() => {
                            const __el = document.querySelector(`${__vdAcc} .vd-qled-acc-start .vd-remote-box .vd-remote-img`);
                            const __r = __vdAccTimeline.getById('remote-box2').ratio;
                            const __top = VD_COMMON.ELEM.__WINDOW_WIDTH > 767 ? VD_ACC.REMOTE.START_TOP(75) : VD_ACC.REMOTE.START_TOP(0);
    
                            __el.style.top = `${__top * __r}px`;
                        },
                        duration: 2,
                        width: VD_ACC.REMOTE.SIZE()
                    }, '-=2'
                ).to([`${__vdAcc} .vd-qled-acc-start .vd-remote-box .remote-back-box`, `${__vdAcc} .vd-qled-acc-start .vd-remote-box .remote-back-box img`], {
                    id: 'remote-change',
                    onStart:() => {
                        document.querySelector(`${__vdAcc} .vd-qled-acc-start .vd-remote-box .original-back-img`).style.zIndex = 5
                        document.querySelector(`${__vdAcc} .vd-qled-acc-start .vd-remote-box .original-back-img`).classList.remove('vd-hide');
                    },
                    // onEnterBack:() => {
                    //     document.querySelector(`${__vdAcc} .vd-qled-acc-start .vd-remote-box`).classList.add('vd-show');
                    //     document.querySelector(`${__vdAcc} .vd-qled-acc-story01 .vd-remote-box`).classList.remove('vd-hide');
                    //     document.querySelector(`${__vdAcc} .vd-qled-acc-start .vd-remote-box .original-back-img`).classList.remove('vd-hide');
                    // },
                    onComplete:function () {
                        document.querySelector(`${__vdAcc} .vd-qled-acc-start .vd-remote-box`).classList.remove('vd-show');
                        document.querySelector(`${__vdAcc} .vd-qled-acc-start .vd-remote-box`).classList.add('vd-hide');
                        document.querySelector(`${__vdAcc} .vd-qled-acc-story01`).style.zIndex = 5;
                        document.querySelector(`${__vdAcc} .vd-qled-acc-story01`).classList.add('vd-action');
                        // document.querySelector(`${__vdAcc} .vd-qled-acc-story01 .vd-remote-box`).classList.add('vd-show');
                        document.querySelector(`${__vdAcc} .vd-qled-acc-story01 .vd-remote-light`).classList.add('vd-hide');
                    },
                    onUpdate:function (__update) {
                        const __imgBoxHeight = document.querySelector(`${__vdAcc} .vd-qled-acc-start .vd-remote-box .remote-back-box`).offsetHeight;
                        let __r = __vdAccTimeline.getById('remote-change').ratio == 0 ? 0.001 :  __vdAccTimeline.getById('remote-change').ratio;
                        let __result = __imgBoxHeight * __r;
                        __result = __imgBoxHeight / __result;
    
                        document.querySelector(`${__vdAcc} .vd-qled-acc-start .vd-remote-box .remote-back-box img`).style.transform = `scaleY(${__result})`;
                    },
                    // onLeaveBack:() => {
                    //     document.querySelector(`${__vdAcc} .vd-qled-acc-start .vd-remote-box`).classList.remove('vd-show');
                    //     document.querySelector(`${__vdAcc} .vd-qled-acc-start .vd-remote-box .original-back-img`).classList.add('vd-hide');
                    // },
                    duration: 2,
                    scaleY:(__i, __el, __a, t) => {
                        if (__el.className.indexOf('remote-back-box') > -1) {
                            return 1 - __i;
                        }
                    }
                }).call(
                    VD_ACC.REMOTE.LEAVE
                ).set(`${__vdAcc} .vd-qled-acc-story01 .vd-remote-light`, {
                    x: 0,
                    xPercent: -50
                }).to(`${__vdAcc} .vd-qled-acc-story01 .vd-remote-light`, {
                    id: 'vd-qled-acc-light',
                    onStart:() => {
                        //document.querySelector(`${__vdAcc} .vd-qled-acc-story01`).style.zIndex = 5
                        document.querySelector(`${__vdAcc} .vd-qled-acc-story01`).classList.remove('vd-action');
                        document.querySelector(`${__vdAcc} .vd-qled-acc-story01 .vd-remote-light`).classList.remove('vd-hide');
                    },
                    // onUpdate:(__this) => {
                        // console.log('onUpdate light : ', __this);
                        // document.querySelector(`${__vdAcc} .vd-qled-acc-start .vd-remote-box`).classList.remove('vd-hide');
                        // document.querySelector(`${__vdAcc} .vd-qled-acc-story01`).removeAttribute('style');
                        // document.querySelector(`${__vdAcc} .vd-qled-acc-story01`).classList.remove('vd-hide');
                        // document.querySelector(`${__vdAcc} .vd-qled-acc-story01 .vd-remote-box`).classList.remove('vd-show');
                    // },
                    y: 0
                }).to(`${__vdAcc} .vd-qled-acc-story01 .vd-remote-light .vd-light-on`, {
                    autoAlpha: 1
                }).to(`${__vdAcc} .vd-qled-acc-story01 .vd-remote-effect .light-effect01`, {
                    duration: 1.2,
                    autoAlpha: 1
                }, '-=0.7').to(`${__vdAcc} .vd-qled-acc-story01 .vd-remote-effect .light-effect02`, {
                    duration: 1.2,
                    autoAlpha: 1
                }, '-=0.6').to(`${__vdAcc} .vd-qled-acc-story01 .vd-remote-effect .light-effect03`, {
                    duration: 1.2,
                    autoAlpha: 1
                }, '-=0.5').to(`${__vdAcc} .vd-remote-charge .vd-charge11`,{
                    autoAlpha: 1
                }, '-=0.6').to(`${__vdAcc} .vd-remote-charge .vd-charge10`, {
                    autoAlpha: 1
                }, '-=0.5').to(`${__vdAcc} .vd-remote-charge .vd-charge09`, {
                    autoAlpha: 1
                }, '-=0.4').to(`${__vdAcc} .vd-remote-charge .vd-charge08`, {
                    autoAlpha: 1
                }, '-=0.3').to(`${__vdAcc} .vd-remote-charge .vd-charge07`, {
                    autoAlpha: 0.5
                }, '-=0.2').to(`${__vdAcc} .vd-remote-charge .vd-charge06`, {
                    autoAlpha: 0.2
                }, '-=0.1').to(`${__vdAcc} .vd-qled-acc-story01 .vd-remote-effect`, {
                    autoAlpha: 0
                }).to(`${__vdAcc} .vd-qled-acc-story01 .vd-remote-light`, {
                    autoAlpha: 0,
                    top: -100
                }, '-=0.5').to(`${__vdAcc} .vd-qled-acc-story01 .vd-remote-box`, {
                    bottom: VD_ACC.REMOTE.STORY01_BOTTOM()
                }, '-=0.5').call(
                    VD_ACC.REMOTE.SCREEN_CHANGE
                ).to(`${__vdAcc} .vd-qled-acc-story02 .vd-charge-item01`, {
                    onStart:() => {
                        document.querySelector(`${__vdAcc} .vd-qled-acc-story01`).removeAttribute('style');
                        document.querySelector(`${__vdAcc} .vd-qled-acc-story02`).style.zIndex = 5;
                    },
                    duration: 1.5,
                    autoAlpha: 1,
                    y: 0
                }).to(`${__vdAcc} .vd-qled-acc-story02 .vd-charge-item04`, {
                    duration: 1.5,
                    autoAlpha: 1,
                    y: 0
                }).to(`${__vdAcc} .vd-qled-acc-story02 .vd-charge-item02`, {
                    duration: 1.5,
                    autoAlpha: 1,
                    y: 0
                }).to(`${__vdAcc} .vd-qled-acc-story02 .vd-charge-item05`, {
                    duration: 1.5,
                    autoAlpha: 1,
                    y: 0
                }).to(`${__vdAcc} .vd-qled-acc-story02 .vd-charge-item03`, {
                    duration: 1.5,
                    autoAlpha: 1,
                    y: 0
                }).fromTo(`${__vdAcc} .vd-qled-acc-story02 .vd-remote-charge .vd-charge07`,
                    {
                        autoAlpha: 0.5,
                    },
                    {
                        autoAlpha: 1,
                    }
                ).fromTo(`${__vdAcc} .vd-qled-acc-story02 .vd-remote-charge .vd-charge06`,
                    {
                        autoAlpha: 0.2,
                    },
                    {
                        autoAlpha: 1,
                    }
                ).to(`${__vdAcc} .vd-qled-acc-story02 .vd-remote-charge .vd-charge05`, {
                    autoAlpha: 1,
                }).to(`${__vdAcc} .vd-qled-acc-story02 .vd-remote-charge .vd-charge04`, {
                    autoAlpha: 1,
                }).to(`${__vdAcc} .vd-qled-acc-story02 .vd-remote-charge .vd-charge03`, {
                    autoAlpha: 1,
                }).to(`${__vdAcc} .vd-qled-acc-story02 .vd-remote-charge .vd-charge02`, {
                    autoAlpha: 1,
                }).to(`${__vdAcc} .vd-qled-acc-story02 .vd-remote-charge .vd-charge01`, {
                    autoAlpha: 1,
                });
            },
            END: function () {
                ScrollTrigger.matchMedia({
                    "(min-width: 768px)": function() {
                        const __vdAccEnd = document.querySelector(`${__vdAcc} .vd-acc-scroll .vd-qled-acc-end.vd-pc-none`);
                        __vdAccEnd.removeAttribute('style');

                        gsap.to(`${__vdAcc} .vd-qled-acc-end .vd-desc span`, {
                            scrollTrigger: {
                                trigger: `${__vdAcc} .vd-acc-scroll`,
                                //markers: true,
                                start: "top top", // when the top of the trigger hits the top of the viewport
                                end: "80% center", // end after scrolling 500px beyond the start
                                scrub: 0.5,
                                invalidateOnRefresh: true,
                            },
                            autoAlpha: 1
                        });
                    },
                    "(max-width: 767px)": function() {
                        const __vdAccEnd = document.querySelector(`${__vdAcc} .vd-acc-scroll .vd-qled-acc-end.vd-pc-none`);
                        const __vdAccItemList = document.querySelector(`${__vdAcc} .vd-acc-scroll .vd-acc-item-list`);
                        const __marginTop = ((VD_COMMON.ELEM.__WINDOW_HEIGHT - VD_COMMON.ELEM.__FLOATING_NAV.offsetHeight) - __vdAccItemList.offsetHeight) / 2;
                        __vdAccEnd.style.marginTop = `-${__marginTop}px`;
    
                        let __vdAccScrollTimeline = gsap.timeline({
                            scrollTrigger: {
                                id: 'vd-qled-acc-end',
                                trigger: `${__vdAcc} .vd-acc-scroll`,
                                //markers: true,
                                start: "100px top", // when the top of the trigger hits the top of the viewport
                                end: "bottom 150%", // end after scrolling 500px beyond the start
                                scrub: 0.5,
                                invalidateOnRefresh: true,
                            }
                        });
                
                        __vdAccScrollTimeline.to(`${__vdAcc} .vd-acc-scroll .vd-acc-item-list`, {
                            duration: 2,
                            x: VD_ACC.INNER_X()
                        });

                        gsap.to(`${__vdAcc} .vd-qled-acc-end .vd-desc span`, {
                            scrollTrigger: {
                                trigger: `${__vdAcc} .vd-acc-scroll`,
                                //markers: true,
                                start: "70% top", // when the top of the trigger hits the top of the viewport
                                end: "bottom bottom", // end after scrolling 500px beyond the start
                                scrub: 0.5,
                                invalidateOnRefresh: true,
                            },
                            autoAlpha: 1
                        });
                    },
                });
            },
            init: function () {
                if (!document.querySelector(__vdAcc)) return;

                this.STORY();
                this.END();
            }
        },
        VD_OUTRO_SCROLL: function () {
            if (!document.querySelector(__vdOutro)) return;

            gsap.to(`${__vdOutro} .vd-header-big span`, {
                scrollTrigger: {
                    trigger: __vdOutro,
                    //markers: true,
                    start: '-100% top',
                    end: '70% center',
                    scrub: 0.5,
                },
                x: 0
            });
        },
        init: function () {
            this.VD_KV_SCROLL();
            this.VD_SMART_SCROLL();
            this.VD_QUALITY_SCROLL();
            this.VD_SOUND_SCROLL();
            this.VD_DESIGN_SCROLL();
            this.VD_ACC_SCROLL.init();
            this.VD_OUTRO_SCROLL();
        }
    };

    const VD_SLIDE = {
        ELEM: {
            __SWIPER: null,
            __COMPARE_WRAP: document.querySelector('.vd-wrap .vd-compare-wrap'),
            __COMPARE_SWIPER: document.querySelector('.vd-wrap .vd-compare-product .compare-product-inner'),
            __COMPARE_ARROW_PREV: document.querySelector('.vd-wrap .vd-compare-product .vd-compare-button .vd-compare-button-prev'),
            __COMPARE_ARROW_NEXT: document.querySelector('.vd-wrap .vd-compare-product .vd-compare-button .vd-compare-button-next'),
            __COMPARE_SWIPER_OPTION: {
                pc: {
                    slidesPerView: 3,
                    watchSlidesVisibility: true,
                    navigation: {
                        nextEl: '.vd-compare-button-next.swiper-button-next',
                        prevEl: '.vd-compare-button-prev.swiper-button-prev',
                    },
                    a11y: {
                        enabled: true,
                        prevSlideMessage: 'Prev Slide',
                        nextSlideMessage: 'Next Slide'
                    },
                    on: {
                        init: function (__swiper) {
                            VD_SLIDE.ACCESSIBILITY.PC();
                        }
                    }
                },
                mobile: {
                    slidesPerView: 'auto',
					watchSlidesVisibility: true,
					freeMode: true,
                    mousewheel: true,
                }
            }
        },
        init: function () {
            this.RESET();
            this.SLIDE();
            this.EVENT();
        },
        RESET: function () {
            VD_SLIDE.ELEM.__COMPARE_WRAP.classList.remove('prev-item');
            VD_SLIDE.ELEM.__COMPARE_WRAP.classList.add('next-item');
        },
        SLIDE: function () {
            const __mode = VD_COMMON.ELEM.__WINDOW_WIDTH > 767 ? 'pc' : 'mobile';

            if (VD_SLIDE.ELEM.__SWIPER != null) VD_SLIDE.ELEM.__SWIPER.destroy();
            VD_SLIDE.ELEM.__SWIPER = null;
            
            if (VD_SLIDE.ELEM.__SWIPER === null) VD_SLIDE.ELEM.__SWIPER = new Swiper(VD_SLIDE.ELEM.__COMPARE_SWIPER, this.ELEM.__COMPARE_SWIPER_OPTION[__mode]);
        },
        EVENT: function () {
            const __mode = VD_COMMON.ELEM.__WINDOW_WIDTH > 767 ? 'pc' : 'mobile';

            VD_SLIDE.ELEM.__SWIPER.on('slideChange transitionEnd', function () {
                VD_SLIDE.ELEM.__COMPARE_ARROW_PREV.className.indexOf('disabled') > -1 ? VD_SLIDE.ELEM.__COMPARE_WRAP.classList.remove('prev-item') : VD_SLIDE.ELEM.__COMPARE_WRAP.classList.add('prev-item');
                VD_SLIDE.ELEM.__COMPARE_ARROW_NEXT.className.indexOf('disabled') > -1 ? VD_SLIDE.ELEM.__COMPARE_WRAP.classList.remove('next-item') : VD_SLIDE.ELEM.__COMPARE_WRAP.classList.add('next-item');

                if (__mode === 'pc') VD_SLIDE.ACCESSIBILITY.PC();
            });

            if (__mode === 'pc') VD_SLIDE.ACCESSIBILITY.KEYBOARD();
        },
        ACCESSIBILITY: {
            PC: function () {
                const __vdCompareSwiper = VD_SLIDE.ELEM.__COMPARE_SWIPER;
                const __vdCompareItem = __vdCompareSwiper.querySelectorAll('.compare-product-item');

                [].forEach.call(__vdCompareItem, (__itemEl) => {
                    if (__itemEl.className.indexOf('swiper-slide-visible') === -1) {
                        __itemEl.setAttribute('tabindex', -1);
                        __itemEl.setAttribute('aria-hidden', true);
                    } else {
                        __itemEl.removeAttribute('tabindex');
                        __itemEl.removeAttribute('aria-hidden');
                    }
                });
            },
            VISIBLE_ITEM: function () {
                const __vdCompareSwiper = VD_SLIDE.ELEM.__COMPARE_SWIPER;
                const __vdCompareItem = __vdCompareSwiper.querySelectorAll('.compare-product-item');
                let __visibleItemArray = [];

                [].forEach.call(__vdCompareItem, (__itemEl) => {
                    if (__itemEl.className.indexOf('swiper-slide-visible') > -1) __visibleItemArray.push(__itemEl);
                });
                
                return __visibleItemArray;
            },
            //key accessibility
            KEYBOARD: function () {
                const __vdCompareWrap = VD_SLIDE.ELEM.__COMPARE_WRAP;
                const __vdCompareSwiper = VD_SLIDE.ELEM.__COMPARE_SWIPER;
                const __vdCompareTooltip = __vdCompareWrap.querySelectorAll('.vd-compare-tooltip-btn');
                const __vdCompareItem = __vdCompareSwiper.querySelectorAll('.compare-product-item');
                const __prevBtn = __vdCompareWrap.querySelector('.vd-compare-button-prev');
                const __nextBtn = __vdCompareWrap.querySelector('.vd-compare-button-next');

                [].forEach.call(__vdCompareItem, (__itemEl) => {
                    __itemEl.addEventListener('keydown', function (e) {                       
                        const __keyCode = e.key.toLowerCase();
                        const __ePath = e.target.parentNode.parentNode;

                        if (e.shiftKey && __keyCode === 'tab') {
                            if (__ePath.previousElementSibling !== null) {
                                if (__ePath.previousElementSibling.className.indexOf('swiper-slide-visible') === -1 && __prevBtn.className.indexOf('disabled') === -1) {
                                    e.preventDefault();
                                    __prevBtn.focus();
                                }
                            }
                        } else if (__keyCode === 'tab') {
                            if (__ePath.nextElementSibling !== null) {
                                if (__ePath.nextElementSibling.className.indexOf('swiper-slide-visible') === -1 && __nextBtn.className.indexOf('disabled') === -1) {
                                    e.preventDefault();
                                    __nextBtn.focus();
                                }
                            }
                        }
                    });
                });

                //tooltip => prev focus
                [].forEach.call(__vdCompareTooltip, (__tooltipEl, __i) => {
                    if (__vdCompareTooltip.length - 1 === __i) {
                        __tooltipEl.addEventListener('keydown', function (e) {
                            const __keyCode = e.key.toLowerCase();

                            if (e.shiftKey && __keyCode === 'tab') {
                            } else if (__keyCode === 'tab' && __prevBtn.className.indexOf('disabled') === -1) {
                                e.preventDefault();
                                __prevBtn.focus();
                            }
                        });
                    }
                });

                //prev keyboard accessbility
                __prevBtn.addEventListener('keydown', function (e) {
                    const __keyCode = e.key.toLowerCase();
                    const __visibleItemFirst = VD_SLIDE.ACCESSIBILITY.VISIBLE_ITEM()[0];

                    if (e.shiftKey && __keyCode === 'tab') {
                        e.preventDefault();
                        [].forEach.call(__vdCompareTooltip, (__tooltipEl, __i) => {
                            if (__vdCompareTooltip.length - 1 === __i) {
                                __tooltipEl.focus();
                            }
                        });
                    } else if (__keyCode === 'tab') {
                        e.preventDefault();
                        __visibleItemFirst.querySelector('.compare-product-link').focus();
                    }
                });

                //next keyboard accessbility
                __nextBtn.addEventListener('keydown', function (e) {
                    const __keyCode = e.key.toLowerCase();
                    const __visibleItemLast = VD_SLIDE.ACCESSIBILITY.VISIBLE_ITEM()[VD_SLIDE.ACCESSIBILITY.VISIBLE_ITEM().length - 1];

                    if (e.shiftKey && __keyCode === 'tab') {
                        e.preventDefault();
                        __visibleItemLast.querySelector('.compare-product-link').focus();
                    }
                });
            }
        }
    };

    window.addEventListener('scroll', function (e) {
        VD_COMMON.ELEM.__LAST_KNOWN_SCROLL_POSITION = window.scrollY || window.pageYOffset;
        if (!VD_COMMON.ELEM.__TICKING) {
            window.requestAnimationFrame(function () {
                VD_COMMON.SET.ON_SCROLL(VD_COMMON.ELEM.__LAST_KNOWN_SCROLL_POSITION);
                VD_COMMON.ELEM.__TICKING = false;
            });

            VD_COMMON.ELEM.__TICKING = true;
        }
    });

    //resize event
    window.addEventListener("resize", function(e) {
        let __isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

        VD_COMMON.ELEM.__WINDOW_WIDTH = window.innerWidth;
        VD_COMMON.ELEM.__WINDOW_HEIGHT = window.innerHeight;
        VD_COMMON.ELEM.__BEFORE_RESIZE_TYPE = VD_COMMON.ELEM.__WINDOW_WIDTH > 767 ? 2 : 1;
        
        //set Vh
        VD_COMMON.SET.VH();

        //resize event refresh
        if (VD_COMMON.ELEM.__AFTER_RESIZE_TYPE !== VD_COMMON.ELEM.__BEFORE_RESIZE_TYPE) {
            VD_COMMON.ELEM.__AFTER_RESIZE_TYPE = VD_COMMON.ELEM.__BEFORE_RESIZE_TYPE;

            clearTimeout(VD_COMMON.ELEM.__TIMER);
            VD_COMMON.ELEM.__TIMER = setTimeout(() => {
                const __allTigger = ScrollTrigger.getAll();
                for (var i = 0; i < __allTigger.length; i++) {
                    __allTigger[i].kill();
                }
                VD_SCROLL_TRIGGER.init();
            }, VD_COMMON.ELEM.__DELAY);

            //compare slider
            VD_SLIDE.init();
        } else {
            if (!__isMobile && VD_COMMON.ELEM.__LOAD) {
                clearTimeout(VD_COMMON.ELEM.__EXCEPTION_TIMER);
                VD_COMMON.ELEM.__EXCEPTION_TIMER = setTimeout(() => {
                    VD_DESIGN.SET();
                    let __designScroll = ScrollTrigger.getById('qled-design');
                    let __accEnd = ScrollTrigger.getById('vd-qled-acc-end');
    
                    if (typeof __designScroll !== 'undefined') __designScroll.kill();
                    if (typeof __accEnd !== 'undefined') __accEnd.kill();
    
                    VD_SCROLL_TRIGGER.VD_DESIGN_SCROLL();
                    VD_SCROLL_TRIGGER.VD_ACC_SCROLL.END();
                }, VD_COMMON.ELEM.__DELAY);
            }
        }
        
    });

    //window load
    window.addEventListener('load', function () {
        //init 실행
        [].forEach.call(document.querySelectorAll('.vd-wrap'), (__vdEl) => {
            __vdEl.style.opacity = 1;
        });
        VD_COMMON.SET.LOW(((Date.now() - __date) / 1000) % 60);

        if (/MSIE \d|Trident.*rv:/.test(navigator.userAgent)) {
            document.getElementsByTagName('html')[0].classList.add('ie');
            if (window.confirm("본 페이지는 IE에 최적화되어 있지 않습니다. Edge로 이동하시겠습니까?")) {
                window.location = 'microsoft-edge:' + window.location;
            }

            VD_COMMON.SET.IE_SCROLL(VD_COMMON.ELEM.__LAST_KNOWN_SCROLL_POSITION);
            VD_SCROLL_TRIGGER.VD_KV_SCROLL();

            return false;
        }

        VD_COMMON.VIDEO.EVENT();
        VD_SCROLL_TRIGGER.init();
        VD_SMART.ACCESSIBILITY();
        VD_DESIGN.SET();
        VD_SLIDE.init();

        VD_COMMON.ELEM.__LOAD_CHECK = true; //timeline 전용
        VD_COMMON.ELEM.__LOAD = true; //resize event 전용
    });


})();