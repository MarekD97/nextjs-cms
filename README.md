# This is a CMS project built using Next.js.

## Getting Started

1. Clone this repo:

```
git clone https://github.com/MarekD97/ProjectCMS
```

2. Install NPM packages

```
npm install
```

Create `.env.local` file in the root of your project, put in it config vars:

```
DB_HOST=MONGODB_CONNECTION_STRING
DB_NAME=MONGODB_DATABASE_NAME
SECRET_KEY=YOUR_SECRET_KEY
CLOUD_NAME=CLOUDINARY_NAME
CLOUD_API_KEY=CLOUDINARY_API_KEY
CLOUD_API_SECRET=CLOUDINARY_API_SECRET
```

Run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
