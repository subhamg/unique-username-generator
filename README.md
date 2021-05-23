# unique-username-generator

A package to generate a unique username from email or randomly selected nouns and adjectives. User can add a separator between the username, define the maximum length of a username and adds up to six random digits.

## Installation

```javascript
npm install unique-username-generator --save
```

- Importing

```javascript
// Using Node.js `require()`
const genUsername = require("unique-username-generator");
// Using ES6 imports
import genUsername from "unique-username-generator";
```

## Usage

### Generate username from email

It will generate username from email and add upto six random digits at the end of the name.

```javascript
// add three random digits
const username = genUsername.generateFromEmail(
  "lakshmi.narayan@example.com",
  3
);
console.log(username); // lakshminarayan234

// add four random digits
const username = genUsername.generateFromEmail(
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
const username = genUsername.generateUsername();
console.log(username); // blossomlogistical

// With any separator like "-, _"
const username = genUsername.generateUsername("-");
console.log(username); // blossom-logistical

// With random digits and no separator
const username = genUsername.generateUsername("", 3);
console.log(username); // blossomlogistical732

// With maximum length constraint and no separator, no random digits
const username = genUsername.generateUsername("", 0, 15);
console.log(username); // blossomlogistic

// With maximum length constraint and separator but no random digits
const username = genUsername.generateUsername("-", 0, 15);
console.log(username); // blossom-logisti

// With maximum length constraint and random digits but no separator
const username = genUsername.generateUsername("", 2, 19);
console.log(username); // blossomlogistical73

// With all parameters
const username = genUsername.generateUsername("-", 2, 20);
console.log(username); // blossom-logistical73
```
