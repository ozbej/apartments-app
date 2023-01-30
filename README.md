# Apartments App

This repository contains code for displaying 500 apartments from the `https://www.sreality.cz/en` site.

## Run with Docker
1. Run `docker-compose up -d` from the root
2. Visit the site on `http://127.0.0.1:8080/`

## Developer Guide

### Web Scraper
1. Install [Selenium Chrome driver](https://chromedriver.chromium.org/downloads)  and save it into `scraper` folder
2. Navigate into `scraper` folder
3. Run `pip install -r requirements.txt`
4. To start scraping run `python scraper.py`

### Front End
1. Navigate into `frontend` folder
2. Run `npm install`
3. Run `npm start` and visit the site on `http://127.0.0.1:3000/`

### Back End
1. Navigate into `server` folder
2. Run `npm install`
3. Run `npm run build`
4. Run `npm start` to start server on `http://127.0.0.1:8000/`

## Tech Stack
- Frontend: React
- Backend: Node.js + PostgreSQL DB
- Python web scraper