/*jshint esversion: 6 */
var rectElements = document.querySelectorAll('.rect-class');

console.log('Here are the rectangle IDs');
for(var rectangle of rectElements) {
  console.log(rectangle.id);
}