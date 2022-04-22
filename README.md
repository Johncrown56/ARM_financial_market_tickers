# ARM_financial_market_tickers
Please find below answers to the following questions.

## 1. How long did you spend on the coding test?
I received the technical question on Thursday morning (21/04/2022) and i started the coding test in the afteroon at exactly 11:45am. Then i finished on Friday 22/04/2022 at exactly 2:58PM. That's development time of about 15 hours in aggregate.

## 2. What would you add to your solution if you had more time? 
## If you did not spend much time on the coding test, then use this as an opportunity to explain what you would add.
I would rather consume more APIs especially the market performation API.

## 3. What was the most useful feature that was added to the latest version of your chosen language? 
## Please include a snippet of code that shows how you have used it.
The chosen language is Angular and the latest version is 13.3.3 with TypeScript version 4.6.3. 
The new feature i detected is the "noPropertyAccessFromIndexSignature" settings on TypeScript. This settings ensures consistency between accessing a field via the “dot” (obj.key) syntax, and “indexed” (obj["key"]) and the way which the property is declared in the type. Please find more information here https://www.typescriptlang.org/tsconfig#noPropertyAccessFromIndexSignature

For example, in my code, instead of writing this line of code "this.form.controls.selectedCountries", it has been changed to "this.form.controls["selectedCountries"]"
Below is the snippet of the function i called the line of code above;

```
  onCountryChange(event: any) {
    const selectedCountry = (this.form.controls["selectedCountries"] as FormArray);
    if (event.target.checked) {
      selectedCountry.push(new FormControl(event.target.value));
    } else {
      const index = selectedCountry.controls
      .findIndex(x => x.value === event.target.value);
      selectedCountry.removeAt(index);
    }
  }
 ```

## 4. How would you track down a performance issue in production? Have you ever had to do this? 
Yes, i have, but was done on a pre-production environment. In my current organisation, we deploy code on three servers, one is test, the second is pre-production while the third is production server. Every code is first developed on test, thereafter deployed on pre-production and thereafter on production. So, all the production code are duplicated on pre-production server. However, if i want to trackdown an issue in production, i'll go to pre-production server to track it and then rectify it there or move it back to test server for resolution.

## 5. How would you improve the Just marketaux that you just used? 
Aside the design or asthetics part, firstly, I would display the author or contributor parameters as apart of the values for each finance and market news. 
Secondly, I would introduce more countries such as the African Countries like Nigeria etc.
Thirdly, I Would increase the limit of the response data after fetching from 3 to 10 for the free plan.
