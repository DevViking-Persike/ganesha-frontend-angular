/**
 * Interatividade dos charts renderizados dentro do GnsInteractiveChart.
 * Portado de wwwroot/js/ganesha-charts.js (tooltip + bar/line) para TS puro,
 * sem arquivo JS global — todo o escopo é limitado ao elemento raiz informado.
 */

const TOOLTIP_PADDING = 12;

const TOOLTIP_STYLES: Partial<CSSStyleDeclaration> = {
    position: 'fixed',
    zIndex: '9999',
    pointerEvents: 'none',
    opacity: '0',
    transition: 'opacity 150ms ease, transform 150ms ease',
    transform: 'translateY(4px)',
    padding: '6px 12px',
    borderRadius: 'var(--gns-radius-md, 6px)',
    fontSize: 'var(--gns-text-xs, 0.75rem)',
    fontFamily: 'var(--gns-font-sans, system-ui, sans-serif)',
    fontWeight: '600',
    lineHeight: '1.4',
    backgroundColor: 'var(--gns-color-surface-inverse, #221C2E)',
    color: 'var(--gns-color-text-inverse, #EFECF5)',
    boxShadow: 'var(--gns-shadow-lg, 0 10px 15px -3px rgba(0,0,0,.2))',
    whiteSpace: 'nowrap',
    maxWidth: '280px',
};

let tooltip: HTMLDivElement | null = null;

function ensureTooltip(): HTMLDivElement {
    if (tooltip) return tooltip;
    tooltip = document.createElement('div');
    tooltip.className = 'gnsh-chart-tooltip';
    tooltip.setAttribute('role', 'tooltip');
    tooltip.setAttribute('aria-hidden', 'true');
    Object.assign(tooltip.style, TOOLTIP_STYLES);
    document.body.appendChild(tooltip);
    return tooltip;
}

function buildTooltipContent(color: string, label: string, value: string): DocumentFragment {
    const dot = document.createElement('span');
    Object.assign(dot.style, {
        display: 'inline-block',
        width: '8px',
        height: '8px',
        borderRadius: '50%',
        background: color,
        marginRight: '6px',
        verticalAlign: 'middle',
    });
    const strong = document.createElement('strong');
    strong.textContent = label;
    const text = document.createTextNode(value ? `: ${value}` : '');
    const fragment = document.createDocumentFragment();
    fragment.appendChild(dot);
    fragment.appendChild(strong);
    fragment.appendChild(text);
    return fragment;
}

function showTooltip(e: MouseEvent, content: DocumentFragment | string): void {
    const tt = ensureTooltip();
    tt.textContent = '';
    if (typeof content === 'string') {
        tt.textContent = content;
    } else {
        tt.appendChild(content);
    }
    tt.style.opacity = '1';
    tt.style.transform = 'translateY(0)';
    tt.setAttribute('aria-hidden', 'false');
    positionTooltip(e);
}

function positionTooltip(e: MouseEvent): void {
    if (!tooltip) return;
    const rect = tooltip.getBoundingClientRect();
    let x = e.clientX + TOOLTIP_PADDING;
    let y = e.clientY - rect.height - TOOLTIP_PADDING;
    if (x + rect.width > window.innerWidth) {
        x = e.clientX - rect.width - TOOLTIP_PADDING;
    }
    if (y < 0) {
        y = e.clientY + TOOLTIP_PADDING;
    }
    tooltip.style.left = `${x}px`;
    tooltip.style.top = `${y}px`;
}

function hideTooltip(): void {
    if (!tooltip) return;
    tooltip.style.opacity = '0';
    tooltip.style.transform = 'translateY(4px)';
    tooltip.setAttribute('aria-hidden', 'true');
}

const INIT_FLAG = '_gnshInit';

function isInitialized(el: Element): boolean {
    return !!(el as unknown as Record<string, boolean>)[INIT_FLAG];
}

function markInitialized(el: Element): void {
    (el as unknown as Record<string, boolean>)[INIT_FLAG] = true;
}

/** initBarCharts do JS original, escopado em `root`. */
function initBarCharts(root: ParentNode): void {
    root.querySelectorAll('.gns-bar-chart__bar-group').forEach((group) => {
        if (isInitialized(group)) return;
        markInitialized(group);
        const bar = group.querySelector('.gns-bar-chart__bar');
        const titleEl = bar?.querySelector('title');
        if (!titleEl) return;
        group.addEventListener('mouseenter', (e) => {
            const text = titleEl.textContent ?? '';
            const [label, ...rest] = text.split(': ');
            const value = rest.join(': ');
            const color = bar?.getAttribute('fill') ?? 'var(--gns-primary-500)';
            showTooltip(e as MouseEvent, buildTooltipContent(color, label, value));
        });
        group.addEventListener('mousemove', (e) => positionTooltip(e as MouseEvent));
        group.addEventListener('mouseleave', hideTooltip);
        group.addEventListener('click', () => {
            if (!bar) return;
            (bar as SVGElement).style.transition = 'opacity 100ms ease';
            (bar as SVGElement).style.opacity = '0.5';
            setTimeout(() => {
                (bar as SVGElement).style.opacity = '1';
            }, 200);
        });
    });
}

const DOT_RADIUS_DEFAULT = '4';
const DOT_RADIUS_HOVER = '6';

/** initLineCharts do JS original, escopado em `root`. */
function initLineCharts(root: ParentNode): void {
    root.querySelectorAll('.gns-line-chart__dot').forEach((dot) => {
        if (isInitialized(dot)) return;
        markInitialized(dot);
        const titleEl = dot.querySelector('title');
        if (!titleEl) return;
        dot.addEventListener('mouseenter', (e) => {
            const text = titleEl.textContent ?? '';
            const color = dot.getAttribute('fill') ?? 'var(--gns-primary-500)';
            showTooltip(e as MouseEvent, buildTooltipContent(color, text, ''));
            dot.setAttribute('r', DOT_RADIUS_HOVER);
            (dot as SVGElement).style.filter = `drop-shadow(0 0 4px ${color})`;
        });
        dot.addEventListener('mousemove', (e) => positionTooltip(e as MouseEvent));
        dot.addEventListener('mouseleave', () => {
            hideTooltip();
            dot.setAttribute('r', DOT_RADIUS_DEFAULT);
            (dot as SVGElement).style.filter = '';
        });
    });
}

function initAll(root: ParentNode): void {
    initBarCharts(root);
    initLineCharts(root);
}

/**
 * Anexa a interatividade (tooltips/hover) aos charts dentro de `root` e
 * observa mutações para reinicializar quando o chart troca (observer.ts
 * do JS original, reduzido aos charts usados pelo composite).
 * Retorna função de cleanup para o DestroyRef do componente.
 */
export function attachChartInteractivity(root: HTMLElement): () => void {
    const raf = (cb: () => void): number => requestAnimationFrame(cb);
    const scheduleInit = () => raf(() => initAll(root));
    scheduleInit();

    const CHART_SELECTOR = '.gns-bar-chart, .gns-line-chart';
    const observer = new MutationObserver((mutations) => {
        for (const mutation of mutations) {
            for (const node of mutation.addedNodes) {
                if (node.nodeType !== Node.ELEMENT_NODE) continue;
                const el = node as Element;
                if (el.matches?.(CHART_SELECTOR) || el.querySelector?.(CHART_SELECTOR)) {
                    scheduleInit();
                    return;
                }
            }
        }
    });
    observer.observe(root, { childList: true, subtree: true });

    return () => {
        observer.disconnect();
    };
}
