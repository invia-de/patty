export default function(val) {
  return !isNaN(parseFloat(val)) && isFinite(val);
}
