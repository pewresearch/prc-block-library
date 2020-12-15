import classNames from 'classnames/bind';

const isSize = (target, value) => {
    if ( parseInt(target) === parseInt(value) ) {
        return true;
    } else {
        return false;
    }
}

const getClassName = (className, size) => {
    return classNames(className, {
        'size-200': isSize(200, size),
        'size-310': isSize(310, size),
        'size-420': isSize(420, size),
        'size-640': isSize(640, size),
    })
}

export { isSize, getClassName };