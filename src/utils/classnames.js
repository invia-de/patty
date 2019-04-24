// Composes several classnames into one string
// example:
// let condition = false;
// cx(conditon && 'container', styles.margin_top, 'xyz') => 'component_margin_top_xu3on xyz'
export default function cx(...args) {
  return args.filter(str => typeof str === 'string').join(' ');
}
