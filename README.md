# music-discoverer

Discover new music! **Remember to support** your favourite artists and local music scene.

## Requirements

- nodejs

## Installation

- clone the repo
- install the latest LTS version of node
- `npm install` (with your `current working directory` set to the repository root. this is where the package.json file is)

## Examples

Usage is very simple:

```
node src/index.js "YOUR ARTIST NAME" "YOUR ALBUM NAME" "https://...YOUTUBE LINK TO ALBUM ..."
```

An example for 

```
node src/index.js "Slayer" "Show No Mercy" "https://www.youtube.com/watch?v=rF_77Bsctds"
```

## Future Features

- tag metadata via [Beets](https://beets.readthedocs.io/en/stable/)
- link to artist website, tours, merchandise
- suggest similar artists
- suggest local artists 
- find local gigs
- create a web interface
- containerize

## Future project direction

- rewrite to Haskell/Rust

## Troubleshooting

```
ftp ${HOST} ${PORT}

ftp put /path/to/file Music/destination/path
```