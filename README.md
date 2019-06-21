# Table.me: Reviews

This is the front-end reviews module for a restaurant booking service. It is built using MongoDB, Express/Node, React.
[Click here to interact with a deployed version of this app](http://bit.ly/table-me-reviews). Table.me: Reviews is a component that displays all reviews submitted by verified users. It is a highly filterable module that displays all information in a easy and user friendly manner.

<img src="https://i.imgur.com/IMe8jVM.gif" />

## Demo

### Restaurant summary displays all information a visitor will need to know about the restaurant:

The restaurant summary section aggregates all user reviews to display it in a variety of ways. The star and number rating system are calculated by the average user rating. The bar graph showcases the percentage of each star rating. It is also clickable so that the user may filter the reviews according to the rating.

<img src="https://i.imgur.com/EUdSWv0.gif" />

### Reviews are sortable and filterable for ease of use:

The list of reviews are able to be sorted by newest, highest rating, and lowest rating. It is also filterable by keywords. The filters work well with the sorting system, users are able to comb through the reviews by rating as well as keywords.

<img src="https://i.imgur.com/NwTDZcd.gif" />

### User reviews are interactive for community contributions:

Individual reviews display information about the user in addition to their rating of the restaurant. Users are able to upvote the reviews by helpfulness as well as report the review for inapproriateness.

<img src="https://i.imgur.com/6XYf413.gif" />

### Review list pagination are front-end loaded for speed:

Page numbers are dynamically changed depending on sorting/filters. Pages are able to be parsed through by page and arrow clicks. Page automatically scrolls to the top of the reviews list for user convenience.

<img src="https://i.imgur.com/OGRp7sF.gif" />

## Installation

From within the root directory:

- Run the following commands

```sh
npm install
npm run build
npm run seed
npm start
```

- Then, open `localhost:3004/restaurant/:id` in your browser.
- Voila! Now you have the service running on your local server!
- Change :id to any number between 1-9 to see different restaurant pages.

## Related Services

[Overview Module](https://github.com/table-me/overview-module)

[Reservations Module](https://github.com/table-me/reservations-module)

[Menu Module](https://github.com/table-me/menu-module)

## About

> Table.me was built in a team of 4 to simulate a restaurant booking service. It mimics the front-end behavior of popular restaurant booking sites.
