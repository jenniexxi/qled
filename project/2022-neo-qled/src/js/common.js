console.log('vd - load');
//customEvent polyfill
(function () {
    if ( typeof window.CustomEvent === "function" ) return false;

    function CustomEvent ( event, params ) {
        params = params || { bubbles: false, cancelable: false, detail: undefined };
        var evt = document.createEvent( 'CustomEvent' );
        evt.initCustomEvent( event, params.bubbles, params.cancelable, params.detail );
        return evt;
    }

    CustomEvent.prototype = window.Event.prototype;
    window.CustomEvent = CustomEvent;
})();

//throttle resize event
(function() {
    var throttle = function(type, name, obj) {
        obj = obj || window;
        var running = false;
        var func = function() {
            if (running) { return; }
            running = true;
            requestAnimationFrame(function() {
                obj.dispatchEvent(new CustomEvent(name));
                running = false;
            });
        };
        obj.addEventListener(type, func);
    };

    /* init - you can init any event */
    throttle("resize", "optimizedResize");
})();

const setVh = () => {
    document.documentElement.style.setProperty('--vh', `${window.innerHeight}px`);
};

(function() {
    let def = {
        elements: {
            'vd-kv': {
                top: 166, //시작 위치 값
                bottom: 2000, //끝나는 위치 값
                scenario: [
                    {
                        id: 'scene1',
                        target: '.vd-txt-box01',
                        styles: {
                            top: {
                                transform: 'translate(0, 0)',
                                opacity: 0
                            },
                            bottom: {
                                transform: 'translate(0, -60px)',
                                opacity: 1
                            }
                        }
                    },
                    {
                        id: 'scene2',
                        target: '.vd-txt-box02 .vd-desc',
                        styles: {
                            top: {
                                transform: 'translate(0, 60px)',
                                opacity: 0
                            },
                            bottom: {
                                transform: 'translate(0, 0)',
                                opacity: 1
                            }
                        }
                    },
                ]
            },
            'vd-screen': {
                top: 0,
                bottom: 0,
                scenario: [
                    {
                        id: 'scene1',
                        target: '.smart-circle01',
                        styles: {
                            top: {
                                transform: 'matrix(1, 0, 0, 1, 0, 0)'
                            },
                            bottom: {
                                transform: 'matrix(0, 0, 0, 0, 450, 10)'
                            }
                        }
                    },
                    {
                        id: 'scene2',
                        target: '.smart-circle02',
                        styles: {
                            top: {
                                transform: 'matrix(1, 0, 0, 1, 0, 0)'
                            },
                            bottom: {
                                transform: 'matrix(1, 0, 0, 1, 10, 450)'
                            }
                        }
                    },
                    {
                        id: 'scene3',
                        target: '.smart-circle03',
                        styles: {
                            top: {
                                transform: 'matrix(1, 0, 0, 1, 0, 0)'
                            },
                            bottom: {
                                transform: 'matrix(1, 0, 0, 1, -360, 50)'
                            }
                        }
                    },
                    {
                        id: 'scene4',
                        target: '.smart-circle04',
                        styles: {
                            top: {
                                transform: 'matrix(1, 0, 0, 1, 0, 0)'
                            },
                            bottom: {
                                transform: 'matrix(1, 0, 0, 1, -650, 460)'
                            }
                        }
                    },
                    {
                        id: 'monitor',
                        target: '.vd-qled-smart-monitor img',
                        styles: {
                            top: {
                                transform: `matrix(2, 0, 0, 2, 0, ${window.innerHeight})`
                            },
                            bottom: {
                                transform: 'matrix(1, 0, 0, 1, 0, 0)'
                            }
                        }
                    },
                    {
                        id: 'monitor-after',
                        target: '.vd-qled-smart-monitor .vd-img-after img',
                        styles: {
                            top: {
                                opacity: 0
                            },
                            bottom: {
                                opacity: 1
                            }
                        }
                    },
                    {
                        id: 'screen1',
                        target: '.vd-qled-smart-story01',
                        styles: {
                            top: {
                                transform: 'matrix(1, 0, 0, 0, 0, 0)'
                            },
                            bottom: {
                                transform: 'matrix(1, 0, 0, 1, 0, 0)'
                            }
                        }
                    },
                    {
                        id: 'screen1-1',
                        target: '.vd-qled-smart-story01 .story-inner',
                        styles: {
                            top: {
                                transform: 'scaleY(1)'
                            },
                            bottom: {
                                transform: 'scaleY(1)'
                            }
                        }
                    },
                    {
                        id: 'screen1-text1',
                        target: '.vd-qled-smart-story01 .vd-story-q',
                        styles: {
                            top: {
                                opacity: 0
                            },
                            bottom: {
                                opacity: 1
                            }
                        }
                    },
                    {
                        id: 'screen1-text2',
                        target: '.vd-qled-smart-story01 .vd-story-a',
                        styles: {
                            top: {
                                opacity: 0
                            },
                            bottom: {
                                opacity: 1
                            }
                        }
                    },
                    {
                        id: 'screen2',
                        target: '.vd-qled-smart-story02',
                        styles: {
                            top: {
                                transform: 'matrix(1, 0, 0, 0, 0, 0)'
                            },
                            bottom: {
                                transform: 'matrix(1, 0, 0, 1, 0, 0)'
                            }
                        }
                    },
                    {
                        id: 'screen2-1',
                        target: '.vd-qled-smart-story02 .story-inner',
                        styles: {
                            top: {
                                transform: 'scaleY(1)'
                            },
                            bottom: {
                                transform: 'scaleY(1)'
                            }
                        }
                    },
                    {
                        id: 'screen2-text1',
                        target: '.vd-qled-smart-story02 .vd-story-q',
                        styles: {
                            top: {
                                opacity: 0
                            },
                            bottom: {
                                opacity: 1
                            }
                        }
                    },
                    {
                        id: 'screen2-text2',
                        target: '.vd-qled-smart-story02 .vd-story-a',
                        styles: {
                            top: {
                                opacity: 0
                            },
                            bottom: {
                                opacity: 1
                            }
                        }
                    },
                    {
                        id: 'screen3',
                        target: '.vd-qled-smart-story03',
                        styles: {
                            top: {
                                transform: 'matrix(1, 0, 0, 0, 0, 0)'
                            },
                            bottom: {
                                transform: 'matrix(1, 0, 0, 1, 0, 0)'
                            }
                        }
                    },
                    {
                        id: 'screen3-1',
                        target: '.vd-qled-smart-story03 .story-inner',
                        styles: {
                            top: {
                                transform: 'scaleY(1)'
                            },
                            bottom: {
                                transform: 'scaleY(1)'
                            }
                        }
                    },
                    {
                        id: 'screen3-text1',
                        target: '.vd-qled-smart-story03 .vd-story-q',
                        styles: {
                            top: {
                                opacity: 0
                            },
                            bottom: {
                                opacity: 1
                            }
                        }
                    },
                    {
                        id: 'screen3-text2',
                        target: '.vd-qled-smart-story03 .vd-story-a',
                        styles: {
                            top: {
                                opacity: 0
                            },
                            bottom: {
                                opacity: 1
                            }
                        }
                    },
                    {
                        id: 'screen4',
                        target: '.vd-qled-smart-story04',
                        styles: {
                            top: {
                                transform: 'matrix(1, 0, 0, 0, 0, 0)'
                            },
                            bottom: {
                                transform: 'matrix(1, 0, 0, 1, 0, 0)'
                            }
                        }
                    },
                    {
                        id: 'screen4-1',
                        target: '.vd-qled-smart-story04 .story-inner',
                        styles: {
                            top: {
                                transform: 'scaleY(1)'
                            },
                            bottom: {
                                transform: 'scaleY(1)'
                            }
                        }
                    },
                    {
                        id: 'screen4-text1',
                        target: '.vd-qled-smart-story04 .vd-story-q',
                        styles: {
                            top: {
                                opacity: 0
                            },
                            bottom: {
                                opacity: 1
                            }
                        }
                    },
                    {
                        id: 'screen4-text2',
                        target: '.vd-qled-smart-story04 .vd-story-a',
                        styles: {
                            top: {
                                opacity: 0
                            },
                            bottom: {
                                opacity: 0
                            }
                        }
                    },
                    {
                        id: 'screen4-dim',
                        target: '.vd-qled-smart-story04 .vd-qled-smart-story-end',
                        styles: {
                            top: {
                                opacity: 0
                            },
                            bottom: {
                                opacity: 1
                            }
                        }
                    },
                    {
                        id: 'screen4-dim-text',
                        target: '.vd-qled-smart-story04 .vd-qled-smart-story-end .vd-txt-wrap',
                        styles: {
                            top: {
                                transform: 'translateY(60px)',
                                opacity: 0
                            },
                            bottom: {
                                transform: 'translateY(0)',
                                opacity: 1
                            }
                        }
                    },
                ]
            }
        },
        animations: {
            'vd-kv': {
                'scene1': [
                    {
                        type: 'range-of-motion',
                        target: '.vd-txt-box01',
                        start: 30,
                        end: 30,
                        styles: {
                            translateY: {
                                top: 0,
                                bottom: -60
                            },
                            opacity: {
                                top: 1,
                                bottom: 0
                            }
                        }
                    },
                ],
                'scene2': [
                    {
                        type: 'range-of-motion',
                        target: '.vd-txt-box02 .vd-desc',
                        start: 40,
                        end: 35,
                        styles: {
                            translateY: {
                                top: 60,
                                bottom: 0
                            },
                            opacity: {
                                top: 0,
                                bottom: 1
                            }
                        }
                    }
                ],
            },
            'vd-screen': {
                'scene1': [
                    {
                        type: 'range-of-motion',
                        target: '.smart-circle01',
                        easing: 'easeInOutBack',
                        start: 12,
                        end: 14,
                        mobile: {
                            start: 12,
                            end: 12,
                        },
                        styles: {
                            matrix: {
                                scaleTopX: 1,
                                scaleTopY: 1,
                                scaleBottomX: 0,
                                scaleBottomY: 0,
                                topValueX: 0,
                                topValueY: 0,
                                bottomValueX: 450,
                                bottomValueY: 150,
                                topSkewX: 0,
                                topSkewY: 0,
                                bottomSkewX: 0,
                                bottomSkewY: 0
                            }
                        }
                    },
                ],
                'scene2': [
                    {
                        type: 'range-of-motion',
                        target: '.smart-circle02',
                        easing: 'easeInOutBack',
                        start: 11,
                        end: 14,
                        mobile: {
                            start: 13,
                            end: 12,
                        },
                        styles: {
                            matrix: {
                                scaleTopX: 1,
                                scaleTopY: 1,
                                scaleBottomX: 0,
                                scaleBottomY: 0,
                                topValueX: 0,
                                topValueY: 0,
                                bottomValueX: 10,
                                bottomValueY: 550,
                                topSkewX: 0,
                                topSkewY: 0,
                                bottomSkewX: 0,
                                bottomSkewY: 0
                            }
                        }
                    },
                ],
                'scene3': [
                    {
                        type: 'range-of-motion',
                        target: '.smart-circle03',
                        easing: 'easeInOutBack',
                        start: 10,
                        end: 14,
                        mobile: {
                            start: 10,
                            end: 12,
                        },
                        styles: {
                            matrix: {
                                scaleTopX: 1,
                                scaleTopY: 1,
                                scaleBottomX: 0,
                                scaleBottomY: 0,
                                topValueX: 0,
                                topValueY: 0,
                                bottomValueX: -360,
                                bottomValueY: 50,
                                topSkewX: 0,
                                topSkewY: 0,
                                bottomSkewX: 0,
                                bottomSkewY: 0
                            }
                        }
                    },
                ],
                'scene4': [
                    {
                        type: 'range-of-motion',
                        target: '.smart-circle04',
                        easing: 'easeInOutBack',
                        start: 13,
                        end: 14,
                        mobile: {
                            start: 11,
                            end: 12,
                        },
                        styles: {
                            matrix: {
                                scaleTopX: 1,
                                scaleTopY: 1,
                                scaleBottomX: 0,
                                scaleBottomY: 0,
                                topValueX: 0,
                                topValueY: 0,
                                bottomValueX: -650,
                                bottomValueY: 460,
                                topSkewX: 0,
                                topSkewY: 0,
                                bottomSkewX: 0,
                                bottomSkewY: 0
                            }
                        }
                    },
                ],
                'monitor': [
                    {
                        type: 'range-of-motion',
                        target: '.vd-qled-smart-monitor img',
                        start: 11.5,
                        end: 18,
                        mobile: {
                            start: 10,
                            end: 17,
                        },
                        styles: {
                            matrix: {
                                scaleTopX: 2,
                                scaleTopY: 2,
                                scaleBottomX: 1,
                                scaleBottomY: 1,
                                topValueX: 0,
                                topValueY: window.innerHeight,
                                bottomValueX: 0,
                                bottomValueY: 0,
                                topSkewX: 0,
                                topSkewY: 0,
                                bottomSkewX: 0,
                                bottomSkewY: 0
                            }
                        }
                    },
                ],
                'monitor-after': [
                    {
                        type: 'range-of-motion',
                        target: '.vd-qled-smart-monitor .vd-img-after img',
                        start: 16,
                        end: 2,
                        styles: {
                            opacity: {
                                top: 0,
                                bottom: 1
                            }
                        }
                    },
                ],
                'screen1': [
                    {
                        type: 'range-of-motion',
                        target: '.vd-qled-smart-story01',
                        start: 18,
                        end: 15,
                        styles: {
                            matrix: {
                                scaleTopX: 1,
                                scaleTopY: 0,
                                scaleBottomX: 1,
                                scaleBottomY: 1,
                                topValueX: 0,
                                topValueY: 0,
                                bottomValueX: 0,
                                bottomValueY: 0,
                                topSkewX: 0,
                                topSkewY: 0,
                                bottomSkewX: 0,
                                bottomSkewY: 0
                            }
                        }
                    }
                ],
                'screen1-1': [
                    {
                        type: 'range-of-motion',
                        target: '.vd-qled-smart-story01 .story-inner',
                        start: 18,
                        end: 15,
                        functions: {
                            'screen1-1-scaleY': {}
                        }
                    }
                ],
                'screen1-text1': [
                    {
                        type: 'range-of-motion',
                        target: '.vd-qled-smart-story01 .vd-story-q',
                        start: 24.5,
                        end: 1.5,
                        styles: {
                            opacity: {
                                top: 0,
                                bottom: 1
                            }
                        }
                    }
                ],
                'screen1-text2': [
                    {
                        type: 'range-of-motion',
                        target: '.vd-qled-smart-story01 .vd-story-a',
                        start: 26,
                        end: 1.5,
                        styles: {
                            opacity: {
                                top: 0,
                                bottom: 1
                            }
                        }
                    }
                ],
                'screen2': [
                    {
                        type: 'range-of-motion',
                        target: '.vd-qled-smart-story02',
                        start: 28.5,
                        end: 15,
                        styles: {
                            matrix: {
                                scaleTopX: 1,
                                scaleTopY: 0,
                                scaleBottomX: 1,
                                scaleBottomY: 1,
                                topValueX: 0,
                                topValueY: 0,
                                bottomValueX: 0,
                                bottomValueY: 0,
                                topSkewX: 0,
                                topSkewY: 0,
                                bottomSkewX: 0,
                                bottomSkewY: 0
                            }
                        }
                    }
                ],
                'screen2-1': [
                    {
                        type: 'range-of-motion',
                        target: '.vd-qled-smart-story02 .story-inner',
                        start: 28.5,
                        end: 15,
                        functions: {
                            'screen1-1-scaleY': {}
                        }
                    }
                ],
                'screen2-text1': [
                    {
                        type: 'range-of-motion',
                        target: '.vd-qled-smart-story02 .vd-story-q',
                        start: 37,
                        end: 1.5,
                        styles: {
                            opacity: {
                                top: 0,
                                bottom: 1
                            }
                        }
                    }
                ],
                'screen2-text2': [
                    {
                        type: 'range-of-motion',
                        target: '.vd-qled-smart-story02 .vd-story-a',
                        start: 38.5,
                        end: 1.5,
                        styles: {
                            opacity: {
                                top: 0,
                                bottom: 1
                            }
                        }
                    }
                ],
                'screen3': [
                    {
                        type: 'range-of-motion',
                        target: '.vd-qled-smart-story03',
                        start: 41,
                        end: 15,
                        styles: {
                            matrix: {
                                scaleTopX: 1,
                                scaleTopY: 0,
                                scaleBottomX: 1,
                                scaleBottomY: 1,
                                topValueX: 0,
                                topValueY: 0,
                                bottomValueX: 0,
                                bottomValueY: 0,
                                topSkewX: 0,
                                topSkewY: 0,
                                bottomSkewX: 0,
                                bottomSkewY: 0
                            }
                        }
                    }
                ],
                'screen3-1': [
                    {
                        type: 'range-of-motion',
                        target: '.vd-qled-smart-story03 .story-inner',
                        start: 41,
                        end: 15,
                        functions: {
                            'screen1-1-scaleY': {}
                        }
                    }
                ],
                'screen3-text1': [
                    {
                        type: 'range-of-motion',
                        target: '.vd-qled-smart-story03 .vd-story-q',
                        start: 51,
                        end: 1.5,
                        styles: {
                            opacity: {
                                top: 0,
                                bottom: 1
                            }
                        }
                    }
                ],
                'screen3-text2': [
                    {
                        type: 'range-of-motion',
                        target: '.vd-qled-smart-story03 .vd-story-a',
                        start: 52.5,
                        end: 1.5,
                        styles: {
                            opacity: {
                                top: 0,
                                bottom: 1
                            }
                        }
                    }
                ],
                'screen4': [
                    {
                        type: 'range-of-motion',
                        target: '.vd-qled-smart-story04',
                        start: 55.5,
                        end: 15,
                        styles: {
                            matrix: {
                                scaleTopX: 1,
                                scaleTopY: 0,
                                scaleBottomX: 1,
                                scaleBottomY: 1,
                                topValueX: 0,
                                topValueY: 0,
                                bottomValueX: 0,
                                bottomValueY: 0,
                                topSkewX: 0,
                                topSkewY: 0,
                                bottomSkewX: 0,
                                bottomSkewY: 0
                            }
                        }
                    }
                ],
                'screen4-1': [
                    {
                        type: 'range-of-motion',
                        target: '.vd-qled-smart-story04 .story-inner',
                        start: 55.5,
                        end: 15,
                        functions: {
                            'screen1-1-scaleY': {}
                        }
                    }
                ],
                'screen4-text1': [
                    {
                        type: 'range-of-motion',
                        target: '.vd-qled-smart-story04 .vd-story-q',
                        start: 68,
                        end: 1.5,
                        styles: {
                            opacity: {
                                top: 0,
                                bottom: 1
                            }
                        }
                    },
                    {
                        type: 'range-of-motion',
                        target: '.vd-qled-smart-story04 .vd-story-q',
                        start: 72,
                        end: 1,
                        styles: {
                            opacity: {
                                top: 1,
                                bottom: 0
                            }
                        }
                    }
                ],
                'screen4-text2': [
                    {
                        type: 'range-of-motion',
                        target: '.vd-qled-smart-story04 .vd-story-a',
                        start: 69.5,
                        end: 1.5,
                        styles: {
                            opacity: {
                                top: 0,
                                bottom: 1
                            }
                        }
                    },
                    {
                        type: 'range-of-motion',
                        target: '.vd-qled-smart-story04 .vd-story-a',
                        start: 72,
                        end: 1,
                        styles: {
                            opacity: {
                                top: 1,
                                bottom: 0
                            }
                        }
                    }
                ],
                'screen4-dim': [
                    {
                        type: 'range-of-motion',
                        target: '.vd-qled-smart-story04 .vd-qled-smart-story-end',
                        start: 72,
                        end: 1.5,
                        styles: {
                            opacity: {
                                top: 0,
                                bottom: 1
                            }
                        }
                    }
                ],
                'screen4-dim-text': [
                    {
                        type: 'range-of-motion',
                        target: '.vd-qled-smart-story04 .vd-qled-smart-story-end .vd-txt-wrap',
                        start: 74,
                        end: 1.5,
                        styles: {
                            translateY: {
                                top: 60,
                                bottom: 0
                            },
                            opacity: {
                                top: 0,
                                bottom: 1
                            }
                        }
                    }
                ],
            }
        }
    };
    let __last_known_scroll_position = 0;
    let __ticking = false;
    let __disabled = new Map();
    let __enabled = new Map();

    //진입 여부 체크 함수
    const isAmong = (__num, __top, __bottom) => __num >= __top && __num <= __bottom;

    //easing 함수
    const easing = function (__case, __r) {
        switch (__case) {
            case 'easeOutQuad': {
                return 1 - (1 - __r) * (1 - __r);
            }

            case 'easeInOutBack': {
                const __c1 = 1.70158;
                const __c2 = __c1 * 1.525;

                return __r < 0.5
                    ? (Math.pow(2 * __r, 2) * ((__c2 + 1) * 2 * __r - __c2)) / 2
                    : (Math.pow(2 * __r - 2, 2) * ((__c2 + 1) * (__r * 2 - 2) + __c2) + 2) / 2;
            }

            case 'easeOutCubic': {
                return 1 - Math.pow(1 - __r, 3);
            }

            case 'easeOutCirc': {
                return Math.sqrt(1 - Math.pow(__r - 1, 2));
            }

            default:
                return __r;
        }
    };

    //resize value change
    function defResize() {
        //const __windowHalf = window.innerWidth / 2;
        for (const __key in def) {
            if (__key === 'elements') {
                for (const __elKey in def.elements) {
                    const __thisEl = document.querySelector(`[data-ptk-animations="${__elKey}"]`);
                    let __thisHalf = __thisEl.offsetWidth / 2;

                    def.elements[__elKey].top = __thisEl.offsetTop;
                    def.elements[__elKey].bottom = __thisEl.offsetTop + __thisEl.offsetHeight;

                    //vd-screen 반응형 대응
                    if (__elKey === 'vd-screen') {
                        //x(중앙값) 대응을 위한 로직
                        def.elements['vd-screen'].scenario.forEach((__sceneObj) => {
                            if (__sceneObj.id.indexOf('scene') > -1) {
                                const __sceneTarget = document.querySelector(`${__sceneObj.target}`);
                                const __sceneTargetWidth = __sceneTarget.offsetWidth;
                                const __left = parseInt(window.getComputedStyle(__sceneTarget).getPropertyValue('left'));
                                const __center = (__thisHalf - __sceneTargetWidth) - __left;
                                if (window.innerWidth > 767) {
                                    if (__sceneObj.id.indexOf('scene2') > -1) __sceneObj.styles.bottom.transform = `matrix(0, 0, 0, 0, ${__center}, ${window.innerHeight / 2})`;
                                    if (__sceneObj.id.indexOf('scene2') === -1) __sceneObj.styles.bottom.transform = `matrix(0, 0, 0, 0, ${__center}, ${window.innerHeight / 4})`;
                                } else {
                                    __sceneObj.styles.bottom.transform = `matrix(0, 0, 0, 0, ${__center}, ${window.innerHeight / 5})`;
                                }
                                
                            }
                        });
                    }
                }
            }

            if (__key === 'animations') {
                for (const __elKey in def.animations) {
                    const __thisEl = document.querySelector(`[data-ptk-animations="${__elKey}"]`);
                    let __thisHalf = window.innerWidth > 767 ? __thisEl.offsetWidth / 2 : window.innerWidth / 2;
                    
                    //vd-screen 반응형 대응
                    if (__elKey === 'vd-screen') {
                        for (const __sceneKey in def.animations[__elKey]) {
                            if (__sceneKey.indexOf('scene') > -1) {
                                //x(중앙값) 대응을 위한 로직
                                def.animations['vd-screen'][__sceneKey].forEach((__sceneObj) => {
                                    const __sceneTarget = document.querySelector(`${__sceneObj.target}`);
                                    const __sceneTargetWidth = __sceneTarget.offsetWidth;
                                    const __top = parseInt(window.getComputedStyle(__sceneTarget).getPropertyValue('top'));
                                    const __left = parseInt(window.getComputedStyle(__sceneTarget).getPropertyValue('left'));
                                    const __center = window.innerWidth > 767 ? (__thisHalf - __sceneTargetWidth) - __left : (__thisHalf - (__sceneTargetWidth / 2)) - __left;

                                    __sceneObj.styles.matrix.bottomValueX = __center;
                                    // console.log(__sceneObj);
                                    // console.log('__thisHalf : ',__thisHalf);
                                    // console.log('__sceneTargetWidth : ', __sceneTargetWidth);
                                    // console.log('__left : ', __left);
                                    console.log('__top : ', __top);
                                    // console.log('__center : ', __center);
                                    if (window.innerWidth > 767) {
                                        if (__sceneObj.target.indexOf('smart-circle02') > -1) __sceneObj.styles.matrix.bottomValueY = window.innerHeight / 2;
                                        if (__sceneObj.target.indexOf('smart-circle02') === -1) __sceneObj.styles.matrix.bottomValueY = window.innerHeight / 4;
                                    } else {
                                        __sceneObj.styles.matrix.bottomValueY = window.innerHeight / 5;
                                    }
                                    
                                });
                            }
                        }
                    }
                }
            }
        }

        console.log('def : ', def);
    }

    function videoSetting(__scenAnimation) {

        // const videoElem = document.querySelector(__scenAnimation.videoTarget);
        // (async () => {
        //     const frames =  await FrameUnpacker.unpack({
        //         url: videoElem.getAttribute('src'),
        //         frames: 488
        //     });
        //
        //     // console.log('frames : ', frames);
        //     const canvas = document.querySelector(__scenAnimation.target);
        //     const ctx = canvas.getContext('2d');
        //     ctx.drawImage(frames[0], 0, 0, 1280, 720);
        //     __scenAnimation['ctx'] = ctx;
        //     __scenAnimation['frames'] = frames;
        // })();

        // const canvas = document.querySelector(__scenAnimation.target);
        // const ctx = canvas.getContext('2d');
        // let canPlayState = false;
        //
        // ctx.textAlign = 'center';
        // ctx.fillText('비디오 로딩 중..', 300, 200);
        //
        // const videoElem = document.querySelector(__scenAnimation.videoTarget);
        // ctx.drawImage(videoElem, 0, 0, 1280, 720);
        // //videoElem.addEventListener('canplaythrough', render);
        //
        // function render() {
        //     console.log('render');
        //     ctx.drawImage(videoElem, 0, 0, 1280, 720);
        //     // 첫 번째 인자로 비디오를 넣어준다.
        //     requestAnimationFrame(render);
        // }
    }

    //scroll animation init
    function init() {

        //Animations Object Map Clear.
        __disabled.clear();
        __enabled.clear();

        //data resize change
        defResize();

        for (const __refName of Object.keys(def.elements)) {
            __disabled.set(__refName, def.elements[__refName]);
        }

        // 각 애니메이션을 enabled == false 로 만듬.
        for (const __refName of Object.keys(def.animations)) {
            for (const __scene in def.animations[__refName]) {
                if (def.animations[__refName].hasOwnProperty(__scene)) {
                    for (const __sceneAnimation of def.animations[__refName][__scene]) {
                        if (typeof __sceneAnimation.functions !== 'undefined' && typeof __sceneAnimation.functions.video !== 'undefined') videoSetting(__sceneAnimation);
                        __sceneAnimation.enabled = false;
                    }
                }
            }
        }

        //scroll event 한번 더 실행 => init 데이터 세팅 후 스크롤 실행
        onScroll();
    }

    function reset(__scenarioName, __scenario, __y = 'top') {
        __scenario.forEach((__sceneObj, __i) => {
            const __parentTarget = document.querySelector(`[data-ptk-animations="${__scenarioName}"]`);
            
            if (__parentTarget.className.indexOf('disabled') > -1 && __i > __scenario.length) return;

            //style motion 경우
            if (typeof __sceneObj.styles !== 'undefined') {
                __parentTarget.classList.remove('enabled');
                __parentTarget.classList.add('disabled');

                Object.keys(__sceneObj.styles[__y]).forEach((__styleName) => {
                    const __value = __sceneObj.styles[__y][__styleName];
                    const __target = document.querySelectorAll(`[data-ptk-animations="${__scenarioName}"] ${__sceneObj.target}`);

                    [].forEach.call(__target, (__el) => {
                        __el.style[__styleName] = __value;
                    });
                });
            }

            //커스텀 모션일 경우
            if (typeof __sceneObj.functions !== 'undefined') {
                __parentTarget.classList.remove('enabled');
                __parentTarget.classList.add('disabled');

                const __aniArray = def.animations[__scenarioName][__sceneObj.id];
                __aniArray.forEach((__ani) => {
                    applyFunctions(__scenarioName, __ani, __y)
                });
            }
        });
    }

    //scroll 측정
    function onScroll(__scrollTop = window.scrollY || window.pageYOffset) {
        const __floatingNav = document.querySelector('.floating-navigation');
        const __floatingNavHeight = __floatingNav.className.indexOf('--fixed') > 0 ? __floatingNav.offsetHeight : 0;
        const __currentPos = (__scrollTop + window.innerHeight / 2) + __floatingNavHeight;

        if (__floatingNavHeight > 0) document.querySelector('.vd-qled-kv').classList.add('kv-sticky-top');
        if (__floatingNavHeight === 0) document.querySelector('.vd-qled-kv').classList.remove('kv-sticky-top');
        // const __currentPos = (__scrollTop + window.innerHeight / 2);

        // __disabled 순회하며 활성화할 요소 찾기.
        __disabled.forEach((__disabledObj, __scenarioName) => {
            const {
                top: __top,
                bottom: __bottom,
                scenario: __scenario
            } = __disabledObj;

            const __target = document.querySelector(`[data-ptk-animations="${__scenarioName}"]`);
            if (!__target) return;

            // 만약 칸에 있다면 해당 요소 활성화
            if (isAmong(__currentPos, __top, __bottom)) {
                __enabled.set(__scenarioName, __disabledObj);

                if (__target) {
                    __target.classList.remove('disabled');
                    __target.classList.add('enabled');

                    __disabled.delete(__scenarioName);
                }

            } else {
                // 애니메이션 작동 위치가 아니면, top / bottom 위치에 맞게 리셋 설정
                if (__currentPos <= __top) {
                    reset(__scenarioName, __scenario, 'top');
                } else if (__currentPos >= __bottom) {
                    reset(__scenarioName, __scenario, 'bottom');
                }
            }
        });

        // __enabled 순회하며 활성화 된 요소 animation 실행
        __enabled.forEach((__enabledObj, __scenarioName) => {
            const {
                top: __top,
                bottom: __bottom,
                scenario: __scenario
            } = __enabledObj;
            const __target = document.querySelector(`[data-ptk-animations="${__scenarioName}"]`);
            const __isIn = isAmong(__currentPos, __top, __bottom);

            if (!__isIn) {
                //up out style apply
                if (__currentPos <= __top) {
                    __scenario.forEach((__sceneObj) => {
                        //style motion 경우
                        if (typeof __sceneObj.styles !== 'undefined') reset(__scenarioName, __scenario, 'top');

                        //커스텀 모션일 경우
                        if (typeof __sceneObj.functions !== 'undefined') reset(__scenarioName, __scenario, 'top');
                    });
                }
                //down out style apply
                else if (__currentPos >= __bottom) {
                    __scenario.forEach((__sceneObj) => {
                        //style motion 경우
                        if (typeof __sceneObj.styles !== 'undefined') reset(__scenarioName, __scenario, 'bottom');

                        //커스텀 모션일 경우
                        if (typeof __sceneObj.functions !== 'undefined') reset(__scenarioName, __scenario, 'bottom');
                    });
                }
            } else {
                //animation section 진입 시 클래스 'enabled' 추가
                __target.classList.remove('disabled');
                __target.classList.add('enabled');

                //animation setting
                animationSetting(__currentPos, __scenarioName);
            }

        });

    }

    //시작 위치의 시점이 다를때 계산 functions
    function rangeToMotion(__scenarioName, __ani, __type) {
        // console.log('__ani : ', __ani);

        const __scenarioTarget = document.querySelector(`[data-ptk-animations="${__scenarioName}"]`);
        const __scenarioBottom = __scenarioTarget.offsetHeight + __scenarioTarget.offsetTop;
        const __scenarioRange = __scenarioBottom - __scenarioTarget.offsetTop;
        let __start = __scenarioTarget.offsetTop + (__scenarioRange * __ani.start / 100);
        let __end = __start + (__start * (__ani.end / 100));

        if (window.innerWidth < 768 && ('mobile' in __ani)) {
            __start = __scenarioTarget.offsetTop + (__scenarioRange * __ani.mobile.start / 100);;
            __end = __start + (__start * (__ani.mobile.end / 100));
        }

        //__end 퍼센트가 총 길이를 초과할 경우
        if (__type === 'end' && __end > __scenarioBottom) __end = __scenarioBottom;

        if (__type === 'start') return __start;
        if (__type === 'end') return __end;

    }

    //animation 동작을 위한 기본 세팅
    function animationSetting(__currentPos, __scenarioName) {
        const __elements = def.elements[__scenarioName];
        const __animations = def.animations[__scenarioName];

        for (const __aniKey in __animations) {
            if (__aniKey in __animations) {
                for (const __ani of __animations[__aniKey]) {
                    let {
                        target: __target,
                        start: __start,
                        end: __end,
                        styles: __styles
                    } = __ani;

                    //resize 대응 위치 값
                    __start = __elements.top + __start;
                    __end = __elements.top + __end;

                    //특정 위치에서 시작해야 할 경우
                    if (typeof __ani.type !== 'undefined' && __ani.type === 'range-of-motion') {
                        __start = rangeToMotion(__scenarioName, __ani, 'start');
                        __end = rangeToMotion(__scenarioName, __ani, 'end');
                    }

                    const __isIn = isAmong(__currentPos, __start, __end);

                    // console.log('__start : ', __start);
                    // console.log('__end : ', __end);
                    // console.log('__isIn : ', __isIn);
                    // console.log('__ani.enabled : ', __ani.enabled);

                    if (__isIn) {
                        if (!__ani.enabled) __ani.enabled = true;
                    }
                    //영역에 벗어났으면서 애니메인션 동작하던 요소 초기화(방어로직)
                    else if (!__isIn && __ani.enabled) {
                        // console.info('//스크롤 위치값이 시작 위치보다 올라갔을 경우');
                        //스크롤 위치값이 시작 위치보다 올라갔을 경우
                        if (__currentPos <= __start) {
                            if (typeof __ani.functions !== 'undefined') applyFunctions(__scenarioName, __ani, 'top', __start, __end);
                            if (typeof __ani.styles !== 'undefined') applyCalculation(__target, __currentPos, __scenarioName, __styles, 0);
                        }
                        //스크롤 위치값이 end 위치보다 내려갔을 경우
                        else if (__currentPos >= __end) {
                            if (typeof __ani.functions !== 'undefined') applyFunctions(__scenarioName, __ani, 'bottom', __start, __end);
                            if (typeof __ani.styles !== 'undefined') applyCalculation(__target, __currentPos, __scenarioName, __styles, 1);
                        }

                        __ani.enabled = false;
                    }
                    //영역 안에 있으나 모션 시점점과 끝점 사이에 있지 않을 때
                    else if (!__isIn && !__ani.enabled && __animations[__aniKey].length === 1) {
                        // console.info('//영역 안에 있으나 모션 시점점과 끝점 사이에 있지 않을 때');
                        // console.log('__start : ', __start);
                        // console.log('__ani : ', __ani);
                        // console.log('__currentPos : ', __currentPos);

                        //스크롤 위치값이 시작 위치보다 올라갔을 경우
                        if (__currentPos <= __start) {
                            if (typeof __ani.functions !== 'undefined') applyFunctions(__scenarioName, __ani, 'top', __start, __end);
                            if (typeof __ani.styles !== 'undefined') applyCalculation(__target, __currentPos, __scenarioName, __styles, 0);
                        }
                        //스크롤 위치값이 end 위치보다 내려갔을 경우
                        else if (__currentPos >= __end) {
                            if (typeof __ani.functions !== 'undefined') applyFunctions(__scenarioName, __ani, 'bottom', __start, __end);
                            if (typeof __ani.styles !== 'undefined') applyCalculation(__target, __currentPos, __scenarioName, __styles, 1);
                        }
                    }

                    if (__ani.enabled) {
                        console.info('//enabled');
                        let __r = (__currentPos - __start) / (__end - __start); //증가율
                        __r = typeof __ani.easing !== 'undefined' ? easing(__ani.easing, __r) : __r; //easing 적용

                        if (typeof __ani.functions !== 'undefined') applyFunctions(__scenarioName, __ani, __currentPos, __start, __end);
                        if (typeof __ani.styles !== 'undefined') applyCalculation(__target, __currentPos, __scenarioName, __styles, __r);
                    }
                    // console.log('__ani : ', __ani);

                }
            }
        }
    }

    //animation 이동 거리 계산 함수
    function applyCalculation(__target, __currentPos, __scenarioName, __styles, __r = 0) {
        // console.log('applyCalculation');
        let __unit = 'px';
        for (const __style of Object.keys(__styles)) {
            if (__style !== 'matrix') {
                const {
                    top: __top,
                    bottom: __bottom
                } = __styles[__style];
                const __calc = (__bottom - __top) * __r + __top;

                applyAnimation(__target, __scenarioName, __style, __calc, __unit);
            }
            //matrix 경우 예외처리
            else if (__style === 'matrix') {
                const {
                    scaleTopX: __scaleTopX,
                    scaleTopY: __scaleTopY,
                    scaleBottomX: __scaleBottomX,
                    scaleBottomY: __scaleBottomY,
                    topValueX: __topValueX,
                    topValueY: __topValueY,
                    bottomValueX: __bottomValueX,
                    bottomValueY: __bottomValueY,
                    topSkewX: __topSkewX,
                    topSkewY: __topSkewY,
                    bottomSkewX: __bottomSkewX,
                    bottomSkewY: __bottomSkewY
                } = __styles[__style];

                const __scaleCalcX = (__scaleBottomX - __scaleTopX) * __r + __scaleTopX;
                const __scaleCalcY = (__scaleBottomY - __scaleTopY) * __r + __scaleTopY;
                const __xCalc = (__bottomValueX - __topValueX) * __r + __topValueX;
                const __yCalc = (__bottomValueY - __topValueY) * __r + __topValueY;
                const __xSkew = (__bottomSkewX - __topSkewX) * __r + __topSkewX;
                const __ySkew = (__bottomSkewY - __topSkewY) * __r + __topSkewY;
                const __resultCalc = `${__scaleCalcX}, ${__ySkew}, ${__xSkew}, ${__scaleCalcY}, ${__xCalc}, ${__yCalc}`;

                applyAnimation(__target, __scenarioName, __style, __resultCalc, __unit);
            }
        }
    }

    //animation 실행
    function applyAnimation(__target, __scenarioName, __style, __calc, __unit = '') {
        // console.log('applyAnimation');
        const __allEl = document.querySelectorAll(`[data-ptk-animations="${__scenarioName}"] ${__target}`);

        switch (__style) {
            case 'opacity':
                [].forEach.call(__allEl, (__el) => {
                    __el.style.opacity = __calc;
                });

                break;

            case 'translateX':
                [].forEach.call(__allEl, (__el) => {
                    __el.style.transform = `translateX(${__calc}${__unit})`;
                });

                break;

            case 'translateY':
                [].forEach.call(__allEl, (__el) => {
                    __el.style.transform = `translate(0, ${__calc}${__unit})`;
                });

                break;

            case 'matrix':
                [].forEach.call(__allEl, (__el) => {
                    __el.style.transform = `matrix(${__calc})`;
                });

                break;

            case 'scale':
                [].forEach.call(__allEl, (__el) => {
                    __el.style.transform = `scale(${__calc})`;
                });

                break;

            case 'scaleY':
                [].forEach.call(__allEl, (__el) => {
                    __el.style.transform = `scaleY(${__calc})`;
                });

                break;

            default:
                [].forEach.call(__allEl, (__el) => {
                    __el.style[__style] = `${__calc}${__unit}`;
                });

                break;
        }
    }

    //커스텀 적용 animations
    function applyFunctions(__scenarioName, __ani, __currentPos, __start, __end) {
        // console.log('applyFunctions');
        for (const __type in __ani.functions) {
            if (__type in __ani.functions){
                switch(__type){
                    case 'tab':{
                        let __windowHalf = window.innerHeight / 2;
                        let __r = __currentPos === 'top' ? 0 : __currentPos === 'bottom' ? 1 : (__currentPos - (__start + __windowHalf)) / ((__end - __windowHalf) - __start);
                        __r = __r < 0 ? 0 : __r;

                        let __rule = __ani.functions.tab;
                        let __dom = __rule.dom;
                        let __el = document.querySelector(`[data-ptk-animations*="${__scenarioName}"]`);
                        let __tabEl = __el.querySelectorAll(`${__dom.tab} > *`);
                        let __contentEl = __el.querySelectorAll(`${__dom.cont} > *`);
                        let __ratingArray = [];
                        let __index = 0;

                        for(let __i = 0; __i <= __rule.length; __i++){
                            __ratingArray.push(
                                1 / __rule.length * __i
                            );
                        }

                        //rating index 값 추출
                        __ratingArray.reduce((__rating, __ratingCur, __ratingIdx) => {
                            if(__rating <= __r && __ratingCur >= __r){
                                __index = __ratingIdx - 1;
                            }

                            return __ratingCur;
                        });

                        [].forEach.call(__tabEl, (_el, __elIdx) => {
                            _el.classList.remove('on');

                            if(__elIdx === __index) _el.classList.add('on');
                        });

                        [].forEach.call(__contentEl, (_el, __elIdx) => {
                            _el.classList.remove('on');

                            if(__elIdx === __index) _el.classList.add('on');
                        });


                        break;
                    }

                    case 'slide':{
                        let __windowWidth = window.innerWidth;
                        let __windowHalf = window.innerHeight / 2;
                        let __resizeMode = __windowWidth >= 1440 ? 'pc' : __windowWidth < 1440 && __windowWidth > 768 ? 'tablet' : 'mobile';
                        let __target = document.querySelector(`[data-ptk-animations="${__scenarioName}"] ${__ani.target}`);
                        let __targetList = __target.querySelectorAll(`${__ani.functions.slide.childrenEl}`);
                        let __targetListAllWidth = 0;
                        [].forEach.call(__targetList, (__listEl) => {
                            let __elStyle = __listEl.currentStyle || window.getComputedStyle(__listEl);
                            __targetListAllWidth += __listEl.offsetWidth + parseFloat(__elStyle.marginRight);
                        });

                        let __r = __currentPos === 'top' ? 0 : __currentPos === 'bottom' ? 1 : (__currentPos - (__start + __windowHalf)) / ((__end - __windowHalf) - __start);
                        __r = __r < 0 ? 0 : __r;

                        let __top = __resizeMode === 'pc' ? 0 : __resizeMode === 'tablet' ? 80 : 20;
                        let __bottom = __resizeMode === 'pc' ? -1420 : -(__targetListAllWidth - (__windowWidth - 80));
                        let __calc = (__bottom - __top) * __r + __top;

                        __target.style.transform = `translateX(${__calc}px)`;

                        break;
                    }

                    case 'screen1-1-scaleY':{
                        let __target = document.querySelector(`[data-ptk-animations="${__scenarioName}"] ${__ani.target}`);
                        let __targetHeight = window.innerHeight;
                        let __r = __currentPos === 'top' ? 0 : __currentPos === 'bottom' ? 1 : (__currentPos - __start) / (__end - __start);
                        let __size = __targetHeight * __r;
                        let __calc = __targetHeight / __size;

                        __target.style.transform = `scaleY(${__calc})`;

                        break;
                    }

                    case 'text-scroll':{
                        let __r = __currentPos === 'top' ? 0 : __currentPos === 'bottom' ? 1 : (__currentPos - __start) / (__end - __start);
                        __r = __r < 0 ? 0 : __r;

                        let __rule = __ani.functions['text-scroll'];
                        let __ratingArray = [];
                        let __index = 0;
                        let __target = document.querySelectorAll(`${__ani.target} > p`);

                        for(let __i = 0; __i <= __rule.length; __i++){
                            __ratingArray.push(
                                1 / __rule.length * __i
                            );
                        }

                        //rating index 값 추출
                        __ratingArray.reduce((__rating, __ratingCur, __ratingIdx) => {
                            if(__rating <= __r && __ratingCur >= __r){
                                __index = __ratingIdx - 1;
                            }

                            return __ratingCur;
                        });

                        [].forEach.call(__target, (_el, __elIdx) => {
                            _el.classList.remove('on');

                            if(__elIdx === __index) _el.classList.add('on');
                        });

                        break;
                    }

                    case 'video':{
                        console.log('__ani : ', __ani);

                        const __videoTarget = document.querySelector(__ani.videoTarget);
                        const __videoFunctions = __ani.functions.video;
                        const __totalTime = __videoFunctions.totalTime;
                        const __r = __currentPos === 'top' ? 0 : __currentPos === 'bottom' ? 1 : ((__currentPos - __start) / (__end - __start));
                        //__videoTarget.currentTime = __r;
                        if(typeof __ani.frames === "undefined") return;
                        const __frameIndex = Math.floor(__r * (__ani.frames.length - 1));
                        console.log('__r : ', __r);
                        console.log('__frameIndex : ', __frameIndex);

                        window.requestAnimationFrame(() => {
                            __ani.ctx.drawImage(__ani.frames[__frameIndex], 0, 0);
                        });

                        break;
                    }

                    default:
                        console.info('커스텀 애니메이션에 해당되는 속성이 없습니다.');
                        break;
                }
            }
        }
    }

    //load 실행을 줄이기 위한 타이밍 계산
    let __timing = window.performance.timing.loadEventEnd - window.performance.timing.navigationStart;
    let __delay = 300;
    let __timer = null;

    //resize event
    window.addEventListener("optimizedResize", function() {
        __timing = window.performance.timing.loadEventEnd - window.performance.timing.navigationStart;

        clearTimeout(__timer);
        __timer = setTimeout(function () {
            if (__timing > 0) init();
        }, __delay);

        //set Vh
        setVh();
    });

    //scroll event
    window.addEventListener('scroll', function (e) {
        __last_known_scroll_position = window.scrollY || window.pageYOffset;
        if (!__ticking) {
            window.requestAnimationFrame(function () {
                onScroll(__last_known_scroll_position);
                __ticking = false;
            });

            __ticking = true;
        }
    });

    //window load
    window.addEventListener('load', function () {
        //init 실행
        init();
    });
})();