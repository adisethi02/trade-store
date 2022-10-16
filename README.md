# TradeStore

A realtime trading platform where user can add trades in the trade store and view its live processing based on below scenarios:
* During transmission if the lower version is being received by the store it will reject the trade and throw an exception. If the version is same, it will override the existing record.
* Store should not allow the trade which has less maturity date then today date.
* Store should automatically update the expire flag if in a store the trade crosses the maturity date.

![img.png](images/img.png)

##Technology Used

###Google Firestore

The Firebase Realtime Database is a cloud-hosted database. Data is stored as JSON and synchronized in realtime to every connected client. When you build cross-platform apps with our Apple platforms, Android, and JavaScript SDKs, all of your clients share one Realtime Database instance and automatically receive updates with the newest data.
(https://firebase.google.com/docs/database)

### Ag-Grid
Here we are using Infinite row model which allow us scrolling the grid to lazy-load rows from the server depending on what the scroll position is of the grid. In its simplest form, the more the user scrolls down, the more rows get loaded, and also we remove the older records based on cache configuration.

![img_1.png](images/img_1.png)
(https://ag-grid.com/)

###Angular Material
(https://material.angular.io/)

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

You can update below firebase configuration in environment.ts file as per your account, existing configuration would also work.

`firebase: {
apiKey: "AIzaSyCTbSd6A0sMUwozTLt5aFnOv92Jq4N6ASA",
authDomain: "trade-store-874a5.firebaseapp.com",
projectId: "trade-store-874a5",
storageBucket: "trade-store-874a5.appspot.com",
messagingSenderId: "628591833680",
appId: "1:628591833680:web:0d9abb26348cce9884d755",
measurementId: "G-HYK33H7MG4"
}`

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

I have mainly covered the core logic which resides in _src/app/trade-service_ which gives below coverage summary

* Statements   : 57.14% ( 60/105 )
* Branches     : 63.15% ( 36/57 )
* Functions    : 46.42% ( 13/28 )
* Lines        : 54.34% ( 50/92 )
