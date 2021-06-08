# AsappChallenge

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version **8.2** and updated to version **11**.

## Development server

Run `npm run start` or `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

Run `npm run test` to execute the unit tests with coverage.
Currently, the project has **100% coverage**.

## Usability Issues

- The user can not see all preferred cities at once. He has to filter and search to remember.
- The filter input placeholder is too long for mobile view.

## UI proposal

- Use chips to show all preferred cities previously selected, inside the same input or above. [Example](https://user-images.githubusercontent.com/2288896/72023940-2c426300-3242-11ea-9b0d-7e77fd154602.png)
- With the chips approach, a better way is to remove the checkboxes and become whole the rows selectable. 
