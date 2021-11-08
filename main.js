var num1 = 0;
var num2 = 1;
var num3 = num1 + num2;
var times = $randInt(2, 5);
// Fibonacci
var i = 0;
while (i < times) {
	i += 1;
	num1 = num2;
	num2 = num3;
	num3 = num1 + num2;
}
$print(num3)
const hi = "Hello!";
//print(num3);
// Name Check
var name = "TeakIvy";
if (name != "TeakIvy") {
	$print("You are not Teak.")
} else {
	$print("You are Teak.")
}
// Arrays
var ages = [10, 4, 16];
var teakAge = ages[2];
$print(teakAge)
$print(ages[2])
ages[2] = 18;
$print(ages[2])
getName()
function getName() {
	return name;
}
var getNameLambda = () => {
	return name;
};
$print(getNameLambda() + " " + getName() + " Hi")
for (var i = 1; i < 4000; i += 2) {
	if (i > 20) {
		break;
	}
	$print(i)
}
for (let i = 0; i < 4; i++) {
	$print(7)
}
$print(range(10))
for (const i of range(2, 7)) {
	$print("Hello " + i)
}
$print("done")

// Runtime Functions

function $print(...obj) {
	console.log(...obj);
}

function $randInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function range(start, end) {
	if (end === undefined) {
		end = start;
		start = 0;
	}
	return Array.from({ length: end - start }, (_, i) => i + start);
}
