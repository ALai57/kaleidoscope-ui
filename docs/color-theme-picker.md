# Color Themes

Turns out colors are hard!

https://medium.com/@NateBaldwin/adaptive-color-in-design-systems-7bcd2e664fa0

## Some ideas

### Color pickers

I started by trying to create a color picker that allowed a person to customize
every color in the Color family. This seemed like way too much control, and too
many indpendent axes of change.
https://medium.com/@NateBaldwin/adaptive-color-in-design-systems-7bcd2e664fa0

Library with a pre-built react component. This library has a bare-bones
color-picker, but doesn't have a palette generator. So if I were to use this,
I'd probably use it as a way to select a seed color, and then generate a palette
from the seed.
https://github.com/Wondermarin/react-color-palette#readme

### Color palette generators

A really neat color palette generator. This is just a website, and doesn't seem
to have an open source library that I can use as a plugin.
https://paletton.com/#uid=70X0D0kAwrekztmrPuGK1n5R2k1

The generator above inspired website and open-source package below. This package
could be used to generate themes in a limited capacity.
https://c0bra.github.io/color-scheme-js/
https://github.com/c0bra/color-scheme-js

A neat library that gives a lot of control over generating a family of colors.
This seems useful, but might be too much control. I'm assuming users don't want
to have to understand the color palette/wheel in such detail.
https://danielgamage.github.io/HuePals/
