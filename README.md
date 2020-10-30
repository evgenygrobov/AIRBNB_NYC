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


### How the hosts are represented across the city?

![](https://github.com/evgenygrobov/AIRBNB_NYC/blob/main/pictures/Superhost%20market%20share.png)
Not much Superhosts. 9000 or  20% of the host is Superhost. Manhattan share is 38% and Brooklyn has 44%

### How the price and ratings are statistically distributed between two groups?


|  Host Bage       | Price               |   Review Rating         | Availability.        |
|:-----------------|:-------------------:|:-----------------------:|:--------------------:|
| Host             | 100                 | 97.0                    | 1                    |
| Super Host       | 100                 | 97.0                    | 155                  |


![](https://github.com/evgenygrobov/AIRBNB_NYC/blob/main/images/price_distr.png)

![](https://github.com/evgenygrobov/AIRBNB_NYC/blob/main/images/review-2.png)

![](https://github.com/evgenygrobov/AIRBNB_NYC/blob/main/images/availability.png)

## Hypothesys testing!
A Mann-Whitney U test (sometimes called the Wilcoxon rank-sum test) is used to compare the differences between two samples when the sample distributions are not normally distributed. 
Since Airnbnb dataset matches all conditions above I  performed U-test.
To test this I extracted two dataframes for each group and converted them to one-dimensional array.
* I want to know how likely  a SUPERHOST bage leads to a higher listing's price on AIRBNB in NYC .
* Null hypothesys is SuperHost listings price distribution = Not Superhost listings price distribution
* Alternative hypothesys is SuperHost listings price distibution != Not SuperHost listings price distribution 
* Signnificance level threshold is 5%.

`from scipy.stats import mannwhitneyu`

`stat, p = mannwhitneyu(SH, NSH, alternative='greater')`

`print('stat=%.3f, p=%.3f' % (stat, p))`

`if p > 0.05:`

    `print('Probably the same distribution')`
    
`else:`

    `print('Probably different distributions')`
    
`stat=173033458.500, p=0.000`

`Probably different distributions`

## Since p-value is less than 0.05 we can reject the null hypothesis. We do have sufficient evidence to say that the listing price distribution is different between Superhost and just a host.
### Lets take a closer look at the  data from statistical prospective.I calculated 5 numbers summary for each group. And we see a difference in price distribution.


|    Stats         | Superhost           |   Host                  | 
|:-----------------|:-------------------:|:-----------------------:|
| min              | 0.0.                | 0.0                     | 
| 25%              | 68.0                | 63.0.                   | 
| 50%              | 100.0               | 100.0                   | 
| 75%              | 160.                | 159.0                   | 
| max              | 999.0               | 999.0                   | 

## We can see from  table above that we have  difference in listings price between two groups. Lets plot it up!

![](https://github.com/evgenygrobov/AIRBNB_NYC/blob/main/pictures/statistical%20view%20on%20price%20distribition.png)

##Conlution:
