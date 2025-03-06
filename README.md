# Submit Tax Project

This project is a web application for submitting tax information.

## Prerequisites

- Node.js (version 14 or higher)
- Angular CLI

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/nonava172352/pcc-test.git
   ```

2. Navigate to the project directory:
   ```bash
   cd pcc-test/submit-tax
   ```

3. Install the dependencies:
   ```bash
   npm install
   ```

## Running the Project

1. Navigate to the `submit-tax` directory:
   ```bash
   cd submit-tax
   ```

2. If you encounter the following error:
   ```
   Error: error:0308010C:digital envelope routines::unsupported
   ```
   Set the `NODE_OPTIONS` environment variable:
   ```bash
   set NODE_OPTIONS=--openssl-legacy-provider
   ```

3. Start the development server:
   ```bash
   ng serve
   ```

4. Open your browser and navigate to `http://localhost:4200`.

## Building the Project

To build the project for production, run:
```bash
ng build
```

The build artifacts will be stored in the `dist/` directory.

## Running Unit Tests

To execute the unit tests via [Karma](https://karma-runner.github.io), run:
```bash
ng test
```

## Running End-to-End Tests

To execute the end-to-end tests via [Protractor](http://www.protractortest.org/), run:
```bash
ng e2e
```

## Further Help

To get more help on the Angular CLI, use:
```bash
ng help
```

For more information on Angular, visit the [Angular Documentation](https://angular.io/docs).