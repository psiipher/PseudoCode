# verify-certification

verify-certification is a node module to verify the authenticity of MOOC course completions

## Installation

Use [npm](https://www.npmjs.com) to install verify-certification.

```bash
npm install verify-certification
```

## Usage

#### Import

```js
var cert= require('verify-certification');

```
#### Verify

verify() method takes certificate type and certificate ID as parameters and returns an object with the certificate details (if valid)



```js
cert.verify(type,certificateID);
```

Example

```js
cert.verify("udemy","UC-76454752-4468-4df3-8df4-104042fc5428").then((res)=>
{
    console.log(JSON.stringify(res));
}

```


#### Certificate Object

The method returns an object that is not unique across all certificate types. Please refer to the table for the list of parameters

[![2ZYT](https://iili.io/2ZYTLx.md.png)](https://freeimage.host/i/2ZYTLx)


## Contributing
Pull requests a Description
 For major changes, please open an issue first to discuss what you would like to change.

## License
[ISC](https://choosealicense.com/licenses/isc/)

## Disclaimer

This is an unofficial package. Package contributors are not responsible for any misuse.
