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
  ```

## Project To-Do List

- [x] Setup project repo
- [x] Create a project plan
- [x] Implement NavBar
- [x] Implement Footer
- [x] Implement universal header
- [x] Design skull patterns in a JSON file & implement logic to render out the board using these designs & apply appropriate styling.
- [x] Use designs to create flashy animation on home page.
- [x] Add menu to home pg that links to each difficulty mode & implement routes for each.
- [x] Add logic to randomly render skull of a max row length depending on difficulty. Eg. easy difficulty will only include skulls with 3 - 5 characters per row.
- [x] Add logic to handle keyboard events so that users can type out each row.
- [x] Add logic to submit each completed row & check for validation.
- [x] Implement preview for last word entered and have it linked to a modal that opens up to display all attempted words.
- [x] Add logic to display words preview in modal based on current row. Allow users to check prior row entries too via arrow buttons at the top of the modal menu.
- [x] Implement & track total lives.
- [x] Add logic to handle game over (all lives are exhausted or all rows are completed successfully).
- [x] Add logic to toggle entered words preview modal by either pressing and holding shift or pressing space bar once.
- [x] Implement virtual keyboard & style it.
- [x] Add logic to words preview to display validation for each character entered. If a character is in the correct location it should be green. If it is in the word but in the wrong location, it should be yellow.
- [x] Add logic to both virtual keyboard and apply validation logic to highlight keys are displayed as valid/invalid using the same colour coded logic as the step above for entered words preview.
- [x] Implement button to handle light/dark mode.
- [x] Apply styling to all elements based on light/dark mode.
- [x] Add logic to preserve light/dark mode setting in local storage.
- [x] Add game over menu that displays words completed, lives used, and time spent.
- [x] Add unit tests & start consistently unit testing each component alongside each feature/update etc.
- [x] Deploy to production via Digital Ocean
- [x] Add to Cloudflare CDN
- [x] Apply SSL cert
- [x] Create a dynamically generated sitemap & submit website/sitemap to Google Search Console & Bing Webmaster for indexing.
- [x] Update Readme
- [x] Generate a list of words for each character length & host file on Cloudflare R2. Have the file be loaded from API with a smaller list of words available within the repo for the app to fallback to incase of failure to connect with R2 bucket.
- [x] Add logic to game over menu to allow users to download/copy/share a snapshot of their gameplay results.
- [x] Add play again button to game over menu.
- [x] Update Readme
- [x] Add buttons in game page header to allow users to view game over modal (when game ends), stats modal, instructions anchor link, and settings modal.
- [x] Add gameplay instructions to be displayed under keyboard, which includes simple text and image instructions.
- [x] Implement settings modal.
- [x] Implement responsive design for all existing pages.
- [x] Implement a virtual mobile keypad for small to medium screens while hiding virtual keyboard. Display virtual keyboard and hide virtual keypad for medium/large screens.
- [x] Add button & logic to settings modal to hide/show virtual keyboard.
- [x] Add logic to keyboard/keypad to allow users to interact directly with virtual keyboard.
- [x] Add settings to toggle on/off keyboard interactivity.
- [x] Add settings to hide/show gameplay instructions.
- [ ] Use react portals to render modal correctly.
- [ ] End 2 End Testing
- [ ] Add PostHog to track user analytics
- [ ] Mark existing repo as demo, clone Repo, make new repo private, continue work on private repo.
- [ ] Animate the eyes.
- [ ] Add character description page for each skull.
- [ ] Add unique dialogue/text for each skull.
- [ ] Add gameplay animations to make game feel more rewarding.
- [ ] Implement db & server side logic to create universal puzzles that can be shared by users. Use this logic to include daily puzzles that are the same for all users.
- [ ] Implement blog page to utilize .mdx pages to post well formatted blogs easily.
- [ ] Implement db table to track & manage stats currently being managed by context/local storage.
- [ ] Implement stats page which will allow users to track stats across all game modes.
- [ ] Use chart.js to add graphs to stats page.
- [ ] Try Drizzle ORM
- [ ] Implement user login w/ custom auth logic
- [ ] Implement social user login w/ OAuth
- [ ] Implement Zen game mode which provides the users with unlimited lives/attempts
- [ ] Implement Challenge game mode which includes a countdown timer to complete challenge
- [ ] Implement Num Skull - Word skull with numbers
- [ ] Implement Sum Skull - Addition game
- [ ] Implement Sub Skull - Subtraction game
- [ ] Implement Div Skull - Division game
- [ ] Implement Mull Skull - Multiplication game
- [ ] Implement World Skull - Geography trivia word game
- [ ] Implement Food Skull - Food trivia word game
- [ ] Implement Food Skull - Food trivia word game
- [ ] Implement Leaderboard for each game type
- [ ] Implement Leaderboard that summarizes all gameplay activity across the site
- [ ] Add comprehensive FAQ page
- [ ] Add advanced game settings eg. sound, disable entered words menu, etc.
- [ ] Add contact form using Nodemailer and AWS SES for email & Cloudflare turnstile for CAPTCHA.
- [ ] Add custom theme options & accessability features.
- [ ] Start work on implementing games for mobile using React Native.
