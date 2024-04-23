/**
 * 해당 id를 가진 요소의 투명도를 1로 설정한다.
 * @param {String} id 아이디
 */
export function effect_show(id) {
    let target = document.getElementById(id);
    if(target != null){
        target.style.visibility = 'visible';
        setTimeout(() => {
            target.style.opacity = 1;
        }, 10);
    }
}

/**
 * 해당 id를 가진 요소의 투명도를 0으로 설정한다.
 * @param {String} id 아이디
 */
export function effect_hide(id) {
    let target = document.getElementById(id);
    if(target != null){
        target.style.visibility = 'hidden';
        setTimeout(() => {
            target.style.opacity = 0;
        }, 10);
    }
}

/**
 * 해당 id를 가진 키 요소에 스타일 클래스를 적용한다.
 * @param {String} id 아이디
 */
export function pressKey(id){
    let target = document.getElementById(id);
    if(target != null){
        target.classList.add("pressKey");
        setTimeout(() => {
            target.classList.remove("pressKey");
        }, 200);
    }
}

/**
 * 해당 id를 가진 요소를 표시하고 translate 효과를 적용한다.
 * @param {String} id 아이디
 * @param {String} val_x X값
 * @param {String} val_y y값
 */
export function effect_show_trans_XY(id, val_x, val_y){
    let target = document.getElementById(id);
    if(target != null){
        target.style.visibility = 'visible';
        target.style.transition = 'opacity 0.1s ease-out';
        target.style.opacity = 1;
        
        let target_x_val = getTranslate(id, 'X') + parseFloat(val_x);
        let target_y_val = getTranslate(id, 'Y') + parseFloat(val_y);
        
        target.style.transform = 'translate(' + target_x_val + 'px, ' + target_y_val +'px)';
    }
}

/**
 * 해당 id를 가진 요소에 vibe 애니메이션 효과를 적용한다.
 * @param {String} id 아이디
 */
export function effect_vibe(id){
    let target = document.getElementById(id);
    if(target != null){
        target.classList.add("vibe");
    }
}

/**
 * 해당 id를 가진 요소의 transform 속성 값을 가져온 후, translate 값을 추출합니다.
 * @param {String} id 아이디
 * @param {String} g X, Y 구분
 * @returns {int} ex) 100
 */
export function getTranslate(id, g) {
    const element = document.getElementById(id);
    const style = window.getComputedStyle(element).transform;
    const type = style.includes('3d') ? '3d' : '2d';
    if(style == "none") return 0;

    const translate = style.match(/matrix.*\((.+)\)/)[1].split(', ');
    let x, y, z;
    switch(type){
        case "2d" :
            x = parseFloat(translate[4]);
            y = parseFloat(translate[5]);
            break;
        case"3d" :
            x = parseFloat(translate[12]);
            y = parseFloat(translate[13]);
            z = parseFloat(translate[14]);
            break;
    }

    return g == 'X' ? x : y;
}