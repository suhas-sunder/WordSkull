# WordSkull
A word game website project based on **Wordle**.

I'm using **Remix** with **Vite**, **Tailwind CSS**, **Express**, **PostgreSQL**, **Digital Ocean** for hosting, **Cloudflare CDN**, **Cloudflare R2**, **Vitest** for unit, component, & integration testing, and **Selenium** w/ Python for end-to-end testing (coming soon).

This project is still in development but can be viewed live on [WordSkull](https://www.wordskull.com/).

![WordSkull Image](https://github.com/user-attachments/assets/cfa151d8-6c80-495e-a44a-e8325a30d133)

---

## Table of Contents
- [How to Use](#how-to-use)
- [Home Page Features](#home-page-features)
- [Responsive Design](#responsive-design)
- [Classic WordSkull Game](#classic-wordskull-game)
- [Testing](#testing)

## How To Use

1. **Clone the Repository**:
   - Clone the repository to your local machine:
     ```bash
     git clone <repository-url>
     ```
   - Alternatively, download the ZIP and extract it to your local machine.

2. **Install Dependencies**:
   - Navigate to the project folder and install the required dependencies:
     ```bash
     npm install
     ```

3. **Run the Development Server**:
   - Start the local development server:
     ```bash
     npm run dev
     ```
   - Access the app via your browser at `http://localhost:3000` (or another port depending on your setup).

4. **Build for Deployment**:
   - Build the production version:
     ```bash
     npm run build
     ```
   - The optimized files will be in the `dist` or `build` folder for deployment.

5. **Run Tests**:
   - Ensure everything works by running:
     ```bash
     npm test
     ```

## Home Page Features
- Toggle between **light** and **dark mode** with a single click.
  
![Home Page Light Mode](https://github.com/user-attachments/assets/ca4f0399-8c0f-4b90-8ea0-01bc1d278764)
![Home Page Dark Mode](https://github.com/user-attachments/assets/7717845b-5acc-4835-9dca-f96a2f12d636)

### Difficulty Levels:
- **Easy**: 3 - 5 letters
- **Medium**: 3 - 6 letters
- **Hard**: 3 - 7 letters
- **Extreme**: 3 - 9 letters

![Select Difficulty](https://github.com/user-attachments/assets/27b6399e-d77d-4b84-a6ce-fc5b28ab794c)

## Responsive Design
The app is optimized for all screen sizes!

![Responsive Design](https://github.com/user-attachments/assets/833a310e-860a-4b00-ad44-16e9b490cd4a)

## Classic WordSkull Game Page - Easy Mode
- Learn how to play: [Word Skull Game Easy Mode Instructions](https://www.wordskull.com/word-skull-game-easy-mode/#gameplay-instructions)

![Game Page - Easy Mode](https://github.com/user-attachments/assets/cc25033b-b177-4aaa-b4f4-5c4f3ba5021f)

---

## Testing
- Run the test suite:
  ```bash
  npm test
