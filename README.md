# VRDB
This website is a community-driven effort to provide an open database that helps users determine wich games are compatible with Linux and potentially discover solutions or workarounds for specific issues.
https://db.vronlinux.org/

## Support

Thanks for reading this! Feel free to contribute with code — or, if you'd like to support the project, you can always [buy me a coffee](https://coff.ee/respuit).

[![Buy Me a Coffee](https://img.shields.io/badge/Buy%20me%20a%20coffee-donate-yellow.svg)](https://coff.ee/respuit)


## Local development

To install the dependencies run:

```
npm install
```

To start the project run:

```
npm run serve
```

To view the project visit: http://localhost:8080/VRDB/.

## Generation styles

The site uses SASS to generate styles. In order to generate the styles from
scss to css the following command nneds to be executed:

- npm run build-css

Background is a modification based on the snipet from Saransh Sinha

## TODO
- [x] Make an action to build, transfer the public content and deploy the page.
- [ ] Add a section for VR headsets/hardware.
- [ ] Potentially add a tutorials section where people could post a write up for expecific conbinations of hardware/softweare or edge cases.
