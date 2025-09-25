# GEE Scripts for Global PM2.5 Analysis

This repository provides a set of Google Earth Engine (GEE) scripts for retrieving, analyzing, and exporting **satellite-derived PM2.5 concentrations** from the **GLOBAL-SATELLITE-PM25** dataset. The tools are designed for environmental monitoring, air quality assessment, and spatiotemporal analysis at both global and national scales.

## 📦 Contents

The project includes scripts for:
- Temporal aggregation of PM2.5 at the **country level** (monthly time series, 2000–2021).
- Spatial stacking of yearly PM2.5 images into a **single multiband raster** (2000–2021).
- CSV exports for statistical analysis.
- GeoTIFF exports for geospatial workflows.

### Folders Overview

| Folder Name              | Description |
|---------------------------|-------------|
| `Temporal_PM25_Country`  | Monthly PM2.5 aggregated by country boundaries with CSV export |
| `Yearly_PM25_Multiband`  | Yearly PM2.5 stacked into one multiband image (2000–2021) |

## 🛰 Dataset Information

**Dataset:** Global Monthly & Annual Satellite-derived PM2.5  
**Provider:** Atmospheric Composition Analysis Group, Washington University in St. Louis  
**Curated in GEE by:** Samapriya Roy  
**License:** [Creative Commons Attribution 4.0 International (CC BY 4.0)](https://creativecommons.org/licenses/by/4.0/)  

**Citation:**  
Shen, S., Li, C., van Donkelaar, A., Jacobs, N., Wang, C., Martin, R. V. (2024). *Enhancing Global Estimation of Fine Particulate Matter Concentrations by Including Geophysical a Priori Information in Deep Learning*. ACS ES&T Air. DOI: [10.1021/acsestair.3c00054](https://doi.org/10.1021/acsestair.3c00054)

**Key Features:**  
- **Time Span:** 2000–2019 (V6.GL.01), extended through 2022 (V6.GL.02)  
- **AOD Data Sources:** MODIS, MISR, SeaWIFS, VIIRS  
- **Calibration:** GEOS-Chem model + residual Convolutional Neural Network (CNN) against global ground-based observations  
- **Resolution:** 0.01° × 0.01° (~1 km)  
- **Format:** NetCDF, integrated into Earth Engine ImageCollections  

## 📬 Contact

For questions, collaboration, or feedback:  

- **Author**: Armin Nakhjiri  
- **Email**: [nakhjiri.armin@gmail.com](mailto:nakhjiri.armin@gmail.com)  
- **LinkedIn**: [Armin Nakhjiri](https://www.linkedin.com/in/arminnakhjiri/)  
