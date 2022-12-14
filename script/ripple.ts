
const defaults = {
    color: 'currentColor',
    opacity: '0.1',
    centered: false,
    spreadingDuration: '.4s',
    spreadingDelay: '0s',
    spreadingTimingFunction: 'linear',
    clearingDuration: '1s',
    clearingDelay: '0s',
    clearingTimingFunction: 'ease-in-out',
};

type RippleOptions = Partial<typeof defaults>;

function RippleStart(e: PointerEvent, options = {}): HTMLDivElement {
    e.stopImmediatePropagation();
    const opts = { ...defaults, ...options };
  
    // Parent element
    const target = e.currentTarget as HTMLElement;
  
    // Create ripple
    const ripple = document.createElement('div');
    const rippleStyle = ripple.style;
  
    // Adding default stuff
    ripple.className = `s-ripple`;
    target.appendChild(ripple);
    rippleStyle.opacity = opts.opacity;
    rippleStyle.transition = `transform ${opts.spreadingDuration} ${opts.spreadingTimingFunction} ${opts.spreadingDelay},opacity ${opts.clearingDuration} ${opts.clearingTimingFunction} ${opts.clearingDelay}`;
    rippleStyle.background = opts.color;
  
    // Positioning ripple
    const targetRect = target.getBoundingClientRect();
    if (opts.centered) {
        rippleStyle.top = `${targetRect.height / 2}px`;
        rippleStyle.left = `${targetRect.width / 2}px`;
    } else {
        const distY = e.clientY;
        const distX = e.clientX;
        rippleStyle.top = `${distY - targetRect.top}px`;
        rippleStyle.left = `${distX - targetRect.left}px`;
    }
  
    // Enlarge ripple
    rippleStyle.transform = `scale(${
        Math.max(targetRect.width, targetRect.height) * 0.02
    }) translate(0,0)`;
    return ripple;
}

function RippleStop(ripple: HTMLDivElement) {
    if (ripple) {
        ripple.addEventListener('transitionend', (e) => {
            if (e.propertyName === 'opacity') ripple.remove();
        });
        ripple.style.opacity = '0';
    }
}

export default (node: HTMLElement, _options: RippleOptions = {}) => {
    let options = _options;
    let destroyed = false;
    let ripple: HTMLDivElement;
    const handleStart = (e: PointerEvent) => {
      ripple = RippleStart(e, options);
    };
    const handleStop = () => RippleStop(ripple);
  
    function setup() {
      node.classList.add('s-ripple-container');
      node.addEventListener('pointerdown', handleStart);
      node.addEventListener('pointerup', handleStop);
      node.addEventListener('pointerleave', handleStop);
      destroyed = false;
    }
  
    function destroy() {
      node.classList.remove('s-ripple-container');
      node.removeEventListener('pointerdown', handleStart);
      node.removeEventListener('pointerup', handleStop);
      node.removeEventListener('pointerleave', handleStop);
      destroyed = true;
    }
  
    if (options) setup();
  
    return {
        update(newOptions = {}) {
            options = newOptions;
            if (options && destroyed) setup();
            else if (!(options || destroyed)) destroy();
        },
        destroy,
    };
};
  