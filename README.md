# Lunch Finder

An app that can find restaurants near a specific location.

`Built by Elica`

## 💻 Technologies

#### Routing

This is a simple application and SEO does not seem to be important, so I just choose React Router to do the routing for simplicity.

#### Bundler

Since Create React App is outdated and no longer be maintained, Vite is a good choice. Vite has better performance and provide several template can set up project more quick.

#### Styling

Using Chakra UI to save time allows me to focus on business logic and still have consistent UI & design.

#### API requests

Using React Query to simplify data fetching and caching, so we don't need to use `useEffect` and `useState` in every page, and can have cache for free.

#### Map

While researching how to show the location of the restaurant in a map view, I found that there is a project called OpenStreetMap. It is an open source project and free to use, so I tried to use it in this app and it looks good. But if I have more time, I might try Mapbox or Google Map to see which one is better.

#### Testing

This project uses Jest + Mock Service Worker (MSW) + Testing Library for integration testing. MSW mocks API requests at the network level, making integration testing more realistic.
By using these technologies, it ensures that the frontend works correctly with API calls without needing a backend.

## 📄 File Structure

```

└── /src
    ├── /components -- components that will be used mutiple places
    ├── /constants -- store constant data
    ├── /libs -- library or utility tools
    ├── /pages -- page components used in routes
    ├── /services -- external service tool or API like foursqure API
    ├── /tests -- testing related files
    ├── App.tsx -- routing config
```

## 🚦 Prerequisite

#### Node version

```
>= 20
```

#### Configuration

This application uses the Foursquare API to find restaurants, to start the application you need to add the API token to the `.env.local` environment file in the root directory.

```
// .env.local file
VITE_FSQ_API=FOURSQUARE_API_TOKEN
```

## 🚀 Getting started

- `npm install`: Install dependencies
- `npm run dev`: Run dev mode
- `npm run test`：Run tests
- `npm run test:watch`：Run tests in watch mode

## 🔨 Possible Improvements

- Search page should have pagination functionality
- It is a bit weird to navigate from the home page to the details page and go back, the result will change.
- Should have some UI that can show more photos in the details page
- It may be useful to display a map on the search page. When user hovers cards, the marker will appear immediately.
- Currently this app does not have responsive design
