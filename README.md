[![](https://img.shields.io/npm/v/unique-username-generator.svg)](https://npmjs.org/package/unique-username-generator)
[![Total alerts](https://img.shields.io/lgtm/alerts/g/subhamg/unique-username-generator.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/subhamg/unique-username-generator/alerts/)
[![Language grade: JavaScript](https://img.shields.io/lgtm/grade/javascript/g/subhamg/unique-username-generator.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/subhamg/unique-username-generator/context:javascript)
![npm](https://img.shields.io/npm/dt/unique-username-generator)
![NPM](https://img.shields.io/npm/l/unique-username-generator)

[![visitors](https://api.visitorbadge.io/api/visitors?path=https%3A%2F%2Fgithub.com%2Fsubhamg%2Funique-username-generator&countColor=%232ccce4&style=flat)](https://visitorbadge.io/status?path=https%3A%2F%2Fgithub.com%2Fsubhamg%2Funique-username-generator)
<span class="badge-buymeacoffee">
<a href="https://www.buymeacoffee.com/subhamg" title="Donate to this project using Buy Me A Coffee"><img src="https://img.shields.io/badge/buy%20me%20a%20coffee-donate-yellow.svg" alt="Buy Me A Coffee donate button" /></a>
</span>

# unique-username-generator

A package to generate a unique username from email or randomly selected nouns and adjectives. User can add a separator between the username, define the maximum length of a username and adds up to six random digits.

[![NPM](https://nodei.co/npm/unique-username-generator.png)](https://nodei.co/npm/unique-username-generator/)

## Installation

```javascript
npm install unique-username-generator --save
```

- Importing

```javascript
// Using Node.js `require()`
const { generateFromEmail, generateUsername } = require("unique-username-generator");
// Using ES6 imports
import { generateFromEmail, generateUsername } from "unique-username-generator";
```

## Usage

### Generate username from email

It will generate username from email and add upto six random digits at the end of the name.

```javascript
// add three random digits
const username = generateFromEmail(
  "lakshmi.narayan@example.com",
  3
);
console.log(username); // lakshminarayan234

// add four random digits
const username = generateFromEmail(
  "lakshmi.narayan@example.com",
  4
);
console.log(username); // lakshminarayan2347
```

### Randomly generate unique username.

It will generate unique username from adjectives, nouns, random digits and separator. You can control these following parameters - separator, number of random digits and maximum length of a username.

```javascript
// generaterUsername(separator, number of random digits, maximum length)

// Without any parameter
const username = generateUsername();
console.log(username); // blossomlogistical

// With any separator like "-, _"
const username = generateUsername("-");
console.log(username); // blossom-logistical

// With random digits and no separator
const username = generateUsername("", 3);
console.log(username); // blossomlogistical732

// With maximum length constraint and no separator, no random digits
const username = generateUsername("", 0, 15);
console.log(username); // blossomlogistic

// With maximum length constraint and separator but no random digits
const username = generateUsername("-", 0, 15);
console.log(username); // blossom-logisti

// With maximum length constraint and random digits but no separator
const username = generateUsername("", 2, 19);
console.log(username); // blossomlogistical73

// With all parameters
const username = generateUsername("-", 2, 20);
console.log(username); // blossom-logistical73
```

### Default dictionaries

By default, the unique username generator library comes with 2 dictionaries out of the box, so that you can use them straight away.

The new syntax for using the default dictionaries is the following:

```javascript
import { uniqueUsernameGenerator, Config, adjectives, nouns } from 'unique-username-generator';

const config: Config = {
  dictionaries: [adjectives, nouns]
}

const username: string = uniqueUsernameGenerator(config); // blossomlogistical
```

### Custom dictionaries

You might want to provide your custom dictionaries to use for generating your unique username, in order to meet your project requirements. You can easily do that using the dictionaries option.

```javascript
import { uniqueUsernameGenerator } from 'unique-username-generator';

const marvelCharacters = [
  'Iron Man',
  'Doctor Strange',
  'Hulk',
  'Captain America',
  'Thanos'
];

const config: Config = {
  dictionaries: [marvelCharacters],
  separator: '',
  style: 'capital',
  randomDigits: 3
}

const username: string = uniqueUsernameGenerator(config); // Hulk123
```

## API

### uniqueUsernameGenerator (options)
Returns a `string` with a random generated username

### options

Type: `Config`

The `options` argument mostly corresponds to the properties defined for uniqueUsernameGenerator. Only `dictionaries` is required.


| Option       | Type                                | Description                                                                                                                                                                                                                                                                         | Default value | Example value                                                                                                                                                                                                           |
|--------------|-------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| dictionaries | `array`                             | This is an array of dictionaries. Each dictionary is an array of strings containing the words to use for generating the string.<br>The provided dictionaries can be imported from the library as a separate modules and provided in the desired order.                              | n/a           | <br>```import { uniqueUsernameGenerator, adjectives, nouns } from 'unique-username-generator';```<br>```const username: string = uniqueUsernameGenerator({ dictionaries: [nouns, adjectives]}); // blossomlogistical``` |
| separator    | `string`                            | A string separator to be used for separate the words generated. The default separator is set to be empty string.                                                                                                                                                                    | ""            | `-`                                                                                                                                                                                                                     |
| randomDigits | `number`                            | A number of random digits to add at the end of a username.                                                                                                                                                                                                                          | 0             | `3`                                                                                                                                                                                                                     |
| length       | `number`                            | A maximum length of a username                                                                                                                                                                                                                                                      | 15            | `12`                                                                                                                                                                                                                    |
| style        | `lowerCase \| upperCase \| capital` | The default value is set to `lowerCase` and it will return a lower case username.<br>By setting the value to `upperCase`, the words, will be returned with all the letters in upper case format.<br>The `capital` option will capitalize each word of the unique username generated | lowerCase     | `lowerCase`                                                                                                                                                                                                             |

## License

The MIT License.

## Thank you
If you'd like to say thanks, I'd really appreciate a coffee :)

<a href="https://www.buymeacoffee.com/subhamg" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" style="height: 50px !important;width: 200px !important;" ></a>