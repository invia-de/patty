export default function(data) {
  if (window.dataLayer && window.dataLayer.push) {
    window.dataLayer.push(data);
  }
}
