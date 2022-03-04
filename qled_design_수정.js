X: function () {
    let __vdDesignX = 0;

    //rating array setting
    //VD_DESIGN.CALC.INNER_X('set');
    
    //rating last value
    const itemList = document.querySelectorAll(".vd-qled-design .vd-design-item-list li");
    const direction = __rtl === false ? 'margin-right' : 'margin-left';
    let value = 0;
    
    for(let i = 0; i < itemList.length -1; i++) {
        const marginValue = Math.round(getComputedStyle(itemList[i]).getPropertyValue(direction).replace(/[^0-9^.]/g, ''));
        value += itemList[i].offsetWidth + marginValue;
    }

    value += Math.round(getComputedStyle(VD_DESIGN.ELEM.__OUTER).getPropertyValue("margin-left").replace(/[^0-9^.]/g, ''));

    if (VD_COMMON.ELEM.__WINDOW_WIDTH > 767) {
        if (!__rtl) value -= document.querySelector('.vd-qled-design .vd-txt-wrap.vd-txt-type01').offsetLeft;
        if (__rtl) {
            const vdContInner = document.querySelector(".vd-qled-design .vd-cont-inner");
            const marginRight = Math.round(window.getComputedStyle(vdContInner).getPropertyValue("margin-right").replace(/[^0-9^.]/g, ''));
            const paddingRight = Math.round(window.getComputedStyle(vdContInner).getPropertyValue("padding-right").replace(/[^0-9^.]/g, ''));
            value -= (marginRight + paddingRight);
            console.log(value)
        }

        __vdDesignX = __rtl !== true ? -(value) : value;
    } else {
        // mobile
    }
    return __vdDesignX;

    
},