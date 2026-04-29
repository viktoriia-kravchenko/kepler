# Kepler Habitable Exoplanet Finder

A Node.js script that parses NASA's Kepler mission dataset to identify potentially habitable exoplanets based on
established astrophysical criteria.

## Overview

The [Kepler Space Telescope](https://www.nasa.gov/mission_pages/kepler/overview/index.html) mission catalogued thousands
of exoplanet candidates by detecting the dimming of stars as planets transited in front of them. This tool filters that
dataset down to planets that meet the three key conditions for habitability: confirmed status, Earth-like size, and a
stellar flux that could support liquid water.

## Habitability Criteria

A planet is considered potentially habitable if it satisfies all three conditions:

| Criterion           | Field             | Condition                  | Rationale                                                            |
|---------------------|-------------------|----------------------------|----------------------------------------------------------------------|
| Confirmed planet    | `koi_disposition` | `CONFIRMED`                | Excludes candidates and false positives                              |
| Earth-like size     | `koi_prad`        | `< 1.6` Earth radii        | Planets above this threshold tend to be gaseous rather than rocky    |
| Habitable zone flux | `koi_insol`       | `0.36 – 1.11` Earth fluxes | Stellar insolation range where liquid water can exist on the surface |

## Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher (ESM support required)

## Installation

```bash
git clone https://github.com/viktoriiakravchenko/kepler.git
cd kepler
npm install
```

## Usage

```bash
node index.js
```

The script streams through `kepler_data.csv`, applies the habitability filters, and prints the names and total count of
matching planets:

```
[ 'Kepler-442 b', 'Kepler-62 f', ... ]
We found 8 habitable exoplanets
```

## Data Source

`kepler_data.csv` is produced by the [NASA Exoplanet Archive](https://exoplanetarchive.ipac.caltech.edu/). The file
included in this repository is a snapshot of the Kepler Objects of Interest (KOI) cumulative table.

## Dependencies

| Package                                  | Purpose              |
|------------------------------------------|----------------------|
| [`csv-parse`](https://csv.js.org/parse/) | Streaming CSV parser |
