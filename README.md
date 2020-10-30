# AIRBNB_NYC_in_procces 
![](https://github.com/evgenygrobov/AIRBNB_NYC/blob/main/pictures/ny_baby.jpeg)
# PROJECT DESCRIPTION: 
## What makes someone a superhost?
* Airbnb awards the title of “Superhost” to some fraction of its dependable hosts. 
* Completed at least 10 trips OR completed 3 reservations that total at least 100 nights 
* Maintained a 90% response rate or higher Maintained 
* A 1% percent cancellation rate (1 cancellation per 100 reservations) or lower
* Maintained a 4.8 overall rating

## Data
* The data is sourced from the Inside Airbnb website http://insideairbnb.com/get-the-data.html which hosts publicly available data from the Airbnb site.

 * Detailed listings data showing 96 atttributes for each of the listings. Some of the attributes used in the analysis are price (continuous), longitude (continuous), latitude (continuous), listing_type (categorical), is_superhost (categorical), neighbourhood (categorical), ratings (continuous) among others.

* A quick glance at the data shows that there are: 45756 unique listing in NYC in total.
* How likely the SuperHost's listings prices are higher than not a SuperHost.

## Analisys

## Exploratory Data Analysis
In this section, I will detail the  analysis to the questions of interest mentioned in the introduction and gain preliminary insights through exploratory data analysis and visualization. 
* Airbnb users (customers) rate their stay on the basis of location, cleanliness and a host of other parameters. Here we work with the location score data. It would be interesting to see the average location scores for each neighbourhood. The location scores have to be a firm indicator of the appeal of the neighbourhood. Highly rated neighbourhoods will tend to have better connectivity (subway stations), will tend to be closer to the city hotspots (Times Square, Emire State, Wall Street).
### Which area is the best?
![](https://github.com/evgenygrobov/AIRBNB_NYC/blob/main/pictures/location%20ratings%20.png)

The graph confirms the theory and some more. Manhattan receives the highest location scores for the downtown region, Brooklyn neighbourhoods close to Manhattan tend to have higher location ratings. Looking at the NY subway system in Brooklyn, it is interesting to observe that the highly rated areas correspond with subway line presence. The same is true for Bronx where subway lines do not go.

### Which area is expensive?
![](https://github.com/evgenygrobov/AIRBNB_NYC/blob/main/pictures/price%20higher%20median.png)

For clarity sake I filtered out price less then median price across the city. As we see downtown Manhattan is the clear winner when it comes to high rents, as is true for the neighbourhoods of Brooklyn close to Manhattan. The East Village area in Downtown Manhattan is a clear outlier, where both rents and location scores tend to be lower than its surrounding regions.

### What types of listings in NYC?
![](https://github.com/evgenygrobov/AIRBNB_NYC/blob/main/pictures/listings_type.png)

## How the superhost are distributed across the city?

![](https://github.com/evgenygrobov/AIRBNB_NYC/blob/main/pictures/host%20distributions%20.png)
